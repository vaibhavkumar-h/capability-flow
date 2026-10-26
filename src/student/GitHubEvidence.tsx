import { useEffect, useMemo, useState } from "react";

/* =========================================================
   TYPES
========================================================= */

type Repository = {
  name: string;
  description: string | null;
  language: string | null;
  html_url: string;
  stars: number;
  forks: number;
  pushed_at: string;
  topics: string[];
};

type GithubResult = {
  success: boolean;
  username: string;
  profile: {
    username: string;
    name: string | null;
    bio: string | null;
    profile_url: string;
    public_repositories: number;
    followers: number;
    following: number;
  };
  repository_count: number;
  languages: {
    name: string;
    bytes: number;
  }[];
  repositories: Repository[];
  evidence_source?: string;
};

type LeetCodeResult = {
  success: boolean;
  username: string;

  profile?: {
    real_name?: string;
    ranking?: number;
    reputation?: number;
  };

  solved: {
    all: number;
    easy: number;
    medium: number;
    hard: number;
  };

  languages: {
    language: string;
    problems_solved: number;
    evidence?: string;
  }[];

  topics: {
    topic: string;
    level: string;
    problems_solved: number;
  }[];

  evidence_source?: string;
};

type EvidenceStatus =
  | "SUPPORTED"
  | "PARTIAL"
  | "UNVERIFIED"
  | "NOT_CLAIMED";

type SkillEvidence = {
  skill: string;
  category: "TECHNOLOGY" | "ALGORITHM" | "CONCEPT";
  resume: boolean;
  github: boolean;
  leetcode: boolean;
  linkedin: boolean;

  githubRepos: string[];

  leetcodeSolved: number;
  leetcodeTopics: string[];

  status: EvidenceStatus;
};

type Role = {
  name: string;
  description: string;
  skills: string[];
};

/* =========================================================
   NORMALIZED TECHNOLOGY SKILLS
========================================================= */

const SKILL_ALIASES: Record<string, string[]> = {
  Python: ["python"],
  "C++": ["c++", "cpp"],
  C: ["c programming"],
  Java: ["java"],
  JavaScript: ["javascript", "js"],
  TypeScript: ["typescript", "ts"],
  HTML: ["html"],
  CSS: ["css"],
  SQL: ["sql"],
  React: ["react", "react.js", "reactjs"],
  Node: ["node", "node.js", "nodejs"],
  Git: ["git"],
  GitHub: ["github"],
  Streamlit: ["streamlit"],
  Azure: ["azure"],
  "Machine Learning": [
    "machine learning",
    "machine-learning",
  ],
  NLP: [
    "nlp",
    "natural language processing",
  ],
  DSA: [
    "dsa",
    "data structures",
    "algorithms",
  ],
  Docker: ["docker"],
  FastAPI: ["fastapi"],
  Pandas: ["pandas"],
  NumPy: ["numpy"],
  PyTorch: ["pytorch"],
  TensorFlow: ["tensorflow"],
  "Data Analysis": [
    "data analysis",
    "data analytics",
  ],
};

/* =========================================================
   LEETCODE TOPIC NORMALIZATION
========================================================= */

const LEETCODE_TOPIC_ALIASES: Record<
  string,
  string[]
> = {
  Arrays: ["array", "arrays"],
  Strings: ["string", "strings"],
  "Hash Table": [
    "hash table",
    "hash tables",
  ],
  Sorting: ["sorting", "sort"],
  "Binary Search": ["binary search"],
  "Two Pointers": ["two pointers"],
  "Linked List": ["linked list"],
  Tree: ["tree", "trees"],
  "Binary Tree": ["binary tree"],
  Recursion: ["recursion"],
  "Sliding Window": ["sliding window"],
  "Bit Manipulation": [
    "bit manipulation",
  ],
  Math: ["math"],
  Greedy: ["greedy"],
  "Dynamic Programming": [
    "dynamic programming",
    "dp",
  ],
  Backtracking: ["backtracking"],
  "Divide and Conquer": [
    "divide and conquer",
  ],
  "Union Find": [
    "union-find",
    "union find",
  ],
  Stack: ["stack", "stacks"],
  Queue: ["queue", "queues"],
  Simulation: ["simulation"],
  Enumeration: ["enumeration"],
  Graph: ["graph", "graphs"],
  "Depth First Search": [
    "depth-first search",
    "depth first search",
  ],
  "Breadth First Search": [
    "breadth-first search",
    "breadth first search",
  ],
};

/* =========================================================
   ROLES
========================================================= */

const ROLES: Role[] = [
  { name: "Software Engineer", description: "Build software applications, APIs and production systems.", skills: ["Python", "C++", "Java", "JavaScript", "SQL", "Git", "GitHub", "DSA"] },
  { name: "Backend Developer", description: "Build APIs, services, databases and backend systems.", skills: ["Python", "Java", "Node", "SQL", "Git", "GitHub", "FastAPI", "Docker"] },
  { name: "Frontend Developer", description: "Build responsive and interactive web interfaces.", skills: ["HTML", "CSS", "JavaScript", "TypeScript", "React", "Git", "GitHub"] },
  { name: "Full Stack Developer", description: "Build complete web applications across frontend and backend.", skills: ["HTML", "CSS", "JavaScript", "TypeScript", "React", "Node", "SQL", "Git"] },
  { name: "Mobile App Developer", description: "Develop mobile applications and mobile-first experiences.", skills: ["Java", "JavaScript", "TypeScript", "Git", "GitHub"] },
  { name: "Software Developer", description: "Design, develop and maintain software solutions.", skills: ["Python", "C++", "Java", "JavaScript", "SQL", "Git", "DSA"] },
  { name: "Software Architect", description: "Design scalable software architecture and technical systems.", skills: ["Python", "Java", "C++", "SQL", "Git", "Docker", "FastAPI"] },
  { name: "Systems Engineer", description: "Build and maintain reliable computing and software systems.", skills: ["C++", "Python", "Java", "Git", "Docker", "SQL"] },
  { name: "AI Engineer", description: "Develop AI-powered applications and intelligent systems.", skills: ["Python", "Machine Learning", "NLP", "Git", "FastAPI", "Docker", "PyTorch"] },
  { name: "Machine Learning Engineer", description: "Build, evaluate and deploy machine-learning systems.", skills: ["Python", "Machine Learning", "SQL", "Git", "FastAPI", "Docker", "NLP"] },
  { name: "Data Scientist", description: "Analyze data and develop statistical and machine-learning solutions.", skills: ["Python", "SQL", "Machine Learning", "NLP", "Git", "Pandas", "NumPy"] },
  { name: "Deep Learning Engineer", description: "Develop neural-network and deep-learning systems.", skills: ["Python", "Machine Learning", "PyTorch", "TensorFlow", "NumPy", "Git"] },
  { name: "NLP Engineer", description: "Build natural-language processing and language AI systems.", skills: ["Python", "NLP", "Machine Learning", "PyTorch", "Git", "FastAPI"] },
  { name: "Computer Vision Engineer", description: "Build computer-vision and image-understanding systems.", skills: ["Python", "Machine Learning", "PyTorch", "TensorFlow", "NumPy", "Git"] },
  { name: "Generative AI Engineer", description: "Build applications using generative AI and modern ML systems.", skills: ["Python", "Machine Learning", "NLP", "PyTorch", "FastAPI", "Docker", "Git"] },
  { name: "LLM Engineer", description: "Develop and integrate large-language-model applications.", skills: ["Python", "NLP", "Machine Learning", "FastAPI", "Docker", "Git"] },
  { name: "AI Agent Engineer", description: "Build agentic AI workflows and tool-using intelligent systems.", skills: ["Python", "Machine Learning", "NLP", "FastAPI", "Docker", "Git"] },
  { name: "MLOps Engineer", description: "Operationalize machine-learning systems and deployment pipelines.", skills: ["Python", "Machine Learning", "Docker", "Git", "FastAPI", "Azure"] },
  { name: "AI Research Engineer", description: "Prototype and evaluate new AI and machine-learning methods.", skills: ["Python", "Machine Learning", "PyTorch", "TensorFlow", "NumPy", "Git"] },
  { name: "Data Analyst", description: "Transform data into insights, reports and decisions.", skills: ["Python", "SQL", "Git", "Pandas", "NumPy", "Data Analysis"] },
  { name: "Data Engineer", description: "Build data pipelines, processing systems and data platforms.", skills: ["Python", "SQL", "Git", "Docker", "Pandas", "NumPy"] },
  { name: "Analytics Engineer", description: "Transform raw data into reliable analytical models.", skills: ["Python", "SQL", "Git", "Data Analysis", "Pandas"] },
  { name: "BI Developer", description: "Build business-intelligence models, dashboards and reporting systems.", skills: ["SQL", "Python", "Data Analysis", "Git"] },
  { name: "Database Engineer", description: "Design, optimize and maintain database systems.", skills: ["SQL", "Python", "Java", "Git", "Docker"] },
  { name: "Database Administrator", description: "Operate, secure and optimize database environments.", skills: ["SQL", "Python", "Git", "Docker"] },
  { name: "Data Architect", description: "Design enterprise data architecture and data platforms.", skills: ["SQL", "Python", "Git", "Docker", "Data Analysis"] },
  { name: "Cybersecurity Engineer", description: "Build and maintain security controls and defensive systems.", skills: ["Python", "C++", "Git", "Docker", "Azure"] },
  { name: "Cybersecurity Analyst", description: "Analyze security events, vulnerabilities and threats.", skills: ["Python", "SQL", "Git", "Azure"] },
  { name: "SOC Analyst", description: "Monitor security events and investigate potential incidents.", skills: ["Python", "SQL", "Git", "Azure"] },
  { name: "Penetration Tester / Ethical Hacker", description: "Assess applications and systems for security weaknesses.", skills: ["Python", "C++", "Git"] },
  { name: "Security Engineer", description: "Design and implement technical security solutions.", skills: ["Python", "C++", "Git", "Docker", "Azure"] },
  { name: "Security Architect", description: "Design secure architectures, controls and technical standards.", skills: ["Python", "Git", "Docker", "Azure"] },
  { name: "Application Security Engineer", description: "Embed security practices into software development.", skills: ["Python", "Java", "JavaScript", "Git", "Docker"] },
  { name: "Cloud Security Engineer", description: "Secure cloud infrastructure, workloads and services.", skills: ["Python", "Docker", "Git", "Azure"] },
  { name: "Digital Forensics Analyst", description: "Investigate digital evidence and security incidents.", skills: ["Python", "SQL", "Git"] },
  { name: "Threat Intelligence Analyst", description: "Analyze threat information to identify security risks.", skills: ["Python", "SQL", "Git", "Data Analysis"] },
  { name: "Cloud Engineer", description: "Build and operate cloud infrastructure and services.", skills: ["Python", "Docker", "Git", "Azure", "SQL"] },
  { name: "Cloud Architect", description: "Design scalable and resilient cloud architectures.", skills: ["Python", "Docker", "Git", "Azure", "SQL"] },
  { name: "DevOps Engineer", description: "Automate software delivery, infrastructure and operations.", skills: ["Python", "Docker", "Git", "Azure", "FastAPI"] },
  { name: "DevSecOps Engineer", description: "Integrate security into development and operations workflows.", skills: ["Python", "Docker", "Git", "Azure", "FastAPI"] },
  { name: "Site Reliability Engineer (SRE)", description: "Improve reliability, observability and production operations.", skills: ["Python", "Docker", "Git", "Azure"] },
  { name: "Platform Engineer", description: "Build internal platforms and developer infrastructure.", skills: ["Python", "Docker", "Git", "Azure", "FastAPI"] },
  { name: "Network Engineer", description: "Design, operate and troubleshoot computer networks.", skills: ["Python", "Git", "C++"] },
  { name: "Network Architect", description: "Design scalable and secure network architectures.", skills: ["Python", "Git", "C++"] },
  { name: "Network Administrator", description: "Maintain and troubleshoot network infrastructure.", skills: ["Python", "Git"] },
  { name: "QA Engineer", description: "Validate software quality through structured testing.", skills: ["Python", "Java", "JavaScript", "Git", "SQL"] },
  { name: "Automation Test Engineer", description: "Automate software testing and quality workflows.", skills: ["Python", "Java", "JavaScript", "Git", "SQL"] },
  { name: "SDET", description: "Combine software engineering with automated testing.", skills: ["Python", "Java", "JavaScript", "Git", "SQL", "DSA"] },
  { name: "Computer Research Scientist", description: "Research algorithms, computing methods and intelligent systems.", skills: ["Python", "C++", "Machine Learning", "DSA", "NumPy", "Git"] },
  { name: "Robotics / Autonomous Systems Engineer", description: "Develop software and intelligence for robotic systems.", skills: ["Python", "C++", "Machine Learning", "Git", "NumPy"] },
];

/* =========================================================
   HELPERS
========================================================= */

function normalize(value: string) {
  return value.toLowerCase().trim();
}

function hasAlias(
  text: string,
  aliases: string[]
) {
  const lower = normalize(text);

  return aliases.some((alias) => {
    const a = normalize(alias);

    if (a.length <= 2) {
      const escaped = a.replace(
        /[.*+?^${}()|[\]\\]/g,
        "\\$&"
      );

      return new RegExp(
        `(^|[^a-z0-9])${escaped}([^a-z0-9]|$)`,
        "i"
      ).test(text);
    }

    return lower.includes(a);
  });
}

function extractUsername(
  value: string,
  domain: string
) {
  const input = value.trim();

  if (!input) return "";

  if (!input.toLowerCase().includes(domain)) {
    return input
      .replace(/^@/, "")
      .replace(/\/+$/, "");
  }

  try {
    const url = new URL(
      input.startsWith("http")
        ? input
        : `https://${input}`
    );

    const parts = url.pathname
      .split("/")
      .filter(Boolean);

    if (domain === "leetcode.com") {
      const index = parts.findIndex(
        (part) =>
          part.toLowerCase() === "u"
      );

      return index >= 0
        ? parts[index + 1] || ""
        : parts[0] || "";
    }

    return parts[0] || "";
  } catch {
    return "";
  }
}

/* =========================================================
   STATUS ENGINE
========================================================= */

function calculateStatus(
  resume: boolean,
  github: boolean,
  leetcode: boolean
): EvidenceStatus {
  const observed =
    Number(github) + Number(leetcode);

  if (resume && observed >= 1) {
    return "SUPPORTED";
  }

  if (!resume && observed >= 2) {
    return "SUPPORTED";
  }

  if (observed === 1) {
    return "PARTIAL";
  }

  if (resume) {
    return "UNVERIFIED";
  }

  return "NOT_CLAIMED";
}

/* =========================================================
   MAIN
========================================================= */

export default function GitHubEvidence() {
  const [githubUsername, setGithubUsername] =
    useState("");

  const [leetcodeUsername, setLeetcodeUsername] =
    useState("");

  const [github, setGithub] =
    useState<GithubResult | null>(null);

  const [leetcode, setLeetcode] =
    useState<LeetCodeResult | null>(null);

  const [resumeText, setResumeText] =
    useState("");

  const [linkedinUrl, setLinkedinUrl] =
    useState("");

  const [githubLoading, setGithubLoading] =
    useState(false);

  const [leetcodeLoading, setLeetcodeLoading] =
    useState(false);

  const [refreshing, setRefreshing] =
    useState(false);

  const [error, setError] = useState("");

  const [targetRole, setTargetRole] =
    useState(
      "Machine Learning Engineer"
    );

  /* =========================================================
     GITHUB FETCH
  ========================================================= */

  const fetchGithub = async (
    username: string
  ) => {
    if (!username) return;

    setGithubLoading(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL || "http://127.0.0.1:8000"}/api/github/analyze/${encodeURIComponent(
          username
        )}`
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.error ||
            "GitHub analysis failed."
        );
      }

      setGithub(data);

      localStorage.setItem(
        "capabilityflow_github_username",
        username
      );

      localStorage.setItem(
        "capabilityflow_github_data",
        JSON.stringify(data)
      );
    } catch (err) {
      setError(
        err instanceof Error
          ? `GitHub: ${err.message}`
          : "Unable to analyze GitHub."
      );
    } finally {
      setGithubLoading(false);
    }
  };

  /* =========================================================
     LEETCODE FETCH
  ========================================================= */

  const fetchLeetcode = async (
    username: string
  ) => {
    if (!username) return;

    setLeetcodeLoading(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL || "http://127.0.0.1:8000"}/api/leetcode/analyze/${encodeURIComponent(
          username
        )}`
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.error ||
            "LeetCode analysis failed."
        );
      }

      setLeetcode(data);

      localStorage.setItem(
        "capabilityflow_leetcode_username",
        username
      );

      localStorage.setItem(
        "capabilityflow_leetcode_data",
        JSON.stringify(data)
      );
    } catch (err) {
      setError(
        err instanceof Error
          ? `LeetCode: ${err.message}`
          : "Unable to analyze LeetCode."
      );
    } finally {
      setLeetcodeLoading(false);
    }
  };

  /* =========================================================
     LOAD PROFILE + AUTO ANALYZE
  ========================================================= */

  useEffect(() => {
    const savedResume =
      localStorage.getItem(
        "capabilityflow_resume_text"
      ) || "";

    setResumeText(savedResume);

    let githubUser = "";
    let leetcodeUser = "";

    try {
      const links = JSON.parse(
        localStorage.getItem(
          "capabilityflow_profile_links"
        ) || "{}"
      );

      githubUser = extractUsername(
        links.github || "",
        "github.com"
      );

      leetcodeUser = extractUsername(
        links.leetcode || "",
        "leetcode.com"
      );

      if (links.linkedin) {
        setLinkedinUrl(
          links.linkedin
        );
      }
    } catch {
      // Ignore malformed local storage.
    }

    const savedGithubUser =
      localStorage.getItem(
        "capabilityflow_github_username"
      ) || "";

    const savedLeetcodeUser =
      localStorage.getItem(
        "capabilityflow_leetcode_username"
      ) || "";

    if (!githubUser) {
      githubUser = savedGithubUser;
    }

    if (!leetcodeUser) {
      leetcodeUser =
        savedLeetcodeUser;
    }

    if (githubUser) {
      setGithubUsername(githubUser);

      /*
       * Automatically fetch fresh GitHub evidence.
       */
      fetchGithub(githubUser);
    }

    if (leetcodeUser) {
      setLeetcodeUsername(
        leetcodeUser
      );

      /*
       * Automatically fetch fresh
       * LeetCode evidence.
       */
      fetchLeetcode(
        leetcodeUser
      );
    }

    /*
     * Restore cached data immediately
     * while fresh data loads.
     */

    const cachedGithub =
      localStorage.getItem(
        "capabilityflow_github_data"
      );

    if (cachedGithub) {
      try {
        setGithub(
          JSON.parse(cachedGithub)
        );
      } catch {}
    }

    const cachedLeetcode =
      localStorage.getItem(
        "capabilityflow_leetcode_data"
      );

    if (cachedLeetcode) {
      try {
        setLeetcode(
          JSON.parse(cachedLeetcode)
        );
      } catch {}
    }
  }, []);

  /* =========================================================
     MANUAL REFRESH
  ========================================================= */

  const refreshEvidence = async () => {
    setRefreshing(true);
    setError("");

    await Promise.all([
      githubUsername
        ? fetchGithub(
            githubUsername
          )
        : Promise.resolve(),

      leetcodeUsername
        ? fetchLeetcode(
            leetcodeUsername
          )
        : Promise.resolve(),
    ]);

    setRefreshing(false);
  };

  /* =========================================================
     UNIFIED TECHNOLOGY EVIDENCE
  ========================================================= */

  const technologyEvidence =
    useMemo<SkillEvidence[]>(() => {
      return Object.keys(
        SKILL_ALIASES
      ).map((skill) => {
        const aliases =
          SKILL_ALIASES[skill];

        /* Resume */

        const resume =
          hasAlias(
            resumeText,
            aliases
          );

        /* GitHub */

        const matchingRepos =
          github?.repositories?.filter(
            (repo) => {
              const repoText = [
                repo.name,
                repo.description || "",
                repo.language || "",
                ...(repo.topics || []),
              ].join(" ");

              return hasAlias(
                repoText,
                aliases
              );
            }
          ) || [];

        const githubLanguages =
          github?.languages?.map(
            (x) =>
              normalize(x.name)
          ) || [];

        const githubEvidence =
          githubLanguages.some(
            (language) =>
              aliases.some(
                (alias) =>
                  normalize(alias) ===
                  language
              )
          ) ||
          matchingRepos.length > 0;

        /* LeetCode */

        let leetcodeSolved = 0;

        if (leetcode) {
          leetcodeSolved =
            leetcode.languages
              .filter((item) =>
                hasAlias(
                  item.language,
                  aliases
                )
              )
              .reduce(
                (
                  total,
                  item
                ) =>
                  total +
                  Number(
                    item.problems_solved ||
                      0
                  ),
                0
              );

          if (
            skill === "DSA"
          ) {
            leetcodeSolved =
              leetcode.solved.all;
          }
        }

        const leetcodeEvidence =
          leetcodeSolved > 0;

        return {
          skill,
          category:
            skill === "DSA"
              ? "CONCEPT"
              : "TECHNOLOGY",

          resume,
          github:
            githubEvidence,
          leetcode:
            leetcodeEvidence,

          linkedin:
            Boolean(linkedinUrl),

          githubRepos:
            matchingRepos.map(
              (repo) =>
                repo.name
            ),

          leetcodeSolved,

          leetcodeTopics: [],

          status:
            calculateStatus(
              resume,
              githubEvidence,
              leetcodeEvidence
            ),
        };
      });
    }, [
      resumeText,
      github,
      leetcode,
      linkedinUrl,
    ]);

  /* =========================================================
     DYNAMIC LEETCODE TOPIC EVIDENCE
  ========================================================= */

  const topicEvidence =
    useMemo<SkillEvidence[]>(() => {
      if (!leetcode) return [];

      return Object.entries(
        LEETCODE_TOPIC_ALIASES
      )
        .map(
          ([skill, aliases]) => {
            const matching =
              leetcode.topics.filter(
                (topic) =>
                  hasAlias(
                    topic.topic,
                    aliases
                  )
              );

            const solved =
              matching.reduce(
                (
                  total,
                  topic
                ) =>
                  total +
                  Number(
                    topic.problems_solved ||
                      0
                  ),
                0
              );

            if (solved <= 0) {
              return null;
            }

            const resume =
              hasAlias(
                resumeText,
                aliases
              );

            return {
              skill,
              category:
                "ALGORITHM" as const,

              resume,

              github: false,

              leetcode: true,

              linkedin:
                Boolean(
                  linkedinUrl
                ),

              githubRepos: [],

              leetcodeSolved:
                solved,

              leetcodeTopics:
                matching.map(
                  (topic) =>
                    `${topic.topic} (${topic.problems_solved})`
                ),

              status:
                calculateStatus(
                  resume,
                  false,
                  true
                ),
            };
          }
        )
        .filter((item) => item !== null) as SkillEvidence[];
    }, [
      leetcode,
      resumeText,
      linkedinUrl,
    ]);

  /* =========================================================
     MERGED EVIDENCE
  ========================================================= */

  const evidence = useMemo(() => {
    const combined = [
      ...technologyEvidence,
      ...topicEvidence,
    ];

    /*
     * Sort:
     * 1. Supported
     * 2. Partial
     * 3. Unverified
     * 4. Not claimed
     */

    const order: Record<
      EvidenceStatus,
      number
    > = {
      SUPPORTED: 1,
      PARTIAL: 2,
      UNVERIFIED: 3,
      NOT_CLAIMED: 4,
    };

    return combined.sort(
      (a, b) =>
        order[a.status] -
        order[b.status]
    );
  }, [
    technologyEvidence,
    topicEvidence,
  ]);

  /* =========================================================
     ROLE
  ========================================================= */

  const selectedRole =
    ROLES.find(
      (role) =>
        role.name ===
        targetRole
    ) || ROLES[0];

  const roleEvidence =
    selectedRole.skills.map(
      (skill) =>
        evidence.find(
          (item) =>
            item.skill === skill
        ) || {
          skill,
          category:
            "TECHNOLOGY" as const,
          resume: false,
          github: false,
          leetcode: false,
          linkedin: Boolean(
            linkedinUrl
          ),
          githubRepos: [],
          leetcodeSolved: 0,
          leetcodeTopics: [],
          status:
            "NOT_CLAIMED" as EvidenceStatus,
        }
    );

  const readinessScore =
    useMemo(() => {
      if (
        !roleEvidence.length
      ) {
        return 0;
      }

      const scores: Record<
        EvidenceStatus,
        number
      > = {
        SUPPORTED: 1,
        PARTIAL: 0.5,
        UNVERIFIED: 0,
        NOT_CLAIMED: 0,
      };

      const total =
        roleEvidence.reduce(
          (
            sum,
            item
          ) =>
            sum +
            scores[
              item.status
            ],
          0
        );

      return Math.round(
        (total /
          roleEvidence.length) *
          100
      );
    }, [
      roleEvidence,
    ]);

  const supportedCount =
    evidence.filter(
      (item) =>
        item.status ===
        "SUPPORTED"
    ).length;

  const observedCount =
    evidence.filter(
      (item) =>
        item.github ||
        item.leetcode
    ).length;

  const gapCount =
    roleEvidence.filter(
      (item) =>
        item.status ===
          "UNVERIFIED" ||
        item.status ===
          "NOT_CLAIMED"
    ).length;

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <div className="cf-page">

      <style>{`

        * {
          box-sizing: border-box;
        }

        .cf-page {
          min-height: 100vh;
          background: #08090b;
          color: #f4f5f7;
          font-family:
            Inter,
            system-ui,
            sans-serif;
          padding: 45px 5%;
        }

        .cf-container {
          max-width: 1350px;
          margin: auto;
        }

        .cf-eyebrow {
          color: #737b89;
          font-size: 10px;
          letter-spacing: 2px;
          font-weight: 700;
          margin-bottom: 10px;
        }

        .cf-title {
          font-size: 44px;
          line-height: 1.05;
          margin: 0;
          letter-spacing: -2px;
        }

        .cf-subtitle {
          color: #858b97;
          max-width: 850px;
          line-height: 1.7;
          margin-top: 16px;
          font-size: 14px;
        }

        .cf-card {
          background: #0d0f13;
          border:
            1px solid #242832;
          border-radius: 18px;
          padding: 24px;
        }

        .cf-section {
          margin-top: 22px;
        }

        .cf-section-title {
          font-size: 19px;
          font-weight: 700;
          margin-bottom: 15px;
        }

        .source-grid {
          display: grid;
          grid-template-columns:
            repeat(3, 1fr);
          gap: 14px;
        }

        .source-card {
          background: #090b0e;
          border:
            1px solid #242832;
          border-radius: 14px;
          padding: 18px;
        }

        .source-title {
          font-size: 14px;
          font-weight: 700;
          margin-bottom: 12px;
        }

        .source-status {
          color: #6ee7a8;
          font-size: 11px;
          margin-bottom: 13px;
        }

        .cf-input-row {
          display: flex;
          gap: 10px;
        }

        .cf-input {
          width: 100%;
          flex: 1;
          background: #080a0d;
          color: white;
          border:
            1px solid #303540;
          border-radius: 9px;
          padding: 12px;
          outline: none;
          font-size: 12px;
        }

        .cf-input:focus {
          border-color: #6f7785;
        }

        .cf-button {
          background: #f2f4f7;
          color: #08090b;
          border: none;
          border-radius: 9px;
          padding:
            11px 15px;
          font-weight: 700;
          font-size: 11px;
          cursor: pointer;
          white-space: nowrap;
        }

        .cf-button:hover {
          opacity: .88;
        }

        .cf-button:disabled {
          opacity: .5;
          cursor: not-allowed;
        }

        .refresh-button {
          background: transparent;
          color: #c7ccd5;
          border:
            1px solid #303540;
        }

        .refresh-row {
          display: flex;
          justify-content:
            space-between;
          align-items: center;
          gap: 15px;
        }

        .metric-grid {
          display: grid;
          grid-template-columns:
            repeat(5, 1fr);
          gap: 12px;
        }

        .metric {
          background: #0d0f13;
          border:
            1px solid #242832;
          border-radius: 15px;
          padding: 19px;
        }

        .metric-label {
          color: #69717e;
          font-size: 9px;
          letter-spacing: 1.1px;
        }

        .metric-value {
          font-size: 28px;
          font-weight: 800;
          margin-top: 7px;
        }

        .metric-description {
          color: #505763;
          font-size: 10px;
          margin-top: 5px;
        }

        .evidence-header {
          display: flex;
          justify-content:
            space-between;
          align-items: flex-start;
          gap: 20px;
          margin-bottom: 15px;
        }

        .table-wrap {
          overflow-x: auto;
          border:
            1px solid #1e222a;
          border-radius: 12px;
        }

        .evidence-table {
          width: 100%;
          min-width: 1120px;
          border-collapse:
            collapse;
        }

        .evidence-table th {
          text-align: left;
          padding: 13px;
          color: #69717e;
          font-size: 9px;
          letter-spacing: 1px;
          background: #0a0c10;
          border-bottom:
            1px solid #242832;
        }

        .evidence-table td {
          padding: 14px 13px;
          font-size: 12px;
          border-bottom:
            1px solid #191c22;
          vertical-align: top;
        }

        .evidence-table tr:hover {
          background: #101217;
        }

        .skill-name {
          font-weight: 700;
          font-size: 13px;
        }

        .skill-type {
          color: #565e6b;
          font-size: 9px;
          margin-top: 4px;
          text-transform:
            uppercase;
          letter-spacing: .7px;
        }

        .yes {
          color: #6ee7a8;
          font-weight: 700;
        }

        .no {
          color: #454c57;
        }

        .detail {
          color: #8f97a4;
          font-size: 10px;
          line-height: 1.5;
          margin-top: 3px;
        }

        .badge {
          display: inline-block;
          padding:
            6px 9px;
          border-radius: 20px;
          font-size: 8px;
          font-weight: 800;
          letter-spacing: .4px;
          white-space: nowrap;
        }

        .supported {
          background: #123d2a;
          color: #6ee7a8;
        }

        .partial {
          background: #3d3412;
          color: #f2d46d;
        }

        .unverified {
          background: #3d2516;
          color: #f1a66d;
        }

        .notclaimed {
          background: #172b3d;
          color: #73bdf5;
        }

        .chips {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .chip {
          background: #151922;
          border:
            1px solid #292e38;
          color: #b9c0ca;
          padding:
            7px 10px;
          border-radius: 20px;
          font-size: 10px;
        }

        .chip strong {
          color: white;
        }

        .role-grid {
          display: grid;
          grid-template-columns:
            1fr 1fr;
          gap: 18px;
        }

        .select {
          width: 100%;
          background: #080a0d;
          color: white;
          border:
            1px solid #303540;
          border-radius: 9px;
          padding: 12px;
        }

        .progress {
          height: 9px;
          background: #1b1e25;
          border-radius: 20px;
          overflow: hidden;
          margin-top: 15px;
        }

        .progress-bar {
          height: 100%;
          background: #e9edf3;
          border-radius: 20px;
          transition:
            width .5s ease;
        }

        .role-item {
          display: flex;
          justify-content:
            space-between;
          align-items: center;
          gap: 15px;
          padding: 15px 0;
          border-bottom:
            1px solid #1b1e25;
        }

        .repo {
          display: block;
          color: inherit;
          text-decoration: none;
          padding: 15px 0;
          border-bottom:
            1px solid #191c22;
        }

        .repo:hover {
          background: #101217;
        }

        .error {
          color: #ff8f99;
          background: #241417;
          border:
            1px solid #47232a;
          padding: 12px;
          border-radius: 9px;
          margin-top: 12px;
          font-size: 11px;
        }

        .success-note {
          color: #6ee7a8;
          font-size: 10px;
        }

        .muted {
          color: #69717e;
          font-size: 11px;
          line-height: 1.6;
        }

        @media(max-width: 950px) {

          .source-grid {
            grid-template-columns: 1fr;
          }

          .metric-grid {
            grid-template-columns:
              repeat(2, 1fr);
          }

          .role-grid {
            grid-template-columns: 1fr;
          }
        }

        @media(max-width: 600px) {

          .cf-page {
            padding: 30px 4%;
          }

          .cf-title {
            font-size: 34px;
          }

          .cf-input-row {
            flex-direction: column;
          }

          .metric-grid {
            grid-template-columns: 1fr;
          }

          .refresh-row {
            align-items: flex-start;
            flex-direction: column;
          }
        }

      `}</style>

      <div className="cf-container">

        {/* =====================================================
            HEADER
        ===================================================== */}

        <div className="cf-eyebrow">
          CAPABILITYFLOW / EVIDENCE INTELLIGENCE
        </div>

        <h1 className="cf-title">
          From claims to capability.
        </h1>

        <p className="cf-subtitle">
          CapabilityFlow fuses Resume claims,
          GitHub activity and LeetCode problem-solving
          evidence into a transparent capability profile.
          Evidence is shown with provenance instead of
          pretending that a single source proves mastery.
        </p>

        {/* =====================================================
            SOURCES
        ===================================================== */}

        <div className="cf-card cf-section">

          <div className="refresh-row">

            <div>
              <div className="cf-eyebrow">
                CONNECTED EVIDENCE
              </div>

              <div
                style={{
                  fontSize: 18,
                  fontWeight: 700,
                }}
              >
                Evidence Sources
              </div>
            </div>

            <button
              className="cf-button refresh-button"
              onClick={refreshEvidence}
              disabled={refreshing}
            >
              {refreshing
                ? "Refreshing..."
                : "↻ Refresh Evidence"}
            </button>

          </div>

          <div className="source-grid cf-section">

            {/* RESUME */}

            <div className="source-card">

              <div className="source-title">
                Resume
              </div>

              <div className="source-status">
                {resumeText
                  ? "● Loaded"
                  : "○ Not uploaded"}
              </div>

              <div className="muted">
                Claims extracted from the
                uploaded resume.
              </div>

            </div>

            {/* GITHUB */}

            <div className="source-card">

              <div className="source-title">
                GitHub
              </div>

              <div className="source-status">
                {github
                  ? "● Connected"
                  : "○ Not analyzed"}
              </div>

              <div className="cf-input-row">

                <input
                  className="cf-input"
                  placeholder="GitHub username"
                  value={
                    githubUsername
                  }
                  onChange={(e) =>
                    setGithubUsername(
                      e.target.value
                    )
                  }
                />

                <button
                  className="cf-button"
                  onClick={() =>
                    fetchGithub(
                      extractUsername(
                        githubUsername,
                        "github.com"
                      )
                    )
                  }
                  disabled={
                    githubLoading
                  }
                >
                  {githubLoading
                    ? "..."
                    : "Scan"}
                </button>

              </div>

            </div>

            {/* LEETCODE */}

            <div className="source-card">

              <div className="source-title">
                LeetCode
              </div>

              <div className="source-status">
                {leetcode
                  ? "● Connected"
                  : "○ Not analyzed"}
              </div>

              <div className="cf-input-row">

                <input
                  className="cf-input"
                  placeholder="LeetCode username"
                  value={
                    leetcodeUsername
                  }
                  onChange={(e) =>
                    setLeetcodeUsername(
                      e.target.value
                    )
                  }
                />

                <button
                  className="cf-button"
                  onClick={() =>
                    fetchLeetcode(
                      extractUsername(
                        leetcodeUsername,
                        "leetcode.com"
                      )
                    )
                  }
                  disabled={
                    leetcodeLoading
                  }
                >
                  {leetcodeLoading
                    ? "..."
                    : "Scan"}
                </button>

              </div>

            </div>

          </div>

          <div className="muted">
            LinkedIn:{" "}
            {linkedinUrl
              ? "Profile URL detected — profile linking only"
              : "No profile URL detected"}
            {" · "}
            LinkedIn skills are not counted until
            official authenticated access is implemented.
          </div>

          {error && (
            <div className="error">
              {error}
            </div>
          )}

        </div>

        {/* =====================================================
            PROFILE METRICS
        ===================================================== */}

        <div className="metric-grid cf-section">

          <Metric
            title="GITHUB REPOSITORIES"
            value={String(
              github?.repository_count ||
                0
            )}
            description="Public repositories analyzed"
          />

          <Metric
            title="LEETCODE SOLVED"
            value={String(
              leetcode?.solved?.all ||
                0
            )}
            description="Accepted problems"
          />

          <Metric
            title="SUPPORTED"
            value={String(
              supportedCount
            )}
            description="Multi-source capability signals"
          />

          <Metric
            title="OBSERVED"
            value={String(
              observedCount
            )}
            description="Independent evidence signals"
          />

          <Metric
            title="ROLE GAPS"
            value={String(
              gapCount
            )}
            description="Evidence gaps for selected role"
          />

        </div>

        {/* =====================================================
            LEETCODE SUMMARY
        ===================================================== */}

        {leetcode && (
          <div className="cf-card cf-section">

            <div className="cf-eyebrow">
              LEETCODE / PROBLEM-SOLVING EVIDENCE
            </div>

            <div className="evidence-header">

              <div>
                <div className="cf-section-title">
                  @{leetcode.username}
                </div>

                <div className="muted">
                  Public profile evidence
                </div>
              </div>

              <div className="success-note">
                ● LIVE DATA
              </div>

            </div>

            <div className="metric-grid">

              <Metric
                title="TOTAL"
                value={String(
                  leetcode.solved.all
                )}
                description="Solved"
              />

              <Metric
                title="EASY"
                value={String(
                  leetcode.solved.easy
                )}
                description="Solved"
              />

              <Metric
                title="MEDIUM"
                value={String(
                  leetcode.solved.medium
                )}
                description="Solved"
              />

              <Metric
                title="HARD"
                value={String(
                  leetcode.solved.hard
                )}
                description="Solved"
              />

              <Metric
                title="LANGUAGES"
                value={String(
                  leetcode.languages.length
                )}
                description="Observed"
              />

            </div>

            <div
              className="cf-section-title"
              style={{
                marginTop: 25,
              }}
            >
              Programming Languages
            </div>

            <div className="chips">

              {leetcode.languages.map(
                (item) => (
                  <div
                    className="chip"
                    key={
                      item.language
                    }
                  >
                    <strong>
                      {item.language}
                    </strong>
                    {" · "}
                    {item.problems_solved}
                    {" solved"}
                  </div>
                )
              )}

            </div>

            <div
              className="cf-section-title"
              style={{
                marginTop: 25,
              }}
            >
              Problem-Solving Topics
            </div>

            <div className="chips">

              {leetcode.topics
                .slice(0, 30)
                .map((topic) => (
                  <div
                    className="chip"
                    key={`${topic.topic}-${topic.level}`}
                  >
                    <strong>
                      {topic.topic}
                    </strong>
                    {" · "}
                    {topic.problems_solved}
                  </div>
                ))}

            </div>

          </div>
        )}

        {/* =====================================================
            GITHUB SUMMARY
        ===================================================== */}

        {github && (
          <div className="cf-card cf-section">

            <div className="evidence-header">

              <div>

                <div className="cf-eyebrow">
                  GITHUB / SOFTWARE EVIDENCE
                </div>

                <div className="cf-section-title">
                  {github.profile.name ||
                    github.profile.username}
                </div>

                <div className="muted">
                  @{github.profile.username}
                  {" · "}
                  {github.profile.followers}
                  {" followers"}
                </div>

              </div>

              <a
                href={
                  github.profile.profile_url
                }
                target="_blank"
                rel="noreferrer"
                className="cf-button"
                style={{
                  textDecoration:
                    "none",
                }}
              >
                View GitHub →
              </a>

            </div>

            <div className="cf-section-title">
              Detected Technologies
            </div>

            <div className="chips">

              {github.languages
                .slice(0, 25)
                .map((language) => (
                  <div
                    className="chip"
                    key={
                      language.name
                    }
                  >
                    {language.name}
                  </div>
                ))}

            </div>

          </div>
        )}

        {/* =====================================================
            MAIN EVIDENCE MATRIX
        ===================================================== */}

        <div className="cf-card cf-section">

          <div className="evidence-header">

            <div>

              <div className="cf-eyebrow">
                MULTI-SOURCE CAPABILITY FUSION
              </div>

              <div className="cf-section-title">
                Capability Evidence Matrix
              </div>

              <div className="muted">
                Each row shows where the capability
                signal came from.
              </div>

            </div>

            <div className="success-note">
              {evidence.length} capabilities
            </div>

          </div>

          <div className="table-wrap">

            <table className="evidence-table">

              <thead>

                <tr>

                  <th>
                    CAPABILITY
                  </th>

                  <th>
                    RESUME
                  </th>

                  <th>
                    GITHUB
                  </th>

                  <th>
                    LEETCODE
                  </th>

                  <th>
                    LINKEDIN
                  </th>

                  <th>
                    EVIDENCE DETAIL
                  </th>

                  <th>
                    STATUS
                  </th>

                </tr>

              </thead>

              <tbody>

                {evidence.map(
                  (item) => (
                    <tr
                      key={
                        `${item.category}-${item.skill}`
                      }
                    >

                      <td>

                        <div className="skill-name">
                          {item.skill}
                        </div>

                        <div className="skill-type">
                          {item.category}
                        </div>

                      </td>

                      <td>

                        {item.resume ? (
                          <span className="yes">
                            ✓ Claimed
                          </span>
                        ) : (
                          <span className="no">
                            —
                          </span>
                        )}

                      </td>

                      <td>

                        {item.github ? (
                          <>
                            <span className="yes">
                              ✓ Observed
                            </span>

                            {item.githubRepos.length >
                              0 && (
                              <div className="detail">
                                {item.githubRepos
                                  .slice(
                                    0,
                                    2
                                  )
                                  .join(
                                    ", "
                                  )}
                              </div>
                            )}
                          </>
                        ) : (
                          <span className="no">
                            —
                          </span>
                        )}

                      </td>

                      <td>

                        {item.leetcode ? (
                          <>
                            <span className="yes">
                              ✓{" "}
                              {
                                item.leetcodeSolved
                              }{" "}
                              solved
                            </span>

                            {item.leetcodeTopics.length >
                              0 && (
                              <div className="detail">
                                {
                                  item.leetcodeTopics[0]
                                }
                              </div>
                            )}
                          </>
                        ) : (
                          <span className="no">
                            —
                          </span>
                        )}

                      </td>

                      <td>

                        {item.linkedin ? (
                          <span className="muted">
                            Linked
                          </span>
                        ) : (
                          <span className="no">
                            —
                          </span>
                        )}

                      </td>

                      <td>

                        <div className="detail">

                          {item.resume &&
                            "Resume claim"}

                          {item.resume &&
                            (item.github ||
                              item.leetcode) &&
                            " + "}

                          {item.github &&
                            "GitHub"}

                          {item.github &&
                            item.leetcode &&
                            " + "}

                          {item.leetcode &&
                            `LeetCode (${item.leetcodeSolved})`}

                          {!item.resume &&
                            !item.github &&
                            !item.leetcode &&
                            "No supporting evidence"}

                        </div>

                      </td>

                      <td>

                        <StatusBadge
                          status={
                            item.status
                          }
                        />

                      </td>

                    </tr>
                  )
                )}

              </tbody>

            </table>

          </div>

        </div>

        {/* =====================================================
            ROLE INTELLIGENCE
        ===================================================== */}

        <div className="role-grid cf-section">

          <div className="cf-card">

            <div className="cf-eyebrow">
              CAREER INTELLIGENCE
            </div>

            <div className="cf-section-title">
              Target Role
            </div>

            <select
              className="select"
              value={
                targetRole
              }
              onChange={(e) =>
                setTargetRole(
                  e.target.value
                )
              }
            >

              {ROLES.map(
                (role) => (
                  <option
                    key={
                      role.name
                    }
                    value={
                      role.name
                    }
                  >
                    {role.name}
                  </option>
                )
              )}

            </select>

            <p className="muted">
              {
                selectedRole.description
              }
            </p>

          </div>

          <div className="cf-card">

            <div className="cf-eyebrow">
              EVIDENCE COVERAGE
            </div>

            <div
              style={{
                fontSize: 46,
                fontWeight: 800,
              }}
            >
              {readinessScore}%
            </div>

            <div className="progress">

              <div
                className="progress-bar"
                style={{
                  width:
                    `${readinessScore}%`,
                }}
              />

            </div>

            <p className="muted">
              Evidence coverage for the
              selected role. This is not
              a hiring probability or
              mastery prediction.
            </p>

          </div>

        </div>

        {/* =====================================================
            ROLE CAPABILITY MAP
        ===================================================== */}

        <div className="cf-card cf-section">

          <div className="cf-eyebrow">
            ROLE INTELLIGENCE
          </div>

          <div className="cf-section-title">
            {selectedRole.name}
            {" · "}
            Capability Map
          </div>

          {roleEvidence.map(
            (item) => (
              <div
                className="role-item"
                key={
                  item.skill
                }
              >

                <div>

                  <strong>
                    {item.skill}
                  </strong>

                  <div className="detail">

                    {item.resume &&
                      "Resume claim"}

                    {item.resume &&
                      (item.github ||
                        item.leetcode) &&
                      " · "}

                    {item.github &&
                      "GitHub evidence"}

                    {item.github &&
                      item.leetcode &&
                      " · "}

                    {item.leetcode &&
                      `LeetCode: ${item.leetcodeSolved} solved`}

                    {!item.resume &&
                      !item.github &&
                      !item.leetcode &&
                      "No supporting evidence"}

                  </div>

                </div>

                <StatusBadge
                  status={
                    item.status
                  }
                />

              </div>
            )
          )}

        </div>

        {/* =====================================================
            GAPS
        ===================================================== */}

        <div className="cf-card cf-section">

          <div className="cf-eyebrow">
            NEXT BEST ACTIONS
          </div>

          <div className="cf-section-title">
            Capability gaps
          </div>

          {roleEvidence
            .filter(
              (item) =>
                item.status ===
                  "UNVERIFIED" ||
                item.status ===
                  "NOT_CLAIMED"
            )
            .map(
              (item) => (
                <div
                  className="role-item"
                  key={
                    item.skill
                  }
                >

                  <div>

                    <strong>
                      {item.skill}
                    </strong>

                    <div className="detail">
                      Build observable evidence
                      through a project,
                      repository, coursework
                      or relevant practice.
                    </div>

                  </div>

                  <span className="muted">
                    + Evidence
                  </span>

                </div>
              )
            )}

          {gapCount === 0 && (
            <div className="success-note">
              ✓ No major evidence gaps detected
              for this role.
            </div>
          )}

        </div>

        {/* =====================================================
            REPOSITORIES
        ===================================================== */}

        {github && (
          <div className="cf-card cf-section">

            <div className="cf-eyebrow">
              GITHUB EVIDENCE
            </div>

            <div className="cf-section-title">
              Repository Activity
            </div>

            {github.repositories
              .slice(0, 15)
              .map((repo) => (
                <a
                  key={
                    repo.name
                  }
                  href={
                    repo.html_url
                  }
                  target="_blank"
                  rel="noreferrer"
                  className="repo"
                >

                  <div
                    style={{
                      display: "flex",
                      justifyContent:
                        "space-between",
                      gap: 20,
                    }}
                  >

                    <strong>
                      {repo.name}
                    </strong>

                    <span className="muted">
                      {repo.language ||
                        "Multiple"}
                    </span>

                  </div>

                  <div className="detail">
                    {repo.description ||
                      "No description"}
                  </div>

                  <div className="detail">
                    ★{" "}
                    {repo.stars}
                    {" · "}
                    Forks{" "}
                    {repo.forks}
                    {" · "}
                    Updated{" "}
                    {new Date(
                      repo.pushed_at
                    ).toLocaleDateString()}
                  </div>

                </a>
              ))}

          </div>
        )}

        {/* =====================================================
            FOOTNOTE
        ===================================================== */}

        <div
          className="cf-card cf-section"
          style={{
            marginBottom: 40,
          }}
        >

          <div className="cf-eyebrow">
            EVIDENCE PRINCIPLE
          </div>

          <div className="muted">
            A missing signal does not mean the candidate
            lacks the capability. It means this system
            currently has no observable evidence from the
            connected sources.
          </div>

        </div>

      </div>
    </div>
  );
}

/* =========================================================
   METRIC
========================================================= */

function Metric({
  title,
  value,
  description,
}: {
  title: string;
  value: string;
  description: string;
}) {
  return (
    <div className="metric">

      <div className="metric-label">
        {title}
      </div>

      <div className="metric-value">
        {value}
      </div>

      <div className="metric-description">
        {description}
      </div>

    </div>
  );
}

/* =========================================================
   STATUS
========================================================= */

function StatusBadge({
  status,
}: {
  status: EvidenceStatus;
}) {
  const className =
    status === "SUPPORTED"
      ? "supported"
      : status === "PARTIAL"
      ? "partial"
      : status === "UNVERIFIED"
      ? "unverified"
      : "notclaimed";

  const label =
    status === "SUPPORTED"
      ? "● SUPPORTED"
      : status === "PARTIAL"
      ? "● PARTIAL"
      : status === "UNVERIFIED"
      ? "● UNVERIFIED"
      : "● NOT CLAIMED";

  return (
    <span
      className={`badge ${className}`}
    >
      {label}
    </span>
  );
}