
'use client';

import { motion } from 'framer-motion';
import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const About = () => {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Navbar />
      <main className="container mx-auto pt-32 pb-20 px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          <h1 className="text-3xl md:text-5xl font-bold mb-6">
            About <span className="glow-text">Me</span>
          </h1>
          
          <div className="glass-card p-6 md:p-8 mb-12">
            <h2 className="text-xl font-semibold mb-4">My Story</h2>
            <p className="mb-4 text-foreground/80">
              I'm Thota Rahul, a student and aspiring AI/ML and Full Stack developer with a passion for creating 
              innovative solutions that solve real-world problems. My journey in technology began with a 
              curiosity about how software systems work and evolved into a deep interest in artificial intelligence.
            </p>
            <p className="mb-4 text-foreground/80">
              I believe in building technology that enhances human capabilities rather than replacing them. 
              My work focuses on creating intuitive, accessible tools that leverage the power of AI to make 
              complex tasks simpler and more efficient.
            </p>
            <p className="text-foreground/80">
              When I'm not coding, you can find me exploring the latest research papers in machine learning, 
              contributing to open-source projects, or mentoring younger students interested in tech.
            </p>
          </div>

          <h2 className="text-2xl font-bold mb-6">Why Full Stack + AI/ML?</h2>
          <div className="glass-card p-6 md:p-8 mb-12">
            <p className="mb-4 text-foreground/80">
              The combination of Full Stack development and AI/ML expertise creates a unique skillset that 
              allows me to build complete, production-ready intelligent applications. Understanding both the 
              front-end user experience and back-end machine learning systems enables me to create solutions 
              where AI is seamlessly integrated into intuitive interfaces.
            </p>
            <p className="text-foreground/80">
              I'm particularly interested in how AI can enhance human decision-making in critical fields like 
              healthcare and education, which is reflected in projects like my Smart Patient Monitor and 
              AffectLearn platforms.
            </p>
          </div>

          {/* Placeholder for Timeline - to be expanded later */}
          <h2 className="text-2xl font-bold mb-6">My Journey</h2>
          <div className="glass-card p-6 md:p-8">
            <p className="text-center text-foreground/80">
              Timeline will be implemented here, showing my journey from 2022 to 2025
            </p>
          </div>
        </motion.div>
      </main>
      <Footer />
    </motion.div>
  );
};

export default About;
