"""
analyze_seniority.py
--------------------
Junior vs Mid vs Senior skill demand + salary progression.
"""

import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import re
import os

os.makedirs("charts", exist_ok=True)
os.makedirs("data/processed", exist_ok=True)

# ============================================================
# 1. LOAD + PARSE EXPERIENCE
# ============================================================
print("Loading Analytics Jobs...")
jobs = pd.read_csv("data/raw/analytics_jobs.csv")
print(f"Rows: {len(jobs)}")

def parse_experience(s):
    if pd.isna(s):
        return np.nan
    s = str(s).lower().strip()
    nums = re.findall(r"\d+", s)
    if not nums:
        return np.nan
    nums = [int(n) for n in nums]
    if len(nums) == 1:
        return float(nums[0])
    return (nums[0] + nums[1]) / 2.0

jobs["exp_mid"] = jobs["experience"].apply(parse_experience)
print(f"Rows with parsable experience: {jobs['exp_mid'].notna().sum()}")

def band(mid):
    if pd.isna(mid):
        return None
    if mid <= 2.5:
        return "Junior (0-2y)"
    elif mid <= 6:
        return "Mid (3-6y)"
    else:
        return "Senior (6y+)"

jobs["seniority"] = jobs["exp_mid"].apply(band)
print("\nSeniority distribution:")
print(jobs["seniority"].value_counts())
print()

# ============================================================
# 2. EXPLODE + JOIN
# ============================================================
print("Exploding skills...")
exploded = pd.read_csv("data/processed/jobs_exploded.csv")
print(f"Exploded rows: {len(exploded)}")

exploded = exploded.merge(
    jobs[["s_no", "seniority"]],
    on="s_no",
    how="left"
)

exploded = exploded.dropna(subset=["seniority", "skill_canonical"])
print(f"Rows after join: {len(exploded)}")
print()

# ============================================================
# 3. TOP SKILLS PER BAND
# ============================================================
per_band = exploded.groupby(["seniority", "skill_canonical"])["s_no"].nunique().reset_index()
per_band.columns = ["seniority", "skill", "job_count"]

band_totals = jobs["seniority"].value_counts().to_dict()

per_band["share_pct"] = per_band.apply(
    lambda r: round(100 * r["job_count"] / band_totals.get(r["seniority"], 1), 2),
    axis=1
)

pivot = per_band.pivot(index="skill", columns="seniority", values="share_pct").fillna(0)

overall = per_band.groupby("skill")["job_count"].sum().sort_values(ascending=False)
top_skills = overall.head(15).index.tolist()
pivot_top = pivot.loc[top_skills]

print("=" * 60)
print("TOP 15 SKILLS BY SENIORITY (% of jobs in band)")
print("=" * 60)
print(pivot_top.round(2).to_string())
print()

pivot_top.round(3).to_csv("data/processed/seniority_skill_analysis.csv")
print("[SAVED] data/processed/seniority_skill_analysis.csv")
print()

# ============================================================
# 4. CHART 1 — GROUPED BAR
# ============================================================
print("Generating fig16...")

plot_df = pivot_top.copy()
plot_df = plot_df.sort_values("Junior (0-2y)", ascending=True)

fig, ax = plt.subplots(figsize=(11, 8))
y = np.arange(len(plot_df))
h = 0.27

ax.barh(y - h, plot_df["Junior (0-2y)"], h, label="Junior (0-2y)", color="#F39C12")
ax.barh(y, plot_df["Mid (3-6y)"], h, label="Mid (3-6y)", color="#2E86DE")
ax.barh(y + h, plot_df["Senior (6y+)"], h, label="Senior (6y+)", color="#E74C3C")

ax.set_yticks(y)
ax.set_yticklabels(plot_df.index, fontsize=9)
ax.set_xlabel("Share of jobs in band mentioning skill (%)")
ax.set_title("Top 15 Skills — Junior vs Mid vs Senior Demand")
ax.legend(loc="lower right")
ax.grid(axis="x", alpha=0.3)
plt.tight_layout()
plt.savefig("charts/fig16_junior_vs_senior_skills.png", dpi=120)
plt.close()
print("[SAVED] charts/fig16_junior_vs_senior_skills.png")

# ============================================================
# 5. CHART 2 — SENIORITY GAP
# ============================================================
print("Generating fig17...")

gap = (pivot_top["Senior (6y+)"] - pivot_top["Junior (0-2y)"]).sort_values()

fig, ax = plt.subplots(figsize=(11, 8))
colors = ["#E74C3C" if v > 0 else "#27AE60" for v in gap.values]
ax.barh(gap.index, gap.values, color=colors, edgecolor="black", linewidth=0.4)

for i, v in enumerate(gap.values):
    ax.text(v + (0.05 if v > 0 else -0.05), i, f"{v:+.1f}%",
            va="center", ha="left" if v > 0 else "right", fontsize=9)

ax.axvline(0, color="black", linewidth=1)
ax.set_xlabel("Senior demand % minus Junior demand %")
ax.set_title("Seniority Skill Gap\n(Red = senior-heavy | Green = junior-heavy)")
ax.grid(axis="x", alpha=0.3)
plt.tight_layout()
plt.savefig("charts/fig17_seniority_skill_gap.png", dpi=120)
plt.close()
print("[SAVED] charts/fig17_seniority_skill_gap.png")

# ============================================================
# 6. CHART 3 — EXPERIENCE DISTRIBUTION
# ============================================================
print("Generating fig18...")

fig, ax = plt.subplots(figsize=(11, 6))
ax.hist(jobs["exp_mid"].dropna(), bins=25, color="#2E86DE", edgecolor="black", alpha=0.8)
ax.axvline(2.5, color="#F39C12", linestyle="--", linewidth=2, label="Junior/Mid boundary (2.5y)")
ax.axvline(6, color="#E74C3C", linestyle="--", linewidth=2, label="Mid/Senior boundary (6y)")

ax.set_xlabel("Years of experience (range midpoint)")
ax.set_ylabel("Number of job postings")
ax.set_title("Experience Distribution Across Analytics Jobs")
ax.legend()
ax.grid(axis="y", alpha=0.3)
plt.tight_layout()
plt.savefig("charts/fig18_experience_distribution.png", dpi=120)
plt.close()
print("[SAVED] charts/fig18_experience_distribution.png")

# ============================================================
# 7. CHART 4 — SALARY BY SENIORITY
# ============================================================
print("Attempting salary analysis...")

def parse_salary(s):
    if pd.isna(s):
        return np.nan
    s = str(s).lower().replace(",", "").replace("₹", "").strip()
    if any(x in s for x in ["not disclosed", "negotiable", "n/a"]):
        return np.nan
    nums = re.findall(r"\d+(?:\.\d+)?", s)
    if not nums:
        return np.nan
    nums = [float(n) for n in nums]
    return np.mean(nums)

jobs["salary_num"] = jobs["salary"].apply(parse_salary)
salary_ok = jobs.dropna(subset=["salary_num", "seniority"])

print(f"Rows with parsable salary: {len(salary_ok)}")

if len(salary_ok) > 30:
    order = ["Junior (0-2y)", "Mid (3-6y)", "Senior (6y+)"]
    data = [salary_ok[salary_ok["seniority"] == b]["salary_num"].values for b in order]

    fig, ax = plt.subplots(figsize=(10, 6))
    bp = ax.boxplot(data, patch_artist=True,
                    boxprops=dict(facecolor="#2E86DE", alpha=0.6),
                    medianprops=dict(color="red", linewidth=2))
    ax.set_xticks(range(1, len(order) + 1))
    ax.set_xticklabels(order)

    ax.set_ylabel("Salary (raw units from dataset)")
    ax.set_title("Salary Distribution by Seniority Band")
    ax.grid(axis="y", alpha=0.3)
    plt.tight_layout()
    plt.savefig("charts/fig19_salary_by_seniority.png", dpi=120)
    plt.close()
    print("[SAVED] charts/fig19_salary_by_seniority.png")
else:
    print(f"[SKIPPED] Too few parsable salary values ({len(salary_ok)})")
    fig, ax = plt.subplots(figsize=(10, 6))
    ax.text(0.5, 0.5, "Salary column not cleanly parsable\n(skipped)",
            ha="center", va="center", fontsize=14, transform=ax.transAxes)
    ax.set_title("Salary Analysis — Data Not Usable")
    plt.tight_layout()
    plt.savefig("charts/fig19_salary_by_seniority.png", dpi=120)
    plt.close()
    print("[SAVED] charts/fig19_salary_by_seniority.png (placeholder)")

print()
print("=" * 60)
print("DONE. All seniority charts generated.")
print("=" * 60)