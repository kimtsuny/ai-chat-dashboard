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
    
    console.log("STATUS:", response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.log("RAW ERROR:", errorText);
    
      return new Response(
        JSON.stringify({ reply: "API Error", error: errorText }),
        {
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        }
      );
    }
    
    const data = await response.json();
    console.log("FULL RESPONSE:", data);

    const reply =
    data.choices?.[0]?.message?.content ||
    data.choices?.[0]?.text ||
    JSON.stringify(data)

    return new Response(
      JSON.stringify({ reply }),
      {
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );

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