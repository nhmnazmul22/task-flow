import { supabase } from "@/config/supabaseConfig";
import type { registerDataType } from "@/types/auth";

export type ResponseType = {
  success: boolean;
  message: string;
  data?: object;
};

export const registerService = async (
  payload: registerDataType,
): Promise<ResponseType> => {
  const { data, error } = await supabase.auth.signUp({
    email: payload.email,
    password: payload.password,
    options: {
      data: {
        full_name: payload.name,
        avatar_url: payload.avatar,
      },
    },
  });

  if (error) {
    return {
      success: false,
      message: error.message,
    };
  }

  return {
    success: true,
    message: "Register successful",
    data: data,
  };
};
