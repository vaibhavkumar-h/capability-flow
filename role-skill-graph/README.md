\# Role-Skill Knowledge Graph



An interactive knowledge graph connecting \*\*3,039 occupations\*\* to \*\*13,939 skills\*\* via \*\*129,004 relationships\*\*, built from the ESCO taxonomy.



\## What It Does



\- Explore the skills required for any occupation (essential vs optional)

\- Find similar roles based on shared skills

\- Discover the most universally demanded skills across all occupations



\## Data Source



\[ESCO v1.2.0](https://esco.ec.europa.eu/) — European Skills, Competences, Qualifications and Occupations taxonomy (English, Classification, CSV).



\## Pipeline



&#x20;   # 1. Clean raw ESCO CSVs

&#x20;   python src\\clean.py



&#x20;   # 2. Build the role-skill graph

&#x20;   python src\\build\_graph.py



&#x20;   # 3. Launch the interactive explorer

&#x20;   streamlit run app.py



\---



\## Capability Flow Analytics (Round 2 Addition)



This repository has been extended beyond the ESCO role-skill graph to include a reproducible analytics pipeline connecting \*\*market demand\*\* (job postings), \*\*technical capability\*\* (JDS skill traits), and \*\*workforce success\*\* (SDS personality traits).



\### Additional Data Sources



| File | Rows | Purpose |

|------|------|---------|

| data/raw/analytics\_jobs.csv | 15,841 | Market demand signal (skills in job postings) |

| data/raw/jds\_skill\_traits.xlsx | 139 | Skill traits vs salary outcome |

| data/raw/sds\_personality\_traits.xlsx | 161 | Personality traits vs success outcome |



\### Additional Pipeline



&#x20;   python src\\analyze\_jobs.py       # Figure 6 — Top 20 skills in Analytics jobs

&#x20;   python src\\analyze\_jds.py        # Figures 11, 12 — JDS skill-outcome analysis

&#x20;   python src\\analyze\_sds.py        # Figures 13, 14 — SDS personality-success analysis

&#x20;   python src\\capability\_flow.py    # Figure 15 — Demand vs capability integration



\### Additional Outputs



\*\*Charts (charts/ folder)\*\*

\- fig6\_top\_skills.png — Top 20 skills from Analytics jobs

\- fig11\_jds\_skill\_scores.png — JDS high vs low comparison

\- fig12\_jds\_correlations.png — JDS skill-outcome correlations

\- fig13\_sds\_personality.png — SDS high vs low comparison

\- fig14\_sds\_correlations.png — SDS trait-success correlations

\- fig15\_capability\_flow.png — Demand vs capability scatter



\*\*Processed data (data/processed/ folder)\*\*

\- top\_skills\_demand.csv

\- jobs\_exploded.csv

\- jds\_results.csv

\- sds\_results.csv

\- capability\_flow.csv



\### Key Findings



\*\*Market Demand (n=15,841 postings):\*\* Data Analysis (11.4%), SQL (8.2%), Python (5.3%), Business Analysis (5.0%), Finance (4.8%), SAS (4.0%).



\*\*JDS Skill to Salary-Hike Outcome (n=139):\*\* Dashboard/Storytelling (d=1.32), Maths/Stats (d=1.22), Coding (d=0.98), AI/ML (d=0.88) strongly differentiate high vs low salary-hike groups. Big Data (d=0.22) does not.



\*\*SDS Personality to Success (n=161):\*\* Conscientiousness (d=1.85), Openness (d=1.80), Extraversion (d=1.13) predict success. Neuroticism has no measurable effect (d=-0.01, p=0.94).



\*\*Capability Flow:\*\* Dashboard/Storytelling and Maths/Stats show the strongest alignment between high capability and high market demand. Big Data shows a capability gap relative to peer skill areas.



\### See Also



\- EVAL.md — full statistical results and limitations

\- Capability Flow Report.docx — narrative report with all 15 figures



\---



\## Full Pipeline (All Scripts)



&#x20;   # ESCO graph (original)

&#x20;   python src\\clean.py

&#x20;   python src\\build\_graph.py



&#x20;   # Capability Flow analytics (Round 2)

&#x20;   python src\\analyze\_jobs.py

&#x20;   python src\\analyze\_jds.py

&#x20;   python src\\analyze\_sds.py

&#x20;   python src\\capability\_flow.py



\## Streamlit Demo



&#x20;   streamlit run app.py



Currently shows ESCO Role Explorer. Optionally extend with Market Demand and Capability Flow tabs.

