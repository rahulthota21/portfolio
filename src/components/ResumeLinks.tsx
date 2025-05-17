
'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { FileText, Github, Linkedin, Twitter } from 'lucide-react';

export default function ResumeLinks() {
  return (
    <section className="py-16 md:py-20 bg-gradient-to-br from-muted/20 to-background">
      <div className="container mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <div className="neo-glass-card p-6 md:p-8 border border-foreground/10 shadow-lg dark:bg-black/30 bg-white/50">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8">
              <div className="text-center md:text-left">
                <h2 className="text-2xl md:text-3xl font-bold mb-2">
                  Want to see more of my work?
                </h2>
                <p className="text-foreground/80 mb-6 md:mb-0">
                  Check out my resume or follow me on social media
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="group">
                  <FileText className="mr-2 h-5 w-5 group-hover:animate-float" />
                  Download Resume
                </Button>
                
                <div className="flex justify-center gap-2">
                  <Button variant="outline" size="icon" asChild className="rounded-full hover:bg-primary/10 hover:border-primary/20 transition-all duration-300">
                    <a href="https://github.com/" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                      <Github className="h-5 w-5" />
                    </a>
                  </Button>
                  
                  <Button variant="outline" size="icon" asChild className="rounded-full hover:bg-secondary/10 hover:border-secondary/20 transition-all duration-300">
                    <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                      <Linkedin className="h-5 w-5" />
                    </a>
                  </Button>
                  
                  <Button variant="outline" size="icon" asChild className="rounded-full hover:bg-accent/10 hover:border-accent/20 transition-all duration-300">
                    <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                      <Twitter className="h-5 w-5" />
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
