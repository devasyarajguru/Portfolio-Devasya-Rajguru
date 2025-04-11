import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { ArrowDown, Github, Linkedin, Twitter } from 'lucide-react';
import About from './About';
import Work from './Work';
import Skills from './Skills';
import Testimonials from './Testimonials';
import Contact from './Contact';
// import TwitterLoudOut from '../components/TwitterLoudOut';
import FeaturedIn from '../components/FeaturedIn';
import { Link } from 'react-router-dom';

const heroVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
      staggerChildren: 0.15,
    },
  },
};



export default function Home() {
  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col justify-center items-center relative">
        <motion.div
           variants={heroVariants}
           initial="hidden"
          className="text-center"
          whileInView="visible" // Animates when in view
          viewport={{once:true , amount: 0.3}} // triggers when 30% of the sewction is in view
        >
          <motion.div className="mb-8" variants={heroVariants}>
            <img
              src=""
              alt="Profile"
              className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
            />
          </motion.div>

          <motion.h1 className="text-4xl md:text-6xl font-bold mb-4" variants={heroVariants}>
            Hello, I'm{' '}
            <TypeAnimation
              sequence={[
                'Devasya Rajguru',
                2000,
                'a Developer',
                2000,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
              className="text-blue-500"
            />
          </motion.h1>

          <motion.p className="text-xl md:text-xl text-gray-600 dark:text-gray-300 mb-8"  variants={heroVariants}>
          I don’t just build websites — I craft digital touchpoints that engage and convert.
          </motion.p>

          <motion.button
           variants={heroVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-blue-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-blue-600 transition-colors"
          >
            <Link to="/work">View My Work</Link>
          </motion.button>

          <motion.div 
           variants={heroVariants}
          className="flex justify-center space-x-6 mt-12">
            {[
              { Icon: Github, href: 'https://github.com/devasyarajguru' },
              { Icon: Linkedin, href: 'https://www.linkedin.com/in/devasya-rajguru-1a38b0211/' },
              { Icon: Twitter, href: 'https://x.com/RajguruDevasya' },
            ].map(({ Icon, href }, index) => (
              <motion.a
                key={index}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -3 }}
                className="text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"
              >
                <Icon size={24} />
              </motion.a>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          animate={{
            y: [0, 10, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-8"
        >
          <ArrowDown className="text-gray-400 dark:text-gray-500" size={32} />
        </motion.div>
      </section>

      {/* Other Sections */}
      <section id='about'><About /></section>
      <section id='work'><Work /></section>   
      <section id='skills'><Skills /></section>   
      <section id='feature'><FeaturedIn /></section>     
      {/* <section id='twitter'><TwitterLoudOut /></section>       */}
      <section id='testimonals'> <Testimonials /></section>    
      <section id='contact'> <Contact /></section>    
    </div>
  );
}