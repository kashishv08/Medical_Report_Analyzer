import { supabase } from "../supabaseclient";

export const uploadReportFile = async (file: File, userId: string) => {
  const filePath = `${userId}/${Date.now()}_${file.name}`;
  // console.log(filePath);
  const { error } = await supabase.storage
    .from("reports")
    .upload(filePath, file, { upsert: true });

  // console.log(data);

  if (error) throw error;
  const { data: signedUrlData } = await supabase.storage
    .from("reports")
    .createSignedUrl(filePath, 60 * 60 * 24); // expires in 24h
  // console.log(signedUrlData);

  return signedUrlData?.signedUrl;
};
