import {
    ArrowUpRight,
    BookOpen,
    GraduationCap,
    Plus,
    Users,
} from "lucide-react";

const programs = [
    {
        title: "Applied Generative AI",
        type: "Recommended",
        students: 420,
        status: "Planning",
        description:
            "Build practical capability in LLMs, AI applications and intelligent automation.",
    },
    {
        title: "Cloud Engineering Foundations",
        type: "Priority",
        students: 318,
        status: "Active",
        description:
            "Develop cloud infrastructure, deployment and DevOps readiness.",
    },
    {
        title: "Cybersecurity Essentials",
        type: "Recommended",
        students: 267,
        status: "Planning",
        description:
            "Strengthen security fundamentals aligned with current industry demand.",
    },
];

export default function UniversityPrograms() {
    return (
        <div className="university-page">
            <div className="university-page-header">
                <div>
                    <span className="university-page-eyebrow">
                        LEARNING SUPPLY
                    </span>

                    <h2>Programs</h2>

                    <p>
                        Create learning responses to
                        institutional capability gaps.
                    </p>
                </div>

                <button className="university-primary-button">
                    <Plus size={17} />
                    Create program
                </button>
            </div>

            <div className="program-page-grid">
                {programs.map((program) => (
                    <div
                        className="program-page-card"
                        key={program.title}
                    >
                        <div className="program-card-top">
                            <div className="program-icon">
                                <GraduationCap size={21} />
                            </div>

                            <span
                                className={`program-status ${
                                    program.type ===
                                    "Priority"
                                        ? "priority"
                                        : ""
                                }`}
                            >
                                {program.type}
                            </span>
                        </div>

                        <h3>{program.title}</h3>

                        <p>{program.description}</p>

                        <div className="program-card-meta">
                            <span>
                                <Users size={15} />
                                {program.students} potential
                                learners
                            </span>

                            <span>
                                <BookOpen size={15} />
                                {program.status}
                            </span>
                        </div>

                        <button className="program-card-action">
                            View program
                            <ArrowUpRight size={15} />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}