import { Link } from "wouter";
import {
  Lock,
  CheckCircle2,
  AlertTriangle,
  FileText,
  ArrowLeft,
  Download,
  Share2,
  Activity,
  HeartPulse,
  Brain,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import dashboardBg from "../assets/subtle_medical_data_grid_background.png";

export default function Analysis() {
  return (
    <div className="min-h-screen bg-background pb-20 font-sans relative">
      <div className="absolute inset-0 z-0 opacity-30 pointer-events-none">
        <img
          src={dashboardBg}
          alt="bg"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="glass sticky top-25 z-40 border-b border-white/20">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/dashboard">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full hover:bg-primary/10"
              >
                <ArrowLeft className="w-6 h-6 text-foreground" />
              </Button>
            </Link>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="font-heading font-bold text-xl text-foreground">
                  Blood Test Results - Jan 2025
                </h1>
                <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">
                  Completed
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                <Activity className="w-3 h-3" /> AI Analysis Score: 98/100
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <Button
              variant="outline"
              size="sm"
              className="hidden sm:flex gap-2 rounded-xl bg-white/50 backdrop-blur-sm border-white/40"
            >
              <Download className="w-4 h-4" /> PDF
            </Button>
            <Button
              size="sm"
              className="hidden sm:flex gap-2 rounded-xl bg-primary text-white shadow-lg shadow-primary/20 hover:scale-105 transition-transform"
            >
              <Share2 className="w-4 h-4" /> Share with Doctor
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-10 max-w-6xl grid lg:grid-cols-12 gap-8 relative z-10">
        {/* Sidebar Info */}
        <div className="lg:col-span-4 space-y-6">
          <Card className="p-6 glass-card rounded-3xl border-white/60">
            <div className="flex flex-col items-center text-center mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-primary to-cyan-400 rounded-full flex items-center justify-center shadow-lg shadow-primary/20 mb-4">
                <span className="text-3xl font-bold text-white">A+</span>
              </div>
              <h3 className="font-bold text-lg">Health Score</h3>
              <p className="text-sm text-muted-foreground">
                Top 10% for your age group
              </p>
            </div>

            <div className="space-y-4 text-sm mt-8">
              <div className="flex justify-between py-3 border-b border-dashed border-gray-200">
                <span className="text-muted-foreground">Patient</span>
                <span className="font-bold">John Doe (34M)</span>
              </div>
              <div className="flex justify-between py-3 border-b border-dashed border-gray-200">
                <span className="text-muted-foreground">Doctor</span>
                <span className="font-bold">Dr. Sarah Kline</span>
              </div>
              <div className="flex justify-between py-3 border-b border-dashed border-gray-200">
                <span className="text-muted-foreground">Lab Date</span>
                <span className="font-bold">Jan 07, 2025</span>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-indigo-900 to-slate-900 text-white rounded-3xl shadow-xl border-none relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -mr-10 -mt-10" />
            <h3 className="font-bold text-lg mb-4 relative z-10">AI Insight</h3>
            <p className="text-indigo-100 text-sm leading-relaxed relative z-10">
              "Your lipid profile shows a 15% improvement compared to last year.
              Keep maintaining your current diet and exercise routine."
            </p>
            <div className="mt-6 flex items-center gap-2 text-xs font-mono text-indigo-300">
              <Brain className="w-4 h-4" /> MEDISCAN-NEURAL-V2
            </div>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-8 space-y-6">
          {/* Executive Summary */}
          <Card className="p-8 glass-card rounded-3xl border-l-8 border-l-primary relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-5">
              <FileText className="w-32 h-32" />
            </div>
            <h2 className="text-2xl font-heading font-bold mb-4 flex items-center gap-3">
              Executive Summary
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
              Based on the uploaded blood test report, your overall health
              markers are within the normal range, though there are slight
              elevations in cholesterol levels. The complete blood count (CBC)
              indicates no signs of infection or anemia.
            </p>
          </Card>

          {/* Key Findings Grid */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-5 rounded-3xl bg-green-50/80 border border-green-100 backdrop-blur-sm flex items-start gap-4 transition-transform hover:-translate-y-1 duration-300">
              <div className="bg-green-100 p-2 rounded-xl">
                <CheckCircle2 className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="font-bold text-green-900 text-lg">Hemoglobin</p>
                <p className="text-sm text-green-700 font-medium mt-1">
                  Optimal Range (14.2 g/dL)
                </p>
                <p className="text-xs text-green-600/80 mt-2">
                  Perfectly within 13.5 - 17.5 range.
                </p>
              </div>
            </div>

            <div className="p-5 rounded-3xl bg-amber-50/80 border border-amber-100 backdrop-blur-sm flex items-start gap-4 transition-transform hover:-translate-y-1 duration-300">
              <div className="bg-amber-100 p-2 rounded-xl">
                <AlertTriangle className="w-6 h-6 text-amber-600" />
              </div>
              <div>
                <p className="font-bold text-amber-900 text-lg">Vitamin D</p>
                <p className="text-sm text-amber-700 font-medium mt-1">
                  Slight Deficiency
                </p>
                <p className="text-xs text-amber-600/80 mt-2">
                  Consider supplements or more sunlight.
                </p>
              </div>
            </div>
          </div>

          {/* Detailed Breakdown (Locked) */}
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

              <div className="space-y-8 filter blur-sm select-none opacity-50 pointer-events-none">
                {[1, 2, 3].map((i) => (
                  <div key={i}>
                    <div className="flex justify-between mb-2">
                      <span className="font-medium flex items-center gap-2">
                        <HeartPulse className="w-4 h-4" /> Total Cholesterol
                      </span>
                      <span className="font-mono bg-gray-100 px-2 rounded">
                        210 mg/dL
                      </span>
                    </div>
                    <div className="h-4 bg-muted rounded-full overflow-hidden relative">
                      <div className="h-full bg-gradient-to-r from-green-400 to-yellow-400 w-3/4 rounded-full"></div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Lock Overlay */}
              <div className="absolute inset-0 flex flex-col items-center justify-center z-10 bg-white/40 backdrop-blur-[6px]">
                <div className="bg-white/90 p-8 rounded-3xl shadow-2xl text-center max-w-sm border border-white/50 backdrop-blur-xl transform transition-transform hover:scale-105 duration-300">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-purple-600 text-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-primary/30">
                    <Lock className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">
                    Unlock Full Report
                  </h3>
                  <p className="text-muted-foreground mb-8 text-sm leading-relaxed">
                    Get deep insights into 45+ biomarkers, diet plans, and
                    personalized health trends.
                  </p>
                  <Link href="/pricing">
                    <Button
                      size="lg"
                      className="w-full rounded-xl h-12 text-md font-bold shadow-xl shadow-primary/20 bg-gradient-to-r from-primary to-purple-600 hover:to-purple-700 border-none"
                    >
                      Upgrade to Premium
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
