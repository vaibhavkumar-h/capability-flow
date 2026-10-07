import {
    ArrowUpRight,
    BriefcaseBusiness,
    ChevronRight,
    CircleAlert,
    Search,
    Target,
    TrendingUp,
    Users,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const talentSignals = [
    {
        label: "Machine Learning",
        value: "86%",
        candidates: "214 candidates",
        width: "86%",
    },
    {
        label: "Python & Data",
        value: "81%",
        candidates: "328 candidates",
        width: "81%",
    },
    {
        label: "React / Frontend",
        value: "74%",
        candidates: "287 candidates",
        width: "74%",
    },
    {
        label: "Cloud & DevOps",
        value: "58%",
        candidates: "142 candidates",
        width: "58%",
    },
];

const recentCandidates = [
    {
        name: "Aarav Sharma",
        role: "ML Engineer",
        match: "94%",
        evidence: "12 verified signals",
    },
    {
        name: "Ananya Verma",
        role: "Frontend Engineer",
        match: "91%",
        evidence: "15 verified signals",
    },
    {
        name: "Rohan Singh",
        role: "Data Scientist",
        match: "88%",
        evidence: "10 verified signals",
    },
    {
        name: "Kabir Mehta",
        role: "Cloud Engineer",
        match: "84%",
        evidence: "9 verified signals",
    },
];

export default function RecruiterDashboard() {
    const navigate = useNavigate();

    return (
        <div className="recruiter-dashboard">
            <section className="recruiter-welcome">
                <div>
                    <div className="recruiter-page-eyebrow">
                        TALENT INTELLIGENCE
                    </div>

                    <h2>
                        Find capability,
                        <br />
                        not just resumes.
                    </h2>

                    <p>
                        Discover evidence-backed talent based
                        on demonstrated capabilities, role fit
                        and emerging skill signals.
                    </p>
                </div>

                <div className="recruiter-welcome-actions">
                    <button
                        type="button"
                        className="recruiter-outline-button"
                        onClick={() =>
                            navigate(
                                "/recruiter/talent"
                            )
                        }
                    >
                        <Search size={16} />
                        Explore talent
                    </button>

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
            </section>

            <section className="recruiter-metrics">
                <MetricCard
                    icon={<Users size={19} />}
                    label="Talent Pool"
                    value="4,820"
                    change="+12.4%"
                    description="relevant capability profiles"
                />

                <MetricCard
                    icon={<Target size={19} />}
                    label="Strong Matches"
                    value="682"
                    change="+18.7%"
                    description="high-fit candidates"
                />

                <MetricCard
                    icon={<BriefcaseBusiness size={19} />}
                    label="Active Roles"
                    value="24"
                    change="+6"
                    description="open opportunities"
                />

                <MetricCard
                    icon={<TrendingUp size={19} />}
                    label="Avg. Match Quality"
                    value="87%"
                    change="+5.3%"
                    description="across active roles"
                />
            </section>

            <section className="recruiter-dashboard-grid">
                <div className="recruiter-panel">
                    <div className="recruiter-panel-header">
                        <div>
                            <span className="recruiter-panel-eyebrow">
                                CAPABILITY SUPPLY
                            </span>

                            <h3>
                                Talent capability signals
                            </h3>
                        </div>

                        <button
                            type="button"
                            className="recruiter-panel-link"
                            onClick={() =>
                                navigate(
                                    "/recruiter/skill-demand"
                                )
                            }
                        >
                            View demand
                            <ArrowUpRight size={14} />
                        </button>
                    </div>

                    <div className="recruiter-signal-list">
                        {talentSignals.map(
                            (signal) => (
                                <div
                                    className="recruiter-signal"
                                    key={signal.label}
                                >
                                    <div className="recruiter-signal-top">
                                        <div>
                                            <strong>
                                                {signal.label}
                                            </strong>

                                            <span>
                                                {
                                                    signal.candidates
                                                }
                                            </span>
                                        </div>

                                        <strong>
                                            {signal.value}
                                        </strong>
                                    </div>

                                    <div className="recruiter-progress">
                                        <div
                                            style={{
                                                width:
                                                signal.width,
                                            }}
                                        />
                                    </div>
                                </div>
                            )
                        )}
                    </div>
                </div>

                <div className="recruiter-panel">
                    <div className="recruiter-panel-header">
                        <div>
                            <span className="recruiter-panel-eyebrow">
                                TALENT DISCOVERY
                            </span>

                            <h3>
                                Recommended candidates
                            </h3>
                        </div>

                        <Users
                            size={18}
                            className="recruiter-panel-muted-icon"
                        />
                    </div>

                    <div className="recruiter-candidate-list">
                        {recentCandidates.map(
                            (candidate) => (
                                <div
                                    className="recruiter-candidate"
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

                                    <div className="candidate-info">
                                        <strong>
                                            {candidate.name}
                                        </strong>

                                        <span>
                                            {candidate.role}
                                        </span>

                                        <small>
                                            {
                                                candidate.evidence
                                            }
                                        </small>
                                    </div>

                                    <div className="candidate-match">
                                        {candidate.match}
                                    </div>
                                </div>
                            )
                        )}
                    </div>

                    <button
                        type="button"
                        className="recruiter-panel-footer"
                        onClick={() =>
                            navigate(
                                "/recruiter/talent"
                            )
                        }
                    >
                        Explore talent pool
                        <ChevronRight size={15} />
                    </button>
                </div>
            </section>

            <section className="recruiter-bottom-grid">
                <div className="recruiter-panel">
                    <div className="recruiter-panel-header">
                        <div>
                            <span className="recruiter-panel-eyebrow">
                                MARKET SIGNAL
                            </span>

                            <h3>
                                Skills in rising demand
                            </h3>
                        </div>

                        <TrendingUp
                            size={18}
                            className="recruiter-panel-muted-icon"
                        />
                    </div>

                    <div className="recruiter-demand-list">
                        <DemandItem
                            skill="Generative AI"
                            growth="+42%"
                            signal="Very high"
                        />

                        <DemandItem
                            skill="Cloud Engineering"
                            growth="+31%"
                            signal="High"
                        />

                        <DemandItem
                            skill="Data Engineering"
                            growth="+26%"
                            signal="High"
                        />

                        <DemandItem
                            skill="Cybersecurity"
                            growth="+21%"
                            signal="Growing"
                        />
                    </div>
                </div>

                <div className="recruiter-panel">
                    <div className="recruiter-panel-header">
                        <div>
                            <span className="recruiter-panel-eyebrow">
                                ACTION REQUIRED
                            </span>

                            <h3>
                                Hiring intelligence
                            </h3>
                        </div>

                        <CircleAlert
                            size={18}
                            className="recruiter-alert-icon"
                        />
                    </div>

                    <div className="recruiter-insight-box">
                        <div className="recruiter-insight-icon">
                            <Target size={18} />
                        </div>

                        <div>
                            <strong>
                                Your ML Engineer role has
                                18 high-fit candidates
                            </strong>

                            <p>
                                7 candidates have verified
                                project evidence directly
                                aligned with the role.
                            </p>
                        </div>
                    </div>

                    <button
                        type="button"
                        className="recruiter-panel-footer"
                        onClick={() =>
                            navigate(
                                "/recruiter/shortlists"
                            )
                        }
                    >
                        Review shortlist
                        <ChevronRight size={15} />
                    </button>
                </div>
            </section>
        </div>
    );
}

function MetricCard({
                        icon,
                        label,
                        value,
                        change,
                        description,
                    }: {
    icon: React.ReactNode;
    label: string;
    value: string;
    change: string;
    description: string;
}) {
    return (
        <div className="recruiter-metric-card">
            <div className="recruiter-metric-top">
                <div className="recruiter-metric-icon">
                    {icon}
                </div>

                <span className="recruiter-metric-change">
                    {change}
                </span>
            </div>

            <strong className="recruiter-metric-value">
                {value}
            </strong>

            <span className="recruiter-metric-label">
                {label}
            </span>

            <span className="recruiter-metric-description">
                {description}
            </span>
        </div>
    );
}

function DemandItem({
                        skill,
                        growth,
                        signal,
                    }: {
    skill: string;
    growth: string;
    signal: string;
}) {
    return (
        <div className="recruiter-demand-item">
            <div>
                <strong>{skill}</strong>
                <span>{signal} demand</span>
            </div>

            <strong className="recruiter-growth">
                {growth}
            </strong>
        </div>
    );
}