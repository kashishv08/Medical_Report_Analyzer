import dashboardBg from "@/assets/soft_green_geometric_background.png";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import {
  Activity,
  ChevronDown,
  Clock,
  CreditCard,
  FileText,
  Filter,
  LayoutGrid,
  Leaf,
  MoreVertical,
  Plus,
  Search,
  Settings,
} from "lucide-react";
import { Link } from "wouter";

const MOCK_REPORTS = [
  {
    id: 1,
    name: "Blood Test Results - Jan 2025",
    date: "Today, 10:23 AM",
    type: "PDF",
    status: "Analyzed",
    color: "bg-emerald-500",
  },
  {
    id: 2,
    name: "MRI Scan Report - Knee",
    date: "Yesterday, 4:15 PM",
    type: "IMG",
    status: "Analyzed",
    color: "bg-teal-500",
  },
  {
    id: 3,
    name: "General Checkup Summary",
    date: "Dec 28, 2024",
    type: "PDF",
    status: "Processing",
    color: "bg-lime-500",
  },
  {
    id: 4,
    name: "Prescription - Dr. Smith",
    date: "Dec 15, 2024",
    type: "IMG",
    status: "Analyzed",
    color: "bg-green-600",
  },
  {
    id: 5,
    name: "Lipid Profile",
    date: "Nov 02, 2024",
    type: "PDF",
    status: "Analyzed",
    color: "bg-emerald-400",
  },
  {
    id: 6,
    name: "Vaccination Record",
    date: "Oct 20, 2024",
    type: "PDF",
    status: "Analyzed",
    color: "bg-teal-400",
  },
];

export default function Dashboard() {
  return (
    <div className="flex h-screen bg-background font-sans relative">
      {/* Sidebar */}
      <aside className="fixed top-0 left-0 w-80 hidden md:flex flex-col bg-white/60 backdrop-blur-2xl border-r border-white/40 z-20">
        <div className="p-8">
          <Link href="/home">
            <a className="flex items-center gap-3 font-heading font-bold text-2xl text-emerald-950 cursor-pointer group">
              <div className="bg-emerald-100 p-2.5 rounded-xl group-hover:scale-110 transition-transform">
                <Leaf className="h-6 w-6 text-emerald-600" />
              </div>
              <span>BioScan</span>
            </a>
          </Link>
        </div>

        <nav className="flex-1 px-6 space-y-3 py-4">
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 px-5 py-6 bg-emerald-100/50 text-emerald-800 font-bold rounded-2xl hover:bg-emerald-100 transition-all"
          >
            <LayoutGrid className="w-5 h-5" /> Dashboard
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 px-5 py-6 text-emerald-900/60 hover:bg-white/60 rounded-2xl transition-all font-medium hover:text-emerald-900 hover:scale-[1.02]"
          >
            <FileText className="w-5 h-5" /> My Reports
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 px-5 py-6 text-emerald-900/60 hover:bg-white/60 rounded-2xl transition-all font-medium hover:text-emerald-900 hover:scale-[1.02]"
          >
            <CreditCard className="w-5 h-5" /> Subscriptions
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 px-5 py-6 text-emerald-900/60 hover:bg-white/60 rounded-2xl transition-all font-medium hover:text-emerald-900 hover:scale-[1.02]"
          >
            <Settings className="w-5 h-5" /> Settings
          </Button>
        </nav>

        <div className="p-6">
          <div className="bg-gradient-to-br from-emerald-600 to-teal-500 rounded-[1.5rem] p-6 text-white shadow-xl shadow-emerald-900/10 mb-6 relative overflow-hidden group cursor-pointer">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-12 -mt-12 blur-2xl group-hover:scale-150 transition-transform duration-700" />
            <div className="relative z-10">
              <h4 className="font-bold text-lg mb-1 flex items-center gap-2">
                <Leaf className="w-4 h-4" /> Pro Plan
              </h4>
              <p className="text-emerald-100 text-sm mb-4 font-medium opacity-90">
                Unlock advanced DNA analysis & storage.
              </p>
              <Button
                size="sm"
                variant="secondary"
                className="w-full bg-white/20 hover:bg-white/30 text-white border-none backdrop-blur-sm rounded-xl"
              >
                Upgrade
              </Button>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-80 h-screen flex flex-col relative">
        <div className="absolute inset-0 z-0 opacity-60 pointer-events-none mix-blend-multiply">
          <img
            src={dashboardBg}
            alt="bg"
            className="w-full h-full object-cover"
          />
        </div>

        <header
          className="fixed top-0 left-80 right-0 h-24 px-10 
  bg-white/30 backdrop-blur-xl border-b border-white/40 z-30 
  flex items-center justify-between"
        >
          <div>
            <h1 className="text-3xl font-heading font-bold text-emerald-950">
              Dashboard
            </h1>
            <p className="text-emerald-800/60 font-medium text-sm">
              Welcome back, John
            </p>
          </div>
          <div className="flex items-center gap-6">
            <div className="relative w-80 hidden lg:block group">
              <Search className="absolute left-4 top-3.5 h-4 w-4 text-emerald-800/40 group-focus-within:text-emerald-600 transition-colors" />
              <Input
                placeholder="Search medical records..."
                className="pl-12 h-12 bg-white/60 border-white/40 focus:bg-white transition-all rounded-2xl focus:ring-2 ring-emerald-500/20 text-emerald-900 placeholder:text-emerald-800/40"
              />
            </div>
            <Button
              size="icon"
              variant="ghost"
              className="rounded-full relative hover:bg-white/50 w-12 h-12"
            >
              <div className="absolute top-3 right-3 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white" />
              <Activity className="w-6 h-6 text-emerald-800/60" />
            </Button>
            <div className="flex items-center gap-4 pl-6 border-l border-emerald-900/10">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold leading-none text-emerald-950">
                  John Doe
                </p>
                <p className="text-xs text-emerald-600 font-bold mt-1 bg-emerald-100 px-2 py-0.5 rounded-full inline-block">
                  Pro Member
                </p>
              </div>
              <Avatar className="h-12 w-12 border-4 border-white shadow-lg cursor-pointer hover:scale-105 transition-transform ring-2 ring-emerald-100">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>

        <div className="flex-1 pt-28 px-10 pb-10 overflow-hidden">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-10 gap-4">
            <div className="flex gap-4">
              <Button
                variant="outline"
                className="gap-2 bg-white/60 border-white/60 backdrop-blur-md rounded-2xl h-12 px-6 hover:bg-white hover:border-white text-emerald-900 shadow-sm font-medium"
              >
                <Filter className="w-4 h-4" /> Filter{" "}
                <ChevronDown className="w-3 h-3 opacity-50" />
              </Button>
              <Link href="/home">
                <Button className="gap-2 shadow-xl shadow-emerald-600/20 bg-emerald-600 hover:bg-emerald-700 border-none rounded-2xl h-12 px-6 hover:scale-105 transition-transform font-bold text-white">
                  <Plus className="w-5 h-5" /> Upload New
                </Button>
              </Link>
            </div>
          </div>

          <ScrollArea className="h-full">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-8 pb-24">
              {MOCK_REPORTS.map((report) => (
                <Card
                  key={report.id}
                  className="group p-6 hover:shadow-[0_20px_40px_-15px_rgba(16,185,129,0.15)] transition-all duration-300 cursor-pointer border-white/60 bg-white/70 backdrop-blur-xl rounded-[2rem] hover:-translate-y-2 relative overflow-hidden ring-1 ring-white/50"
                >
                  <div
                    className={`absolute top-0 left-0 w-1.5 h-full ${report.color} opacity-60`}
                  />

                  <div className="flex items-start justify-between mb-8">
                    <div
                      className={`w-14 h-14 rounded-2xl ${report.color} bg-opacity-10 flex items-center justify-center text-foreground group-hover:scale-110 transition-transform duration-300 ring-4 ring-white`}
                    >
                      <FileText
                        className={`w-7 h-7 ${report.color.replace(
                          "bg-",
                          "text-"
                        )}`}
                      />
                    </div>
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
                      <DropdownMenuContent align="end" className="rounded-xl">
                        <DropdownMenuItem>View Analysis</DropdownMenuItem>
                        <DropdownMenuItem>Download Original</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  <h3 className="font-bold text-xl truncate mb-2 text-emerald-950 group-hover:text-emerald-600 transition-colors">
                    {report.name}
                  </h3>

                  <div className="flex items-center justify-between text-xs text-emerald-800/60 mb-8 font-medium">
                    <div className="flex items-center gap-1.5 bg-white/60 px-3 py-1.5 rounded-lg border border-white/50">
                      <Clock className="w-3.5 h-3.5" /> {report.date}
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-auto">
                    <span
                      className={`text-xs font-bold px-3 py-1.5 rounded-full border ${
                        report.status === "Analyzed"
                          ? "bg-emerald-100 text-emerald-700 border-emerald-200"
                          : "bg-amber-100 text-amber-700 border-amber-200"
                      }`}
                    >
                      {report.status}
                    </span>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-emerald-600 hover:bg-emerald-50 hover:text-emerald-700 font-bold group-hover:translate-x-1 transition-transform rounded-xl"
                    >
                      View <Activity className="w-4 h-4 ml-1" />
                    </Button>
                  </div>
                </Card>
              ))}

              {/* Add New Placeholder Card */}
              <Link href="/home">
                <div className="border-3 border-dashed border-emerald-200/50 rounded-[2rem] flex flex-col items-center justify-center p-6 min-h-[260px] cursor-pointer hover:border-emerald-400/50 hover:bg-emerald-50/20 transition-all group">
                  <div className="w-20 h-20 rounded-full bg-emerald-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform group-hover:bg-white group-hover:shadow-lg">
                    <Plus className="w-8 h-8 text-emerald-400 group-hover:text-emerald-600 transition-colors" />
                  </div>
                  <p className="font-bold text-emerald-800/50 group-hover:text-emerald-700 transition-colors text-lg">
                    Upload New Report
                  </p>
                </div>
              </Link>
            </div>
          </ScrollArea>
        </div>
      </main>

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
