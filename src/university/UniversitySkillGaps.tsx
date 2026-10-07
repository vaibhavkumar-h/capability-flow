import {
    ArrowUpRight,
    CircleAlert,
    TrendingUp,
} from "lucide-react";

const gaps = [
    {
        skill: "Cloud Engineering",
        demand: "Very High",
        current: "173 students",
        required: "420+ students",
        gap: "59%",
    },
    {
        skill: "Generative AI",
        demand: "Very High",
        current: "96 students",
        required: "380+ students",
        gap: "75%",
    },
    {
        skill: "Cybersecurity",
        demand: "High",
        current: "121 students",
        required: "300+ students",
        gap: "60%",
    },
    {
        skill: "Data Engineering",
        demand: "High",
        current: "148 students",
        required: "320+ students",
        gap: "54%",
    },
];

export default function UniversitySkillGaps() {
    return (
        <div className="university-page">
            <div className="university-page-header">
                <div>
                    <span className="university-page-eyebrow">
                        INDUSTRY ALIGNMENT
                    </span>

                    <h2>Skill gaps</h2>

                    <p>
                        Identify where institutional
                        capability supply is behind market
                        demand.
                    </p>
                </div>
            </div>

            <div className="skill-gap-banner">
                <div className="skill-gap-banner-icon">
                    <CircleAlert size={22} />
                </div>

                <div>
                    <strong>
                        4 capability areas require
                        institutional attention
                    </strong>

                    <p>
                        These gaps are based on current
                        opportunity demand and student
                        capability evidence.
                    </p>
                </div>
            </div>

            <div className="skill-gap-grid">
                {gaps.map((gap) => (
                    <div
                        className="skill-gap-card"
                        key={gap.skill}
                    >
                        <div className="skill-gap-card-top">
                            <div>
                                <span>
                                    {gap.demand} demand
                                </span>

                                <h3>{gap.skill}</h3>
                            </div>

                            <div className="gap-percentage">
                                {gap.gap}
                            </div>
                        </div>

                        <div className="skill-gap-bar">
                            <div
                                style={{
                                    width: gap.gap,
                                }}
                            />
                        </div>

                        <div className="skill-gap-details">
                            <div>
                                <span>
                                    Current capability
                                </span>

                                <strong>
                                    {gap.current}
                                </strong>
                            </div>

                            <div>
                                <span>
                                    Estimated demand
                                </span>

                                <strong>
                                    {gap.required}
                                </strong>
                            </div>
                        </div>

                        <button className="gap-action">
                            Explore learning response
                            <ArrowUpRight size={15} />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}