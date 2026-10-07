import {
    ArrowUpRight,
    CheckCircle2,
    ChevronRight,
    MessageSquare,
    Users,
} from "lucide-react";

const shortlisted = [
    {
        name: "Aarav Sharma",
        role: "Machine Learning Engineer",
        match: 94,
        stage: "Technical Review",
        evidence: "12 verified signals",
    },
    {
        name: "Ananya Verma",
        role: "Frontend Engineer",
        match: 91,
        stage: "Interview",
        evidence: "15 verified signals",
    },
    {
        name: "Rohan Singh",
        role: "Data Scientist",
        match: 88,
        stage: "Screening",
        evidence: "10 verified signals",
    },
    {
        name: "Kabir Mehta",
        role: "Cloud Engineer",
        match: 84,
        stage: "Screening",
        evidence: "9 verified signals",
    },
];

export default function RecruiterShortlists() {
    return (
        <div className="recruiter-page">
            <div className="recruiter-page-header">
                <div>
                    <span className="recruiter-page-eyebrow">
                        TALENT PIPELINE
                    </span>

                    <h2>Shortlists</h2>

                    <p>
                        Review candidates selected for active
                        hiring workflows.
                    </p>
                </div>

                <div className="recruiter-page-stat">
                    <Users size={17} />
                    <strong>42</strong>
                    <span>shortlisted</span>
                </div>
            </div>

            <div className="recruiter-shortlist-summary">
                <SummaryItem
                    icon={<Users size={18} />}
                    value="42"
                    label="Total shortlisted"
                />

                <SummaryItem
                    icon={<MessageSquare size={18} />}
                    value="18"
                    label="In review"
                />

                <SummaryItem
                    icon={<CheckCircle2 size={18} />}
                    value="7"
                    label="Interview stage"
                />
            </div>

            <div className="recruiter-shortlist-list">
                {shortlisted.map((candidate) => (
                    <div
                        className="recruiter-shortlist-card"
                        key={candidate.name}
                    >
                        <div className="candidate-avatar">
                            {candidate.name
                                .split(" ")
                                .map(
                                    (part) =>
                                        part[0]
                                )
                                .join("")}
                        </div>

                        <div className="shortlist-main">
                            <strong>
                                {candidate.name}
                            </strong>

                            <span>
                                {candidate.role}
                            </span>

                            <small>
                                {candidate.evidence}
                            </small>
                        </div>

                        <div className="shortlist-match">
                            {candidate.match}%
                            <span>role fit</span>
                        </div>

                        <div className="shortlist-stage">
                            <span>
                                {candidate.stage}
                            </span>
                        </div>

                        <button
                            type="button"
                            className="recruiter-table-action"
                        >
                            <ArrowUpRight
                                size={16}
                            />
                        </button>
                    </div>
                ))}
            </div>

            <button
                type="button"
                className="recruiter-full-width-action"
            >
                Review all candidates
                <ChevronRight size={16} />
            </button>
        </div>
    );
}

function SummaryItem({
                         icon,
                         value,
                         label,
                     }: {
    icon: React.ReactNode;
    value: string;
    label: string;
}) {
    return (
        <div className="recruiter-summary-item">
            <div className="recruiter-summary-icon">
                {icon}
            </div>

            <strong>{value}</strong>

            <span>{label}</span>
        </div>
    );
}