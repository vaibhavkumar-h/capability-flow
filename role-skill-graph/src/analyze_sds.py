"""SDS Personality Analysis - Phase 3"""

import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from scipy import stats
import os

os.makedirs("charts", exist_ok=True)

print("Loading SDS Personality Traits...")
sds = pd.read_excel("data/raw/sds_personality.xlsx")
print(f"Shape: {sds.shape}")
print(f"Columns: {sds.columns.tolist()}")
print()

# Fix column name (source file has stray spaces)
sds.columns = [c.replace(" ", "") for c in sds.columns]
target = "success_classification_high_low"
trait_cols = ["neuroticism", "extraversion", "openness_to_experience",
              "agreeableness", "conscientiousness"]

high = sds[sds[target] == 1]
low  = sds[sds[target] == 0]
print(f"High-success group: {len(high)}")
print(f"Low-success group: {len(low)}")
print()

# --- Stats ---
results = []
for col in trait_cols:
    h = high[col].values
    l = low[col].values
    t, p = stats.ttest_ind(h, l, equal_var=False)
    pooled_std = np.sqrt(((len(h)-1)*np.var(h, ddof=1) + (len(l)-1)*np.var(l, ddof=1)) / (len(h)+len(l)-2))
    d = (np.mean(h) - np.mean(l)) / pooled_std if pooled_std > 0 else 0
    r = np.corrcoef(sds[col], sds[target])[0, 1]
    results.append({
        "trait": col,
        "high_mean": round(np.mean(h), 2),
        "low_mean": round(np.mean(l), 2),
        "correlation": round(r, 3),
        "p_value": p,
        "cohens_d": round(d, 2)
    })

res_df = pd.DataFrame(results)
print("=" * 60)
print("SDS PERSONALITY-SUCCESS ANALYSIS")
print("=" * 60)
print(res_df.to_string(index=False))
print()

res_df.to_csv("data/processed/sds_results.csv", index=False)
print("[SAVED] data/processed/sds_results.csv")
print()

# --- Chart 1: Means ---
fig, ax = plt.subplots(figsize=(10, 6))
x = np.arange(len(trait_cols))
width = 0.35

labels = [c.replace("_to_experience", "").replace("_", " ").title() for c in trait_cols]
ax.bar(x - width/2, res_df["low_mean"], width, label="Low success", color="#F39C12")
ax.bar(x + width/2, res_df["high_mean"], width, label="High success", color="#E74C3C")

ax.set_ylabel("Mean trait score")
ax.set_title("SDS Personality Traits by Success Outcome")
ax.set_xticks(x)
ax.set_xticklabels(labels, rotation=15, ha="right")
ax.legend()
plt.tight_layout()
plt.savefig("charts/fig13_sds_personality.png", dpi=120)
print("[SAVED] charts/fig13_sds_personality.png")
print()

# --- Chart 2: Correlations ---
fig, ax = plt.subplots(figsize=(10, 6))
sorted_res = res_df.sort_values("correlation", ascending=True)
ax.barh(sorted_res["trait"].str.replace("_to_experience", "").str.replace("_", " ").str.title(),
        sorted_res["correlation"], color="#2E86DE")

for i, corr in enumerate(sorted_res["correlation"]):
    ax.text(corr + 0.01, i, f"{corr:.2f}", va="center", fontsize=10)

ax.set_xlabel("Correlation with success outcome")
ax.set_title("SDS Personality-Success Correlations")
plt.tight_layout()
plt.savefig("charts/fig14_sds_correlations.png", dpi=120)
print("[SAVED] charts/fig14_sds_correlations.png")
print()
print("DONE.")