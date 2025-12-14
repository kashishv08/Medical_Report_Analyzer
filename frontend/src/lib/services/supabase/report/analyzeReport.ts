import { supabase } from "../supabaseclient";

export const analyzeReport = async (fileText: string) => {
  const { data, error } = await supabase.functions.invoke("openai-analysis", {
    body: { file_text: fileText },
  });

  // console.log(data);

  if (error) throw error;
  return data;
};
