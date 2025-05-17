
'use client';

import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import HeroText from './hero/HeroText';
import CodeSnippet from './hero/CodeSnippet';
import PortfolioLinks from './hero/PortfolioLinks';
import ParticleBackground from './hero/ParticleBackground';

export default function HeroSection() {
  const scrollToNextSection = () => {
    const featuresSection = document.getElementById('features');
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="min-h-screen flex items-center pt-20 pb-10 relative overflow-hidden hero-background tech-pattern">
      {/* Particles Background */}
      <ParticleBackground />
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full filter blur-3xl opacity-30 animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full filter blur-3xl opacity-30 animate-pulse delay-1000" />
        <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-accent/10 rounded-full filter blur-3xl opacity-30 animate-pulse delay-2000" />
        
        {/* Tech-inspired circuit board lines */}
        <div className="absolute inset-0 opacity-5 dark:opacity-10">
          <div className="absolute top-1/3 left-0 w-full h-[1px] bg-gradient-to-r from-primary/50 via-transparent to-transparent"></div>
          <div className="absolute top-2/3 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-secondary/50 to-transparent"></div>
          <div className="absolute left-1/3 top-0 h-full w-[1px] bg-gradient-to-b from-transparent via-accent/50 to-transparent"></div>
          <div className="absolute left-2/3 top-0 h-full w-[1px] bg-gradient-to-b from-accent/50 via-transparent to-transparent"></div>
        </div>
      </div>
      
      {/* Hero content */}
      <div className="container mx-auto px-4 md:px-8 z-10">
        <div className="flex flex-col lg:flex-row lg:items-center lg:gap-8">
          <HeroText />
          <CodeSnippet />
        </div>
        
        {/* Portfolio navigation links */}
        <PortfolioLinks />
          
        {/* Discover More button - improved styling with no background */}
        <motion.div 
          className="absolute bottom-6 left-1/2 transform -translate-x-1/2 hidden md:flex flex-col items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 0.8 }}
        >
          <button 
            onClick={scrollToNextSection} 
            className="flex flex-col items-center gap-2 px-4 py-2 rounded-full hover:text-primary transition-colors"
            aria-label="Scroll to next section"
          >
            <span className="text-sm font-medium">Discover More</span>
            <ChevronDown className="h-5 w-5 animate-bounce" />
          </button>
        </motion.div>
      </div>
      
      {/* Decorative grid */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBzdHJva2U9IiMzMzMiIHN0cm9rZS13aWR0aD0iMC4yIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0wIDBoNjB2NjBIMHoiLz48L2c+PC9zdmc+')] opacity-10 pointer-events-none z-0" />
    </section>
  );
}
