import pandas as pd
import networkx as nx

print("Loading cleaned data...")
roles = pd.read_csv("data/processed/roles.csv")
skills = pd.read_csv("data/processed/skills.csv")
relations = pd.read_csv("data/processed/role_skill.csv")

print(f"Roles: {len(roles)}, Skills: {len(skills)}, Relations: {len(relations)}")

# --- BUILD GRAPH ---
G = nx.Graph()

for _, row in roles.iterrows():
    G.add_node(f"R:{row['id']}", label=row['label'], node_type="role")

for _, row in skills.iterrows():
    G.add_node(f"S:{row['id']}", label=row['label'],
               skill_type=row['skill_type'], node_type="skill")

for _, row in relations.iterrows():
    G.add_edge(
        f"R:{row['occupation_id']}",
        f"S:{row['skill_id']}",
        weight=row['weight'],
        relation=row['relation']
    )

print(f"\n[GRAPH] {G.number_of_nodes()} nodes, {G.number_of_edges()} edges")

# --- DEGREE CENTRALITY (fast, no numpy issues) ---
print("\nCalculating degree centrality...")
degree = dict(G.degree())

# Top skills by how many roles require them
skill_nodes = [n for n in G.nodes if n.startswith("S:")]
top_skills = sorted(
    [(n, degree[n]) for n in skill_nodes],
    key=lambda x: x[1],
    reverse=True
)[:20]

print("\n[TOP 20 SKILLS] by number of roles requiring them:")
for node, deg in top_skills:
    print(f"  {G.nodes[node]['label']}: {deg} roles")

# Top roles by how many skills they need
role_nodes = [n for n in G.nodes if n.startswith("R:")]
top_roles = sorted(
    [(n, degree[n]) for n in role_nodes],
    key=lambda x: x[1],
    reverse=True
)[:10]

print("\n[TOP 10 ROLES] by number of skills:")
for node, deg in top_roles:
    print(f"  {G.nodes[node]['label']}: {deg} skills")

# --- SAVE CENTRALITY ---
cent_df = pd.DataFrame([
    {
        "node": n,
        "label": G.nodes[n].get('label', ''),
        "type": G.nodes[n].get('node_type', ''),
        "degree": d
    }
    for n, d in degree.items()
])
cent_df.to_csv("data/processed/centrality.csv", index=False)
print("\n[SAVED] centrality.csv")

# --- SAVE GRAPH ---
# Rename conflicting attribute before export
for n in G.nodes:
    if 'skill_type' in G.nodes[n]:
        G.nodes[n]['skill_kind'] = G.nodes[n].pop('skill_type')
