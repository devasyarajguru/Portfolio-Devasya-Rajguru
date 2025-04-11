import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { Testimonial } from '../types';

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const testimonials: Testimonial[] = [
    {
      id: '1',
      name: 'Daniel Worthington',
      role: 'Senior Software Engineer',
      company: 'Mightymeld',
      content: 'Devasya was one of the first people to join our creator spotlight program at MightyMeld and I enjoyed working with him on it very much. He was kind, helpful, and flexible with scheduling. More importantly, we learned an amazing amount from the work that he did building out a React project using MightyMeld. His feedback was invaluable to planning our next steps. I can also say from having watched him at work that he is a skilled React and Tailwind CSS developer.',
      image: '/images/test1.png',
    },
    {
      id: '2',
      name: 'Dev Shinde',
      role: "GDSC LEAD 23 - Team Lead",
      company: "NIH'23",
      content: 'I am writing to highly recommend Devasya Rajguru as an exceptional front-end developer. Having worked closely with him on various projects, including our victorious collaboration in the NIH Hackathon Winner23, I can confidently say that Devasya stands out in the field of front-end development. His expertise in front-end technologies is unparalleled, consistently delivering high-quality, user-friendly interfaces that exceed expectations.',
      image: '/images/test2.png',
      // rating: 5
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prevIndex) => 
        prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(timer);
  }, [testimonials.length]);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.95,
      transition: { duration: 0.4, ease: 'easeOut' }
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      zIndex: 1,
      transition: { type: "spring", stiffness: 260, damping: 25 }
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
      scale: 0.95,
      zIndex: 0,
      transition: { duration: 0.4, ease: 'easeIn' }
    })
  };

  const headingVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: 'easeOut',
      },
    },
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => {
      if (newDirection === 1) {
        return prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1;
      }
      return prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1;
    });
  };

  // const renderStars = (rating: number) => {
  //   return [...Array(5)].map((_, index) => (
  //     <Star
  //       key={index}
  //       className={`w-5 h-5 ${
  //         index < rating ? 'text-blue-500 fill-current' : 'text-gray-300'
  //       }`}
  //     />
  //   ));
  // };

  return (
    <div className="min-h-screen py-20 px-4 md:px-8 relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.div
          whileInView="visible" // Animates when in view
          viewport={{once:true , amount: 0.3}} // triggers when 30% of the sewction is in view
          variants={headingVariants}
          initial="hidden"
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Client Testimonials</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Here's what people are saying about my work
          </p>
        </motion.div>

        <div className="relative h-[500px] md:h-[400px]">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
            whileInView="visible" // Animates when in view
            viewport={{once:true , amount: 0.3}} // triggers when 30% of the sewction is in view
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.7}
              onDragEnd={(_, { offset, velocity }) => {
                const swipe = swipePower(offset.x, velocity.x);

                if (swipe < -swipeConfidenceThreshold) {
                  paginate(1);
                } else if (swipe > swipeConfidenceThreshold) {
                  paginate(-1);
                }
              }}
              className="absolute w-full"
            >
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 md:p-12 shadow-xl backdrop-blur-sm border border-gray-100 dark:border-gray-700">
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="flex-shrink-0">
                    <div className="relative w-24 h-24 md:w-32 md:h-32">
                      <img
                        src={testimonials[currentIndex].image}
                        alt={testimonials[currentIndex].name}
                        className="rounded-full object-cover w-full h-full"
                      />
                      <div className="absolute inset-0 rounded-full border-2 border-blue-500 opacity-50"></div>
                    </div>
                  </div>
                  
                  <div className="flex-1 text-center md:text-left">
                    <div className="flex justify-center md:justify-start mb-4">
                      {/* {renderStars(testimonials[currentIndex].rating)} */}
                    </div>
                    <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-6 italic">
                      "{testimonials[currentIndex].content}"
                    </p>
                    <div>
                      <h3 className="text-xl font-semibold text-blue-500">
                        {testimonials[currentIndex].name}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        {testimonials[currentIndex].role} at {testimonials[currentIndex].company}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <button
            className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-white dark:bg-gray-800 shadow-lg text-blue-500 hover:text-blue-600 transition-colors"
            onClick={() => paginate(-1)}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-white dark:bg-gray-800 shadow-lg text-blue-500 hover:text-blue-600 transition-colors"
            onClick={() => paginate(1)}
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        <div className="flex justify-center mt-8 space-x-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentIndex
                  ? 'bg-blue-500'
                  : 'bg-gray-300 dark:bg-gray-700'
              }`}
              onClick={() => {
                setDirection(index > currentIndex ? 1 : -1);
                setCurrentIndex(index);
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}