import pandas as pd

print("Loading raw ESCO data...")

# --- OCCUPATIONS ---
occ = pd.read_csv("data/raw/occupations_en.csv")
occ = occ[["conceptUri", "preferredLabel", "description"]].copy()
occ.columns = ["id", "label", "description"]
occ = occ.dropna(subset=["id", "label"])
occ = occ.drop_duplicates(subset=["id"])
print(f"Occupations: {len(occ)}")

# --- SKILLS ---
skills = pd.read_csv("data/raw/skills_en.csv")
skills = skills[["conceptUri", "preferredLabel", "skillType", "reuseLevel", "description"]].copy()
skills.columns = ["id", "label", "skill_type", "reuse_level", "description"]
skills = skills.dropna(subset=["id", "label"])
skills = skills.drop_duplicates(subset=["id"])
print(f"Skills: {len(skills)}")

# --- RELATIONS ---
relations = pd.read_csv("data/raw/occupationSkillRelations_en.csv")
relations = relations[["occupationUri", "skillUri", "relationType", "skillType"]].copy()
relations.columns = ["occupation_id", "skill_id", "relation", "skill_type"]
relations = relations.dropna(subset=["occupation_id", "skill_id"])
relations = relations.drop_duplicates()
print(f"Relations: {len(relations)}")

# --- ADD WEIGHTS ---
# essential = 1.0, optional = 0.5
relations["weight"] = relations["relation"].map({
    "essential": 1.0,
    "optional": 0.5
}).fillna(0.3)

# --- FILTER: keep only valid IDs ---
valid_occ_ids = set(occ["id"])
valid_skill_ids = set(skills["id"])

relations = relations[
    relations["occupation_id"].isin(valid_occ_ids) &
    relations["skill_id"].isin(valid_skill_ids)
]
print(f"Relations after ID filter: {len(relations)}")

# --- SAVE ---
occ.to_csv("data/processed/roles.csv", index=False)
skills.to_csv("data/processed/skills.csv", index=False)
relations.to_csv("data/processed/role_skill.csv", index=False)

print("\n✅ Saved to data/processed/")
print("  - roles.csv")
print("  - skills.csv")
print("  - role_skill.csv")

# --- QUICK STATS ---
print("\n📊 STATS")
print(f"  Avg skills per role: {len(relations) / len(occ):.1f}")
print(f"  Roles with 0 skills: {len(valid_occ_ids - set(relations['occupation_id']))}")
print(f"  Skills used by 0 roles: {len(valid_skill_ids - set(relations['skill_id']))}")