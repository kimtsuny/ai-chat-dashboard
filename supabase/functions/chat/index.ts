import { serve } from "https://deno.land/std/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { message } = await req.json();
    const apiKey = Deno.env.get("NVIDIA_API_KEY");

    const response = await fetch(
      "https://integrate.api.nvidia.com/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "nvidia/nemotron-3-nano-30b-a3b",
          messages: [
            { role: "system", content: "You are a helpful assistant." },
            { role: "user", content: message },
          ],
          temperature: 0.7,
          max_tokens: 512,
        }),
      }
    );

    const data = await response.json();
    console.log("NVIDIA:", data);

    const reply =
      data?.choices?.[0]?.message?.content ||
      "No response from model";

    return new Response(JSON.stringify({ reply }), {
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json",
      },
    });
  } catch (err) {
    return new Response(
      JSON.stringify({ reply: "Server error", error: String(err) }),
      {
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  }
});
