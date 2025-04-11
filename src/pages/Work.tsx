import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { 
  Github, 
  ExternalLink, 
  Tag,
  ChevronLeft,
  ChevronRight,
  GitPullRequest,
  FileCode,
  Star
} from 'lucide-react';
import axios from 'axios';
import type { Project, PullRequest } from '../types';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

export default function Work() {
  const [pullRequests, setPullRequests] = useState<PullRequest[]>([]);
  const [loading, setLoading] = useState(true);

  const GITHUB_USERNAME = 'devasyarajguru'; // Replace with your GitHub username

  useEffect(() => {
    const fetchPullRequests = async () => {
      try {
        const response = await axios.get(
          `https://api.github.com/search/issues?q=author:${GITHUB_USERNAME}+is:pr+is:merged&sort=updated&order=desc&per_page=10`,
            {
        headers: {
          Authorization: `token ${import.meta.env.VITE_GITHUB_TOKEN}`,
        },
      }
        );
        
        const prs = await Promise.all(
          response.data.items.map(async (pr: any) => {
            const prDetailsResponse = await axios.get(pr.pull_request.url ,{
              headers: {
            Authorization: `token ${import.meta.env.VITE_GITHUB_TOKEN}`,
          },
            });
            return {
              id: pr.id,
              title: pr.title,
              number: pr.number,
              repository: pr.repository_url.split('/').slice(-1)[0],
              owner: pr.repository_url.split('/').slice(-2)[0],
              mergedAt: new Date(pr.closed_at).toLocaleDateString(),
              url: pr.html_url,
              description: pr.body?.slice(0, 100) + '...' || '',
              additions: prDetailsResponse.data.additions,
              deletions: prDetailsResponse.data.deletions,
              changedFiles: prDetailsResponse.data.changed_files,
            };
          })
        );
        
        setPullRequests(prs);
      } catch (error) {
        console.error('Error fetching pull requests:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPullRequests();
  }, []);

  const projects: Project[] = [
    {
      id: '1',
      title: 'MightyMeld Portfolio',
      description: 'MightyMeld is a revolutionary dev tool designed to accelerate your React development. I have used this tool to build a static portfolio website to demonstrate the capabilities of MightyMeld and to record the video of the development process. ',
      image: '/images/project1.JPG',
      tags: ['React', 'Tailwind'],
      githubUrl: 'https://github.com/devasyarajguru/MightyMeld-Portfolio.git',
      liveUrl: 'https://mightymeld-portfolio.vercel.app/',
    },
    {
      id: '2',
      title: 'Cybersecurity Website',
      description: 'Duradars - A cybersecurity website designed to provide comprehensive cybersecurity solutions to individuals and businesses. Our mission is to safeguard digital assets and ensure the safety and tranquility of our clients.',
      image: '/images/project2.JPG',
      tags: ['React', 'Formspree'],
      githubUrl: 'https://github.com/devasyarajguru/Duradars-website.git',
      liveUrl: 'https://duradars.vercel.app/',
    },
    
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
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
  
  const cardVariants = {
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
        <motion.div variants={itemVariants} className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">My Freelance Work</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Here are some of my freelance projects.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols lg:grid-cols-2 gap-8 mb-16">
          {projects.map((project) => (
            <motion.div
              key={project.id}
              variants={cardVariants}
              whileHover={{ y: -10 }}
              className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg"
            >
              <div className="relative aspect-video">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full rounded-lg"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-100 dark:bg-blue-900 rounded-full text-sm flex items-center gap-1"
                    >
                      <Tag size={12} />
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex gap-4">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-blue-500"
                  >
                    <Github size={20} />
                    Code
                  </a>
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-blue-500"
                  >
                    <ExternalLink size={20} />
                    Live Demo
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* GitHub Contributions Section */}
        <motion.div 
        variants={itemVariants} 
        className="mb-16"
        whileInView="visible" // Animates when in view
        viewport={{once:true , amount: 0.3}} // triggers when 30% of the sewction is in view
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
               Open Source Contributions – Merged PRs
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              These are some of my contributions to open-source projects
            </p>
          </div>

          <div className="relative">
            <Swiper
              modules={[Autoplay, Pagination, Navigation]}
              spaceBetween={30}
              slidesPerView={1}
              breakpoints={{
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
              autoplay={{
                delay: 1000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              pagination={{ clickable: true }}
              navigation={{
                prevEl: '.swiper-button-prev',
                nextEl: '.swiper-button-next',
              }}
              className="px-4 py-8"
            >
              {pullRequests.map((pr) => (
                <SwiperSlide key={pr.id}>
                  <motion.div
                    whileHover={{ y: -5 }}
                    className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-200 dark:border-gray-700 h-full"
                    variants={cardVariants}
                  >
                    <div className="flex items-center gap-2 mb-4">
                      <a
                        href={`https://github.com/${pr.owner}/${pr.repository}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:text-blue-600 font-semibold"
                      >
                        {pr.owner}/{pr.repository}
                      </a>
                      <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                         Merged
                      </span>
                    </div>

                    <h3 className="text-lg font-semibold mb-3 line-clamp-2">
                      {pr.title}
                    </h3>

                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
                      {pr.description}
                    </p>

                    <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-4">
                      <span className="flex items-center gap-1">
                        <GitPullRequest size={14} />
                        #{pr.number}
                      </span>
                      <span className="flex items-center gap-1">
                        <FileCode size={14} />
                        {pr.changedFiles} files
                      </span>
                    </div>

                    <div className="flex items-center gap-3 text-sm mb-6">
                      <span className="text-blue-500">+{pr.additions}</span>
                      <span className="text-red-500">-{pr.deletions}</span>
                    </div>

                    <div className="flex items-center justify-between mt-auto">
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {pr.mergedAt}
                      </span>
                      <div className="flex gap-2">
                        <a
                          href={`https://github.com/${pr.owner}/${pr.repository}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 hover:text-blue-600 border border-blue-500 rounded-full px-3 py-1 text-sm flex items-center gap-1"
                        >
                          <Star size={14} />
                          Star Repo
                        </a>
                        <a
                          href={pr.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 hover:text-blue-600 border border-blue-500 rounded-full px-3 py-1 text-sm flex items-center gap-1"
                        >
                          <ExternalLink size={14} />
                          View PR
                        </a>
                      </div>
                    </div>
                  </motion.div>
                </SwiperSlide>
              ))}
            </Swiper>

            <button className="swiper-button-prev absolute left-0 top-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 rounded-full p-3 shadow-lg text-blue-500 hover:text-blue-600 z-10">
              <ChevronLeft size={24} />
            </button>
            <button className="swiper-button-next absolute right-0 top-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 rounded-full p-3 shadow-lg text-blue-500 hover:text-blue-600 z-10">
              <ChevronRight size={24} />
            </button>
          </div>

          <motion.div
            className="text-center mt-12"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <a
              href={`https://github.com/${GITHUB_USERNAME}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-blue-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-blue-600 transition-colors"
            >
              <Github size={24} />
              View All Contributions
            </a>
          </motion.div>
        </motion.div>
      </motion.div> 
    </div> 
  );
}