
import { ExternalLink, Github, Linkedin, Mail } from 'lucide-react';
import { motion } from 'framer-motion';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const HeroSocialLinks = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.5, duration: 0.8 }}
      className="flex gap-5"
    >
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" 
              className="p-2.5 rounded-full bg-foreground/5 hover:bg-primary/20 hover:text-primary hover:scale-110 transition-all duration-200">
              <Github className="h-5 w-5" />
            </a>
          </TooltipTrigger>
          <TooltipContent className="bg-primary/80 text-primary-foreground border-primary/20">
            <p>GitHub Profile</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" 
              className="p-2.5 rounded-full bg-foreground/5 hover:bg-secondary/20 hover:text-secondary hover:scale-110 transition-all duration-200">
              <Linkedin className="h-5 w-5" />
            </a>
          </TooltipTrigger>
          <TooltipContent className="bg-secondary/80 text-secondary-foreground border-secondary/20">
            <p>LinkedIn Profile</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <a href="/contact" 
              className="p-2.5 rounded-full bg-foreground/5 hover:bg-accent/20 hover:text-accent hover:scale-110 transition-all duration-200">
              <Mail className="h-5 w-5" />
            </a>
          </TooltipTrigger>
          <TooltipContent className="bg-accent/80 text-accent-foreground border-accent/20">
            <p>Contact Me</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <a href="/about" 
              className="p-2.5 rounded-full bg-foreground/5 hover:bg-foreground/20 hover:scale-110 transition-all duration-200">
              <ExternalLink className="h-5 w-5" />
            </a>
          </TooltipTrigger>
          <TooltipContent>
            <p>About Me</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </motion.div>
  );
};

export default HeroSocialLinks;
