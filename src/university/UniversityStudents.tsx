import {
    ArrowUpRight,
    Search,
    SlidersHorizontal,
    Users,
} from "lucide-react";
import { useState } from "react";

const students = [
    {
        name: "Aarav Sharma",
        program: "B.Tech CSE",
        year: "3rd Year",
        capabilities: "Python, ML, SQL",
        readiness: "High",
    },
    {
        name: "Ananya Verma",
        program: "B.Tech CSE",
        year: "4th Year",
        capabilities: "React, Node.js, TypeScript",
        readiness: "High",
    },
    {
        name: "Rohan Singh",
        program: "B.Tech AI & ML",
        year: "3rd Year",
        capabilities: "Python, TensorFlow, NLP",
        readiness: "Growing",
    },
    {
        name: "Priya Gupta",
        program: "B.Tech CSE",
        year: "2nd Year",
        capabilities: "Java, SQL, DSA",
        readiness: "Developing",
    },
    {
        name: "Kabir Mehta",
        program: "B.Tech CSE",
        year: "4th Year",
        capabilities: "AWS, Docker, Python",
        readiness: "High",
    },
];

export default function UniversityStudents() {
    const [search, setSearch] = useState("");

    const filteredStudents = students.filter((student) =>
        `${student.name} ${student.program} ${student.capabilities}`
            .toLowerCase()
            .includes(search.toLowerCase())
    );

    return (
        <div className="university-page">
            <div className="university-page-header">
                <div>
                    <span className="university-page-eyebrow">
                        STUDENT ECOSYSTEM
                    </span>

                    <h2>Students</h2>

                    <p>
                        Explore student capability profiles and
                        opportunity readiness.
                    </p>
                </div>

                <div className="page-stat">
                    <Users size={18} />
                    <strong>2,846</strong>
                    <span>active profiles</span>
                </div>
            </div>

            <div className="university-toolbar">
                <div className="university-search">
                    <Search size={17} />

                    <input
                        value={search}
                        onChange={(event) =>
                            setSearch(event.target.value)
                        }
                        placeholder="Search students, programs or capabilities..."
                    />
                </div>

                <button className="university-filter-button">
                    <SlidersHorizontal size={16} />
                    Filters
                </button>
            </div>

            <div className="university-table-card">
                <div className="university-table-header">
                    <span>Student</span>
                    <span>Program</span>
                    <span>Capabilities</span>
                    <span>Readiness</span>
                    <span />
                </div>

                {filteredStudents.map((student) => (
                    <div
                        className="university-table-row"
                        key={student.name}
                    >
                        <div className="student-cell">
                            <div className="student-avatar">
                                {student.name
                                    .split(" ")
                                    .map((part) =>
                                        part[0]
                                    )
                                    .join("")}
                            </div>

                            <div>
                                <strong>
                                    {student.name}
                                </strong>

                                <span>
                                    {student.year}
                                </span>
                            </div>
                        </div>

                        <span>{student.program}</span>

                        <span className="capability-pills">
                            {student.capabilities}
                        </span>

                        <span
                            className={`readiness-pill ${student.readiness
                                .toLowerCase()
                                .replace(" ", "-")}`}
                        >
                            {student.readiness}
                        </span>

                        <button
                            className="table-action"
                            aria-label={`View ${student.name}`}
                        >
                            <ArrowUpRight size={16} />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}