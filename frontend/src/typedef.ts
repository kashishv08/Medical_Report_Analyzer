import { z } from "zod";
import type {
  AIResultSchema,
  KeyFindingSchema,
  ReportSchema,
} from "./lib/services/zod/reportValidation";

export type ReportType = z.infer<typeof ReportSchema>;
export type KeyFindingType = z.infer<typeof KeyFindingSchema>;
export type aiResType = z.infer<typeof AIResultSchema>;

export type reportStoreType = {
  reports: ReportType[];
  loading: boolean;
  loadReports: (userId: string) => Promise<void>;
  getReportById: (id: string) => ReportType | undefined;
  upsertReport: (report: ReportType) => void;
  selectUserReports: (userId: string) => void;
};
