import {
    ArrowUpRight,
    Bookmark,
    Search,
    SlidersHorizontal,
    Users,
} from "lucide-react";
import { useState } from "react";

const candidates = [
    {
        name: "Aarav Sharma",
        role: "Machine Learning Engineer",
        location: "Mohali, Punjab",
        skills: "Python, ML, SQL, TensorFlow",
        match: 94,
        evidence: 12,
        experience: "3 projects",
    },
    {
        name: "Ananya Verma",
        role: "Frontend Engineer",
        location: "Chandigarh, Punjab",
        skills: "React, TypeScript, Node.js",
        match: 91,
        evidence: 15,
        experience: "5 projects",
    },
    {
        name: "Rohan Singh",
        role: "Data Scientist",
        location: "Delhi, India",
        skills: "Python, Pandas, ML, SQL",
        match: 88,
        evidence: 10,
        experience: "4 projects",
    },
    {
        name: "Kabir Mehta",
        role: "Cloud Engineer",
        location: "Bengaluru, India",
        skills: "AWS, Docker, Python, Linux",
        match: 84,
        evidence: 9,
        experience: "3 projects",
    },
    {
        name: "Ishita Kapoor",
        role: "AI Engineer",
        location: "Pune, India",
        skills: "Python, LLMs, NLP, FastAPI",
        match: 82,
        evidence: 11,
        experience: "4 projects",
    },
];

export default function RecruiterTalent() {
    const [search, setSearch] = useState("");
    const [saved, setSaved] = useState<string[]>([]);

    const filteredCandidates = candidates.filter(
        (candidate) =>
            `${candidate.name} ${candidate.role} ${candidate.skills}`
                .toLowerCase()
                .includes(search.toLowerCase())
    );

    const toggleSaved = (name: string) => {
        setSaved((current) =>
            current.includes(name)
                ? current.filter((item) => item !== name)
                : [...current, name]
        );
    };

    return (
        <div className="recruiter-page">
            <div className="recruiter-page-header">
                <div>
                    <span className="recruiter-page-eyebrow">
                        TALENT DISCOVERY
                    </span>

                    <h2>Talent</h2>

                    <p>
                        Search evidence-backed candidates
                        based on capability and role fit.
                    </p>
                </div>

                <div className="recruiter-page-stat">
                    <Users size={17} />
                    <strong>4,820</strong>
                    <span>profiles</span>
                </div>
            </div>

            <div className="recruiter-toolbar">
                <div className="recruiter-search">
                    <Search size={17} />

                    <input
                        type="text"
                        value={search}
                        onChange={(event) =>
                            setSearch(
                                event.target.value
                            )
                        }
                        placeholder="Search talent, roles or capabilities..."
                    />
                </div>

                <button
                    type="button"
                    className="recruiter-filter-button"
                >
                    <SlidersHorizontal size={16} />
                    Filters
                </button>
            </div>

            <div className="recruiter-talent-table">
                <div className="recruiter-talent-header">
                    <span>Candidate</span>
                    <span>Capabilities</span>
                    <span>Evidence</span>
                    <span>Match</span>
                    <span />
                </div>

                {filteredCandidates.map(
                    (candidate) => (
                        <div
                            className="recruiter-talent-row"
                            key={candidate.name}
                        >
                            <div className="recruiter-candidate-cell">
                                <div className="candidate-avatar">
                                    {candidate.name
                                        .split(" ")
                                        .map(
                                            (part) =>
                                                part[0]
                                        )
                                        .join("")}
                                </div>

                                <div>
                                    <strong>
                                        {candidate.name}
                                    </strong>

                                    <span>
                                        {candidate.role}
                                    </span>

                                    <small>
                                        {
                                            candidate.location
                                        }
                                    </small>
                                </div>
                            </div>

                            <div className="candidate-skills">
                                {candidate.skills}
                            </div>

                            <div className="candidate-evidence">
                                <strong>
                                    {
                                        candidate.evidence
                                    }
                                </strong>

                                <span>
                                    {
                                        candidate.experience
                                    }
                                </span>
                            </div>

                            <div className="candidate-match-large">
                                {candidate.match}%
                            </div>

                            <div className="candidate-actions">
                                <button
                                    type="button"
                                    className={
                                        saved.includes(
                                            candidate.name
                                        )
                                            ? "saved"
                                            : ""
                                    }
                                    onClick={() =>
                                        toggleSaved(
                                            candidate.name
                                        )
                                    }
                                    aria-label="Save candidate"
                                >
                                    <Bookmark
                                        size={15}
                                    />
                                </button>

                                <button
                                    type="button"
                                    aria-label="View candidate"
                                >
                                    <ArrowUpRight
                                        size={15}
                                    />
                                </button>
                            </div>
                        </div>
                    )
                )}

                {filteredCandidates.length === 0 && (
                    <div className="recruiter-empty-state">
                        <Search size={24} />

                        <strong>
                            No matching candidates
                        </strong>

                        <p>
                            Try another name, role or
                            capability.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}