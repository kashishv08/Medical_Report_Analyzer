import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { extractTextFromFile } from "@/lib/services/pdfExtract/extractText";
import { hashedFile } from "@/lib/services/pdfExtract/hashedFile";
import { analyzeReport } from "@/lib/services/supabase/report/analyzeReport";
import { uploadReportFile } from "@/lib/services/supabase/report/uploadFile";
import { supabase } from "@/lib/services/supabase/supabaseclient";
import { useSyncUser } from "@/lib/services/supabase/user/useSyncUser";
import { useReportStore } from "@/store/reportStore";
import { useAuth, useUser } from "@clerk/clerk-react";
import { motion } from "framer-motion";
import {
  Activity,
  ArrowRight,
  Brain,
  FileText,
  HeartPulse,
  Scan,
  ShieldCheck,
  X,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "sonner";
import { useLocation } from "wouter";
import heroBg from "../assets/abstract_green_medical_dna_background.png";
import type { ReportType } from "@/typedef";
import { useUserStore } from "@/store/userStore";

export default function Home() {
  const [, setLocation] = useLocation();
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const { upsertReport } = useReportStore();
  const { user } = useUser();
  const { isSignedIn } = useAuth();
  const { isPremium } = useUserStore();

  useSyncUser();

  const { loadReports, selectUserReports } = useReportStore();
  useEffect(() => {
    const fetchReport = async () => {
      if (user?.id) {
        await loadReports(user.id); //store
        // console.log(d);
      }
    };
    fetchReport();
  }, [user?.id]);

  const reports =
    (user?.id ? selectUserReports(user?.id) : ([] as ReportType[])) ??
    ([] as ReportType[]);
  console.log(reports);

  const MAX_BASIC_REPORTS = 3;

  function canUserAnalyzeReport({
    reports,
    isPremium,
  }: {
    reports: { uploaded_at: string | Date }[];
    isPremium: boolean;
  }) {
    if (isPremium) return true;

    const now = new Date();

    const currentMonthCount = reports.filter((report) => {
      const d = new Date(report.uploaded_at);
      return (
        d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()
      );
    }).length;

    return currentMonthCount < MAX_BASIC_REPORTS;
  }

  const handleAnalyze = async () => {
    if (!isSignedIn) {
      setLocation("/sign-in");
      return;
    }
    if (!files.length || !user?.id) return;

    const allowed = canUserAnalyzeReport({
      reports,
      isPremium: isPremium(),
    });

    if (!allowed) {
      toast("Free plan limit reached (3 reports/month). Upgrade to continue.");
      return;
    }

    setUploading(true);
    setProgress(10);

    try {
      const fileUrl = await uploadReportFile(files[0], user.id);
      if (!fileUrl) {
        toast("File upload failed");
        return;
      }
      setProgress(30);
      console.log("fileUrl", fileUrl);

      const reportHash = await hashedFile(files[0]);
      console.log("reportHash", reportHash);

      const { data: existingReport } = await supabase
        .from("reports")
        .select("id")
        .eq("user_id", user.id)
        .eq("report_hash", reportHash)
        .maybeSingle();

      if (existingReport) {
        toast("Same Report detected.Updating analysis..");
      }

      const fileText = await extractTextFromFile(files[0]);
      if (!fileText || fileText.length < 50) {
        toast("Invalid or empty PDF text");
        return;
      }
      setProgress(50);
      console.log("extracted text", fileText.substring(0, 20));

      // 3️⃣ AI Analysis
      const ai_result = await analyzeReport(fileText);
      if (!ai_result) {
        toast("Uploaded file is not a valid report");
        return;
      }
      setProgress(70);
      console.log("ai res", ai_result);

      if (!ai_result.report_type || !ai_result.health_score) {
        toast("Uploaded file is not a valid report");
        return;
      }

      const { data: savedReport, error } = await supabase
        .from("reports")
        .upsert(
          {
            id: existingReport?.id,
            report_hash: reportHash,
            user_id: user.id,
            file_url: fileUrl,
            report_type: ai_result.report_type,
            ai_result,
            analyzed: true,
            uploaded_at: new Date(),
          },
          {
            onConflict: "user_id,report_hash",
          }
        )
        .select()
        .single();

      if (error) {
        console.log(error);
        toast("Saving to DB failed");
        return;
      }

      upsertReport(savedReport); //store zustand

      setProgress(90);

      setLocation(`/analysis/${savedReport.id}`);
    } catch (err) {
      console.error("Analysis failed:", err);
      toast("Report analysis failed. Please try again.");
    } finally {
      setUploading(false);
      setProgress(0);
    }
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
      "image/*": [".png", ".jpg", ".jpeg"],
    },
    maxFiles: 1,
  });

  const removeFile = () => {
    setFiles([]);
    setUploading(false);
    setProgress(0);
  };

  return (
    <div className="min-h-screen relative overflow-hidden font-sans">
      {/* Background Image & Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroBg}
          alt="Background"
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-white/60 to-white/95" />
      </div>

      <div className="relative z-10 pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
          {/* Left Column: Text */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full glass border-emerald-200 text-emerald-800 text-sm font-bold mb-8 shadow-xl shadow-emerald-900/5 backdrop-blur-md">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              Bio-Neural Analysis Engine v3.0
            </div>

            <h1 className="text-6xl md:text-7xl font-heading font-bold mb-8 leading-[1.1] tracking-tight text-foreground">
              Your Health, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-green-500 to-teal-400">
                Decoded by Nature.
              </span>
            </h1>

            <p className="text-xl text-emerald-900/60 leading-relaxed mb-10 max-w-lg font-medium">
              We combine advanced AI with medical expertise to translate your
              lab reports into clear, life-saving insights.
            </p>

            <div className="flex flex-wrap gap-4 text-sm font-bold text-emerald-800/70">
              <div className="flex items-center gap-3 bg-white/60 px-5 py-3 rounded-2xl backdrop-blur-md border border-white shadow-sm hover:shadow-md transition-shadow">
                <div className="bg-emerald-100 p-1.5 rounded-full">
                  <ShieldCheck className="w-5 h-5 text-emerald-600" />
                </div>
                HIPAA Secure
              </div>
              <div className="flex items-center gap-3 bg-white/60 px-5 py-3 rounded-2xl backdrop-blur-md border border-white shadow-sm hover:shadow-md transition-shadow">
                <div className="bg-teal-100 p-1.5 rounded-full">
                  <Brain className="w-5 h-5 text-teal-600" />
                </div>
                99.9% Accuracy
              </div>
              <div className="flex items-center gap-3 bg-white/60 px-5 py-3 rounded-2xl backdrop-blur-md border border-white shadow-sm hover:shadow-md transition-shadow">
                <div className="bg-green-100 p-1.5 rounded-full">
                  <HeartPulse className="w-5 h-5 text-green-600" />
                </div>
                Instant Results
              </div>
            </div>
          </motion.div>

          {/* Right Column: Upload Card */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, type: "spring" }}
            className="relative perspective-1000"
          >
            {/* Decorative floating elements */}
            <motion.div
              animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-16 -right-16 w-32 h-32 bg-gradient-to-br from-emerald-400 to-teal-300 rounded-[2rem] blur-2xl opacity-30 z-0"
            />
            <motion.div
              animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-8 -left-8 w-40 h-40 bg-gradient-to-tr from-green-300 to-lime-200 rounded-full blur-3xl opacity-30 z-0"
            />

            <div className="glass-card rounded-[2.5rem] p-2 relative z-10 overflow-hidden group hover:shadow-2xl hover:shadow-emerald-900/10 transition-all duration-500 transform hover:-translate-y-2">
              <div className="bg-white/40 backdrop-blur-xl rounded-[2rem] p-8 h-full border border-white/60">
                {!files.length ? (
                  <div
                    {...getRootProps()}
                    className={`border-3 border-dashed rounded-[1.5rem] p-10 transition-all cursor-pointer flex flex-col items-center justify-center gap-6 min-h-[450px] relative overflow-hidden group/upload
                      ${
                        isDragActive
                          ? "border-emerald-500 bg-emerald-50/50 scale-[0.99]"
                          : "border-emerald-200/50 hover:border-emerald-400 hover:bg-emerald-50/30"
                      }`}
                  >
                    <input {...getInputProps()} />

                    <div className="relative">
                      <div className="w-28 h-28 rounded-full bg-gradient-to-tr from-emerald-100 to-teal-50 flex items-center justify-center mb-2 group-hover/upload:scale-110 transition-transform duration-500 shadow-inner">
                        <Scan className="w-12 h-12 text-emerald-600 drop-shadow-sm" />
                      </div>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 10,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        className="absolute -inset-2 border border-emerald-300 rounded-full border-dashed opacity-0 group-hover/upload:opacity-100 transition-opacity"
                      />
                    </div>

                    <div className="text-center space-y-3 relative z-10">
                      <p className="text-2xl font-bold text-emerald-950">
                        Drop your report here
                      </p>
                      <p className="text-base text-emerald-800/60 max-w-[240px] mx-auto font-medium">
                        Supports PDF, JPG, PNG <br />
                        up to 50MB
                      </p>
                    </div>

                    <Button
                      variant="outline"
                      className="cursor-pointer mt-6 rounded-xl h-12 px-8 border-emerald-200 hover:bg-emerald-600 hover:text-white hover:border-emerald-600 transition-all font-semibold shadow-sm"
                    >
                      Browse Files
                    </Button>
                  </div>
                ) : (
                  <div className="min-h-[450px] flex flex-col justify-center animate-in fade-in zoom-in duration-300">
                    <div className="flex items-center gap-5 p-6 border border-emerald-100 rounded-[1.5rem] bg-gradient-to-r from-emerald-50/50 to-white/50 mb-8 relative shadow-sm">
                      <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center shadow-lg text-emerald-600 ring-1 ring-emerald-100">
                        <FileText className="w-10 h-10" />
                      </div>
                      <div className="text-left flex-1 min-w-0">
                        <p className="font-bold text-xl truncate text-foreground mb-1">
                          {files[0].name}
                        </p>
                        <p className="text-sm text-emerald-800/60 font-medium">
                          {(files[0].size / 1024 / 1024).toFixed(2)} MB • Ready
                          for analysis
                        </p>
                      </div>
                      {!uploading && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={(e) => {
                            e.stopPropagation();
                            removeFile();
                          }}
                          className="cursor-pointer text-emerald-400 hover:text-red-500 hover:bg-red-50 rounded-xl h-12 w-12"
                        >
                          <X className="w-6 h-6 cursor-pointer" />
                        </Button>
                      )}
                    </div>

                    {uploading ? (
                      <div className="space-y-8 text-center px-4">
                        <div className="relative pt-4">
                          <div className="flex justify-between text-sm font-bold mb-3 text-emerald-700">
                            <span className="flex items-center gap-2">
                              <Activity className="w-5 h-5 animate-spin" />{" "}
                              Processing Data...
                            </span>
                            <span>{progress}%</span>
                          </div>
                          <Progress
                            value={progress}
                            className="h-4 bg-emerald-100 rounded-full overflow-hidden bg-gradient-to-r from-emerald-500 to-teal-400 shimmer"
                          />
                        </div>
                        <p className="text-xs text-emerald-800/40 uppercase tracking-[0.2em] font-bold animate-pulse">
                          Analyzing Biomarkers
                        </p>
                      </div>
                    ) : (
                      <Button
                        size="lg"
                        className="cursor-pointer w-full text-lg h-16 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-500 hover:to-teal-600 shadow-xl shadow-emerald-600/20 transition-all hover:scale-[1.02] active:scale-[0.98] font-bold"
                        onClick={handleAnalyze}
                      >
                        Start Deep Analysis{" "}
                        <ArrowRight className="ml-2 w-6 h-6" />
                      </Button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
