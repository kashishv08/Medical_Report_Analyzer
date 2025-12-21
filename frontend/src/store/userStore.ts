import { supabase } from "@/lib/services/supabase/supabaseclient";
import { UserSchema } from "@/lib/services/zod/userValidations";
import type { userStoreType } from "@/typedef";
import { create } from "zustand";

export const useUserStore = create<userStoreType>((set, get) => ({
  user: null,
  loading: false,

  fetchUserById: async (id: string) => {
    try {
      set({ loading: true });

      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;

      const parsed = UserSchema.safeParse(data);
      if (!parsed.success) {
        console.error(parsed.error);
        throw new Error("Invalid user data from DB");
      }

      set({ user: parsed.data });
    } catch (error) {
      console.error(error);
      set({ user: null });
    } finally {
      set({ loading: false });
    }
  },

  isPremium: () => {
    const user = get().user;
    if (!user) return false;

    return (
      user.subscription_status === true &&
      (user.subscription_plan === "monthly" ||
        user.subscription_plan === "yearly")
    );
  },

  isYearly: () => {
    const user = get().user;
    return user?.subscription_plan === "yearly";
  },
}));
