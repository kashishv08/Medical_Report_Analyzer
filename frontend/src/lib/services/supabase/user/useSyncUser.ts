import { useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import { supabase } from "../supabaseclient";
import { UserSchema } from "../../zod/userValidations";

export function useSyncUser() {
  const { user } = useUser();

  // console.log(user);

  useEffect(() => {
    const insertData = async () => {
      if (!user) return;

      const userObj = {
        id: user.id,
        email: user.primaryEmailAddress?.emailAddress,
        name: user.fullName,
        dob: "",
      };

      const parsed = UserSchema.safeParse(userObj);
      if (!parsed.success) {
        console.error("Invalid user data:", parsed.error);
        return;
      }

      await supabase.from("users").upsert({
        id: user.id,
        email: user.primaryEmailAddress?.emailAddress,
        name: user.fullName,
        dob: null,
      });
    };

    insertData();
  }, [user]);
}
