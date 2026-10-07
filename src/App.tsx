import { useState, type ComponentType, type ReactNode } from "react";
import { motion } from "framer-motion";
import {
    ArrowLeft,
    ArrowRight,
    BriefcaseBusiness,
    Building2,
    CheckCircle2,
    CircleCheckBig,
    Cloud,
    Database,
    Eye,
    EyeOff,
    FileText,
    GraduationCap,
    KeyRound,
    Mail,
    Menu,
    Network,
    Phone,
    Rocket,
    Search,
    ShieldCheck,
    Sparkles,
    UserRound,
    X,
} from "lucide-react";
import {
    Link,
    Route,
    Routes,
    useLocation,
    useNavigate,
} from "react-router-dom";
import { supabase } from "./lib/supabase";

/* =========================================================
   FLOW DATA
   ========================================================= */

const flowItems = [
    {
        title: "Learn",
        text: "Gain knowledge from courses",
        icon: GraduationCap,
    },
    {
        title: "Evidence",
        text: "Showcase real projects & work",
        icon: CheckCircle2,
    },
    {
        title: "Capability",
        text: "Build a verified skill profile",
        icon: Network,
    },
    {
        title: "Gap",
        text: "Discover what to learn next",
        icon: Search,
    },
    {
        title: "Mobility",
        text: "Explore growth pathways",
        icon: Rocket,
    },
    {
        title: "Opportunity",
        text: "Connect to jobs, internships & more",
        icon: BriefcaseBusiness,
    },
];

/* =========================================================
   LOGO
   ========================================================= */

function Logo() {
    return (
        <Link to="/" className="logo">
      <span className="logo-mark">
        <span />
        <span />
        <span />
      </span>

            <span>
        Capability<span>Flow</span>
      </span>
        </Link>
    );
}

/* =========================================================
   FLOATING CARD
   ========================================================= */

function FloatingCard({
                          className,
                          children,
                      }: {
    className: string;
    children: ReactNode;
}) {
    return <div className={`float-card ${className}`}>{children}</div>;
}

/* =========================================================
   ICON TILE
   ========================================================= */

function IconTile({
                      icon: Icon,
                      label,
                      className = "",
                  }: {
    icon: ComponentType<{ size?: number }>;
    label: string;
    className?: string;
}) {
    return (
        <FloatingCard className={`icon-tile ${className}`}>
      <span className="tile-icon">
        <Icon size={25} />
      </span>

            <strong>{label}</strong>
        </FloatingCard>
    );
}

/* =========================================================
   CAPABILITY SCENE
   ========================================================= */

function CapabilityScene() {
    return (
        <div className="capability-scene" aria-hidden="true">
            <div className="scene-glow" />

            <div className="orbit orbit-one" />
            <div className="orbit orbit-two" />
            <div className="orbit orbit-three" />

            <div className="scene-core">
                <span className="core-logo">C</span>
                <span>CAPABILITY</span>
                <small>FLOW</small>
            </div>

            <FloatingCard className="github tile-github">
                <span className="brand-symbol dark">GH</span>
                <strong>GitHub</strong>
            </FloatingCard>

            <FloatingCard className="github tile-vscode">
                <span className="brand-symbol blue">VS</span>
                <strong>VS Code</strong>
            </FloatingCard>

            <FloatingCard className="github tile-python">
                <span className="brand-symbol python">Py</span>
                <strong>Python</strong>
            </FloatingCard>

            <FloatingCard className="resume-card">
                <FileText size={21} />

                <div>
                    <strong>Resume</strong>
                    <small>Evidence profile</small>
                </div>
            </FloatingCard>

            <FloatingCard className="certificate-card">
                <ShieldCheck size={22} />

                <div>
                    <strong>Certificates</strong>
                    <small>Verified learning</small>
                </div>
            </FloatingCard>

            <FloatingCard className="jobs-card">
                <BriefcaseBusiness size={21} />

                <div>
                    <strong>Job Opportunities</strong>
                    <small>12 new matches</small>
                </div>
            </FloatingCard>

            <FloatingCard className="skills-card">
                <strong>Skills</strong>

                <div>
                    <span>Python</span>
                    <span>React</span>
                    <span>SQL</span>
                    <span>AWS</span>
                </div>
            </FloatingCard>

            <FloatingCard className="code-card">
                <div className="code-top">
                    <span />
                    <span />
                    <span />
                </div>

                <pre>{`const capability = {
  skills: [Python, SQL],
  evidence: verified
}`}</pre>
            </FloatingCard>

            <IconTile
                icon={Database}
                label="Data"
                className="database-card"
            />

            <IconTile
                icon={Cloud}
                label="Cloud"
                className="cloud-card"
            />

            <div className="pathway">
                <div className="city">
                    <i />
                    <i />
                    <i />
                    <i />
                    <i />
                    <i />
                </div>

                <div className="portal" />
            </div>

            <div className="person person-one" />
            <div className="person person-two" />
            <div className="person person-three" />
        </div>
    );
}

/* =========================================================
   NAVBAR
   ========================================================= */

function Navbar() {
    const [open, setOpen] = useState(false);

    return (
        <header className="navbar">
            <Logo />

            <nav className={open ? "nav-links open" : "nav-links"}>
                <a href="#product" onClick={() => setOpen(false)}>
                    Product
                </a>

                <a href="#flow" onClick={() => setOpen(false)}>
                    How it Works
                </a>

                <a href="#ecosystem" onClick={() => setOpen(false)}>
                    Ecosystem
                </a>

                <a href="#resources" onClick={() => setOpen(false)}>
                    Resources
                </a>

                <Link
                    className="nav-login"
                    to="/login"
                    onClick={() => setOpen(false)}
                >
                    Login
                </Link>

                <Link
                    className="nav-cta"
                    to="/login"
                    onClick={() => setOpen(false)}
                >
                    Get Started <ArrowRight size={15} />
                </Link>
            </nav>

            <button
                className="menu-btn"
                onClick={() => setOpen(!open)}
                aria-label="Toggle navigation"
            >
                {open ? <X /> : <Menu />}
            </button>
        </header>
    );
}

/* =========================================================
   LANDING
   ========================================================= */

function Landing() {
    return (
        <main>
            <Navbar />

            <section className="hero" id="product">
                <div className="hero-background">
                    <div className="sun-glow" />
                    <div className="horizon" />
                </div>

                <div className="hero-content">
                    <div className="hero-copy">
                        <motion.div
                            className="eyebrow"
                            initial={{ opacity: 0, y: 14 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7 }}
                        >
                            FROM LEARNING TO OPPORTUNITY
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 25 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            Turn Capability
                            <br />
                            into <span>Opportunity.</span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 18 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1, duration: 0.7 }}
                        >
                            Evidence-backed intelligence for the talent ecosystem.
                            Build your profile. Discover your skill gaps. Explore
                            where your capabilities can take you next.
                        </motion.p>

                        <div className="hero-actions">
                            <Link to="/login" className="primary-btn">
                                Get Started <ArrowRight size={17} />
                            </Link>

                            <a href="#flow" className="secondary-btn">
                                Explore
                            </a>
                        </div>

                        <div className="stats">
                            <div>
                                <strong>1M+</strong>
                                <span>Learners</span>
                            </div>

                            <div>
                                <strong>500+</strong>
                                <span>Partner Companies</span>
                            </div>

                            <div>
                                <strong>10K+</strong>
                                <span>Verified Skills</span>
                            </div>

                            <div>
                                <strong>4</strong>
                                <span>Talent Portals</span>
                            </div>
                        </div>
                    </div>

                    <div className="hero-visual">
                        <CapabilityScene />
                    </div>
                </div>

                <div className="flow-strip" id="flow">
                    {flowItems.map((item, i) => {
                        const Icon = item.icon;

                        return (
                            <div className="flow-item" key={item.title}>
                <span className="flow-icon">
                  <Icon size={17} />
                </span>

                                <div>
                                    <strong>{item.title}</strong>
                                    <small>{item.text}</small>
                                </div>

                                {i < flowItems.length - 1 && (
                                    <span className="flow-divider" />
                                )}
                            </div>
                        );
                    })}
                </div>
            </section>

            <section className="ecosystem" id="ecosystem">
                <div className="section-heading">
                    <h2>Built for the entire talent ecosystem</h2>

                    <p>
                        A unified platform for learners, educational institutions,
                        employers and governments.
                    </p>
                </div>

                <div className="eco-grid">
                    <EcoCard
                        icon={GraduationCap}
                        title="Learners"
                        text="Build your capability profile and unlock opportunities."
                    />

                    <EcoCard
                        icon={Building2}
                        title="Educational Institutions"
                        text="Showcase outcomes and improve learner success."
                    />

                    <EcoCard
                        icon={BriefcaseBusiness}
                        title="Employers"
                        text="Find verified talent and close skill gaps faster."
                    />

                    <EcoCard
                        icon={Building2}
                        title="Governments"
                        text="Strengthen the workforce with real capability data."
                    />
                </div>
            </section>

            <footer>
                <Logo />

                <span>
          Capability intelligence for a more connected workforce.
        </span>
            </footer>
        </main>
    );
}

/* =========================================================
   ECO CARD
   ========================================================= */

function EcoCard({
                     icon: Icon,
                     title,
                     text,
                 }: {
    icon: ComponentType<{ size?: number }>;
    title: string;
    text: string;
}) {
    return (
        <article className="eco-card">
      <span className="eco-icon">
        <Icon size={20} />
      </span>

            <h3>{title}</h3>

            <p>{text}</p>

            <a href="#product">
                Explore <ArrowRight size={14} />
            </a>
        </article>
    );
}

/* =========================================================
   ROLE SELECTION
   ========================================================= */

const roleOptions = [
    {
        id: "student",
        title: "Student / Professional",
        description:
            "Build your capability profile, discover skill gaps and explore your next opportunity.",
        icon: GraduationCap,
        accent: "blue",
    },
    {
        id: "recruiter",
        title: "Recruiter / Employer",
        description:
            "Find talent based on demonstrated capability, evidence and transferable skills.",
        icon: BriefcaseBusiness,
        accent: "cyan",
    },
    {
        id: "university",
        title: "University / Institution",
        description:
            "Understand learner capabilities and align education with changing industry demand.",
        icon: Building2,
        accent: "violet",
    },
];

function RoleSelection() {
    const navigate = useNavigate();

    return (
        <main className="role-page">
            <div className="role-background">
                <div className="role-light role-light-one" />
                <div className="role-light role-light-two" />
                <div className="role-grid" />
            </div>

            <div className="role-scene">
                <CapabilityScene />
            </div>

            <header className="role-top">
                <Logo />

                <Link to="/" className="back-home">
                    <ArrowLeft size={14} />
                    Back to Home
                </Link>
            </header>

            <section className="role-content">
                <motion.div
                    className="role-heading"
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.55 }}
                >
                    <div className="role-eyebrow">
                        CAPABILITY FLOW
                    </div>

                    <h1>
                        How will you use
                        <span> Capability Flow?</span>
                    </h1>

                    <p>
                        Choose your workspace to enter the intelligence layer
                        built for your role in the talent ecosystem.
                    </p>
                </motion.div>

                <div className="role-grid-cards">
                    {roleOptions.map((role, index) => {
                        const Icon = role.icon;

                        return (
                            <motion.button
                                key={role.id}
                                className={`role-card role-${role.accent}`}
                                onClick={() =>
                                    navigate(`/login/${role.id}`)
                                }
                                initial={{ opacity: 0, y: 28 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                    delay: index * 0.1,
                                    duration: 0.55,
                                }}
                            >
                <span className="role-icon">
                  <Icon size={27} />
                </span>

                                <span className="role-card-content">
                  <strong>{role.title}</strong>
                  <span>{role.description}</span>
                </span>

                                <span className="role-arrow">
                  <ArrowRight size={17} />
                </span>
                            </motion.button>
                        );
                    })}
                </div>

                <div className="role-footer">
                    <ShieldCheck size={14} />

                    <span>
            One intelligence graph. Different perspectives.
          </span>
                </div>
            </section>
        </main>
    );
}

/* =========================================================
   LOGIN
   ========================================================= */

const roleNames: Record<string, string> = {
    student: "Student / Professional",
    recruiter: "Recruiter / Employer",
    university: "University / Institution",
};

function AccountCreatedModal({
                                 fullName,
                                 onContinue,
                                 onClose,
                             }: {
    fullName: string;
    onContinue: () => void;
    onClose: () => void;
}) {
    const firstName =
        fullName.trim().split(" ")[0] || "there";

    return (
        <div className="account-success-overlay">
            <motion.div
                className="account-success-modal"
                initial={{
                    opacity: 0,
                    scale: 0.9,
                    y: 25,
                }}
                animate={{
                    opacity: 1,
                    scale: 1,
                    y: 0,
                }}
                transition={{
                    duration: 0.45,
                    ease: [0.22, 1, 0.36, 1],
                }}
            >
                <div className="success-glow success-glow-one" />
                <div className="success-glow success-glow-two" />

                <button
                    type="button"
                    className="success-close"
                    onClick={onClose}
                    aria-label="Close"
                >
                    <X size={17} />
                </button>

                <div className="success-icon-wrapper">
                    <motion.div
                        className="success-icon-ring"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{
                            delay: 0.15,
                            duration: 0.4,
                            type: "spring",
                            stiffness: 180,
                        }}
                    >
                        <CircleCheckBig
                            size={40}
                            strokeWidth={2.2}
                        />
                    </motion.div>

                    <span className="success-spark spark-one">
                        <Sparkles size={13} />
                    </span>

                    <span className="success-spark spark-two">
                        <Sparkles size={11} />
                    </span>
                </div>

                <div className="success-content">
                    <div className="success-eyebrow">
                        ACCOUNT CREATED
                    </div>

                    <h2>
                        You're all set,
                        <br />
                        <span>{firstName}.</span>
                    </h2>

                    <p className="success-main-text">
                        Your Capability Flow account has been
                        created successfully.
                    </p>

                    <div className="workspace-ready-box">
                        <div className="workspace-ready-icon">
                            <Network size={20} />
                        </div>

                        <div>
                            <strong>
                                Your workspace is ready
                            </strong>

                            <p>
                                Start building your capability
                                profile and discover your next
                                opportunity.
                            </p>
                        </div>
                    </div>

                    <button
                        type="button"
                        className="success-primary-btn"
                        onClick={onContinue}
                    >
                        Continue to Capability Flow
                        <ArrowRight size={17} />
                    </button>

                    <button
                        type="button"
                        className="success-secondary-btn"
                        onClick={onClose}
                    >
                        Stay here for now
                    </button>

                    <div className="success-footer">
                        <span className="success-dot" />
                        Capability Flow workspace initialized
                    </div>
                </div>
            </motion.div>
        </div>
    );
}

function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] =
        useState(false);

    const [isCreateAccount, setIsCreateAccount] =
        useState(false);

    const [fullName, setFullName] = useState("");
    const [mobile, setMobile] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] =
        useState("");

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const [showAccountCreated, setShowAccountCreated] = useState(false);

    const location = useLocation();
    const navigate = useNavigate();

    const roleKey =
        location.pathname.split("/").pop() || "student";

    const roleName =
        roleNames[roleKey] || "Capability Flow";

    const clearMessages = () => {
        setError("");
        setMessage("");
    };

    /* =======================================================
       AUTH SUBMIT
       ======================================================= */

    const handleSubmit = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();

        clearMessages();
        setLoading(true);

        try {
            /* =====================================================
               CREATE ACCOUNT
               ===================================================== */

            if (isCreateAccount) {
                if (!fullName.trim()) {
                    setError("Full name is required.");
                    return;
                }

                if (!mobile.trim()) {
                    setError("Mobile number is required.");
                    return;
                }

                if (!email.trim()) {
                    setError("Email address is required.");
                    return;
                }

                if (password.length < 6) {
                    setError(
                        "Password must be at least 6 characters."
                    );
                    return;
                }

                if (password !== confirmPassword) {
                    setError("Passwords do not match.");
                    return;
                }

                /*
                 * Email is the ONLY authentication identifier.
                 *
                 * Mobile number is stored as profile information
                 * through user metadata.
                 */

                const { data, error: signupError } =
                    await supabase.auth.signUp({
                        email: email.trim(),
                        password,
                        options: {
                            data: {
                                full_name: fullName.trim(),
                                role: roleKey,
                                phone: mobile.trim(),
                            },
                        },
                    });

                if (signupError) {
                    throw signupError;
                }

                if (!data.session) {
                    setMessage(
                        "Account created. Please check your email to verify your account."
                    );
                    return;
                }

                /*
                 * If email confirmation is enabled in Supabase,
                 * there will be no session yet.
                 */

                if (!data.session) {
                    setShowAccountCreated(true);
                    return;
                }

                setShowAccountCreated(true);
                return;

                setTimeout(() => {
                    navigate(`/dashboard/${roleKey}`);
                }, 700);

                return;
            }

            /* =====================================================
               LOGIN
               ===================================================== */

            if (!email.trim()) {
                setError("Email address is required.");
                return;
            }

            if (!password) {
                setError("Password is required.");
                return;
            }

            /*
             * Email + password ONLY.
             */

            const { data, error: loginError } =
                await supabase.auth.signInWithPassword({
                    email: email.trim(),
                    password,
                });

            if (loginError) {
                throw loginError;
            }

            if (!data.user) {
                throw new Error(
                    "Unable to sign in. Please try again."
                );
            }

            setMessage("Signed in successfully.");

            setTimeout(() => {
                navigate(`/dashboard/${roleKey}`);
            }, 500);
        } catch (err) {
            const errorMessage =
                err instanceof Error
                    ? err.message
                    : "Something went wrong. Please try again.";

            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    /* =======================================================
       LOGIN PAGE UI
       ======================================================= */

    return (
        <main className="login-page">
            {showAccountCreated && (
                <AccountCreatedModal
                    fullName={fullName}
                    onContinue={() => {
                        setShowAccountCreated(false);
                        navigate(`/dashboard/${roleKey}`);
                    }}
                    onClose={() => {
                        setShowAccountCreated(false);
                    }}
                />
            )}
            <div className="login-bg">
                <div className="login-light" />
                <div className="login-grid" />
            </div>

            <div className="login-scene">
                <CapabilityScene />
            </div>

            <div className="login-top">
                <Logo />

                <Link to="/login" className="back-home">
                    <ArrowLeft size={14} />
                    Back to Roles
                </Link>
            </div>

            <section className="login-card">
                <div className="login-heading">
                    <div className="login-role-label">
                        {roleName}
                    </div>

                    <h1>
                        {isCreateAccount
                            ? "Create Account"
                            : "Welcome Back"}
                    </h1>

                    <p>
                        {isCreateAccount
                            ? "Create your Capability Flow workspace"
                            : "Sign in to continue to your Capability Flow workspace"}
                    </p>
                </div>

                {/* =================================================
            LOGIN / CREATE ACCOUNT TABS
        ================================================= */}

                <div className="auth-tabs">
                    <button
                        type="button"
                        className={!isCreateAccount ? "active" : ""}
                        onClick={() => {
                            setIsCreateAccount(false);
                            clearMessages();
                        }}
                    >
                        Login
                    </button>

                    <button
                        type="button"
                        className={isCreateAccount ? "active" : ""}
                        onClick={() => {
                            setIsCreateAccount(true);
                            clearMessages();
                        }}
                    >
                        Create Account
                    </button>
                </div>

                {/* =================================================
            AUTH MESSAGES
        ================================================= */}

                {error && (
                    <div className="auth-message auth-error">
                        {error}
                    </div>
                )}

                {message && (
                    <div className="auth-message auth-success">
                        {message}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    {/* =================================================
              CREATE ACCOUNT
          ================================================= */}

                    {isCreateAccount && (
                        <>
                            {/* FULL NAME */}

                            <label htmlFor="full-name">
                                Full name
                            </label>

                            <div className="input-wrap">
                                <UserRound size={17} />

                                <input
                                    id="full-name"
                                    type="text"
                                    placeholder="Your full name"
                                    autoComplete="name"
                                    value={fullName}
                                    onChange={(e) =>
                                        setFullName(e.target.value)
                                    }
                                    required
                                />
                            </div>

                            {/* MOBILE */}

                            <label htmlFor="mobile">
                                Mobile number
                            </label>

                            <div className="input-wrap">
                                <Phone size={17} />

                                <input
                                    id="mobile"
                                    type="tel"
                                    placeholder="+91 98765 43210"
                                    autoComplete="tel"
                                    value={mobile}
                                    onChange={(e) =>
                                        setMobile(e.target.value)
                                    }
                                    required
                                />
                            </div>

                            {/* EMAIL */}

                            <label htmlFor="email">
                                Email address
                            </label>

                            <div className="input-wrap">
                                <Mail size={17} />

                                <input
                                    id="email"
                                    type="email"
                                    placeholder="Email address"
                                    autoComplete="email"
                                    value={email}
                                    onChange={(e) =>
                                        setEmail(e.target.value)
                                    }
                                    required
                                />
                            </div>

                            {/* PASSWORD */}

                            <label htmlFor="password">
                                Password
                            </label>

                            <div className="input-wrap">
                                <KeyRound size={17} />

                                <input
                                    id="password"
                                    type={
                                        showPassword
                                            ? "text"
                                            : "password"
                                    }
                                    placeholder="Password"
                                    autoComplete="new-password"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    required
                                />

                                <button
                                    type="button"
                                    aria-label={
                                        showPassword
                                            ? "Hide password"
                                            : "Show password"
                                    }
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                >
                                    {showPassword ? (
                                        <EyeOff size={16} />
                                    ) : (
                                        <Eye size={16} />
                                    )}
                                </button>
                            </div>

                            {/* CONFIRM PASSWORD */}

                            <label htmlFor="confirm-password">
                                Confirm password
                            </label>

                            <div className="input-wrap">
                                <KeyRound size={17} />

                                <input
                                    id="confirm-password"
                                    type={
                                        showConfirmPassword
                                            ? "text"
                                            : "password"
                                    }
                                    placeholder="Confirm password"
                                    autoComplete="new-password"
                                    value={confirmPassword}
                                    onChange={(e) =>
                                        setConfirmPassword(
                                            e.target.value
                                        )
                                    }
                                    required
                                />

                                <button
                                    type="button"
                                    aria-label={
                                        showConfirmPassword
                                            ? "Hide password"
                                            : "Show password"
                                    }
                                    onClick={() =>
                                        setShowConfirmPassword(
                                            !showConfirmPassword
                                        )
                                    }
                                >
                                    {showConfirmPassword ? (
                                        <EyeOff size={16} />
                                    ) : (
                                        <Eye size={16} />
                                    )}
                                </button>
                            </div>
                        </>
                    )}

                    {/* =================================================
              LOGIN - EMAIL ONLY
          ================================================= */}

                    {!isCreateAccount && (
                        <>
                            <label htmlFor="login-email">
                                Email address
                            </label>

                            <div className="input-wrap">
                                <Mail size={17} />

                                <input
                                    id="login-email"
                                    type="email"
                                    placeholder="Email address"
                                    autoComplete="email"
                                    value={email}
                                    onChange={(e) =>
                                        setEmail(e.target.value)
                                    }
                                    required
                                />
                            </div>

                            {/* PASSWORD */}

                            <label htmlFor="login-password">
                                Password
                            </label>

                            <div className="input-wrap">
                                <KeyRound size={17} />

                                <input
                                    id="login-password"
                                    type={
                                        showPassword
                                            ? "text"
                                            : "password"
                                    }
                                    placeholder="Password"
                                    autoComplete="current-password"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    required
                                />

                                <button
                                    type="button"
                                    aria-label={
                                        showPassword
                                            ? "Hide password"
                                            : "Show password"
                                    }
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                >
                                    {showPassword ? (
                                        <EyeOff size={16} />
                                    ) : (
                                        <Eye size={16} />
                                    )}
                                </button>
                            </div>

                            <div className="form-meta">
                                <label className="remember">
                                    <input type="checkbox" />
                                    Remember me
                                </label>

                                <button
                                    type="button"
                                    onClick={() =>
                                        setError(
                                            "Password reset will be connected next."
                                        )
                                    }
                                >
                                    Forgot password?
                                </button>
                            </div>
                        </>
                    )}

                    {/* =================================================
              SUBMIT
          ================================================= */}

                    <button
                        type="submit"
                        className="login-btn"
                        disabled={loading}
                    >
                        {loading
                            ? "Please wait..."
                            : isCreateAccount
                                ? "Create Account"
                                : "Sign In"}

                        {!loading && <ArrowRight size={16} />}
                    </button>
                </form>

                {/* =================================================
            GOOGLE PLACEHOLDER
        ================================================= */}

                <div className="divider">
          <span>
            {isCreateAccount
                ? "or sign up with"
                : "or continue with"}
          </span>
                </div>

                <button
                    type="button"
                    className="google-btn"
                    onClick={() =>
                        setError(
                            "Google authentication will be connected next."
                        )
                    }
                >
                    <span>G</span>

                    {isCreateAccount
                        ? "Sign up with Google"
                        : "Continue with Google"}
                </button>

                {/* =================================================
            SWITCH AUTH MODE
        ================================================= */}

                <p className="signup-copy">
                    {isCreateAccount
                        ? "Already have an account?"
                        : "New to Capability Flow?"}

                    {" "}

                    <button
                        type="button"
                        onClick={() => {
                            setIsCreateAccount(!isCreateAccount);
                            clearMessages();
                        }}
                    >
                        {isCreateAccount
                            ? "Sign in"
                            : "Create an account"}
                    </button>
                </p>
            </section>
        </main>
    );
}

/* =========================================================
   ROUTES
   ========================================================= */

export default function App() {
    return (
        <Routes>
            <Route path="/" element={<Landing />} />

            {/* Role selection */}
            <Route
                path="/login"
                element={<RoleSelection />}
            />

            {/* Student */}
            <Route
                path="/login/student"
                element={<Login />}
            />

            {/* Recruiter */}
            <Route
                path="/login/recruiter"
                element={<Login />}
            />

            {/* University */}
            <Route
                path="/login/university"
                element={<Login />}
            />
        </Routes>
    );
}