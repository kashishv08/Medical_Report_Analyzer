import type { aiResType, KeyFindingType } from "@/typedef";

export default function ReportPdf({
  ai,
  pdfRef,
}: {
  ai: aiResType;
  pdfRef: React.RefObject<HTMLDivElement>;
}) {
  return (
    <div
      ref={pdfRef}
      style={{
        backgroundColor: "#ffffff",
        color: "#000000",
        padding: "40px 40px 80px 40px",
        width: "800px",
        fontFamily: "Arial, sans-serif",
        lineHeight: 1.5,
      }}
    >
      <h1 style={{ fontSize: "24px", marginBottom: "16px" }}>
        Medical Analysis Report
      </h1>
      <p>
        <b>Patient:</b> {ai.patient_name ?? "-"}
      </p>
      <p>
        <b>Date:</b> {ai.report_date ?? "-"}
      </p>
      <p>
        <b>Health Score:</b> {ai.health_score}
      </p>
      <hr style={{ margin: "20px 0" }} />
      <h2 style={{ fontSize: "18px" }}>Summary</h2>
      <p
        style={{
          textAlign: "justify",
        }}
      >
        {ai.summary}
      </p>
      <h2 style={{ fontSize: "18px", marginTop: "20px", marginBottom: "10px" }}>
        Key Findings
      </h2>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          fontSize: "14px",
        }}
      >
        <thead>
          <tr>
            <th style={cell}>Test</th>
            <th style={cell}>Value</th>
            <th style={cell}>Note</th>
          </tr>
        </thead>
        <tbody>
          {ai.key_findings?.map((f: KeyFindingType, i: number) => (
            <tr key={i}>
              <td style={cell}>{f.title}</td>
              <td style={cell}>{f.value ?? "-"}</td>
              <td style={cell}>{f.note}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2 style={{ fontSize: "18px", marginTop: "20px", marginBottom: "10px" }}>
        Predictions
      </h2>
      {ai?.prediction?.map((p, i) => (
        <div
          key={i}
          style={{
            border: "1px solid #ccc",
            borderRadius: "8px",
            padding: "10px",
            marginBottom: "10px",
            backgroundColor: "#f9fafb",
            fontSize: "14px",
            textAlign: "justify",
          }}
        >
          <p>
            <b>Reason:</b> {p.reason}
          </p>
          <p>
            <b>Insight:</b> {p.insight}
          </p>
          <p>
            <b>Prevention:</b> {p.prevention_tip}
          </p>
        </div>
      ))}

      <h2 style={{ fontSize: "18px", marginTop: "20px", marginBottom: "10px" }}>
        Recommendations
      </h2>

      <ol
        style={{
          paddingLeft: "20px",
          fontSize: "14px",
        }}
      >
        {ai?.recommendation?.map((r, i) => (
          <li
            key={i}
            style={{
              marginBottom: "12px",
              textAlign: "justify",
            }}
          >
            <p>
              <b>{r.title}</b>
            </p>
            <p>{r.explanation}</p>
            <p>
              <b>Daily Action:</b> {r.daily_action}
            </p>
          </li>
        ))}
      </ol>

      <p style={{ fontSize: "10px", marginTop: "40px", color: "#555" }}>
        AI-generated report. Not a medical diagnosis.
      </p>
    </div>
  );
}

const cell = {
  border: "1px solid #ccc",
  padding: "8px",
};
