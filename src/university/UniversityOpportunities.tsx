import {
    ArrowUpRight,
    BriefcaseBusiness,
    Users,
} from "lucide-react";

const opportunities = [
    {
        title: "AI / ML Internship Program",
        company: "Industry Partner",
        capability: "Machine Learning",
        matches: 84,
        status: "Open",
    },
    {
        title: "Software Engineering Hiring",
        company: "Industry Partner",
        capability: "Web Development",
        matches: 126,
        status: "Open",
    },
    {
        title: "Cloud Engineering Challenge",
        company: "Industry Partner",
        capability: "Cloud & DevOps",
        matches: 57,
        status: "Closing soon",
    },
    {
        title: "Data Analytics Internship",
        company: "Industry Partner",
        capability: "Python & Data",
        matches: 102,
        status: "Open",
    },
];

export default function UniversityOpportunities() {
    return (
        <div className="university-page">
            <div className="university-page-header">
                <div>
                    <span className="university-page-eyebrow">
                        INDUSTRY DEMAND
                    </span>

                    <h2>Opportunities</h2>

                    <p>
                        Understand which industry
                        opportunities are available to your
                        students.
                    </p>
                </div>

                <button className="university-primary-button">
                    <BriefcaseBusiness size={17} />
                    Publish opportunity
                </button>
            </div>

            <div className="opportunity-page-list">
                {opportunities.map((opportunity) => (
                    <div
                        className="opportunity-page-card"
                        key={opportunity.title}
                    >
                        <div className="opportunity-page-icon">
                            <BriefcaseBusiness size={20} />
                        </div>

                        <div className="opportunity-page-main">
                            <span className="opportunity-company">
                                {opportunity.company}
                            </span>

                            <h3>
                                {opportunity.title}
                            </h3>

                            <div className="opportunity-tags">
                                <span>
                                    {opportunity.capability}
                                </span>

                                <span>
                                    <Users size={13} />
                                    {opportunity.matches} matched
                                    students
                                </span>
                            </div>
                        </div>

                        <div className="opportunity-page-right">
                            <span
                                className={
                                    opportunity.status ===
                                    "Open"
                                        ? "opportunity-open"
                                        : "opportunity-closing"
                                }
                            >
                                {opportunity.status}
                            </span>

                            <button className="table-action">
                                <ArrowUpRight size={16} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}