import { supabase } from "@/config/supabaseConfig";

export type payloadType = {
  name: string;
  email: string;
  password: string;
  avatar?: string;
};

export type ResponseType = {
  success: boolean;
  message: string;
  data?: object;
};

export const registerService = async (
  payload: payloadType,
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

  console.log("Register Response:", data, error);

  if (error) {
    return {
      success: false,
      message: error.message,
    };
  }

  return {
    success: false,
    message: "Register successful",
  };
};
