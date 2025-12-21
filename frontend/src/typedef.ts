import { z } from "zod";
import type {
  AIResultSchema,
  KeyFindingSchema,
  ReportSchema,
} from "./lib/services/zod/reportValidation";
import type {
  subsPlanSchema,
  UserSchema,
} from "./lib/services/zod/userValidations";

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

export type userType = z.infer<typeof UserSchema>;
export type subPlanType = z.infer<typeof subsPlanSchema>;

export type userStoreType = {
  user: userType | null;
  loading: boolean;
  fetchUserById: (id: string) => Promise<void>;
  isPremium: () => boolean;
  isYearly: () => boolean;
};
