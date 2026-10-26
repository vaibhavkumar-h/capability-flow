import { useRef, useState } from "react";



type AnalysisResult = {

  success: boolean;

  filename: string;

  file_type: string;

  text_length: number;

  text: string;

};



export default function Resume() {

  const fileInputRef = useRef<HTMLInputElement>(null);



  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [isDragging, setIsDragging] = useState(false);



  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const [analysisResult, setAnalysisResult] =

    useState<AnalysisResult | null>(null);



  const [error, setError] = useState("");



  // =========================================================

  // FILE HANDLING

  // =========================================================



  const handleFile = (file: File | undefined) => {

    if (!file) return;



    const allowedTypes = [

      "application/pdf",

      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",

    ];



    if (!allowedTypes.includes(file.type)) {

      setError("Please upload a PDF or DOCX file.");

      return;

    }



    if (file.size > 10 * 1024 * 1024) {

      setError("File size must be less than 10 MB.");

      return;

    }



    setError("");

    setAnalysisResult(null);

    setSelectedFile(file);

  };



  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {

    event.preventDefault();



    setIsDragging(false);



    const file = event.dataTransfer.files[0];



    handleFile(file);

  };



  const handleBrowse = () => {

    fileInputRef.current?.click();

  };



  const removeFile = () => {

    setSelectedFile(null);

    setAnalysisResult(null);

    setError("");



    if (fileInputRef.current) {

      fileInputRef.current.value = "";

    }

  };



  // =========================================================

  // REAL BACKEND CONNECTION

  // =========================================================



  const analyzeResume = async () => {

    if (!selectedFile) return;



    setIsAnalyzing(true);

    setError("");

    setAnalysisResult(null);



    try {

      const formData = new FormData();



      formData.append("file", selectedFile);



      const response = await fetch(

        `${import.meta.env.VITE_API_URL || "http://127.0.0.1:8000"}/api/resume/analyze`,

        {

          method: "POST",

          body: formData,

        }

      );



      const data = await response.json();



      if (!response.ok || !data.success) {

        throw new Error(

          data.error || "Resume analysis failed."

        );

      }



      setAnalysisResult(data);




      // Persist the extracted resume text for the Evidence page.



      localStorage.setItem(



        "capabilityflow_resume_text",



        data.text



      );




      localStorage.setItem(



        "capabilityflow_resume_filename",



        data.filename



      );
    } catch (err) {

      console.error("Resume analysis error:", err);



      setError(

        err instanceof Error

          ? err.message

          : "Unable to connect to CapabilityFlow backend."

      );



    } finally {

      setIsAnalyzing(false);

    }

  };



  // =========================================================

  // UI

  // =========================================================



  return (

    <div style={styles.page}>



      {/* =====================================================

          TOP BAR

      ====================================================== */}



      <header style={styles.header}>



        <div>

          <div style={styles.brand}>

            CapabilityFlow

          </div>



          <div style={styles.subtitle}>

            Evidence-based capability intelligence

          </div>

        </div>



        <div style={styles.headerRight}>



          <div style={styles.statusDot}></div>



          <span>

            Backend Connected

          </span>



        </div>



      </header>





      {/* =====================================================

          MAIN

      ====================================================== */}



      <main style={styles.main}>



        {/* Breadcrumb */}



        <div style={styles.breadcrumb}>

          Dashboard

          <span style={styles.breadcrumbSeparator}>/</span>

          Resume Analysis

        </div>





        {/* ===================================================

            HERO

        ==================================================== */}



        <section style={styles.hero}>



          <div>



            <div style={styles.eyebrow}>

              CAPABILITY EVIDENCE

            </div>



            <h1 style={styles.title}>

              Turn your resume into

              <br />



              <span style={styles.gradientText}>

                capability intelligence.

              </span>

            </h1>



            <p style={styles.description}>

              Upload your resume to extract claimed skills,

              projects, technologies and experience. CapabilityFlow

              will use this information as the first layer of your

              evidence graph.

            </p>



          </div>





          <div style={styles.heroBadge}>



            <div style={styles.badgeIcon}>

              ✦

            </div>



            <div>

              <strong style={styles.badgeTitle}>

                Evidence-first

              </strong>



              <span style={styles.badgeText}>

                No unsupported claims

              </span>

            </div>



          </div>



        </section>





        {/* ===================================================

            UPLOAD CARD

        ==================================================== */}



        <section style={styles.card}>



          <div style={styles.cardHeader}>



            <div>



              <h2 style={styles.cardTitle}>

                Upload your resume

              </h2>



              <p style={styles.cardDescription}>

                CapabilityFlow accepts PDF and DOCX resumes.

                Your document will be processed by the local

                CapabilityFlow backend.

              </p>



            </div>



            <div style={styles.fileTypes}>

              PDF · DOCX

            </div>



          </div>





          {/* =================================================

              DROP ZONE

          ================================================== */}



          {!selectedFile ? (



            <div

              style={{

                ...styles.dropZone,



                ...(isDragging

                  ? styles.dropZoneActive

                  : {}),

              }}



              onDragOver={(event) => {

                event.preventDefault();

                setIsDragging(true);

              }}



              onDragLeave={() => {

                setIsDragging(false);

              }}



              onDrop={handleDrop}



              onClick={handleBrowse}

            >



              <div style={styles.uploadIcon}>

                ↑

              </div>



              <h3 style={styles.dropTitle}>

                Drop your resume here

              </h3>



              <p style={styles.dropText}>

                or click to browse from your computer

              </p>



              <div style={styles.dropHint}>

                PDF or DOCX · Maximum 10 MB

              </div>



              <input

                ref={fileInputRef}

                type="file"

                accept=".pdf,.docx"

                style={{ display: "none" }}



                onChange={(event) =>

                  handleFile(

                    event.target.files?.[0]

                  )

                }

              />



            </div>



          ) : (



            /* =================================================

               SELECTED FILE

            ================================================== */



            <div style={styles.fileSelected}>



              <div style={styles.fileIcon}>



                {selectedFile.name

                  .toLowerCase()

                  .endsWith(".pdf")

                  ? "PDF"

                  : "DOCX"}



              </div>





              <div style={styles.fileInfo}>



                <div style={styles.fileName}>

                  {selectedFile.name}

                </div>



                <div style={styles.fileSize}>

                  {(selectedFile.size / 1024 / 1024).toFixed(2)} MB

                </div>



              </div>





              <button

                style={styles.removeButton}

                onClick={removeFile}

              >

                Remove

              </button>



            </div>

          )}





          {/* =================================================

              ERROR

          ================================================== */}



          {error && (



            <div style={styles.errorBox}>



              <div style={styles.errorTitle}>

                Analysis Error

              </div>



              <div style={styles.errorText}>

                {error}

              </div>



            </div>



          )}





          {/* =================================================

              ACTION

          ================================================== */}



          <div style={styles.actionArea}>



            <button

              style={{

                ...styles.analyzeButton,



                opacity:

                  selectedFile && !isAnalyzing

                    ? 1

                    : 0.45,



                cursor:

                  selectedFile && !isAnalyzing

                    ? "pointer"

                    : "not-allowed",

              }}



              disabled={

                !selectedFile ||

                isAnalyzing

              }



              onClick={analyzeResume}

            >



              {isAnalyzing

                ? "Analyzing..."

                : "Analyze Resume"}



              {!isAnalyzing && (

                <span style={styles.arrow}>

                  →

                </span>

              )}



            </button>



          </div>



        </section>





        {/* ===================================================

            ANALYSIS RESULT

        ==================================================== */}



        {analysisResult && (



          <section style={styles.resultCard}>



            <div style={styles.eyebrow}>

              EXTRACTION COMPLETE

            </div>



            <div style={styles.resultHeader}>



              <div>



                <h2 style={styles.resultTitle}>

                  Resume successfully analyzed

                </h2>



                <p style={styles.resultSubtitle}>

                  {analysisResult.filename}

                </p>



              </div>





              <div style={styles.successBadge}>

                ✓ Processed

              </div>



            </div>





            {/* =================================================

                EXTRACTION STATS

            ================================================== */}



            <div style={styles.statsGrid}>



              <StatCard

                label="File Type"

                value={analysisResult.file_type}

              />



              <StatCard

                label="Characters Extracted"

                value={analysisResult.text_length.toLocaleString()}

              />



              <StatCard

                label="Source"

                value="Resume"

              />



              <StatCard

                label="Status"

                value="Ready"

              />



            </div>





            {/* =================================================

                ACTUAL RESUME TEXT

            ================================================== */}



            <div style={styles.extractedContainer}>



              <div style={styles.extractedHeader}>



                <div>



                  <div style={styles.extractedLabel}>

                    EXTRACTED RESUME TEXT

                  </div>



                  <div style={styles.extractedDescription}>

                    Raw text extracted directly from your document.

                  </div>



                </div>



              </div>





              <div style={styles.textContainer}>



                <pre style={styles.extractedText}>

                  {analysisResult.text}

                </pre>



              </div>



            </div>





            {/* =================================================

                NEXT PROCESSING STEPS

            ================================================== */}



            <div style={styles.nextStepBox}>



              <div style={styles.nextStepIcon}>

                →

              </div>



              <div>



                <div style={styles.nextStepTitle}>

                  Next capability layer

                </div>



                <div style={styles.nextStepText}>

                  Skill extraction will identify technologies,

                  projects and capability claims from this

                  extracted resume text.

                </div>



              </div>



            </div>



          </section>



        )}





        {/* ===================================================

            WHAT WILL BE EXTRACTED

        ==================================================== */}



        <section style={styles.section}>



          <div style={styles.sectionHeading}>



            <div>



              <div style={styles.eyebrow}>

                CAPABILITY SIGNALS

              </div>



              <h2 style={styles.sectionTitle}>

                What CapabilityFlow extracts

              </h2>



            </div>



          </div>





          <div style={styles.grid}>



            <InfoCard

              icon="⌘"

              title="Technical Skills"

              text="Programming languages, frameworks, databases, cloud platforms and development tools."

            />



            <InfoCard

              icon="◈"

              title="Projects"

              text="Projects, technologies used, project descriptions and demonstrated work."

            />



            <InfoCard

              icon="◇"

              title="Experience"

              text="Internships, roles, responsibilities and professional evidence."

            />



            <InfoCard

              icon="✦"

              title="Capability Signals"

              text="Structured evidence that can later be compared with GitHub activity."

            />



          </div>



        </section>





        {/* ===================================================

            PIPELINE

        ==================================================== */}



        <section style={styles.pipelineCard}>



          <div style={styles.pipelineHeader}>



            <div style={styles.eyebrow}>

              CAPABILITY FLOW

            </div>



            <h2 style={styles.sectionTitle}>

              From learning & evidence to opportunity

            </h2>



          </div>





          <div style={styles.pipeline}>



            <PipelineStep

              number="01"

              title="Resume"

              text="Claims"

              active

            />



            <div style={styles.pipelineLine}></div>



            <PipelineStep

              number="02"

              title="GitHub"

              text="Evidence"

            />



            <div style={styles.pipelineLine}></div>



            <PipelineStep

              number="03"

              title="Capability"

              text="Confidence"

            />



            <div style={styles.pipelineLine}></div>



            <PipelineStep

              number="04"

              title="Market"

              text="Opportunity"

            />



          </div>



        </section>



      </main>



    </div>

  );

}





/* =========================================================

   STAT CARD

\========================================================= */



function StatCard({

  label,

  value,

}: {

  label: string;

  value: string;

}) {

  return (

    <div style={styles.statCard}>



      <div style={styles.statLabel}>

        {label}

      </div>



      <div style={styles.statValue}>

        {value}

      </div>



    </div>

  );

}





/* =========================================================

   INFO CARD

\========================================================= */



function InfoCard({

  icon,

  title,

  text,

}: {

  icon: string;

  title: string;

  text: string;

}) {

  return (

    <div style={styles.infoCard}>



      <div style={styles.infoIcon}>

        {icon}

      </div>



      <h3 style={styles.infoTitle}>

        {title}

      </h3>



      <p style={styles.infoText}>

        {text}

      </p>



    </div>

  );

}





/* =========================================================

   PIPELINE STEP

\========================================================= */



function PipelineStep({

  number,

  title,

  text,

  active = false,

}: {

  number: string;

  title: string;

  text: string;

  active?: boolean;

}) {

  return (

    <div style={styles.pipelineStep}>



      <div

        style={{

          ...styles.pipelineNumber,



          ...(active

            ? styles.pipelineNumberActive

            : {}),

        }}

      >

        {number}

      </div>



      <div>



        <div style={styles.pipelineTitle}>

          {title}

        </div>



        <div style={styles.pipelineText}>

          {text}

        </div>



      </div>



    </div>

  );

}





/* =========================================================

   STYLES

\========================================================= */



const styles: Record<string, React.CSSProperties> = {



  page: {

    minHeight: "100vh",



    background:

      "radial-gradient(circle at 80% 10%, rgba(80,90,120,0.12), transparent 30%), #08090b",



    color: "#ffffff",



    fontFamily:

      "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, sans-serif",

  },





  header: {

    height: "76px",



    borderBottom:

      "1px solid #20232a",



    display: "flex",



    alignItems: "center",



    justifyContent: "space-between",



    padding: "0 48px",



    background:

      "rgba(8,9,11,0.88)",

  },





  brand: {

    fontSize: "20px",



    fontWeight: 700,



    letterSpacing: "-0.5px",

  },





  subtitle: {

    fontSize: "12px",



    color: "#737985",



    marginTop: "3px",

  },





  headerRight: {

    display: "flex",



    alignItems: "center",



    gap: "8px",



    fontSize: "13px",



    color: "#9ba1ad",

  },





  statusDot: {

    width: "8px",



    height: "8px",



    borderRadius: "50%",



    background: "#7c8cff",



    boxShadow:

      "0 0 12px rgba(124,140,255,0.8)",

  },





  main: {

    width:

      "min(1180px, calc(100% - 48px))",



    margin: "0 auto",



    padding: "32px 0 80px",

  },





  breadcrumb: {

    color: "#707681",



    fontSize: "13px",



    marginBottom: "50px",

  },





  breadcrumbSeparator: {

    margin: "0 8px",



    color: "#3d424c",

  },





  hero: {

    display: "flex",



    justifyContent:

      "space-between",



    alignItems: "flex-end",



    gap: "40px",



    marginBottom: "42px",

  },





  eyebrow: {

    fontSize: "11px",



    fontWeight: 700,



    letterSpacing: "1.8px",



    color: "#7f8999",



    marginBottom: "12px",

  },





  title: {

    fontSize: "48px",



    lineHeight: 1.08,



    letterSpacing: "-2px",



    margin: 0,



    fontWeight: 750,

  },





  gradientText: {

    background:

      "linear-gradient(90deg, #ffffff, #9ba8ff)",



    WebkitBackgroundClip:

      "text",



    WebkitTextFillColor:

      "transparent",

  },





  description: {

    maxWidth: "700px",



    color: "#858b97",



    fontSize: "15px",



    lineHeight: 1.7,



    marginTop: "22px",

  },





  heroBadge: {

    minWidth: "190px",



    display: "flex",



    alignItems: "center",



    gap: "12px",



    padding: "14px 16px",



    border:

      "1px solid #252932",



    borderRadius: "12px",



    background: "#0d0f13",

  },





  badgeIcon: {

    width: "32px",



    height: "32px",



    borderRadius: "9px",



    background: "#171a22",



    display: "grid",



    placeItems: "center",



    color: "#aeb7ff",

  },





  badgeTitle: {

    display: "block",



    fontSize: "13px",

  },





  badgeText: {

    display: "block",



    color: "#666e7b",



    fontSize: "11px",



    marginTop: "3px",

  },





  card: {

    background: "#0d0f13",



    border:

      "1px solid #22262e",



    borderRadius: "18px",



    padding: "28px",



    boxShadow:

      "0 20px 60px rgba(0,0,0,0.18)",

  },





  cardHeader: {

    display: "flex",



    justifyContent:

      "space-between",



    gap: "20px",



    alignItems: "flex-start",



    marginBottom: "24px",

  },





  cardTitle: {

    margin: 0,



    fontSize: "20px",

  },





  cardDescription: {

    color: "#777e8b",



    fontSize: "13px",



    lineHeight: 1.6,



    maxWidth: "700px",



    marginTop: "7px",

  },





  fileTypes: {

    color: "#6f7785",



    fontSize: "11px",



    border:

      "1px solid #292d36",



    padding: "7px 10px",



    borderRadius: "7px",

  },





  dropZone: {

    border:

      "1px dashed #343945",



    borderRadius: "14px",



    minHeight: "280px",



    display: "flex",



    flexDirection: "column",



    alignItems: "center",



    justifyContent: "center",



    cursor: "pointer",



    background:

      "radial-gradient(circle at center, rgba(120,130,180,0.06), transparent 55%)",



    transition:

      "all 0.2s ease",

  },





  dropZoneActive: {

    border:

      "1px dashed #8b95ff",



    background:

      "rgba(100,110,255,0.08)",

  },





  uploadIcon: {

    width: "54px",



    height: "54px",



    borderRadius: "15px",



    display: "grid",



    placeItems: "center",



    background: "#171a20",



    border:

      "1px solid #292d36",



    fontSize: "25px",



    color: "#aeb6ff",



    marginBottom: "18px",

  },





  dropTitle: {

    margin: 0,



    fontSize: "17px",

  },





  dropText: {

    color: "#777e8b",



    fontSize: "13px",



    margin: "8px 0",

  },





  dropHint: {

    color: "#515864",



    fontSize: "11px",



    marginTop: "10px",

  },





  fileSelected: {

    display: "flex",



    alignItems: "center",



    gap: "16px",



    padding: "22px",



    borderRadius: "13px",



    border:

      "1px solid #303541",



    background: "#111319",

  },





  fileIcon: {

    width: "52px",



    height: "52px",



    borderRadius: "12px",



    display: "grid",



    placeItems: "center",



    background: "#1a1d26",



    color: "#aeb7ff",



    fontSize: "10px",



    fontWeight: 800,

  },





  fileInfo: {

    flex: 1,

  },





  fileName: {

    fontSize: "14px",



    fontWeight: 600,

  },





  fileSize: {

    fontSize: "12px",



    color: "#707783",



    marginTop: "5px",

  },





  removeButton: {

    border:

      "1px solid #343943",



    background: "transparent",



    color: "#858b97",



    padding: "9px 13px",



    borderRadius: "8px",



    cursor: "pointer",

  },





  actionArea: {

    display: "flex",



    justifyContent: "flex-end",



    marginTop: "20px",

  },





  analyzeButton: {

    border: "none",



    background: "#ffffff",



    color: "#08090b",



    padding: "13px 20px",



    borderRadius: "9px",



    fontWeight: 700,



    fontSize: "13px",

  },





  arrow: {

    marginLeft: "10px",



    fontSize: "16px",

  },





  errorBox: {

    marginTop: "18px",



    padding: "16px",



    borderRadius: "10px",



    border:

      "1px solid #542f35",



    background: "#190d10",

  },





  errorTitle: {

    color: "#ff9fa8",



    fontSize: "13px",



    fontWeight: 700,



    marginBottom: "5px",

  },





  errorText: {

    color: "#c77e86",



    fontSize: "12px",



    lineHeight: 1.5,

  },





  resultCard: {

    marginTop: "24px",



    padding: "28px",



    borderRadius: "18px",



    border:

      "1px solid #292f39",



    background: "#0d1015",

  },





  resultHeader: {

    display: "flex",



    justifyContent:

      "space-between",



    alignItems: "flex-start",



    gap: "20px",

  },





  resultTitle: {

    margin: 0,



    fontSize: "24px",



    letterSpacing: "-0.6px",

  },





  resultSubtitle: {

    color: "#707783",



    fontSize: "13px",



    marginTop: "7px",

  },





  successBadge: {

    padding: "8px 11px",



    borderRadius: "8px",



    background: "#101a18",



    border:

      "1px solid #25423b",



    color: "#80cbb5",



    fontSize: "11px",



    fontWeight: 700,

  },





  statsGrid: {

    display: "grid",



    gridTemplateColumns:

      "repeat(4, 1fr)",



    gap: "12px",



    marginTop: "25px",

  },





  statCard: {

    padding: "17px",



    borderRadius: "11px",



    background: "#090b0f",



    border:

      "1px solid #20252d",

  },





  statLabel: {

    color: "#606874",



    fontSize: "10px",



    textTransform: "uppercase",



    letterSpacing: "1px",

  },





  statValue: {

    color: "#dce0e8",



    fontSize: "17px",



    fontWeight: 700,



    marginTop: "7px",

  },





  extractedContainer: {

    marginTop: "25px",

  },





  extractedHeader: {

    marginBottom: "12px",

  },





  extractedLabel: {

    color: "#858e9e",



    fontSize: "10px",



    letterSpacing: "1.4px",



    fontWeight: 700,

  },





  extractedDescription: {

    color: "#555d69",



    fontSize: "11px",



    marginTop: "4px",

  },





  textContainer: {

    padding: "20px",



    borderRadius: "12px",



    background: "#080a0d",



    border:

      "1px solid #20252d",



    maxHeight: "450px",



    overflowY: "auto",

  },





  extractedText: {

    whiteSpace: "pre-wrap",



    fontFamily:

      "Inter, ui-sans-serif, system-ui, sans-serif",



    fontSize: "13px",



    lineHeight: 1.75,



    color: "#c5cad3",



    margin: 0,

  },





  nextStepBox: {

    marginTop: "20px",



    display: "flex",



    alignItems: "center",



    gap: "14px",



    padding: "16px",



    borderRadius: "11px",



    background: "#10131a",



    border:

      "1px solid #252b37",

  },





  nextStepIcon: {

    width: "36px",



    height: "36px",



    borderRadius: "9px",



    display: "grid",



    placeItems: "center",



    background: "#181c27",



    color: "#aeb7ff",



    fontSize: "18px",

  },





  nextStepTitle: {

    fontSize: "13px",



    fontWeight: 700,

  },





  nextStepText: {

    color: "#69717e",



    fontSize: "11px",



    marginTop: "4px",



    lineHeight: 1.5,

  },





  section: {

    marginTop: "70px",

  },





  sectionHeading: {

    marginBottom: "24px",

  },





  sectionTitle: {

    margin: 0,



    fontSize: "24px",



    letterSpacing: "-0.6px",

  },





  grid: {

    display: "grid",



    gridTemplateColumns:

      "repeat(4, 1fr)",



    gap: "14px",

  },





  infoCard: {

    padding: "22px",



    border:

      "1px solid #22262e",



    borderRadius: "14px",



    background: "#0c0e12",

  },





  infoIcon: {

    width: "36px",



    height: "36px",



    borderRadius: "9px",



    display: "grid",



    placeItems: "center",



    background: "#171a21",



    color: "#aeb6ff",



    marginBottom: "18px",

  },





  infoTitle: {

    fontSize: "15px",



    margin: 0,

  },





  infoText: {

    color: "#707783",



    fontSize: "12px",



    lineHeight: 1.6,



    marginBottom: 0,

  },





  pipelineCard: {

    marginTop: "70px",



    padding: "28px",



    borderRadius: "18px",



    border:

      "1px solid #22262e",



    background: "#0d0f13",

  },





  pipelineHeader: {

    marginBottom: "32px",

  },





  pipeline: {

    display: "flex",



    alignItems: "center",



    justifyContent:

      "space-between",

  },





  pipelineStep: {

    display: "flex",



    alignItems: "center",



    gap: "12px",

  },





  pipelineNumber: {

    width: "38px",



    height: "38px",



    borderRadius: "50%",



    display: "grid",



    placeItems: "center",



    border:

      "1px solid #303540",



    color: "#747b87",



    fontSize: "11px",



    fontWeight: 700,

  },





  pipelineNumberActive: {

    border:

      "1px solid #9ba5ff",



    color: "#b7bdff",



    boxShadow:

      "0 0 20px rgba(120,130,255,0.15)",

  },





  pipelineTitle: {

    fontSize: "13px",



    fontWeight: 700,

  },





  pipelineText: {

    color: "#666e7a",



    fontSize: "11px",



    marginTop: "3px",

  },





  pipelineLine: {

    flex: 1,



    height: "1px",



    background: "#292d35",



    margin: "0 20px",

  },

};