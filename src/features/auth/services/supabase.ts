import { supabase } from "@/lib/supabase"

// تسجيل دخول بالايميل والباسورد
export async function login(email: string, password: string) {

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    console.error(error)
    return { user: null, error }
  }

  return { user: data.user, error: null }
}


// تسجيل دخول Google
export async function loginWithGoogle() {

  const { error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${window.location.origin}/auth/callback`
    }
  })

  if (error) {
    console.error(error)
  }

}


// تسجيل خروج
export async function logout() {

  const { error } = await supabase.auth.signOut()

  if (error) {
    console.error(error)
  }

}
