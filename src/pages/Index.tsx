
'use client';

import { motion } from 'framer-motion';
import { useEffect } from 'react';
import HeroSection from '@/components/HeroSection';
import FeaturesSection from '@/components/FeaturesSection';
import ProjectsSection from '@/components/ProjectsSection';
import SkillsSection from '@/components/SkillsSection';
import ResumeLinks from '@/components/ResumeLinks';
import ContactForm from '@/components/ContactForm';
import AboutMeCTA from '@/components/AboutMeCTA';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';

const Index = () => {
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
      className="tech-pattern" // Added tech pattern to entire page for subtle background texture
    >
      <Navbar />
      <main>
        <HeroSection />
        <FeaturesSection />
        <ProjectsSection />
        <SkillsSection />
        <ResumeLinks />
        <AboutMeCTA />
        <ContactForm />
      </main>
      <Footer />
    </motion.div>
  );
};

export default Index;
