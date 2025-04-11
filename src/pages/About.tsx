import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, GraduationCap, Heart, Coffee , Trophy } from 'lucide-react';
import HackathonShowcase from '../components/HackathonShowcase';

interface TimelineItem {
  year: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

interface FunFact {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export default function About() {
  const timeline: TimelineItem[] = [
    {
      year: '2024',
      title: 'Freelance Frontend Developer',
      description: 'Designing and developing sleek, high-performing websites for clients across industries—turning ideas into seamless digital experiences.',
      icon: <Briefcase className="w-6 h-6" />,
    },
    {
      year: '2023',
      title: 'Open Source Contributor – GirlScript Summer of Code',
      description: 'Collaborated on open source projects that impact real users—focusing on clean code, accessibility, and solving real-world problems with community-driven development.',
      icon: <Briefcase className="w-6 h-6" />,
    },
    {
      year: '2023',
      title: 'Winner – National India Hackathon 2023',
      description: 'Secured 3rd place out of 180+ teams by building a legal tech platform that empowers users to resolve legal issues with intuitive, tech-driven solutions.',
      icon: <Trophy className="w-6 h-6" />,
    },
  ];


  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <div className="min-h-screen py-20 px-4 md:px-8">
      <motion.div
        initial="hidden"
        whileInView="visible" // Animates when in view
        viewport={{once:true , amount: 0.3}} // triggers when 30% of the sewction is in view
        variants={containerVariants}
        className="max-w-4xl mx-auto"
      >
        <motion.div 
          variants={itemVariants} 
          className="mb-12" 
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About Me</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
          I’m a frontend developer who loves turning ideas into clean, user-friendly websites. What started as a small interest in design quickly grew into a passion for building smooth, responsive, and modern web experiences.

          I enjoy combining creativity with code — making sure every website not only looks good but also works beautifully. I care about the details, the user experience, and creating something people enjoy using.
          </p>
        </motion.div>

        {/* Timeline Section */}
        <motion.div variants={itemVariants} className="mb-16">
          <h2 className="text-2xl font-bold mb-8">My Journey</h2>
          <div className="space-y-8">
            {timeline.map((item, index) => (
              <motion.div
                key={index}
                className="flex items-start gap-4"
                whileHover={{ x: 10 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="flex-shrink-0 w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                  {item.icon}
                </div>
                <div>
                  <div className="text-sm text-blue-500 font-semibold">{item.year}</div>
                  <h3 className="text-lg font-semibold mt-1">{item.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Hackathon Showcase Section */}
        <motion.div 
          variants={itemVariants}
          whileInView="visible" // Animates when in view
          viewport={{once:true , amount: 0.3}} // triggers when 30% of the sewction is in view
        >
          <HackathonShowcase />
        </motion.div>

      </motion.div>
    </div>
  );
}