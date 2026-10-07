import { Routes, Route } from "react-router-dom";

import UniversityLayout from "./UniversityLayout";
import UniversityDashboard from "./UniversityDashboard";
import UniversityStudents from "./UniversityStudents";
import UniversityCapabilities from "./UniversityCapabilities";
import UniversitySkillGaps from "./UniversitySkillGaps";
import UniversityOpportunities from "./UniversityOpportunities";
import UniversityPrograms from "./UniversityPrograms";

import "./university.css";

export default function UniversityApp() {
    return (
        <UniversityLayout>
            <Routes>
                <Route
                    index
                    element={<UniversityDashboard />}
                />

                <Route
                    path="students"
                    element={<UniversityStudents />}
                />

                <Route
                    path="capabilities"
                    element={<UniversityCapabilities />}
                />

                <Route
                    path="skill-gaps"
                    element={<UniversitySkillGaps />}
                />

                <Route
                    path="opportunities"
                    element={<UniversityOpportunities />}
                />

                <Route
                    path="programs"
                    element={<UniversityPrograms />}
                />
            </Routes>
        </UniversityLayout>
    );
}