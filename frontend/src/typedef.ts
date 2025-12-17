import { z } from "zod";
import type { ReportSchema } from "./lib/services/zod/reportValidation";

export type ReportType = z.infer<typeof ReportSchema>;

export type reportStoreType = {
  reports: ReportType[];
  loading: boolean;
  loadReports: (userId: string) => Promise<void>;
  getReportById: (id: string) => ReportType | undefined;
  upsertReport: (report: ReportType) => void;
  selectUserReports: (userId: string) => void;
};
