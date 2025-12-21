import { DetailedBiomarkerContent } from "@/components/reports/DetailedBiomarkerContent";
import { LockedOverlay } from "@/components/reports/LockedOverlay";
import ReportPdf from "@/components/reports/ReportPdf";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { supabase } from "@/lib/services/supabase/supabaseclient";
import { useReportStore } from "@/store/reportStore";
import { useUserStore } from "@/store/userStore";
import type { ReportType } from "@/typedef";
import { SignedIn, useAuth, UserButton, useUser } from "@clerk/clerk-react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import {
  Activity,
  AlertTriangle,
  ArrowLeft,
  Brain,
  CheckCircle2,
  Download,
  FileText,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { Link, useRoute } from "wouter";
import dashboardBg from "../assets/subtle_medical_data_grid_background.png";

export default function Analysis() {
  const [, params] = useRoute("/analysis/:id");
  const [report, setReport] = useState<ReportType>();
  const { getReportById } = useReportStore();
  const { userId } = useAuth();
  const pdfRef = useRef<HTMLDivElement>(
    null
  ) as React.RefObject<HTMLDivElement>;
  const { user } = useUser();

  const { fetchUserById } = useUserStore();

  useEffect(() => {
    if (user?.id) fetchUserById(user.id);
  }, [user?.id]);

  useEffect(() => {
    const fetchReport = () => {
      if (!params?.id) return;

      const cached = getReportById(params.id);

      if (cached) {
        setReport(cached);
        return;
      }

      supabase
        .from("reports")
        .select("*")
        .eq("id", params.id)
        .single()
        .then(({ data }) => setReport(data));
    };
    fetchReport();
  }, [params?.id]);

  const userFromDB = useUserStore((s) => s.user);

  const isPremium = userFromDB?.subscription_status;
  const subscriptionEnd = userFromDB?.subscription_end
    ? new Date(userFromDB.subscription_end)
    : null;

  const now = new Date().getTime();
  const isExpired = subscriptionEnd ? subscriptionEnd.getTime() < now : false;

  const canViewFullReport = isPremium && !isExpired;
  // const fullData = canViewFullReport ? report?.ai_result.full_data : null;

  if (!report) return <div>Loading analysis...</div>;

  const ai = report?.ai_result ?? {};
  const keyFindings = Array.isArray(ai.key_findings) ? ai.key_findings : [];

  const safe = (value: unknown, fallback: string = "Not available"): string =>
    value === null || value === undefined ? fallback : String(value);

  const scoreColor =
    ai.health_score === "A+"
      ? "from-green-500 to-emerald-400"
      : ai.health_score === "A"
      ? "from-green-400 to-green-300"
      : ai.health_score === "B+"
      ? "from-yellow-400 to-yellow-300"
      : ai.health_score === "B"
      ? "from-orange-400 to-orange-300"
      : "from-red-500 to-red-400";

  const handleDownload = async () => {
    if (!pdfRef.current) return;

    // Small delay so layout + fonts settle
    await new Promise((r) => setTimeout(r, 300));

    const canvas = await html2canvas(pdfRef.current, {
      scale: 2,
      useCORS: true,
      backgroundColor: "#ffffff",
    });

    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");

    const imgWidth = 210;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
    pdf.save("Medical_Report.pdf");
  };

  return (
    <div className="min-h-screen bg-background pb-20 font-sans relative top-0">
      <div className="absolute inset-0 z-0 opacity-30 pointer-events-none">
        <img
          src={dashboardBg}
          alt="bg"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="glass sticky top-0 z-40 border-b border-white/20">
        <header className="w-full bg-white/70 backdrop-blur-md shadow-sm sticky top-0 z-50">
          <div className="container mx-auto px-4 h-20 flex items-center justify-between">
            <div className="flex justify-center  gap-4">
              <Link href={`/dashboard/${userId}`}>
                <a>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="cursor-pointer rounded-full hover:bg-primary/10"
                  >
                    <ArrowLeft className="w-6 h-6 text-foreground" />
                  </Button>
                </a>
              </Link>

              {report.report_type && (
                <div className="hidden md:flex flex-col text-center items-center gap-1">
                  <div className="flex items-center gap-3">
                    <h1 className="font-heading font-bold text-lg text-foreground">
                      {report.report_type}{" "}
                      {ai.report_date ? `- ${ai.report_date}` : ""}
                    </h1>
                    <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">
                      Completed
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <Activity className="w-3 h-3" /> AI Analysis Score: 98/100
                  </p>
                </div>
              )}
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-3">
              <div
                style={{
                  position: "absolute",
                  top: "-9999px",
                  left: "-9999px",
                }}
              >
                <ReportPdf ai={ai} pdfRef={pdfRef} />
              </div>

              <Button
                variant="outline"
                className="cursor-pointer"
                size="sm"
                // disabled={!canViewFullReport}
                onClick={() => {
                  if (!canViewFullReport) {
                    toast("Upgrade to Premium to download full report PDF");
                    return;
                  }
                  handleDownload();
                }}
              >
                <Download className="w-4 h-4" /> PDF
              </Button>

              {/* User Menu */}
              <SignedIn>
                <UserButton />
              </SignedIn>
            </div>
          </div>
        </header>
      </div>

      <div className="container mx-auto px-4 py-10 max-w-6xl grid lg:grid-cols-12 gap-8 relative z-10">
        {/* Sidebar Info */}
        <div className="lg:col-span-4 space-y-6">
          <Card className="p-6 glass-card rounded-3xl border-white/60">
            <div className="flex flex-col items-center text-center mb-6">
              <div
                className={`${scoreColor} w-20 h-20 bg-gradient-to-br from-primary to-cyan-400 rounded-full flex items-center justify-center shadow-lg shadow-primary/20 mb-4`}
              >
                <span className="text-3xl font-bold text-white">
                  {" "}
                  {safe(ai.health_score, "N/A")}
                </span>
              </div>
              <h3 className="font-bold text-lg">Health Score</h3>
              <p className="text-sm text-muted-foreground">
                Top 10% for your age group
              </p>
            </div>

            <div className="space-y-4 text-sm mt-8">
              <div className="flex justify-between py-3 border-b border-dashed border-gray-200">
                <span className="text-muted-foreground">Patient</span>
                <span className="font-bold">{safe(ai.patient_name)}</span>
              </div>
              <div className="flex justify-between py-3 border-b border-dashed border-gray-200">
                <span className="text-muted-foreground">Lab Date</span>
                <span className="font-bold">{safe(ai.report_date)}</span>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-indigo-900 to-slate-900 text-white rounded-3xl shadow-xl border-none relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -mr-10 -mt-10" />
            <h3 className="font-bold text-lg mb-4 relative z-10">AI Insight</h3>
            <p className="text-indigo-100 text-sm leading-relaxed relative z-10">
              {safe(ai.prediction)}
            </p>
            <div className="mt-6 flex items-center gap-2 text-xs font-mono text-indigo-300">
              <Brain className="w-4 h-4" /> MEDISCAN-NEURAL-V2
            </div>
          </Card>

          {isPremium && !isExpired && subscriptionEnd && (
            <div className="p-6 w-[100%]">
              <div className="bg-gradient-to-br from-emerald-600 to-teal-500 rounded-[1.5rem] p-6 text-white shadow-xl shadow-emerald-900/20 relative overflow-hidden group">
                {/* Decorative Blur Circle */}
                <div className="absolute top-0 right-0 w-42 h-32 bg-white/10 rounded-full -mr-12 -mt-12 blur-2xl group-hover:scale-150 transition-transform duration-700" />

                <div className="relative z-10 flex flex-col items-start gap-2">
                  <h4 className="font-bold text-lg flex items-center gap-2">
                    ⏳ Subscription Active
                  </h4>
                  <p className="text-emerald-100 text-sm font-medium opacity-90">
                    {Math.ceil(
                      (subscriptionEnd.getTime() - now) / (1000 * 60 * 60 * 24)
                    )}{" "}
                    days remaining
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Main Content */}
        <div className="lg:col-span-8 space-y-6">
          {/* Executive Summary */}
          <Card className="p-8 glass-card rounded-3xl border-l-8 border-l-primary relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-5">
              <FileText className="w-32 h-32" />
            </div>
            <h2 className="text-2xl font-heading font-bold mb-1 flex items-center gap-3">
              Executive Summary
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
              {safe(ai.summary)}
            </p>
          </Card>

          {/* Key Findings Grid (Normal & Warning Only) */}
          <div className="grid md:grid-cols-2 gap-4">
            {(() => {
              // First, filter normal & warning
              let filtered = keyFindings.filter(
                (f) => f.status === "normal" || f.status === "warning"
              );

              // If no normal/warning found, fallback to critical
              if (filtered.length === 0) {
                filtered = keyFindings.filter((f) => f.status === "critical");
              }

              return filtered.map((f, idx: number) => {
                const isNormal = f.status === "normal";
                const isWarning = f.status === "warning";
                // const isCritical = f.status === "critical";

                return (
                  <div
                    key={idx}
                    className={`p-5 rounded-3xl backdrop-blur-sm flex items-start gap-4 transition-transform hover:-translate-y-1 duration-300 ${
                      isNormal
                        ? "bg-green-50/80 border border-green-100"
                        : isWarning
                        ? "bg-amber-50/80 border border-amber-100"
                        : "bg-red-50/80 border border-red-100"
                    }`}
                  >
                    <div
                      className={`p-2 rounded-xl ${
                        isNormal
                          ? "bg-green-100"
                          : isWarning
                          ? "bg-amber-100"
                          : "bg-red-100"
                      }`}
                    >
                      {isNormal ? (
                        <CheckCircle2 className="w-6 h-6 text-green-600" />
                      ) : isWarning ? (
                        <AlertTriangle className="w-6 h-6 text-amber-600" />
                      ) : (
                        <AlertTriangle className="w-6 h-6 text-red-600" />
                      )}
                    </div>

                    <div>
                      <p
                        className={`font-bold text-lg ${
                          isNormal
                            ? "text-green-900"
                            : isWarning
                            ? "text-amber-900"
                            : "text-red-900"
                        }`}
                      >
                        {f.title}
                      </p>
                      <p
                        className={`text-sm font-medium mt-1 ${
                          isNormal
                            ? "text-green-700"
                            : isWarning
                            ? "text-amber-700"
                            : "text-red-700"
                        }`}
                      >
                        {safe(f.value)}
                      </p>
                      <p
                        className={`text-xs mt-2 ${
                          isNormal
                            ? "text-green-600/80"
                            : isWarning
                            ? "text-amber-600/80"
                            : "text-red-600/80"
                        }`}
                      >
                        {safe(f.note)}
                      </p>
                    </div>
                  </div>
                );
              });
            })()}
          </div>

          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary to-purple-600 rounded-[2rem] blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
            <Card className="p-8 glass-card rounded-[1.8rem] relative overflow-hidden">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Activity className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-bold text-xl">
                  Detailed Biomarker Analysis
                </h3>
              </div>
              <div
                className={
                  !canViewFullReport
                    ? "blur-sm select-none opacity-50 pointer-events-none"
                    : ""
                }
              >
                <DetailedBiomarkerContent />
              </div>

              {/* LOCK OVERLAY */}
              {!canViewFullReport && <LockedOverlay />}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
