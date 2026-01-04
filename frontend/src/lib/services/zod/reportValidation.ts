import { z } from "zod";

export const SeverityEnum = z.enum(["normal", "warning", "critical"]);

export const HealthScoreEnum = z.enum(["A+", "A", "B+", "B", "C"]);

export const KeyFindingSchema = z.object({
  title: z.string(),
  value: z.string().nullable(),
  note: z.string(),
  status: SeverityEnum,
});

export const DetailedMetricSchema = z.object({
  name: z.string(),
  value: z.string().nullable(),
  unit: z.string().nullable(),
  normal_range: z.string().nullable(),
  explanation: z.string(),
  severity: SeverityEnum,
  progress_percent: z.number().min(0).max(100).nullable(),
});

export const PredictionSchema = z.object({
  insight: z.string(),
  reason: z.string(),
  prevention_tip: z.string(),
});

export const RecommendationSchema = z.object({
  title: z.string(),
  explanation: z.string(),
  daily_action: z.string(),
});

export const FullDataSchema = z.object({
  vitals: z.record(z.string(), z.any()),
  diagnoses: z.array(z.string()),
  lab_results: z.record(z.string(), z.any()),
  medications: z.array(z.string()),
  observations: z.array(z.string()),
});

export const AIResultSchema = z.object({
  patient_name: z.string().nullable(),
  report_type: z.string(),
  report_date: z.string().nullable(),
  health_score: HealthScoreEnum,

  summary: z.string(),

  key_findings: z.array(KeyFindingSchema),

  detailed_metrics: z.array(DetailedMetricSchema),

  prediction: z.array(PredictionSchema),

  recommendation: z.array(RecommendationSchema),

  full_data: FullDataSchema,
});

export const ReportSchema = z.object({
  id: z.string(),
  user_id: z.string(),
  report_type: z.string(),
  file_url: z.string().url(),
  analyzed: z.boolean().default(false),
  old_report_id: z.string().uuid().nullable().optional(),
  ai_result: AIResultSchema,
  uploaded_at: z.string(),
});
