import {
    BarChart3,
    BriefcaseBusiness,
    Building2,
    ChevronDown,
    LayoutDashboard,
    LogOut,
    Plus,
    Settings,
    Target,
    Users,
    X,
} from "lucide-react";
import {
    NavLink,
    useNavigate,
} from "react-router-dom";
import type { ReactNode } from "react";
import { useState } from "react";

interface RecruiterLayoutProps {
    children: ReactNode;
}

const navigation = [
    {
        label: "Overview",
        path: "/recruiter",
        icon: LayoutDashboard,
    },
    {
        label: "Talent",
        path: "/recruiter/talent",
        icon: Users,
    },
    {
        label: "Opportunities",
        path: "/recruiter/opportunities",
        icon: BriefcaseBusiness,
    },
    {
        label: "Shortlists",
        path: "/recruiter/shortlists",
        icon: Target,
    },
    {
        label: "Skill Demand",
        path: "/recruiter/skill-demand",
        icon: BarChart3,
    },
];

export default function RecruiterLayout({
                                            children,
                                        }: RecruiterLayoutProps) {
    const navigate = useNavigate();

    const [mobileMenuOpen, setMobileMenuOpen] =
        useState(false);

    const [showError, setShowError] =
        useState(false);

    const handleLogout = () => {
        navigate("/login/recruiter");
    };

    return (
        <div className="recruiter-shell">
            <aside
                className={`recruiter-sidebar ${
                    mobileMenuOpen
                        ? "recruiter-sidebar-open"
                        : ""
                }`}
            >
                <div className="recruiter-brand">
                    <div className="recruiter-brand-mark">
                        <BriefcaseBusiness size={19} />
                    </div>

                    <div>
                        <div className="recruiter-brand-name">
                            Capability Flow
                        </div>

                        <div className="recruiter-brand-type">
                            Recruiter
                        </div>
                    </div>

                    <button
                        type="button"
                        className="recruiter-mobile-close"
                        onClick={() =>
                            setMobileMenuOpen(false)
                        }
                        aria-label="Close menu"
                    >
                        <X size={18} />
                    </button>
                </div>

                <div className="recruiter-company-card">
                    <div className="company-avatar">
                        AC
                    </div>

                    <div className="company-info">
                        <strong>
                            Acme Corporation
                        </strong>

                        <span>
                            Talent workspace
                        </span>
                    </div>

                    <ChevronDown size={15} />
                </div>

                <div className="recruiter-nav-section">
                    <span className="recruiter-nav-label">
                        WORKSPACE
                    </span>

                    <nav className="recruiter-nav">
                        {navigation.map((item) => {
                            const Icon = item.icon;

                            return (
                                <NavLink
                                    key={item.path}
                                    to={item.path}
                                    end={
                                        item.path ===
                                        "/recruiter"
                                    }
                                    className={({ isActive }) =>
                                        `recruiter-nav-item ${
                                            isActive
                                                ? "active"
                                                : ""
                                        }`
                                    }
                                    onClick={() =>
                                        setMobileMenuOpen(
                                            false
                                        )
                                    }
                                >
                                    <Icon size={18} />
                                    <span>
                                        {item.label}
                                    </span>
                                </NavLink>
                            );
                        })}
                    </nav>
                </div>

                <div className="recruiter-sidebar-bottom">
                    <button
                        type="button"
                        className="recruiter-create-button"
                        onClick={() =>
                            navigate(
                                "/recruiter/post-opportunity"
                            )
                        }
                    >
                        <Plus size={17} />
                        Post opportunity
                    </button>

                    <NavLink
                        to="/recruiter/settings"
                        className="recruiter-nav-item"
                    >
                        <Settings size={18} />
                        <span>Settings</span>
                    </NavLink>

                    <button
                        type="button"
                        className="recruiter-logout"
                        onClick={handleLogout}
                    >
                        <LogOut size={18} />
                        <span>Sign out</span>
                    </button>
                </div>
            </aside>

            {mobileMenuOpen && (
                <div
                    className="recruiter-sidebar-overlay"
                    onClick={() =>
                        setMobileMenuOpen(false)
                    }
                />
            )}

            <main className="recruiter-main">
                <header className="recruiter-topbar">
                    <div className="recruiter-topbar-left">
                        <button
                            type="button"
                            className="recruiter-mobile-menu"
                            onClick={() =>
                                setMobileMenuOpen(true)
                            }
                            aria-label="Open menu"
                        >
                            <span />
                            <span />
                            <span />
                        </button>

                        <div>
                            <div className="recruiter-topbar-eyebrow">
                                TALENT INTELLIGENCE
                            </div>

                            <h1>
                                Recruiter Workspace
                            </h1>
                        </div>
                    </div>

                    <div className="recruiter-profile">
                        <div className="recruiter-profile-text">
                            <strong>
                                Acme Corporation
                            </strong>

                            <span>
                                Talent Acquisition
                            </span>
                        </div>

                        <div className="recruiter-profile-avatar">
                            AC
                        </div>
                    </div>
                </header>

                <section className="recruiter-content">
                    {children}
                </section>
            </main>

            {showError && (
                <div className="recruiter-error-overlay">
                    <div className="recruiter-error-modal">
                        <button
                            type="button"
                            className="recruiter-error-close"
                            onClick={() =>
                                setShowError(false)
                            }
                        >
                            <X size={17} />
                        </button>

                        <div className="recruiter-error-icon">
                            !
                        </div>

                        <span>
                            Something went wrong
                        </span>

                        <p>
                            Please try again. If the
                            problem continues, check your
                            recruiter workspace connection.
                        </p>

                        <button
                            type="button"
                            className="recruiter-error-action"
                            onClick={() =>
                                setShowError(false)
                            }
                        >
                            Got it
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}