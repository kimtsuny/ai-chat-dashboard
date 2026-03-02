import { supabase } from "@/lib/supabase"

export async function login(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return { user: null, error }
  }

  return { user: data.user, error: null }
}