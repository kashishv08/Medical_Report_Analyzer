import { z } from "zod";

export const SeverityEnum = z.enum(["normal", "warning", "critical"]);

export const HealthScoreEnum = z.enum(["A+", "A", "B+", "B", "C"]);

export const KeyFindingSchema = z.object({
  title: z.string().nullable(),
  value: z.string().nullable(),
  note: z.string().nullable(),
  status: SeverityEnum.default("normal"),
});

export const DetailedMetricSchema = z.object({
  name: z.string().nullable(),
  value: z.string().nullable(),
  unit: z.string().nullable(),
  normal_range: z.string().nullable(),
  explanation: z.string().nullable(),
  severity: SeverityEnum.default("normal"),
  progress_percent: z.number().min(0).max(100).nullable(),
});

export const PredictionSchema = z.object({
  insight: z.string().nullable(),
  reason: z.string().nullable(),
  prevention_tip: z.string().nullable(),
});

export const RecommendationSchema = z.object({
  title: z.string().nullable(),
  explanation: z.string().nullable(),
  daily_action: z.string().nullable(),
});

export const FullDataSchema = z.object({
  vitals: z.record(z.string(), z.any()).nullable(),
  diagnoses: z.array(z.string()).nullable(),
  lab_results: z.record(z.string(), z.any()).nullable(),
  medications: z.array(z.string()).nullable(),
  observations: z.array(z.string()).nullable(),
});

export const AIResultSchema = z.object({
  patient_name: z.string().nullable(),
  report_type: z.string(),
  report_date: z.string().nullable(),
  health_score: HealthScoreEnum.default("A"),

  summary: z.string(),

  key_findings: z.array(KeyFindingSchema).optional().default([]),
  detailed_metrics: z.array(DetailedMetricSchema).optional().default([]),
  prediction: z.array(PredictionSchema).optional().default([]),
  recommendation: z.array(RecommendationSchema).optional().default([]),
  full_data: FullDataSchema.optional().default({
    vitals: {},
    diagnoses: [],
    lab_results: {},
    medications: [],
    observations: [],
  }),
  error: z.string().optional(),
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
