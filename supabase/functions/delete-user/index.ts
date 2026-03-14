import { serve } from "https://deno.land/std/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js"

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
}

serve(async (req) => {

  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders })
  }

  try {

    const { userId, deleteAll } = await req.json()

    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL"),
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")
    )

    // -------------------------
    // حذف ملفات storage
    // -------------------------
    const deleteUserStorage = async (id: string) => {

      // avatars
      const { data: avatarFiles } = await supabaseAdmin
  .storage
  .from("avatars")
  .list()

if (avatarFiles) {

  const avatarPaths = avatarFiles
    .filter(file => file.name.includes(id))
    .map(file => file.name)

  if (avatarPaths.length > 0) {
    await supabaseAdmin
      .storage
      .from("avatars")
      .remove(avatarPaths)
  }

}

      // covers
     const { data: coverFiles } = await supabaseAdmin
  .storage
  .from("covers")
  .list()

if (coverFiles) {

  const coverPaths = coverFiles
    .filter(file => file.name.includes(id))
    .map(file => file.name)

  if (coverPaths.length > 0) {
    await supabaseAdmin
      .storage
      .from("covers")
      .remove(coverPaths)
  }

}
    }

    // -------------------------
    // حذف بيانات المستخدم
    // -------------------------
    const deleteUserData = async (id: string) => {

      await supabaseAdmin
        .from("messages")
        .delete()
        .eq("user_id", id)

      await supabaseAdmin
        .from("conversations")
        .delete()
        .eq("user_id", id)

      await supabaseAdmin
        .from("profiles")
        .delete()
        .eq("id", id)

      await deleteUserStorage(id)

      await supabaseAdmin.auth.admin.deleteUser(id)
    }

    // -------------------------
    // حذف كل المستخدمين (Admin)
    // -------------------------
    if (deleteAll) {

      const { data, error } = await supabaseAdmin.auth.admin.listUsers()

      if (error) throw error

      for (const u of data.users) {

        const id = u.id

        // لا تحذف الأدمن الذي ضغط الزر
        if (id === userId) continue

        await deleteUserData(id)
      }

      return new Response(
        JSON.stringify({ success: true }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      )
    }

    // -------------------------
    // حذف مستخدم واحد
    // -------------------------
    await deleteUserData(userId)

    return new Response(
      JSON.stringify({ success: true }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    )

  } catch (err) {

    return new Response(
      JSON.stringify({ error: String(err) }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      }
    )
  }

})