
// import { serve } from "std/http/server.ts";
// import { createClient } from "@supabase/supabase-js";


// const supabase = createClient(
//   Deno.env.get('SUPABASE_URL')!,
//   Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
// );

// const TWITTER_BEARER_TOKEN = Deno.env.get('TWITTER_BEARER_TOKEN');
// const TWITTER_USER_ID = Deno.env.get('TWITTER_USER_ID');

// const CACHE_KEY = "cached_tweets";
// const CACHE_DURATION = 1800; // 30 minutes in seconds

// const corsHeaders = {
//   'Access-Control-Allow-Origin': '*',
//   'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
// };

// interface TwitterResponse {
//   data: Array<{
//     id: string;
//     text: string;
//     created_at: string;
//     public_metrics: {
//       retweet_count: number;
//       reply_count: number;
//       like_count: number;
//       quote_count: number;
//     };
//   }>;
//   includes?: {
//     media: Array<{
//       type: string;
//       url: string;
//       preview_image_url: string;
//     }>;
//   };
// }

// serve(async (req) => {
//   if (req.method === 'OPTIONS') {
//     return new Response('ok', { headers: corsHeaders });
//   }

//   try {
//     if (!TWITTER_BEARER_TOKEN || !TWITTER_USER_ID) {
//       throw new Error('Twitter credentials not configured');
//     }

//     // ✅ Check Cache in Supabase
//     const { data: cacheData, error: cacheError } = await supabase
//       .from("cache")
//       .select("data, updated_at")
//       .eq("key", CACHE_KEY)
//       .maybeSingle();

//     if (cacheError) console.error("Cache fetch error:", cacheError);

//     // If cache exists and is recent, return it
//     if (cacheData) {
//       const lastUpdated = new Date(cacheData.updated_at).getTime();
//       const now = Date.now();
//       if ((now - lastUpdated) < CACHE_DURATION * 1000) {
//         console.log("✅ Returning cached tweets");
//         return new Response(JSON.stringify(cacheData.data), {
//           headers: { ...corsHeaders, 'Content-Type': 'application/json' },
//         });
//       }
//     }

//     // ✅ Fetch fresh tweets from Twitter API
//     console.log("🔄 Fetching new tweets from Twitter API...");
//     const twitterApiUrl = `https://api.twitter.com/2/users/${TWITTER_USER_ID}/tweets`;
//     const params = new URLSearchParams({
//       'tweet.fields': 'created_at,public_metrics',
//       'expansions': 'attachments.media_keys',
//       'media.fields': 'type,url,preview_image_url',
//       'max_results': '50',
//       'exclude': 'replies,retweets'
//     });

//     const response = await fetch(`${twitterApiUrl}?${params}`, {
//       headers: { 'Authorization': `Bearer ${TWITTER_BEARER_TOKEN}` },
//     });

//     if (!response.ok) {
//       throw new Error(`Twitter API error: ${response.statusText}`);
//     }

//     const data: TwitterResponse = await response.json();

//     // ✅ Store new tweets in Supabase cache
//     await supabase.from("cache").upsert({
//       key: CACHE_KEY,
//       data: data,
//       updated_at: new Date().toISOString(),
//     });

//     return new Response(JSON.stringify(data), {
//       headers: { ...corsHeaders, 'Content-Type': 'application/json' },
//     });

//   } catch (error) {
//     return new Response(JSON.stringify({ error: error.message }), {
//       status: 500,
//       headers: { ...corsHeaders, 'Content-Type': 'application/json' },
//     });
//   }
// });
