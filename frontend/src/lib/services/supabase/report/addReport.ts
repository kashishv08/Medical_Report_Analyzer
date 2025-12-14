import { supabase } from "../supabaseclient";

export const addReportToDB = async (report: {
  user_id: string;
  file_url: string;
  report_type?: string;
}) => {
  const { data, error } = await supabase
    .from("reports")
    .insert([
      {
        user_id: report.user_id,
        file_url: report.file_url,
        report_type: report.report_type || "Unknown",
        uploaded_at: new Date().toISOString(),
        analyzed: false,
      },
    ])
    .select(); // <- important

  // console.log("Inserted data:", data); // should log the inserted row

  if (error) throw error;

  return data?.[0]; // return the inserted row as an object
};
