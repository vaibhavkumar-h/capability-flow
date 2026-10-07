import {
    ArrowUpRight,
    BarChart3,
    TrendingUp,
} from "lucide-react";

const skills = [
    {
        name: "Generative AI",
        demand: "Very High",
        growth: "+42%",
        available: 182,
        required: 540,
    },
    {
        name: "Cloud Engineering",
        demand: "High",
        growth: "+31%",
        available: 142,
        required: 380,
    },
    {
        name: "Data Engineering",
        demand: "High",
        growth: "+26%",
        available: 148,
        required: 320,
    },
    {
        name: "Cybersecurity",
        demand: "Growing",
        growth: "+21%",
        available: 121,
        required: 280,
    },
    {
        name: "Machine Learning",
        demand: "High",
        growth: "+19%",
        available: 214,
        required: 340,
    },
];

export default function RecruiterSkillDemand() {
    return (
        <div className="recruiter-page">
            <div className="recruiter-page-header">
                <div>
                    <span className="recruiter-page-eyebrow">
                        MARKET INTELLIGENCE
                    </span>

                    <h2>Skill demand</h2>

                    <p>
                        Understand where industry demand is
                        moving and where talent supply is
                        constrained.
                    </p>
                </div>
            </div>

            <div className="recruiter-demand-summary">
                <div>
                    <div className="recruiter-summary-icon">
                        <TrendingUp size={18} />
                    </div>

                    <strong>18.6%</strong>

                    <span>
                        average demand growth
                    </span>
                </div>

                <div>
                    <div className="recruiter-summary-icon">
                        <BarChart3 size={18} />
                    </div>

                    <strong>14</strong>

                    <span>
                        capability areas tracked
                    </span>
                </div>

                <div>
                    <div className="recruiter-summary-icon">
                        <ArrowUpRight size={18} />
                    </div>

                    <strong>7</strong>

                    <span>
                        emerging capability gaps
                    </span>
                </div>
            </div>

            <div className="recruiter-panel">
                <div className="recruiter-panel-header">
                    <div>
                        <span className="recruiter-panel-eyebrow">
                            CAPABILITY MARKET
                        </span>

                        <h3>
                            Demand vs talent supply
                        </h3>
                    </div>
                </div>

                <div className="recruiter-demand-table">
                    <div className="recruiter-demand-header">
                        <span>Capability</span>
                        <span>Demand</span>
                        <span>Growth</span>
                        <span>Talent supply</span>
                    </div>

                    {skills.map((skill) => {
                        const supplyPercentage = Math.min(
                            (skill.available /
                                skill.required) *
                            100,
                            100
                        );

                        return (
                            <div
                                className="recruiter-demand-row"
                                key={skill.name}
                            >
                                <strong>
                                    {skill.name}
                                </strong>

                                <span
                                    className={`demand-level ${skill.demand
                                        .toLowerCase()
                                        .replace(
                                            " ",
                                            "-"
                                        )}`}
                                >
                                    {skill.demand}
                                </span>

                                <span className="demand-growth">
                                    {skill.growth}
                                </span>

                                <div className="supply-cell">
                                    <div className="supply-numbers">
                                        <span>
                                            {
                                                skill.available
                                            }{" "}
                                            available
                                        </span>

                                        <span>
                                            {
                                                skill.required
                                            }{" "}
                                            needed
                                        </span>
                                    </div>

                                    <div className="supply-track">
                                        <div
                                            style={{
                                                width: `${supplyPercentage}%`,
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}