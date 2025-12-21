import { supabase } from "../supabaseclient";

export const subscription = async ({
  priceId,
  email,
  clerkUserId,
  plan,
}: {
  priceId: string;
  email: string;
  clerkUserId: string;
  plan: string;
}) => {
  const { data, error } = await supabase.functions.invoke(
    "create-subscription",
    {
      body: { priceId: priceId, email: email, clerkUserId, plan },
    }
  );

  //   console.log(data);

  if (error) throw error;
  console.log(error);
  return data;
};
