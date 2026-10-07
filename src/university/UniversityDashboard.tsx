import {
    ArrowUpRight,
    BarChart3,
    BookOpen,
    BriefcaseBusiness,
    CheckCircle2,
    ChevronRight,
    CircleAlert,
    GraduationCap,
    Target,
    Users,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

const capabilityData = [
    {
        name: "Python & Data",
        students: 428,
        level: "Strong",
        width: "82%",
    },
    {
        name: "Machine Learning",
        students: 286,
        level: "Growing",
        width: "61%",
    },
    {
        name: "Web Development",
        students: 394,
        level: "Strong",
        width: "75%",
    },
    {
        name: "Cloud & DevOps",
        students: 173,
        level: "Emerging",
        width: "39%",
    },
];

const priorityGaps = [
    {
        title: "Cloud Engineering",
        demand: "High industry demand",
        students: "173 students",
        severity: "Priority",
    },
    {
        title: "Generative AI",
        demand: "Rapidly growing demand",
        students: "96 students",
        severity: "Priority",
    },
    {
        title: "Cybersecurity",
        demand: "Consistent demand",
        students: "121 students",
        severity: "Watch",
    },
];

const opportunities = [
    {
        title: "AI / ML Internship Drive",
        company: "Industry Partner",
        students: 84,
        status: "Open",
    },
    {
        title: "Software Engineering Hiring",
        company: "Industry Partner",
        students: 126,
        status: "Open",
    },
    {
        title: "Cloud Skills Challenge",
        company: "Industry Partner",
        students: 57,
        status: "Closing soon",
    },
];

export default function UniversityDashboard() {
    const navigate = useNavigate();

    return (
        <div className="university-dashboard">
            {/* Hero */}
            <section className="university-welcome">
                <div>
                    <div className="university-page-eyebrow">
                        CAPABILITY INTELLIGENCE
                    </div>

                    <h2>
                        Understand what your
                        <br />
                        students can do.
                    </h2>

                    <p>
                        Track student capabilities, identify
                        institutional skill gaps, and align
                        learning programs with industry demand.
                    </p>
                </div>

                <div className="university-welcome-action">
                    <button
                        className="university-outline-button"
                        onClick={() =>
                            navigate(
                                "/university/reports"
                            )
                        }
                    >
                        <BarChart3 size={17} />
                        View institutional report
                    </button>
                </div>
            </section>

            {/* Metrics */}
            <section className="university-metrics">
                <MetricCard
                    icon={<Users size={19} />}
                    label="Active Students"
                    value="2,846"
                    change="+8.4%"
                    description="capability profiles"
                />

                <MetricCard
                    icon={<CheckCircle2 size={19} />}
                    label="Verified Evidence"
                    value="8,492"
                    change="+12.7%"
                    description="projects, assessments & credentials"
                />

                <MetricCard
                    icon={<Target size={19} />}
                    label="Opportunity Ready"
                    value="1,284"
                    change="+6.2%"
                    description="students meeting role signals"
                />

                <MetricCard
                    icon={<BriefcaseBusiness size={19} />}
                    label="Industry Opportunities"
                    value="68"
                    change="+14"
                    description="active opportunities"
                />
            </section>

            {/* Main grid */}
            <section className="university-dashboard-grid">
                {/* Capability overview */}
                <div className="university-panel capability-overview">
                    <div className="university-panel-header">
                        <div>
                            <span className="panel-eyebrow">
                                STUDENT CAPABILITIES
                            </span>

                            <h3>
                                Capability landscape
                            </h3>
                        </div>

                        <button
                            className="panel-link"
                            onClick={() =>
                                navigate(
                                    "/university/capabilities"
                                )
                            }
                        >
                            Explore
                            <ArrowUpRight size={15} />
                        </button>
                    </div>

                    <div className="capability-list">
                        {capabilityData.map((item) => (
                            <div
                                className="capability-row"
                                key={item.name}
                            >
                                <div className="capability-row-top">
                                    <div>
                                        <strong>
                                            {item.name}
                                        </strong>

                                        <span>
                                            {item.students} students
                                        </span>
                                    </div>

                                    <span
                                        className={`capability-level ${item.level
                                            .toLowerCase()
                                            .replace(
                                                " ",
                                                "-"
                                            )}`}
                                    >
                                        {item.level}
                                    </span>
                                </div>

                                <div className="capability-track">
                                    <div
                                        className="capability-progress"
                                        style={{
                                            width: item.width,
                                        }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Priority gaps */}
                <div className="university-panel">
                    <div className="university-panel-header">
                        <div>
                            <span className="panel-eyebrow">
                                INDUSTRY ALIGNMENT
                            </span>

                            <h3>
                                Priority skill gaps
                            </h3>
                        </div>

                        <CircleAlert
                            size={19}
                            className="panel-header-icon"
                        />
                    </div>

                    <div className="gap-list">
                        {priorityGaps.map((gap) => (
                            <div
                                className="gap-item"
                                key={gap.title}
                            >
                                <div className="gap-icon">
                                    <Target size={16} />
                                </div>

                                <div className="gap-content">
                                    <strong>
                                        {gap.title}
                                    </strong>

                                    <span>
                                        {gap.demand}
                                    </span>

                                    <small>
                                        {gap.students}
                                    </small>
                                </div>

                                <span
                                    className={`gap-status ${
                                        gap.severity ===
                                        "Priority"
                                            ? "priority"
                                            : "watch"
                                    }`}
                                >
                                    {gap.severity}
                                </span>
                            </div>
                        ))}
                    </div>

                    <button
                        className="university-panel-footer-button"
                        onClick={() =>
                            navigate(
                                "/university/skill-gaps"
                            )
                        }
                    >
                        View all skill gaps
                        <ChevronRight size={16} />
                    </button>
                </div>
            </section>

            {/* Bottom section */}
            <section className="university-bottom-grid">
                {/* Programs */}
                <div className="university-panel programs-panel">
                    <div className="university-panel-header">
                        <div>
                            <span className="panel-eyebrow">
                                LEARNING SUPPLY
                            </span>

                            <h3>
                                Recommended programs
                            </h3>
                        </div>

                        <BookOpen
                            size={19}
                            className="panel-header-icon"
                        />
                    </div>

                    <div className="program-recommendation">
                        <div className="program-icon">
                            <GraduationCap size={21} />
                        </div>

                        <div>
                            <strong>
                                Applied Generative AI
                            </strong>

                            <p>
                                Based on industry demand and
                                current student capability gaps.
                            </p>

                            <div className="program-meta">
                                <span>
                                    420 students could benefit
                                </span>

                                <span>
                                    High priority
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="program-recommendation">
                        <div className="program-icon">
                            <CloudIcon />
                        </div>

                        <div>
                            <strong>
                                Cloud Engineering Foundations
                            </strong>

                            <p>
                                Build cloud readiness for
                                emerging software roles.
                            </p>

                            <div className="program-meta">
                                <span>
                                    318 students could benefit
                                </span>

                                <span>
                                    Recommended
                                </span>
                            </div>
                        </div>
                    </div>

                    <button
                        className="university-panel-footer-button"
                        onClick={() =>
                            navigate(
                                "/university/programs"
                            )
                        }
                    >
                        Manage learning programs
                        <ChevronRight size={16} />
                    </button>
                </div>

                {/* Opportunities */}
                <div className="university-panel opportunities-panel">
                    <div className="university-panel-header">
                        <div>
                            <span className="panel-eyebrow">
                                INDUSTRY DEMAND
                            </span>

                            <h3>
                                Active opportunities
                            </h3>
                        </div>

                        <BriefcaseBusiness
                            size={19}
                            className="panel-header-icon"
                        />
                    </div>

                    <div className="opportunity-list">
                        {opportunities.map(
                            (opportunity) => (
                                <div
                                    className="opportunity-item"
                                    key={opportunity.title}
                                >
                                    <div className="opportunity-main">
                                        <strong>
                                            {opportunity.title}
                                        </strong>

                                        <span>
                                            {opportunity.company}
                                        </span>
                                    </div>

                                    <div className="opportunity-right">
                                        <small>
                                            {
                                                opportunity.students
                                            }{" "}
                                            matched
                                        </small>

                                        <span
                                            className={
                                                opportunity.status ===
                                                "Open"
                                                    ? "opportunity-open"
                                                    : "opportunity-closing"
                                            }
                                        >
                                            {
                                                opportunity.status
                                            }
                                        </span>
                                    </div>
                                </div>
                            )
                        )}
                    </div>

                    <button
                        className="university-panel-footer-button"
                        onClick={() =>
                            navigate(
                                "/university/opportunities"
                            )
                        }
                    >
                        Explore opportunities
                        <ChevronRight size={16} />
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
        <div className="university-metric-card">
            <div className="metric-card-top">
                <div className="metric-icon">
                    {icon}
                </div>

                <span className="metric-change">
                    {change}
                </span>
            </div>

            <div className="metric-value">
                {value}
            </div>

            <div className="metric-label">
                {label}
            </div>

            <div className="metric-description">
                {description}
            </div>
        </div>
    );
}

function CloudIcon() {
    return (
        <svg
            width="21"
            height="21"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M17.5 19H9a7 7 0 1 1 6.7-9h.3a5 5 0 0 1 1.5 9Z" />
        </svg>
    );
}