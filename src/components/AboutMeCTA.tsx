
'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, Code, Terminal, Cpu } from 'lucide-react';

export default function AboutMeCTA() {
  return (
    <section className="py-20 relative overflow-hidden bg-gradient-to-br from-background via-background to-muted/40">
      {/* Enhanced Tech Background with improved color scheme */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5 opacity-70" />
      <div className="absolute inset-0 tech-pattern opacity-40" />
      
      {/* Animated Circuit Elements */}
      <div className="absolute left-0 top-0 h-full w-1/3">
        <div className="absolute top-1/4 left-1/4 w-16 h-16 border border-primary/20 rounded-full"></div>
        <div className="absolute top-1/2 left-1/3 w-8 h-8 border border-secondary/20 rounded-full"></div>
        <div className="absolute bottom-1/4 left-1/5 w-12 h-12 border border-accent/20 rounded-full"></div>
      </div>
      <div className="absolute right-0 top-0 h-full w-1/3">
        <div className="absolute top-1/3 right-1/4 w-16 h-16 border border-primary/20 rounded-full"></div>
        <div className="absolute top-2/3 right-1/3 w-8 h-8 border border-secondary/20 rounded-full"></div>
        <div className="absolute bottom-1/3 right-1/5 w-12 h-12 border border-accent/20 rounded-full"></div>
      </div>
      
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <div className="neo-glass-card p-8 md:p-12 border border-foreground/10 shadow-2xl relative overflow-hidden dark:bg-black/30 bg-white/50">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-secondary to-accent"></div>
            
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
              <div className="md:max-w-lg">
                <div className="flex items-center gap-2 mb-4">
                  <div className="p-2 rounded-full bg-primary/10">
                    <Code className="h-5 w-5 text-primary" />
                  </div>
                  <div className="p-2 rounded-full bg-secondary/10">
                    <Terminal className="h-5 w-5 text-secondary" />
                  </div>
                  <div className="p-2 rounded-full bg-accent/10">
                    <Cpu className="h-5 w-5 text-accent" />
                  </div>
                </div>
                
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Discover My <span className="glow-text">Journey</span>
                </h2>
                
                <p className="text-lg text-foreground/80 mb-6">
                  Learn about my professional journey, experience in cutting-edge technologies, 
                  and passion for building solutions that make a real difference.
                </p>
                
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary mr-2"></div>
                    <span>Problem-solving approach to engineering</span>
                  </li>
                  <li className="flex items-center">
                    <div className="h-1.5 w-1.5 rounded-full bg-secondary mr-2"></div>
                    <span>Background in AI and machine learning</span>
                  </li>
                  <li className="flex items-center">
                    <div className="h-1.5 w-1.5 rounded-full bg-accent mr-2"></div>
                    <span>Full-stack expertise with modern technologies</span>
                  </li>
                </ul>
              </div>
              
              <div className="flex flex-col gap-4">
                <Button size="lg" className="premium-button" asChild>
                  <Link to="/about" className="group">
                    About Me
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                
                <Button size="lg" variant="outline" className="border-2" asChild>
                  <Link to="/experience">
                    Experience
                  </Link>
                </Button>
                
                <Button size="lg" variant="outline" className="border-2" asChild>
                  <Link to="/contact">
                    Contact
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
