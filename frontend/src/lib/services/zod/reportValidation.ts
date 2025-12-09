import { z } from "zod";

export const AIResultSchema = z.object({
  summary: z.string(),
  key_findings: z.array(z.string()),
  health_score: z.number().min(0).max(100),
  full_data: z.any(),
  // explanation: z.string(),
});

export const ReportSchema = z.object({
  report_type: z.string().optional(),
  file_url: z.string().url(),
  analyzed: z.boolean().optional().default(false),
  old_report_id: z.string().uuid().optional(),
  ai_result: AIResultSchema.optional(),
});
