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
        stripe_customer_id: "",
        subscription_end: "",
        subscription_start: "",
        stripe_subscription_id: "",
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
        stripe_customer_id: null,
        subscription_end: null,
        subscription_start: null,
        subscription_status: false,
        stripe_subscription_id: null,
      });
    };

    insertData();
  }, [user]);
}
