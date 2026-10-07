import {
    ArrowLeft,
    ArrowRight,
    BriefcaseBusiness,
    CheckCircle2,
    X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

interface OpportunityForm {
    title: string;
    department: string;
    location: string;
    employmentType: string;
    description: string;
    capabilities: string;
    experience: string;
}

export default function RecruiterPostOpportunity() {
    const navigate = useNavigate();

    const [form, setForm] =
        useState<OpportunityForm>({
            title: "",
            department: "",
            location: "",
            employmentType: "",
            description: "",
            capabilities: "",
            experience: "",
        });

    const [loading, setLoading] =
        useState(false);

    const [showSuccess, setShowSuccess] =
        useState(false);

    const [error, setError] =
        useState("");

    const updateField = (
        field: keyof OpportunityForm,
        value: string
    ) => {
        setForm((current) => ({
            ...current,
            [field]: value,
        }));

        if (error) {
            setError("");
        }
    };

    const validate = () => {
        if (!form.title.trim()) {
            return "Please enter an opportunity title.";
        }

        if (!form.department.trim()) {
            return "Please enter the department.";
        }

        if (!form.location.trim()) {
            return "Please enter the job location.";
        }

        if (!form.employmentType) {
            return "Please select an employment type.";
        }

        if (!form.description.trim()) {
            return "Please describe the opportunity.";
        }

        if (form.description.trim().length < 30) {
            return "Opportunity description should contain at least 30 characters.";
        }

        if (!form.capabilities.trim()) {
            return "Please add the capabilities required for this role.";
        }

        if (!form.experience) {
            return "Please select the required experience level.";
        }

        return null;
    };

    const handleSubmit = async (
        event: React.FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();

        setError("");

        const validationError =
            validate();

        if (validationError) {
            setError(validationError);
            return;
        }

        setLoading(true);

        try {
            /*
             * Backend integration will be connected here.
             *
             * For now, we simulate successful publishing.
             */

            await new Promise((resolve) =>
                setTimeout(resolve, 900)
            );

            setShowSuccess(true);
        } catch {
            setError(
                "We couldn't publish this opportunity. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="recruiter-page">
            <div className="recruiter-form-header">
                <button
                    type="button"
                    className="recruiter-back-button"
                    onClick={() =>
                        navigate(
                            "/recruiter/opportunities"
                        )
                    }
                >
                    <ArrowLeft size={15} />
                    Back to opportunities
                </button>

                <span className="recruiter-page-eyebrow">
                    HIRING WORKSPACE
                </span>

                <h2>
                    Post an opportunity
                </h2>

                <p>
                    Define the capability signals you need
                    and let Capability Flow identify relevant
                    talent.
                </p>
            </div>

            <form
                className="recruiter-opportunity-form"
                onSubmit={handleSubmit}
                noValidate
            >
                {error && (
                    <div className="recruiter-form-error">
                        <div>
                            <strong>
                                We need a little more
                                information
                            </strong>

                            <span>{error}</span>
                        </div>

                        <button
                            type="button"
                            onClick={() =>
                                setError("")
                            }
                            aria-label="Close error"
                        >
                            <X size={15} />
                        </button>
                    </div>
                )}

                <div className="recruiter-form-section">
                    <div className="recruiter-form-section-title">
                        <div className="form-section-icon">
                            <BriefcaseBusiness
                                size={17}
                            />
                        </div>

                        <div>
                            <strong>
                                Opportunity details
                            </strong>

                            <span>
                                Basic information about
                                the role.
                            </span>
                        </div>
                    </div>

                    <div className="recruiter-form-grid">
                        <FormField
                            label="Opportunity title"
                            required
                        >
                            <input
                                value={form.title}
                                onChange={(event) =>
                                    updateField(
                                        "title",
                                        event.target
                                            .value
                                    )
                                }
                                placeholder="e.g. Machine Learning Engineer"
                            />
                        </FormField>

                        <FormField
                            label="Department"
                            required
                        >
                            <input
                                value={
                                    form.department
                                }
                                onChange={(event) =>
                                    updateField(
                                        "department",
                                        event.target
                                            .value
                                    )
                                }
                                placeholder="e.g. Artificial Intelligence"
                            />
                        </FormField>

                        <FormField
                            label="Location"
                            required
                        >
                            <input
                                value={
                                    form.location
                                }
                                onChange={(event) =>
                                    updateField(
                                        "location",
                                        event.target
                                            .value
                                    )
                                }
                                placeholder="e.g. Bengaluru / Hybrid"
                            />
                        </FormField>

                        <FormField
                            label="Employment type"
                            required
                        >
                            <select
                                value={
                                    form.employmentType
                                }
                                onChange={(event) =>
                                    updateField(
                                        "employmentType",
                                        event.target
                                            .value
                                    )
                                }
                            >
                                <option value="">
                                    Select type
                                </option>

                                <option value="full-time">
                                    Full-time
                                </option>

                                <option value="part-time">
                                    Part-time
                                </option>

                                <option value="internship">
                                    Internship
                                </option>

                                <option value="contract">
                                    Contract
                                </option>
                            </select>
                        </FormField>

                        <FormField
                            label="Experience level"
                            required
                        >
                            <select
                                value={
                                    form.experience
                                }
                                onChange={(event) =>
                                    updateField(
                                        "experience",
                                        event.target
                                            .value
                                    )
                                }
                            >
                                <option value="">
                                    Select level
                                </option>

                                <option value="entry">
                                    Entry level
                                </option>

                                <option value="junior">
                                    Junior
                                </option>

                                <option value="mid">
                                    Mid-level
                                </option>

                                <option value="senior">
                                    Senior
                                </option>
                            </select>
                        </FormField>
                    </div>
                </div>

                <div className="recruiter-form-section">
                    <div className="recruiter-form-section-title">
                        <div className="form-section-icon">
                            <CheckCircle2 size={17} />
                        </div>

                        <div>
                            <strong>
                                Capability requirements
                            </strong>

                            <span>
                                Tell us what the candidate
                                needs to demonstrate.
                            </span>
                        </div>
                    </div>

                    <FormField
                        label="Required capabilities"
                        required
                        hint="Separate capabilities with commas."
                    >
                        <input
                            value={
                                form.capabilities
                            }
                            onChange={(event) =>
                                updateField(
                                    "capabilities",
                                    event.target
                                        .value
                                )
                            }
                            placeholder="Python, Machine Learning, SQL, TensorFlow"
                        />
                    </FormField>

                    <FormField
                        label="Opportunity description"
                        required
                        hint="Minimum 30 characters."
                    >
                        <textarea
                            value={
                                form.description
                            }
                            onChange={(event) =>
                                updateField(
                                    "description",
                                    event.target
                                        .value
                                )
                            }
                            placeholder="Describe the role, responsibilities and what the candidate will work on..."
                            rows={6}
                        />
                    </FormField>
                </div>

                <div className="recruiter-form-actions">
                    <button
                        type="button"
                        className="recruiter-cancel-button"
                        onClick={() =>
                            navigate(
                                "/recruiter/opportunities"
                            )
                        }
                    >
                        Cancel
                    </button>

                    <button
                        type="submit"
                        className="recruiter-primary-button recruiter-submit-button"
                        disabled={loading}
                    >
                        {loading
                            ? "Publishing..."
                            : "Publish opportunity"}

                        {!loading && (
                            <ArrowRight size={16} />
                        )}
                    </button>
                </div>
            </form>

            {showSuccess && (
                <div className="recruiter-success-overlay">
                    <div className="recruiter-success-modal">
                        <div className="recruiter-success-icon">
                            <CheckCircle2 size={30} />
                        </div>

                        <span className="recruiter-success-eyebrow">
                            OPPORTUNITY PUBLISHED
                        </span>

                        <h3>
                            Your opportunity is live.
                        </h3>

                        <p>
                            Capability Flow can now match
                            evidence-backed candidates
                            against the requirements you
                            defined.
                        </p>

                        <button
                            type="button"
                            className="recruiter-primary-button"
                            onClick={() =>
                                navigate(
                                    "/recruiter/opportunities"
                                )
                            }
                        >
                            View opportunities
                            <ArrowRight size={16} />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

function FormField({
                       label,
                       required = false,
                       hint,
                       children,
                   }: {
    label: string;
    required?: boolean;
    hint?: string;
    children: React.ReactNode;
}) {
    return (
        <label className="recruiter-form-field">
            <span>
                {label}

                {required && (
                    <em>*</em>
                )}
            </span>

            {children}

            {hint && (
                <small>{hint}</small>
            )}
        </label>
    );
}