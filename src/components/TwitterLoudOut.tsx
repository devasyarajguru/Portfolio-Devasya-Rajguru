// import React, { useEffect, useState } from 'react';
// import { motion, useAnimation } from 'framer-motion';
// import { Twitter, Heart, MessageCircle, Repeat2, ExternalLink } from 'lucide-react';

// interface Tweet {
//   id: string;
//   text: string;
//   created_at: string;
//   public_metrics: {
//     retweet_count: number;
//     reply_count: number;
//     like_count: number;
//     quote_count: number;
//   };
//   media?: {
//     type: string;
//     url: string;
//     preview_image_url: string;
//   }[];
// }

// export default function TwitterLoudOut() {
//   const [tweets, setTweets] = useState<Tweet[]>([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const controls = useAnimation();

//   const fetchTweets = async (retryCount = 0) => {
//   try {
//     const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/twitter-api`, {
//       headers: {
//         "Authorization": `Bearer ${import.meta.env.VITE_SUPABASE_SERVICE_ROLE_KEY}`,
//         "Content-Type": "application/json",
//       },
//     });

//     if (!response.ok) {
//       const errorData = await response.json();
//       if (response.status === 429) {
//         console.warn("Rate limit hit. Retrying...");
//         if (retryCount < 3) {
//           setTimeout(() => fetchTweets(retryCount + 1), 2 ** retryCount * 5000); // Wait 5s, 10s, 20s before retrying
//           return;
//         } else {
//           throw new Error("Twitter API rate limit exceeded. Try again later.");
//         }
//       }
//       throw new Error(errorData.error || "Failed to fetch tweets");
//     }

//     const data = await response.json();
//     setTweets(data.data || []);
//     setError(null);
//   } catch (err) {
//     console.error("Error fetching tweets:", err);
//     setError(err.message);
//   } finally {
//     setIsLoading(false);
//   }
// };


//   useEffect(() => {
//     fetchTweets();
//     const interval = setInterval(fetchTweets, 1800000); // Refresh every 15 minutes (900000 ms)
//     return () => clearInterval(interval);
//   }, []);

//   useEffect(() => {
//     if (tweets.length > 0) {
//       controls.start({
//         x: [0, -100],
//         transition: {
//           x: {
//             repeat: Infinity,
//             repeatType: "loop",
//             duration: 20,
//             ease: "linear",
//           },
//         },
//       });
//     }
//   }, [tweets, controls]);

//   const formatTimeAgo = (dateString: string) => {
//     const date = new Date(dateString);
//     const now = new Date();
//     const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

//     if (seconds < 60) return `${seconds}s ago`;
//     const minutes = Math.floor(seconds / 60);
//     if (minutes < 60) return `${minutes}m ago`;
//     const hours = Math.floor(minutes / 60);
//     if (hours < 24) return `${hours}h ago`;
//     const days = Math.floor(hours / 24);
//     return `${days}d ago`;
//   };

//   const formatNumber = (num: number) => {
//     if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
//     if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
//     return num.toString();
//   };

//   if (isLoading) {
//     return (
//       <div className="flex justify-center items-center py-20">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="text-center py-20">
//         <p className="text-red-500">Error loading tweets: {error}</p>
//       </div>
//     );
//   }

//   return (
//     <section className="w-full py-20 overflow-hidden bg-white dark:bg-gray-900 border-t border-b border-gray-200 dark:border-gray-700">
//       <div className="container mx-auto px-4">
//         <div className="text-center mb-12">
//           <h2 className="text-3xl md:text-4xl font-bold mb-4 flex items-center justify-center gap-3">
//             <Twitter className="text-blue-500" />
//             <span>Twitter Loud-Out</span>
//           </h2>
//           <p className="text-gray-600 dark:text-gray-300">
//             Real-time thoughts, updates, and insights from my Twitter feed
//           </p>
//         </div>

//         <div className="relative w-full overflow-hidden">
//   <motion.div
//     className="flex gap-6 whitespace-nowrap"
//     animate={{
//      x: [0, -tweets.length * 250], // Dynamic movement based on tweet count
// transition: {
//   x: {
//     repeat: Infinity,
//     repeatType: "loop",
//     duration: tweets.length * 2, // Adjust speed based on number of tweets
//     ease: "linear",
//   },
// },
//     }}
//   >
//     {[...tweets, ...tweets, ...tweets , ...tweets].map((tweet, index) => (
//       <motion.div
//         key={`${tweet.id}-${index}`}
//         className="flex-shrink-0 w-full md:w-[400px] bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700"
//         whileHover={{ y: -5, scale: 1.02 }}
//         transition={{ type: "spring", stiffness: 300 }}
//       >
//         {/* Tweet content */}
//         <div className="flex items-start gap-4 mb-4">
//           <img
//             src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=800&auto=format&fit=crop&q=80"
//             alt="Profile"
//             className="w-12 h-12 rounded-full border-2 border-blue-500"
//           />
//           <div>
//             <h3 className="font-bold text-gray-900 dark:text-white">Devasya Rajguru</h3>
//             <p className="text-blue-500">@RajguruDevasya</p>
//             <span className="text-sm text-gray-500 dark:text-gray-400">
//               {formatTimeAgo(tweet.created_at)}
//             </span>
//           </div>
//         </div>

//         <p className="text-gray-600 dark:text-gray-300 mb-4 whitespace-pre-wrap">
//           {tweet.text}
//         </p>

//         {tweet.media && tweet.media[0] && (
//           <div className="mb-4 rounded-xl overflow-hidden">
//             <img
//               src={tweet.media[0].url || tweet.media[0].preview_image_url}
//               alt="Tweet media"
//               className="w-full h-auto"
//             />
//           </div>
//         )}

//         <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
//           <span className="flex items-center gap-1">
//             <Heart className="w-4 h-4 text-red-500" />
//             {formatNumber(tweet.public_metrics.like_count)}
//           </span>
//           <span className="flex items-center gap-1">
//             <Repeat2 className="w-4 h-4" />
//             {formatNumber(tweet.public_metrics.retweet_count)}
//           </span>
//           <span className="flex items-center gap-1">
//             <MessageCircle className="w-4 h-4" />
//             {formatNumber(tweet.public_metrics.reply_count)}
//           </span>
//         </div>

//         <a
//           href={`https://twitter.com/username/status/${tweet.id}`}
//           target="_blank"
//           rel="noopener noreferrer"
//           className="inline-flex items-center gap-2 text-blue-500 hover:text-blue-600 text-sm"
//         >
//           <ExternalLink className="w-4 h-4" />
//           View on Twitter
//         </a>
//       </motion.div>
//     ))}
//   </motion.div>
// </div>


//         <div className="text-center mt-12">
//           <a
//             href="https://twitter.com/yourhandle"
//             target="_blank"
//             rel="noopener noreferrer"
//             className="inline-flex items-center gap-2 bg-blue-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-600 transition-colors"
//           >
//             <Twitter className="w-5 h-5" />
//             Follow Me on Twitter
//           </a>
//         </div>
//       </div>
//     </section>
//   );
// }