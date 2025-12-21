import { z } from "zod";

export const KeyFindingSchema = z.object({
  title: z.string(),
  value: z.string().optional(),
  note: z.string().optional(),
  status: z.enum(["normal", "warning", "critical"]),
});

export const AIResultSchema = z.object({
  summary: z.string(),
  key_findings: z.array(KeyFindingSchema),
  full_data: z.any(),
  patient_name: z.string().nullable(),
  report_date: z.string().nullable(),
  prediction: z.string(),
  recommendation: z.string(),
  health_score: z.string(),
});

export const ReportSchema = z.object({
  id: z.string(),
  user_id: z.string(),
  report_type: z.string(),
  file_url: z.string().url(),
  analyzed: z.boolean().optional().default(false),
  old_report_id: z.string().uuid().optional().nullable(),
  ai_result: AIResultSchema,
  uploaded_at: z.string(),
});
