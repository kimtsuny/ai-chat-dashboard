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

    const { userId } = await req.json()

    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    )

    // حذف الرسائل
    await supabaseAdmin
      .from("messages")
      .delete()
      .eq("user_id", userId)

    // حذف المحادثات
    await supabaseAdmin
      .from("conversations")
      .delete()
      .eq("user_id", userId)

    // حذف البروفايل
    await supabaseAdmin
      .from("profiles")
      .delete()
      .eq("id", userId)

    // حذف المستخدم من auth
    const { error } = await supabaseAdmin.auth.admin.deleteUser(userId)

    if (error) {
      return new Response(
        JSON.stringify({ error: error.message }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      )
    }

    return new Response(
      JSON.stringify({ success: true }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    )

  } catch (err) {

    return new Response(
      JSON.stringify({ error: String(err) }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    )

  }

})