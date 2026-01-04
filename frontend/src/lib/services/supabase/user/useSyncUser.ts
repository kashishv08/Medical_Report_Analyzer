import { useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import { supabase } from "../supabaseclient";

export function useSyncUser() {
  const { user } = useUser();
  console.log("user", user);

  useEffect(() => {
    if (!user) return;

    const syncUser = async () => {
      const { data: existingUser } = await supabase
        .from("users")
        .select("id")
        .eq("id", user.id)
        .single();

      if (existingUser) {
        console.log("User already exists, skipping insert");
        return;
      }

      const { error: insertError } = await supabase.from("users").insert({
        id: user.id,
        email: user.primaryEmailAddress?.emailAddress,
        name: user.fullName,
      });

      if (insertError) {
        console.error("Insert failed:", insertError);
      }
    };

    syncUser();
  }, [user]);
}
