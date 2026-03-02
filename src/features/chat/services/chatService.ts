import { supabase } from "@/lib/supabase";

export async function sendMessage(message: string) {
  const { data, error } = await supabase.functions.invoke("chat", {
    body: { message },
  });

  if (error) {
    console.error(error);
    throw error;
  }

  return data;
}
