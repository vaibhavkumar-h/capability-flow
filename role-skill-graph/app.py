import streamlit as st
import pandas as pd

st.set_page_config(page_title="Role-Skill Graph", layout="wide")

@st.cache_data
def load_data():
    roles = pd.read_csv("data/processed/roles.csv")
    skills = pd.read_csv("data/processed/skills.csv")
    relations = pd.read_csv("data/processed/role_skill.csv")
    return roles, skills, relations

roles, skills, relations = load_data()

role_id_to_label = dict(zip(roles["id"], roles["label"]))
skill_id_to_label = dict(zip(skills["id"], skills["label"]))

st.title("Role - Skill Knowledge Graph")
st.caption("Explore 3,039 occupations and 13,939 skills from the ESCO taxonomy")

st.sidebar.header("Pick a role")
role_options = sorted(roles["label"].tolist())
selected_role_label = st.sidebar.selectbox("Role:", role_options)
selected_role_id = roles[roles["label"] == selected_role_label]["id"].iloc[0]

st.sidebar.markdown("---")
st.sidebar.metric("Total Roles", len(roles))
st.sidebar.metric("Total Skills", len(skills))
st.sidebar.metric("Role-Skill Links", len(relations))

st.header(selected_role_label)
role_desc = roles[roles["id"] == selected_role_id]["description"].iloc[0]
if pd.notna(role_desc):
    st.write(role_desc)

st.subheader("Skills for this role")
role_skills = relations[relations["occupation_id"] == selected_role_id].copy()
role_skills["skill_label"] = role_skills["skill_id"].map(skill_id_to_label)

essential = role_skills[role_skills["relation"] == "essential"]
optional = role_skills[role_skills["relation"] == "optional"]

col1, col2 = st.columns(2)

with col1:
    st.markdown(f"**Essential Skills** ({len(essential)})")
    for _, row in essential.head(30).iterrows():
        st.markdown(f"- {row['skill_label']}")

with col2:
    st.markdown(f"**Optional Skills** ({len(optional)})")
    for _, row in optional.head(30).iterrows():
        st.markdown(f"- {row['skill_label']}")

st.subheader("Similar Roles (shared skills)")

my_skills = set(role_skills["skill_id"])
other = relations[relations["occupation_id"] != selected_role_id]
counts = (
    other[other["skill_id"].isin(my_skills)]
    .groupby("occupation_id")
    .size()
    .sort_values(ascending=False)
    .head(10)
)

sim_rows = []
for other_id, shared in counts.items():
    sim_rows.append({
        "Role": role_id_to_label.get(other_id, other_id),
        "Shared Skills": int(shared),
        "Overlap %": round(100 * shared / len(my_skills), 1) if my_skills else 0
    })

if sim_rows:
    st.dataframe(pd.DataFrame(sim_rows), use_container_width=True, hide_index=True)
else:
    st.info("No similar roles found.")

st.subheader("Top 10 Most-Required Skills (across all roles)")
top_global = relations.groupby("skill_id").size().sort_values(ascending=False).head(10)
top_rows = [
    {"Skill": skill_id_to_label.get(sid, sid), "Roles Requiring": int(c)}
    for sid, c in top_global.items()
]
st.dataframe(pd.DataFrame(top_rows), use_container_width=True, hide_index=True)