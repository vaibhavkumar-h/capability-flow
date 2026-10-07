import { Routes, Route } from "react-router-dom";

import RecruiterLayout from "./RecruiterLayout";
import RecruiterDashboard from "./RecruiterDashboard";
import RecruiterTalent from "./RecruiterTalent";
import RecruiterOpportunities from "./RecruiterOpportunities";
import RecruiterShortlists from "./RecruiterShortlists";
import RecruiterSkillDemand from "./RecruiterSkillDemand";
import RecruiterPostOpportunity from "./RecruiterPostOpportunity";

import "./recruiter.css";

export default function RecruiterApp() {
    return (
        <RecruiterLayout>
            <Routes>
                <Route
                    index
                    element={<RecruiterDashboard />}
                />

                <Route
                    path="talent"
                    element={<RecruiterTalent />}
                />

                <Route
                    path="opportunities"
                    element={<RecruiterOpportunities />}
                />

                <Route
                    path="shortlists"
                    element={<RecruiterShortlists />}
                />

                <Route
                    path="skill-demand"
                    element={<RecruiterSkillDemand />}
                />

                <Route
                    path="post-opportunity"
                    element={<RecruiterPostOpportunity />}
                />
            </Routes>
        </RecruiterLayout>
    );
}