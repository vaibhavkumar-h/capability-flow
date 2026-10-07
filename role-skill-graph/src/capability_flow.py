"""Capability Flow Integration - Phase 4"""

import pandas as pd
import matplotlib.pyplot as plt

print("Loading all results...")
demand = pd.read_csv("data/processed/top_skills_demand.csv")
jds = pd.read_csv("data/processed/jds_results.csv")

# Map JDS skill names to demand skill names
# Manual mapping: JDS skill -> closest skill name in top_skills_demand.csv
manual_map = {
    "big_data_skills": "Hadoop",                       # Big Data ↔ Hadoop
    "maths-stats_skills": "Data Analysis",             # Stats ↔ Data Analysis (closest match present)
    "coding_skills": "Python",                         # Coding ↔ Python
    "ai_and_ml_skills": "Machine Learning",            # AI/ML ↔ ML
    "dashboard_and_storytelling_skills": "Data Analysis"  # Storytelling ↔ Data Analysis (or Excel)
}
jds["demand_match"] = jds["skill"].map(manual_map)

# Capability score = mean of high-hike group * 20 (to scale 1-5 -> 20-100)
jds["capability_score"] = (jds["high_mean"] * 20).round(1)

# Rename demand's skill column to avoid collision
demand_renamed = demand.rename(columns={"skill": "demand_skill"})

# Merge
merged = jds.merge(
    demand_renamed[["demand_skill", "share_pct"]],
    left_on="demand_match", right_on="demand_skill", how="left"
).rename(columns={"share_pct": "market_demand_pct"})

merged["market_demand_pct"] = merged["market_demand_pct"].fillna(0)

print()
print("=" * 60)
print("CAPABILITY FLOW INTEGRATION")
print("=" * 60)
print(merged[["skill", "capability_score", "market_demand_pct"]].to_string(index=False))
print()

merged[["skill", "capability_score", "market_demand_pct"]].to_csv(
    "data/processed/capability_flow.csv", index=False
)
print("[SAVED] data/processed/capability_flow.csv")
print()

# --- Scatter chart ---
fig, ax = plt.subplots(figsize=(10, 7))
colors = ["#E74C3C", "#F39C12", "#2E86DE", "#27AE60", "#8E44AD"]

for i, row in merged.iterrows():
    label = row["skill"].replace("_skills", "").replace("_", " ").replace("-", " ").title()
    ax.scatter(row["market_demand_pct"], row["capability_score"],
               s=200, color=colors[i % len(colors)], alpha=0.75, edgecolors="black")
    ax.annotate(label, (row["market_demand_pct"], row["capability_score"]),
                xytext=(8, 8), textcoords="offset points", fontsize=10)

ax.set_xlabel("Market demand share in Analytics jobs (%)", fontsize=11)
ax.set_ylabel("Avg JDS capability score (%)", fontsize=11)
ax.set_title("Capability Demand vs Supply Proxy", fontsize=13)
ax.grid(True, alpha=0.3)
plt.tight_layout()
plt.savefig("charts/fig15_capability_flow.png", dpi=120)
print("[SAVED] charts/fig15_capability_flow.png")
print()
print("DONE.")