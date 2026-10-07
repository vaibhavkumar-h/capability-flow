"""
analyze_jobs.py
---------------
Extracts top skill demand from Analytics Jobs.csv
Reproduces Figure 6 of the Capability Flow Report.
"""

import pandas as pd
import re
from collections import Counter
import matplotlib.pyplot as plt
import os

# --- Setup ---
os.makedirs("data/processed", exist_ok=True)
os.makedirs("charts", exist_ok=True)

print("Loading Analytics Jobs...")
jobs = pd.read_csv("data/raw/analytics_jobs.csv")
print(f"Rows: {len(jobs)}")
print(f"Columns: {jobs.columns.tolist()}")
print()

# --- Clean key_skills ---
# key_skills is a comma-separated string
jobs = jobs.dropna(subset=["key_skills"])
print(f"Rows with key_skills: {len(jobs)}")

# Explode skills into one row per (job, skill)
records = []
for _, row in jobs.iterrows():
    skills_raw = str(row["key_skills"])
    # Split by comma
    for s in skills_raw.split(","):
        s = s.strip().lower()
        # Skip placeholders
        if not s or s in ("...", "..", ".", "-", "n/a", "na"):
            continue
        # Basic normalization
        s = re.sub(r"\s+", " ", s)   # collapse whitespace
        records.append({
            "s_no": row["s_no"],
            "skill_raw": s
        })

exploded = pd.DataFrame(records)
print(f"Total (job, skill) pairs: {len(exploded)}")
print(f"Unique raw skills: {exploded['skill_raw'].nunique()}")
print()

# --- Skill normalization map ---
# Group similar skills under one canonical label
normalization_map = {
    # SQL family
    "sql": "SQL",
    "plsql": "SQL",
    "pl/sql": "SQL",
    "pl / sql": "SQL",
    "mysql": "SQL",
    "postgresql": "SQL",
    "sql server": "SQL",
    "oracle sql": "SQL",

    # Data Analysis family
    "data analysis": "Data Analysis",
    "data analytics": "Data Analysis",
    "analytics": "Data Analysis",
    "data analyst": "Data Analysis",

    # Programming
    "python": "Python",
    "java": "Java",
    "javascript": "JavaScript",
    "js": "JavaScript",
    "c++": "C++",
    "c#": "C#",
    "c": "C",

    # BI / Stats
    "sas": "SAS",
    "r": "R",
    "r programming": "R",
    "statistics": "Statistics",
    "statistical analysis": "Statistics",

    # Business
    "business analysis": "Business Analysis",
    "business analytics": "Business Analysis",
    "business analyst": "Business Analysis",

    # AI/ML
    "machine learning": "Machine Learning",
    "ml": "Machine Learning",
    "deep learning": "Deep Learning",
    "ai": "AI/ML",
    "artificial intelligence": "AI/ML",
    "nlp": "NLP",
    "natural language processing": "NLP",
    "computer vision": "Computer Vision",

    # Big data
    "big data": "Big Data",
    "hadoop": "Hadoop",
    "spark": "Spark",
    "hive": "Hive",

    # Visualization
    "data visualization": "Data Visualization",
    "tableau": "Tableau",
    "power bi": "Power BI",
    "powerbi": "Power BI",
    "qlikview": "QlikView",
    "qlik": "QlikView",

    # Office
    "excel": "Excel",
    "advanced excel": "Excel",
    "ms excel": "Excel",
    "microsoft excel": "Excel",

    # Cloud
    "aws": "AWS",
    "azure": "Azure",
    "cloud": "Cloud",

    # Other programming
    "scala": "Scala",
    "matlab": "MATLAB",
    "php": "PHP",
    "html": "HTML",
    "css": "CSS",
}

# Apply normalization
exploded["skill_canonical"] = exploded["skill_raw"].map(normalization_map)
exploded["skill_canonical"] = exploded["skill_canonical"].fillna(
    exploded["skill_raw"]
)

print(f"Unique canonical skills: {exploded['skill_canonical'].nunique()}")
print()

# --- Top 20 skills ---
total_jobs = len(jobs)
skill_counts = exploded.groupby("skill_canonical")["s_no"].nunique().sort_values(ascending=False)
top20 = skill_counts.head(20).reset_index()
top20.columns = ["skill", "postings"]
top20["share_pct"] = (top20["postings"] / total_jobs * 100).round(2)

print("=" * 60)
print("TOP 20 SKILLS IN ANALYTICS JOBS")
print("=" * 60)
print(top20.to_string(index=False))
print()

# --- Save ---
top20.to_csv("data/processed/top_skills_demand.csv", index=False)
exploded.to_csv("data/processed/jobs_exploded.csv", index=False)

print("[SAVED] data/processed/top_skills_demand.csv")
print("[SAVED] data/processed/jobs_exploded.csv")
print()

# --- Chart ---
print("Generating chart...")
fig, ax = plt.subplots(figsize=(10, 8))
top20_sorted = top20.sort_values("postings", ascending=True)
ax.barh(top20_sorted["skill"], top20_sorted["share_pct"], color="#2E86DE")

for i, (skill, share) in enumerate(zip(top20_sorted["skill"], top20_sorted["share_pct"])):
    ax.text(share + 0.1, i, f"{share}%", va="center", fontsize=9)

ax.set_xlabel("Share of Analytics job postings mentioning skill (%)")
ax.set_title("Most Frequently Requested Skills in Analytics Jobs")
plt.tight_layout()
plt.savefig("charts/fig6_top_skills.png", dpi=120)
print("[SAVED] charts/fig6_top_skills.png")
print()
print("DONE.")