import {
    BarChart3,
    CheckCircle2,
    TrendingUp,
} from "lucide-react";

const capabilities = [
    {
        name: "Python & Data Science",
        students: 428,
        verified: 372,
        trend: "+18%",
    },
    {
        name: "Web Development",
        students: 394,
        verified: 341,
        trend: "+12%",
    },
    {
        name: "Machine Learning",
        students: 286,
        verified: 218,
        trend: "+24%",
    },
    {
        name: "Java & Backend",
        students: 251,
        verified: 207,
        trend: "+9%",
    },
    {
        name: "Cloud & DevOps",
        students: 173,
        verified: 126,
        trend: "+31%",
    },
    {
        name: "Cybersecurity",
        students: 121,
        verified: 84,
        trend: "+15%",
    },
];

export default function UniversityCapabilities() {
    return (
        <div className="university-page">
            <div className="university-page-header">
                <div>
                    <span className="university-page-eyebrow">
                        CAPABILITY INTELLIGENCE
                    </span>

                    <h2>Capabilities</h2>

                    <p>
                        See the capability strengths emerging
                        across your student ecosystem.
                    </p>
                </div>
            </div>

            <div className="capability-summary-grid">
                <div className="capability-summary-card">
                    <div className="summary-icon">
                        <BarChart3 size={20} />
                    </div>

                    <strong>64</strong>

                    <span>
                        tracked capability areas
                    </span>
                </div>

                <div className="capability-summary-card">
                    <div className="summary-icon">
                        <CheckCircle2 size={20} />
                    </div>

                    <strong>71%</strong>

                    <span>
                        evidence-backed capabilities
                    </span>
                </div>

                <div className="capability-summary-card">
                    <div className="summary-icon">
                        <TrendingUp size={20} />
                    </div>

                    <strong>18.6%</strong>

                    <span>
                        average capability growth
                    </span>
                </div>
            </div>

            <div className="university-panel capability-table-panel">
                <div className="university-panel-header">
                    <div>
                        <span className="panel-eyebrow">
                            TOP CAPABILITIES
                        </span>

                        <h3>
                            Institution capability map
                        </h3>
                    </div>
                </div>

                <div className="capability-map-table">
                    <div className="capability-map-header">
                        <span>Capability</span>
                        <span>Students</span>
                        <span>Verified</span>
                        <span>Growth</span>
                    </div>

                    {capabilities.map((item) => (
                        <div
                            className="capability-map-row"
                            key={item.name}
                        >
                            <strong>{item.name}</strong>

                            <span>
                                {item.students}
                            </span>

                            <span>
                                {item.verified}
                            </span>

                            <span className="growth-value">
                                {item.trend}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}