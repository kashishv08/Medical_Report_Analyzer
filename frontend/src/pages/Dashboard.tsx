import dashboardBg from "@/assets/soft_green_geometric_background.png";
import SideBar from "@/components/SideBar";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useReportStore } from "@/store/reportStore";
import { useUserStore } from "@/store/userStore";
import type { ReportType } from "@/typedef";
import { SignedIn, UserButton, useUser } from "@clerk/clerk-react";
import {
  Activity,
  AlignJustify,
  Clock,
  FileText,
  MoreVertical,
  Plus,
  Search,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation, useRoute } from "wouter";

const REPORT_COLORS = [
  "bg-emerald-500",
  "bg-teal-500",
  "bg-lime-500",
  "bg-green-600",
  "bg-emerald-400",
  "bg-teal-400",
] as const;

export default function Dashboard() {
  const [, params] = useRoute<{ id: string }>("/dashboard/:id");
  const { loadReports, selectUserReports } = useReportStore();
  const { fetchUserById } = useUserStore();
  const { user } = useUser();
  const isPremium = useUserStore((s) => s.isPremium());
  const userFromDb = useUserStore((s) => s.user);
  const [, setLocation] = useLocation();
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);

  // console.log(userFromDb);
  // console.log(isPremium);

  const loadingUser = useUserStore((s) => s.loading);

  useEffect(() => {
    if (user?.id) fetchUserById(user.id);
  }, [user?.id]);

  useEffect(() => {
    const fetchReport = async () => {
      if (params?.id) {
        await loadReports(params.id); //store
      }
    };
    fetchReport();
  }, [params?.id]);

  const reports =
    (params?.id ? selectUserReports(params?.id) : ([] as ReportType[])) ??
    ([] as ReportType[]);
  // console.log(reports);

  const filterReports = reports.filter((r) => {
    return r.report_type.toLowerCase().includes(search.toLowerCase());
  });

  if (loadingUser) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p className="text-emerald-700 font-bold">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-background font-sans relative w-full">
      {/* Sidebar */}
      <div className="hidden md:block fixed top-0 left-0 w-80">
        <aside
          className="
    hidden md:flex
    fixed top-0 left-0
    h-screen w-80
    flex-col
    bg-white/60 backdrop-blur-2xl
    border-r border-white/40
    z-20
  "
        >
          <SideBar />
        </aside>
      </div>

      {/* Main Content */}
      <div className="w-[100%]">
        <main
          className="
    ml-0 md:ml-80
    h-screen
    flex flex-col
    relative
  "
        >
          {open && (
            <div
              onClick={() => setOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 md:hidden"
            />
          )}

          {/* Mobile Sidebar */}
          <aside
            className={`
    fixed top-0 left-0 z-50
    h-full w-80
    bg-white/70 backdrop-blur-2xl
    border-r border-white/40
    transform transition-transform duration-300 ease-in-out

    ${open ? "translate-x-0" : "-translate-x-full"}

    md:hidden
  `}
          >
            <SideBar />
          </aside>

          <div className="absolute inset-0 z-0 opacity-60 pointer-events-none mix-blend-multiply">
            <img
              src={dashboardBg}
              alt="bg"
              className="w-full h-full object-cover"
            />
          </div>

          <header
            className="
    fixed top-0
    left-0 md:left-80
    right-0
    h-20 md:h-24
    px-4 md:px-10
    bg-white/30 backdrop-blur-xl
    border-b border-white/40
    z-30
    flex items-center justify-between
  "
          >
            <div>
              <h5 className="text-3xl font-heading font-bold text-emerald-950 inline-flex items-center justify-center gap-8">
                <button
                  onClick={() => setOpen(true)}
                  className="block md:hidden"
                >
                  <AlignJustify />
                </button>

                <div>
                  Dashboard
                  {isPremium && (
                    <span className="ml-3 text-sm bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full">
                      PRO
                    </span>
                  )}
                </div>
              </h5>
              <p className="text-emerald-800/60 font-medium text-sm">
                Welcome back, {user?.fullName}
              </p>
            </div>
            <div className="flex items-center gap-6">
              <div className="relative w-80 hidden lg:block group">
                <Search className="absolute left-4 top-3.5 h-4 w-4 text-emerald-800/40 group-focus-within:text-emerald-600 transition-colors" />
                <Input
                  placeholder="Search medical records..."
                  className="pl-12 h-12 bg-white/60 border-white/40 focus:bg-white transition-all rounded-2xl focus:ring-2 ring-emerald-500/20 text-emerald-900 placeholder:text-emerald-800/40"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <Button
                size="icon"
                variant="ghost"
                className="hidden md:block rounded-full relative hover:bg-white/50 w-12 h-12"
              >
                <div className="absolute top-3 right-3 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white" />
                <Activity className="w-6 h-6 text-emerald-800/60" />
              </Button>
              <div className="flex items-center gap-4 pl-6 border-l border-emerald-900/10">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-bold leading-none text-emerald-950">
                    {user?.fullName}
                  </p>
                  {userFromDb?.subscription_status ? (
                    <p className="text-xs text-emerald-600 font-bold mt-1 bg-emerald-100 px-2 py-0.5 rounded-full inline-block">
                      {userFromDb.subscription_plan === "yearly"
                        ? "Pro • Yearly"
                        : "Pro • Monthly"}
                    </p>
                  ) : (
                    <p className="text-xs text-gray-600 font-bold mt-1 bg-gray-100 px-2 py-0.5 rounded-full inline-block">
                      Free Plan
                    </p>
                  )}
                </div>
                {
                  <SignedIn>
                    <UserButton />
                  </SignedIn>
                }
              </div>
            </div>
          </header>

          <div
            className="
    flex-1
    pt-24 md:pt-28
    px-4 md:px-10
    pb-10
    overflow-hidden
  "
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-10 gap-4">
              <div className="flex gap-4">
                {/* <Button
                variant="outline"
                className="gap-2 bg-white/60 border-white/60 backdrop-blur-md rounded-2xl h-12 px-6 hover:bg-white hover:border-white text-emerald-900 shadow-sm font-medium"
              >
                <Filter className="w-4 h-4" /> Filter{" "}
                <ChevronDown className="w-3 h-3 opacity-50" />
              </Button> */}
                <Link href="/home">
                  <Button className="cursor-pointer gap-2 shadow-xl shadow-emerald-600/20 bg-emerald-600 hover:bg-emerald-700 border-none rounded-2xl h-12 px-6 hover:scale-105 transition-transform font-bold text-white">
                    <Plus className="w-5 h-5" /> Upload New
                  </Button>
                </Link>
              </div>
            </div>

            <ScrollArea className="h-[calc(100vh-120px)]">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-8 pb-24">
                {filterReports?.map((report: ReportType, index: number) => {
                  const color = REPORT_COLORS[index % REPORT_COLORS.length];

                  return (
                    <Card
                      key={report.id}
                      className="group p-6 hover:shadow-[0_20px_40px_-15px_rgba(16,185,129,0.15)] transition-all duration-300 cursor-pointer border-white/60 bg-white/70 backdrop-blur-xl rounded-[2rem] hover:-translate-y-2 relative overflow-hidden ring-1 ring-white/50"
                    >
                      <div
                        className={`absolute top-0 left-0 w-1.5 h-full ${color} opacity-60`}
                      />

                      <div className="flex items-start justify-between mb-8">
                        <div
                          className={`w-14 h-14 rounded-2xl ${color} bg-opacity-10 flex items-center justify-center text-foreground group-hover:scale-110 transition-transform duration-300 ring-4 ring-white`}
                        >
                          <FileText
                            className={`w-7 h-7 ${color.replace(
                              "bg-",
                              "text-"
                            )}`}
                          />
                        </div>
                        <button className="cursor-pointer">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-10 w-10 text-emerald-900/40 hover:bg-white hover:text-emerald-900 rounded-full"
                              >
                                <MoreVertical className="w-5 h-5" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                              align="end"
                              className="rounded-xl"
                            >
                              <DropdownMenuItem>
                                <Link href={`/analysis/${report.id}`}>
                                  View Analysis
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <button
                                  onClick={() => window.open(report.file_url)}
                                >
                                  View Original
                                </button>
                              </DropdownMenuItem>
                              {/* <DropdownMenuItem className="text-destructive">
                              Delete
                            </DropdownMenuItem> */}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </button>
                      </div>

                      <h3 className="font-bold text-xl truncate mb-2 text-emerald-950 group-hover:text-emerald-600 transition-colors">
                        {report.report_type}
                      </h3>

                      <div className="flex items-center justify-between text-xs text-emerald-800/60 mb-8 font-medium">
                        <div className="flex items-center gap-1.5 bg-white/60 px-3 py-1.5 rounded-lg border border-white/50">
                          <Clock className="w-3.5 h-3.5" />{" "}
                          {report.ai_result.report_date}
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-auto">
                        <span
                          className={`text-xs font-bold px-3 py-1.5 rounded-full border ${
                            report.analyzed === true
                              ? "bg-emerald-100 text-emerald-700 border-emerald-200"
                              : "bg-amber-100 text-amber-700 border-amber-200"
                          }`}
                        >
                          {report.analyzed && "Analyzed"}
                        </span>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="cursor-pointer text-emerald-600 hover:bg-emerald-50 hover:text-emerald-700 font-bold group-hover:translate-x-1 transition-transform rounded-xl"
                          onClick={() => setLocation(`/analysis/${report.id}`)}
                        >
                          View <Activity className="w-4 h-4 ml-1" />
                        </Button>
                      </div>
                    </Card>
                  );
                })}

                {/* Add New Placeholder Card */}
                <Link href="/home">
                  <div className="hidden md:flex border-3 border-dashed border-emerald-200/50 rounded-[2rem] flex-col items-center justify-center p-6 min-h-[260px] cursor-pointer hover:border-emerald-400/50 hover:bg-emerald-50/20 transition-all group">
                    <div className="w-20 h-20 rounded-full bg-emerald-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform group-hover:bg-white group-hover:shadow-lg">
                      <Plus className="w-8 h-8 text-emerald-400 group-hover:text-emerald-600 transition-colors" />
                    </div>
                    <p className="cursor-pointer font-bold text-emerald-800/50 group-hover:text-emerald-700 transition-colors text-lg">
                      Upload New Report
                    </p>
                  </div>
                </Link>
              </div>
            </ScrollArea>
          </div>
        </main>
      </div>

      {/* Floating Action Button (Mobile) */}
      <Link href="/home">
        <Button
          size="icon"
          className="md:hidden fixed bottom-6 right-6 h-16 w-16 rounded-full shadow-2xl shadow-emerald-900/20 bg-emerald-600 z-50 hover:scale-110 transition-transform"
        >
          <Plus className="w-8 h-8 text-white" />
        </Button>
      </Link>
    </div>
  );
}
