import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Play, Pause } from 'lucide-react';
// import mighty from "../../public/images/mighty.JPG"

export default function FeaturedIn() {
  const [isPlaying, setIsPlaying] = React.useState(false);
  const videoRef = React.useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    if (videoRef.current) {
      console.log("Video element found. Playing: ", !isPlaying);
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch(err => console.error("Playback error: ", err));
      }
      setIsPlaying(!isPlaying);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="py-20 px-4 md:px-8 bg-gradient-to-b from-transparent to-blue-50 dark:to-gray-900/50">
      <motion.div
      whileInView="visible" // Animates when in view
      viewport={{once:true , amount: 0.3}} // triggers when 30% of the sewction is in view
        initial="hidden" 
        variants={containerVariants}
        className="max-w-6xl mx-auto"
      >
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 flex items-center justify-center gap-3">
            <span>Featured In</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Honored to be recognized for contributions in development.
          </p>
        </div>

        <motion.div
          variants={cardVariants}
          className="grid md:grid-cols-2 gap-8 items-center bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl border border-gray-100 dark:border-gray-700"
        >
          {/* Left Column - Content */}
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <img
                src="/images/mighty.JPG"
                alt="MightyMeld Logo"
                className="w-12 h-12 rounded-lg object-cover"
              />
              <div>
                <h3 className="text-2xl font-bold text-blue-500">MightyMeld</h3>
                <p className="text-gray-600 dark:text-gray-300">Featured Developer Spotlight</p>
              </div>
            </div>

            <p className="text-lg text-gray-600 dark:text-gray-300">
              Collaborated with the MightyMeld team on a freelance project, where I built a modern React application using their tool. Honored to be featured for contributing to a seamless and interactive user experience.
              
            </p>

            <div className="flex flex-wrap gap-3">
              {['React', 'Tailwind', 'MightyMeld'].map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-sm font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>

            <motion.a
              href="https://mightymeld.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ExternalLink className="w-5 h-5" />
              View Full Feature
            </motion.a>
          </div>

          {/* Right Column - Video */}
          <div className="relative group">
            <div className="aspect-video rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-700">
              <video
                ref={videoRef}
                className="w-full h-full object-cover"
                loop
                muted
                playsInline
                poster="/images/mighty2.JPG"  // What should be here also??
              >
                <source
                  src="/images/myvideo.mp4"
                  type="video/mp4"
                />
                Your browser does not support the video tag.
              </video>

              <motion.button
                onClick={togglePlay}
                className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {isPlaying ? (
                  <Pause className="w-16 h-16 text-white" />
                ) : (
                  <Play className="w-16 h-16 text-white" />
                )}
              </motion.button>
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={cardVariants}
          className="text-center mt-12"
        >
          {/* <p className="text-gray-600 dark:text-gray-300 mb-6">
            Want to see what others are saying? Check out more testimonials below!
          </p>
          <motion.a
            href="testimonal"
            className="inline-flex items-center gap-2 bg-white dark:bg-gray-800 text-blue-500 px-8 py-4 rounded-full font-semibold border-2 border-blue-500 hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View All Testimonials
          </motion.a> */}
        </motion.div>
      </motion.div>
    </section>
  );
}