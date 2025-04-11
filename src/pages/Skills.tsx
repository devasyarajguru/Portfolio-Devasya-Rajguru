import React from 'react';
import { motion } from 'framer-motion';
import { Code2,  Github as Git, Globe, Palette,FlaskConical,PenTool, Paintbrush, MoveRight, Flame, DatabaseZap } from 'lucide-react';

interface Skill {
  name: string;
  description: string;
  icon: React.ReactNode;
  category: string;
}

export default function Skills() {
  const skills: Skill[] = [
    // Frontend Development
    {
      name: 'React.js',
      description: 'Building scalable component-based user interfaces with modern React patterns and hooks.',
      icon: <Code2 className="w-6 h-6" />,
      category: 'Frontend Development'
    },
    {
      name: 'UI/UX Design',
      description: 'Crafting intuitive user interfaces with modern design principles.',
      icon: <Palette className="w-6 h-6" />,
      category: 'Frontend Development'
    },
    {
      name: 'Tailwind CSS',
      description: 'Designing sleek, responsive UIs rapidly with utility-first CSS.',
      icon: <Paintbrush className="w-6 h-6" />,
      category: 'Frontend Development'
    },
    {
      name: 'Framer Motion',
      description: 'Adding fluid animations and transitions to elevate user experience.',
      icon: <MoveRight className="w-6 h-6" />,
      category: 'Frontend Development'
    },
      // Backend development
    {
      name: 'Firebase',
      description: 'Building real-time applications with Authentication, Firestore, and Hosting.',
      icon: <Flame className="w-6 h-6" />,  
      category: 'Backend Development'
    },
    {
      name: 'Supabase',
      description: 'Open-source Firebase alternative for scalable SQL databases and auth.',
      icon: <DatabaseZap className="w-6 h-6" />,  
      category: 'Backend Development'
    },

    // Tools
    
    {
      name: 'Git & GitHub',
      description: 'Version control and collaborative development workflows.',
      icon: <Git className="w-6 h-6" />,
      category: 'Tools'
    },
    {
      name: 'Postman',
      description: 'API testing and debugging tool for REST and GraphQL APIs.',
      icon: <FlaskConical className="w-6 h-6" />,
      category: 'Tools'
    },
    {
      name: 'Figma',
      description: 'Collaborative interface design and prototyping tool.',
      icon: <PenTool className="w-6 h-6" />,
      category: 'Tools'
    },
    {
      name: 'Vercel',
      description: 'Seamless deployment for frontend frameworks and static sites.',
      icon: <Globe className="w-6 h-6" />,
      category: 'Tools'
    },
    
    
  ];

  const categories = Array.from(new Set(skills.map(skill => skill.category)));

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };
  
  const skillCardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut",
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
        className="max-w-6xl mx-auto"
      >
        <motion.div variants={itemVariants} className="text-center mb-16">
  <h1 className="text-4xl md:text-5xl font-bold mb-6">
     My Skills & Expertise
  </h1>
  <p className="text-lg text-gray-600 dark:text-gray-300 max-w-xl mx-auto">
    I don’t just learn tools — I master them to solve real problems.  
    From building smooth user interfaces to designing intelligent systems.
  </p>
</motion.div>
        
        {categories.map((category) => (
          <motion.div
            key={category}
            variants={containerVariants}
            className="mb-16"
          >
            <h2 className="text-2xl font-bold mb-8">{category}</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {skills
                .filter((skill) => skill.category === category)
                .map((skill, index) => (
                  <motion.div
                    key={index}
                    className="group relative bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    variants={skillCardVariants}
                  >
                    <div className="absolute top-0 left-0 w-full h-full bg-blue-500 opacity-0 group-hover:opacity-5 rounded-xl transition-opacity duration-300" />
                    
                    <div className="relative z-10">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-blue-500">
                          {skill.icon}
                        </div>
                        <h3 className="text-lg font-semibold">{skill.name}</h3>
                      </div>
                      
                      <p className="text-gray-600 dark:text-gray-300 text-sm">
                        {skill.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
            </div>
          </motion.div>
        ))}

      </motion.div>
    </div>
  );
}