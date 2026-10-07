"""JDS Skill Traits Analysis - Phase 2"""

import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from scipy import stats
import os

os.makedirs("charts", exist_ok=True)

print("Loading JDS Skill Traits...")
jds = pd.read_excel("data/raw/jds_skill_traits.xlsx")
print(f"Shape: {jds.shape}")
print(f"Columns: {jds.columns.tolist()}")
print()

# Target column
target = "salary_hike_high_or_low"
skill_cols = ["big_data_skills", "maths-stats_skills", "coding_skills",
              "ai_and_ml_skills", "dashboard_and_storytelling_skills"]

# Split groups
high = jds[jds[target] == 1]
low  = jds[jds[target] == 0]
print(f"High-hike group: {len(high)}")
print(f"Low-hike group: {len(low)}")
print()

# --- Stats per skill ---
results = []
for col in skill_cols:
    h = high[col].values
    l = low[col].values
    t, p = stats.ttest_ind(h, l, equal_var=False)
    # Cohen's d
    pooled_std = np.sqrt(((len(h)-1)*np.var(h, ddof=1) + (len(l)-1)*np.var(l, ddof=1)) / (len(h)+len(l)-2))
    d = (np.mean(h) - np.mean(l)) / pooled_std if pooled_std > 0 else 0
    r = np.corrcoef(jds[col], jds[target])[0, 1]
    results.append({
        "skill": col,
        "high_mean": round(np.mean(h), 2),
        "low_mean": round(np.mean(l), 2),
        "correlation": round(r, 3),
        "p_value": p,
        "cohens_d": round(d, 2)
    })

res_df = pd.DataFrame(results)
print("=" * 60)
print("JDS SKILL-OUTCOME ANALYSIS")
print("=" * 60)
print(res_df.to_string(index=False))
print()

res_df.to_csv("data/processed/jds_results.csv", index=False)
print("[SAVED] data/processed/jds_results.csv")
print()

# --- Chart 1: Mean scores ---
fig, ax = plt.subplots(figsize=(10, 6))
x = np.arange(len(skill_cols))
width = 0.35

labels = [c.replace("_skills", "").replace("_", " ").title() for c in skill_cols]
ax.bar(x - width/2, res_df["low_mean"], width, label="Low salary hike", color="#F39C12")
ax.bar(x + width/2, res_df["high_mean"], width, label="High salary hike", color="#E74C3C")

ax.set_ylabel("Mean skill score (1-5)")
ax.set_title("JDS Skills by Salary-Hike Outcome")
ax.set_xticks(x)
ax.set_xticklabels(labels, rotation=15, ha="right")
ax.legend()
ax.set_ylim(0, 5)
plt.tight_layout()
plt.savefig("charts/fig11_jds_skill_scores.png", dpi=120)
print("[SAVED] charts/fig11_jds_skill_scores.png")
print()

# --- Chart 2: Correlations ---
fig, ax = plt.subplots(figsize=(10, 6))
sorted_res = res_df.sort_values("correlation", ascending=True)
ax.barh(sorted_res["skill"].str.replace("_skills", "").str.replace("_", " ").str.title(),
        sorted_res["correlation"], color="#2E86DE")

for i, (corr, skill) in enumerate(zip(sorted_res["correlation"], sorted_res["skill"])):
    ax.text(corr + 0.01, i, f"{corr:.2f}", va="center", fontsize=10)

ax.set_xlabel("Correlation with high/low salary-hike outcome")
ax.set_title("JDS Skill-Outcome Correlations")
plt.tight_layout()
plt.savefig("charts/fig12_jds_correlations.png", dpi=120)
print("[SAVED] charts/fig12_jds_correlations.png")
print()
print("DONE.")