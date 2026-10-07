\# Evaluation — Capability Flow Analytics



\## Summary



This repository contains the reproducible computational workflow behind the

\*\*Capability Flow Report\*\*. Every figure cited in the report is generated

from raw data by a script in `src/`. No numbers were hardcoded.



\## Datasets Used



| File | Rows | Purpose |

|------|------|---------|

| `data/raw/analytics\_jobs.csv` | 15,841 | Market demand signal (skills in job postings) |

| `data/raw/jds\_skill\_traits.xlsx` | 139 | Job-description skill traits vs salary outcome |

| `data/raw/sds\_personality\_traits.xlsx` | 161 | Personality traits vs success outcome |

| `data/raw/occupations\_en.csv` | 3,039 | ESCO occupations |

| `data/raw/skills\_en.csv` | 13,939 | ESCO skills |

| `data/raw/occupationSkillRelations\_en.csv` | 129k | ESCO role-skill edges |



\## Reproducibility



Run the scripts in order:



```cmd

python src\\analyze\_jobs.py       # Figure 6

python src\\analyze\_jds.py        # Figures 11, 12

python src\\analyze\_sds.py        # Figures 13, 14

python src\\capability\_flow.py    # Figure 15

