import {
    ArrowUpRight,
    BriefcaseBusiness,
    ChevronRight,
    Users,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const opportunities = [
    {
        title: "Machine Learning Engineer",
        department: "Artificial Intelligence",
        location: "Bengaluru / Hybrid",
        matches: 84,
        status: "Active",
        posted: "3 days ago",
    },
    {
        title: "Frontend Engineer",
        department: "Product Engineering",
        location: "Remote",
        matches: 126,
        status: "Active",
        posted: "5 days ago",
    },
    {
        title: "Cloud Engineer",
        department: "Infrastructure",
        location: "Bengaluru",
        matches: 57,
        status: "Closing soon",
        posted: "8 days ago",
    },
    {
        title: "Data Analyst",
        department: "Business Intelligence",
        location: "Gurugram",
        matches: 102,
        status: "Active",
        posted: "10 days ago",
    },
];

export default function RecruiterOpportunities() {
    const navigate = useNavigate();

    return (
        <div className="recruiter-page">
            <div className="recruiter-page-header">
                <div>
                    <span className="recruiter-page-eyebrow">
                        HIRING WORKSPACE
                    </span>

                    <h2>Opportunities</h2>

                    <p>
                        Manage open roles and discover
                        capability-matched talent.
                    </p>
                </div>

                <button
                    type="button"
                    className="recruiter-primary-button"
                    onClick={() =>
                        navigate(
                            "/recruiter/post-opportunity"
                        )
                    }
                >
                    <BriefcaseBusiness size={16} />
                    Post opportunity
                </button>
            </div>

            <div className="recruiter-opportunity-list">
                {opportunities.map(
                    (opportunity) => (
                        <div
                            className="recruiter-opportunity-card"
                            key={opportunity.title}
                        >
                            <div className="recruiter-opportunity-icon">
                                <BriefcaseBusiness
                                    size={20}
                                />
                            </div>

                            <div className="recruiter-opportunity-main">
                                <span>
                                    {
                                        opportunity.department
                                    }
                                </span>

                                <h3>
                                    {opportunity.title}
                                </h3>

                                <div className="recruiter-opportunity-meta">
                                    <span>
                                        {
                                            opportunity.location
                                        }
                                    </span>

                                    <span>
                                        {
                                            opportunity.posted
                                        }
                                    </span>
                                </div>
                            </div>

                            <div className="recruiter-opportunity-match">
                                <Users size={14} />

                                <strong>
                                    {
                                        opportunity.matches
                                    }
                                </strong>

                                <span>
                                    matched
                                </span>
                            </div>

                            <span
                                className={
                                    opportunity.status ===
                                    "Active"
                                        ? "recruiter-status-active"
                                        : "recruiter-status-closing"
                                }
                            >
                                {opportunity.status}
                            </span>

                            <button
                                type="button"
                                className="recruiter-table-action"
                            >
                                <ArrowUpRight
                                    size={16}
                                />
                            </button>
                        </div>
                    )
                )}
            </div>

            <button
                type="button"
                className="recruiter-full-width-action"
                onClick={() =>
                    navigate(
                        "/recruiter/talent"
                    )
                }
            >
                Find candidates across all opportunities
                <ChevronRight size={16} />
            </button>
        </div>
    );
}