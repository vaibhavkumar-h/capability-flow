"""
generate_extras.py
------------------
Generates 4 additional charts:
  fig20_skill_cooccurrence.png    - heatmap of top skills appearing together
  fig21_jds_radar.png             - JDS skill areas radar chart (high vs low)
  fig22_sds_radar.png             - SDS Big Five radar chart (high vs low)
  fig23_top_locations.png         - top 15 job locations
"""

import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import os

os.makedirs("charts", exist_ok=True)

print("=" * 60)
print("GENERATING EXTRA CHARTS")
print("=" * 60)

# ============================================================
# CHART 1 - SKILL CO-OCCURRENCE HEATMAP
# ============================================================
print("\n[1/4] Skill co-occurrence heatmap...")

exploded = pd.read_csv("data/processed/jobs_exploded.csv")
print(f"  Loaded {len(exploded)} skill-job pairs")

top15 = exploded["skill_canonical"].value_counts().head(15).index.tolist()
sub = exploded[exploded["skill_canonical"].isin(top15)]

pivot = pd.crosstab(sub["s_no"], sub["skill_canonical"])
pivot = (pivot > 0).astype(int)
pivot = pivot[top15]

cooc = pivot.T.dot(pivot)
diag = np.diag(cooc).astype(float)
diag[diag == 0] = 1
norm_cooc = cooc.values / np.sqrt(np.outer(diag, diag))
cooc_df = pd.DataFrame(norm_cooc, index=cooc.index, columns=cooc.columns)

fig, ax = plt.subplots(figsize=(11, 9))
im = ax.imshow(cooc_df.values, cmap="YlOrRd", aspect="auto", vmin=0, vmax=1)

ax.set_xticks(range(len(cooc_df.columns)))
ax.set_xticklabels(cooc_df.columns, rotation=45, ha="right", fontsize=9)
ax.set_yticks(range(len(cooc_df.index)))
ax.set_yticklabels(cooc_df.index, fontsize=9)

for i in range(len(cooc_df.index)):
    for j in range(len(cooc_df.columns)):
        v = cooc_df.values[i, j]
        if i != j and v > 0.05:
            ax.text(j, i, f"{v:.2f}", ha="center", va="center",
                    fontsize=7, color="black" if v < 0.6 else "white")

ax.set_title("Skill Co-occurrence (Normalized)\nTop 15 Skills in Analytics Jobs")
plt.colorbar(im, ax=ax, label="Co-occurrence strength (0-1)")
plt.tight_layout()
plt.savefig("charts/fig20_skill_cooccurrence.png", dpi=120)
plt.close()
print("  [SAVED] charts/fig20_skill_cooccurrence.png")

cooc_df.round(3).to_csv("data/processed/skill_cooccurrence.csv")
print("  [SAVED] data/processed/skill_cooccurrence.csv")

# ============================================================
# CHART 2 - JDS RADAR
# ============================================================
print("\n[2/4] JDS radar chart...")

jds = pd.read_csv("data/processed/jds_results.csv")
print(f"  Loaded {len(jds)} skill areas")

labels = jds["skill"].str.replace("_skills", "").str.replace("_", " ").str.replace("-", " ").str.title().tolist()
high_vals = jds["high_mean"].tolist()
low_vals = jds["low_mean"].tolist()

angles = np.linspace(0, 2 * np.pi, len(labels), endpoint=False).tolist()
high_vals_c = high_vals + high_vals[:1]
low_vals_c = low_vals + low_vals[:1]
angles_c = angles + angles[:1]

fig, ax = plt.subplots(figsize=(9, 9), subplot_kw=dict(polar=True))
ax.plot(angles_c, high_vals_c, "o-", linewidth=2, color="#E74C3C", label="High salary hike")
ax.fill(angles_c, high_vals_c, color="#E74C3C", alpha=0.2)
ax.plot(angles_c, low_vals_c, "o-", linewidth=2, color="#F39C12", label="Low salary hike")
ax.fill(angles_c, low_vals_c, color="#F39C12", alpha=0.2)

ax.set_xticks(angles)
ax.set_xticklabels(labels, fontsize=10)
ax.set_ylim(0, 5)
ax.set_yticks([1, 2, 3, 4, 5])
ax.set_title("JDS Skill Areas - High vs Low Salary-Hike Groups", pad=20, fontsize=13)
ax.legend(loc="upper right", bbox_to_anchor=(1.3, 1.1))
plt.tight_layout()
plt.savefig("charts/fig21_jds_radar.png", dpi=120)
plt.close()
print("  [SAVED] charts/fig21_jds_radar.png")

# ============================================================
# CHART 3 - SDS RADAR
# ============================================================
print("\n[3/4] SDS radar chart...")

sds = pd.read_csv("data/processed/sds_results.csv")
print(f"  Loaded {len(sds)} traits")

labels = sds["trait"].str.replace("_to_experience", "").str.replace("_", " ").str.title().tolist()
high_vals = sds["high_mean"].tolist()
low_vals = sds["low_mean"].tolist()

angles = np.linspace(0, 2 * np.pi, len(labels), endpoint=False).tolist()
high_vals_c = high_vals + high_vals[:1]
low_vals_c = low_vals + low_vals[:1]
angles_c = angles + angles[:1]

fig, ax = plt.subplots(figsize=(9, 9), subplot_kw=dict(polar=True))
ax.plot(angles_c, high_vals_c, "o-", linewidth=2, color="#27AE60", label="High success")
ax.fill(angles_c, high_vals_c, color="#27AE60", alpha=0.2)
ax.plot(angles_c, low_vals_c, "o-", linewidth=2, color="#E67E22", label="Low success")
ax.fill(angles_c, low_vals_c, color="#E67E22", alpha=0.2)

ax.set_xticks(angles)
ax.set_xticklabels(labels, fontsize=10)
ymax = max(max(high_vals), max(low_vals)) * 1.1
ax.set_ylim(0, ymax)
ax.set_title("SDS Personality Traits - High vs Low Success Groups", pad=20, fontsize=13)
ax.legend(loc="upper right", bbox_to_anchor=(1.3, 1.1))
plt.tight_layout()
plt.savefig("charts/fig22_sds_radar.png", dpi=120)
plt.close()
print("  [SAVED] charts/fig22_sds_radar.png")

# ============================================================
# CHART 4 - TOP LOCATIONS
# ============================================================
print("\n[4/4] Top locations bar chart...")

jobs = pd.read_csv("data/raw/analytics_jobs.csv")
print(f"  Loaded {len(jobs)} jobs")

loc_counts = jobs["location"].dropna().value_counts().head(15)

fig, ax = plt.subplots(figsize=(11, 7))
loc_sorted = loc_counts.sort_values()
ax.barh(loc_sorted.index, loc_sorted.values, color="#8E44AD", edgecolor="black", linewidth=0.4)

for i, v in enumerate(loc_sorted.values):
    ax.text(v + max(loc_sorted.values) * 0.01, i, str(v), va="center", fontsize=9)

ax.set_xlabel("Number of job postings")
ax.set_title("Top 15 Locations for Analytics Jobs")
ax.grid(axis="x", alpha=0.3)
plt.tight_layout()
plt.savefig("charts/fig23_top_locations.png", dpi=120)
plt.close()
print("  [SAVED] charts/fig23_top_locations.png")

loc_counts.to_csv("data/processed/top_locations.csv")
print("  [SAVED] data/processed/top_locations.csv")

print()
print("=" * 60)
print("DONE. 4 new charts generated.")
print("=" * 60)