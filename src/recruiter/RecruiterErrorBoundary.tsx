import {
    Component,
    type ErrorInfo,
    type ReactNode,
} from "react";

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
    errorMessage: string;
}

export default class RecruiterErrorBoundary extends Component<
    Props,
    State
> {
    state: State = {
        hasError: false,
        errorMessage: "",
    };

    static getDerivedStateFromError(
        error: Error
    ): State {
        return {
            hasError: true,
            errorMessage:
                error.message ||
                "An unexpected error occurred.",
        };
    }

    componentDidCatch(
        error: Error,
        errorInfo: ErrorInfo
    ) {
        console.error(
            "Recruiter portal error:",
            error,
            errorInfo
        );
    }

    handleRetry = () => {
        this.setState({
            hasError: false,
            errorMessage: "",
        });
    };

    render() {
        if (this.state.hasError) {
            return (
                <div className="recruiter-fatal-error">
                    <div className="recruiter-fatal-card">
                        <div className="recruiter-fatal-icon">
                            !
                        </div>

                        <div className="recruiter-fatal-eyebrow">
                            RECRUITER WORKSPACE
                        </div>

                        <h1>
                            Something went wrong
                        </h1>

                        <p>
                            The recruiter workspace
                            encountered an unexpected
                            problem. Your account and
                            saved data are safe.
                        </p>

                        {this.state.errorMessage && (
                            <div className="recruiter-error-detail">
                                {this.state.errorMessage}
                            </div>
                        )}

                        <button
                            type="button"
                            onClick={this.handleRetry}
                            className="recruiter-retry-button"
                        >
                            Try again
                        </button>

                        <button
                            type="button"
                            onClick={() =>
                                window.location.href =
                                    "/login/recruiter"
                            }
                            className="recruiter-back-login"
                        >
                            Return to recruiter login
                        </button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}