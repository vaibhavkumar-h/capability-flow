import {
    BarChart3,
    BookOpen,
    Building2,
    ChevronDown,
    FileText,
    GraduationCap,
    LayoutDashboard,
    LogOut,
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

interface UniversityLayoutProps {
    children: ReactNode;
}

const navigation = [
    {
        label: "Overview",
        path: "/university",
        icon: LayoutDashboard,
    },
    {
        label: "Students",
        path: "/university/students",
        icon: Users,
    },
    {
        label: "Capabilities",
        path: "/university/capabilities",
        icon: BarChart3,
    },
    {
        label: "Skill Gaps",
        path: "/university/skill-gaps",
        icon: Target,
    },
    {
        label: "Opportunities",
        path: "/university/opportunities",
        icon: GraduationCap,
    },
    {
        label: "Programs",
        path: "/university/programs",
        icon: BookOpen,
    },
];

export default function UniversityLayout({
                                             children,
                                         }: UniversityLayoutProps) {
    const navigate = useNavigate();

    const [mobileMenuOpen, setMobileMenuOpen] =
        useState(false);

    const handleLogout = () => {
        navigate("/login/university");
    };

    return (
        <div className="university-shell">
            {/* Sidebar */}
            <aside
                className={`university-sidebar ${
                    mobileMenuOpen
                        ? "university-sidebar-open"
                        : ""
                }`}
            >
                <div className="university-brand">
                    <div className="university-brand-mark">
                        <Building2 size={20} />
                    </div>

                    <div>
                        <div className="university-brand-name">
                            Capability Flow
                        </div>

                        <div className="university-brand-type">
                            Institution
                        </div>
                    </div>

                    <button
                        className="university-mobile-close"
                        onClick={() =>
                            setMobileMenuOpen(false)
                        }
                        aria-label="Close menu"
                    >
                        <X size={18} />
                    </button>
                </div>

                <div className="university-institution-card">
                    <div className="institution-avatar">
                        CU
                    </div>

                    <div className="institution-info">
                        <strong>
                            Chandigarh University
                        </strong>

                        <span>
                            Institution workspace
                        </span>
                    </div>

                    <ChevronDown size={16} />
                </div>

                <div className="university-nav-section">
                    <span className="university-nav-label">
                        WORKSPACE
                    </span>

                    <nav className="university-nav">
                        {navigation.map((item) => {
                            const Icon = item.icon;

                            return (
                                <NavLink
                                    key={item.path}
                                    to={item.path}
                                    end={
                                        item.path ===
                                        "/university"
                                    }
                                    className={({ isActive }) =>
                                        `university-nav-item ${
                                            isActive
                                                ? "active"
                                                : ""
                                        }`
                                    }
                                    onClick={() =>
                                        setMobileMenuOpen(false)
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

                <div className="university-sidebar-bottom">
                    <NavLink
                        to="/university/settings"
                        className="university-nav-item"
                    >
                        <Settings size={18} />
                        <span>Settings</span>
                    </NavLink>

                    <button
                        className="university-logout"
                        onClick={handleLogout}
                    >
                        <LogOut size={18} />
                        <span>Sign out</span>
                    </button>
                </div>
            </aside>

            {mobileMenuOpen && (
                <div
                    className="university-sidebar-overlay"
                    onClick={() =>
                        setMobileMenuOpen(false)
                    }
                />
            )}

            {/* Main */}
            <main className="university-main">
                <header className="university-topbar">
                    <div className="university-topbar-left">
                        <button
                            className="university-mobile-menu"
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
                            <div className="university-topbar-eyebrow">
                                INSTITUTIONAL INTELLIGENCE
                            </div>

                            <h1>
                                University Workspace
                            </h1>
                        </div>
                    </div>

                    <div className="university-profile">
                        <div className="university-profile-text">
                            <strong>
                                Chandigarh University
                            </strong>

                            <span>
                                Institution Admin
                            </span>
                        </div>

                        <div className="university-profile-avatar">
                            CU
                        </div>
                    </div>
                </header>

                <section className="university-content">
                    {children}
                </section>
            </main>
        </div>
    );
}