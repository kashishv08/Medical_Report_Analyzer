import { supabase } from "@/lib/services/supabase/supabaseclient";
import { ReportSchema } from "@/lib/services/zod/reportValidation";
import { create } from "zustand";

export const useReportStore = create((set) => ({
  reports: [],
  loading: false,

  fetchReports: async (userId: unknown) => {
    set({ loading: true });
    const { data, error } = await supabase
      .from("reports")
      .select("*")
      .eq("user_id", userId)
      .order("uploaded_at", { ascending: false });

    if (error) {
      console.error(error);
      set({ loading: false });
      return;
    }

    const parsed = data
      .map((r) => ReportSchema.safeParse(r))
      .filter((p) => p.success)
      .map((p) => p.data);

    set({ reports: parsed, loading: false });
  },

  addReport: async (report: unknown) => {
    const parsed = ReportSchema.safeParse(report);

    console.log("parsed", parsed);

    if (!parsed.success) {
      console.error(error);
      return;
    }

    set((state) => ({
      reports: [parsed.data, ...state.reports],
    }));

    const { error } = await supabase.from("reports").insert(parsed.data);
    if (error) console.error(error);
  },
}));
