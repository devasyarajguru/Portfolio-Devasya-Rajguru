import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {  Menu, X } from 'lucide-react';
// import { useThemeStore } from '../store/theme';

export default function Navigation() {
  const [isOpen, setIsOpen] = React.useState(false);
  // const { isDarkMode, toggleTheme } = useThemeStore();

  const menuItems = [
    { name: 'Home', id: 'home' },
    { name: 'About', id: 'about' },
    { name: 'Work', id: 'work' },
    { name: 'Skills', id: 'skills' },
    { name: 'Testimonials', id: 'testimonals' },
    { name: 'Contact', id: 'contact' },
  ];

  const handleScroll = (id: string) =>
  {
    const section = document.getElementById(id);
    if(section)
    {
      section.scrollIntoView({behavior: 'smooth'})
      setIsOpen(false) // Close mobile menu if open
    }
  }

  return (
    <motion.nav 
      className="fixed w-full z-50 bg-white" 
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}  
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <button  className="text-2xl font-bold"
          onClick={() =>
            {
              const section = document.getElementById("home")
              if(section) section.scrollIntoView({behavior: "smooth"})
            }
            }
          >
            Portfolio
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleScroll(item.id)}
                className="hover:text-blue-500 transition-colors"
              >
                {item.name}
              </button>
            ))}
            {/* <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button> */}
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <motion.div
          initial={false}
          animate={isOpen ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
          className="md:hidden overflow-hidden"
        >
          <div className="py-4 space-y-4">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleScroll(item.id)}
                className="block hover:text-blue-500 transition-colors"
              >
                {item.name}
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.nav>
  );
}