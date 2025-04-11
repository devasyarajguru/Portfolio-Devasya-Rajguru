import  { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, X, Trophy, Users } from 'lucide-react';
import Certificate from '../../public/images/certicate.jpeg'
import Group from '../../public/images/group.jpeg'

interface ImageModalProps {
  src: string;
  alt: string;
  onClose: () => void;
}

function ImageModal({ src, alt, onClose }: ImageModalProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
      onClick={onClose}
      whileInView="visible" // Animates when in view
      viewport={{once:true , amount: 0.3}} // triggers when 30% of the sewction is in view
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.9 }}
        className="relative max-w-4xl w-full"
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
        >
          <X className="w-8 h-8" />
        </button>
        <img src={src} alt={alt} className="w-full h-auto rounded-lg" />
      </motion.div>
    </motion.div>
  );
}

export default function HackathonShowcase() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const columnVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };
  
  const itemFade = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 }
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

  const techStack = [
    { name: 'React', color: 'text-blue-500' },
    { name: 'Firebase', color: 'text-orange-600' },
    { name: 'Framer Motion', color: 'text-black-500' },
    { name: 'Zustand  ', color: 'text-green-600' },
    { name: 'MUI', color: 'text-blue-400' },
  ];

  return (
    <motion.div
      initial="hidden"
      variants={containerVariants}
      className="mt-16"
      whileInView="visible" // Animates when in view
      viewport={{once:true , amount: 0.3}} // triggers when 30% of the sewction is in view
    >
      <motion.h2 className="text-3xl font-bold mb-8 flex items-center gap-3" variants={itemFade}>
        <Trophy className="w-8 h-8 text-yellow-500" />
        Hackathon Showcase
      </motion.h2>

      <motion.div
        variants={cardVariants}
        className="grid md:grid-cols-2 gap-8"
      >
        {/* Left Column - Images & Certificate */}
        <motion.div className="space-y-6" variants={columnVariants}>
          {/* Certificate */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="relative group cursor-pointer"
            onClick={() => setSelectedImage(Certificate)}
          >
            <motion.div 
              className="overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700 shadow-lg"
              initial={{ scale: 0.95, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4 }}
              >
              <img
                src={Certificate}
                alt="Hackathon Certificate"
                className="w-full h-auto transition-transform duration-300 group-hover:scale-105"
              />
            </motion.div>
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <p className="text-white font-medium">Click to expand</p>
            </div>
          </motion.div>

          {/* Team Photo */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="relative group cursor-pointer"
            onClick={() => setSelectedImage(Group)}
          >
            <div className="overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700 shadow-lg">
              <img
                src={Group}
                alt="Team Photo"
                className="w-full h-auto transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <p className="text-white font-medium">Click to expand</p>
            </div>
          </motion.div>
        </motion.div>

        {/* Right Column - Project Details */}
        <motion.div className="space-y-6" variants={columnVariants}>
          <motion.div variants={itemFade}>
            <h3 className="text-2xl font-bold text-blue-500 mb-2">
               Project Name: Legal Justice
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Third place winner at the National India Hackathon 2023. Our team build a smart legal platform designed to make legal help more accessible and user-friendly—bridging the gap between complex law and everyday people using intuitive technology.
            </p>
          </motion.div>

          <motion.div variants={itemFade}>
            <h4 className="text-xl font-semibold mb-3">🎯 Project Highlights</h4>
            <ul className="space-y-3 text-gray-600 dark:text-gray-300">
              <li className="flex items-start gap-2">
                <span className="text-blue-500 mt-1">•</span>
                Designed a dedicated chat portal enabling real-time communication between users and legal professionals.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500 mt-1">•</span>
                Built a multilingual legal chatbot to provide instant, accessible legal guidance to users across regions.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500 mt-1">•</span>
                Focused on user-centric design to ensure clarity, trust, and ease-of-use for legal tech solutions.
              </li>
            </ul>
          </motion.div>

          <div>
            <h4 className="text-xl font-semibold mb-3">💻 Tech Stack</h4>
            <div className="flex flex-wrap gap-2">
              {techStack.map((tech) => (
                <span
                  key={tech.name}
                  className={`px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 ${tech.color} text-sm font-medium`}
                >
                  {tech.name}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
              <Users className="w-5 h-5" />
              <span>5 Team Members</span>
            </div>
          </div>

          <motion.div className="flex flex-wrap gap-4 pt-4">
            <motion.a
              href="https://legal-justice-project.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ExternalLink className="w-5 h-5" />
              View Project Demo
            </motion.a>
            <motion.a
              href="https://github.com/devasyarajguru/Legal-Justice-NIH-Hackathon-"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border-2 border-blue-500 text-blue-500 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 dark:hover:bg-blue-500/10 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View GitHub Repo
            </motion.a>
          </motion.div>
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {selectedImage && (
          <ImageModal
            src={selectedImage}
            alt="Expanded view"
            onClose={() => setSelectedImage(null)}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}