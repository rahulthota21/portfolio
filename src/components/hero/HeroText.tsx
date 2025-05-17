
import { motion } from 'framer-motion';
import TypewriterEffect from '@/components/TypewriterEffect';
import { Button } from '@/components/ui/button';
import { FileText, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import HeroSocialLinks from './HeroSocialLinks';

const HeroText = () => {
  const typingTexts = [
    "I build full-stack apps",
    "I design GenAI tools",
    "I craft real-time dashboards",
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="max-w-3xl"
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="flex flex-wrap gap-3 mb-6"
      >
        <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 px-4 py-1.5 rounded-full text-sm font-medium">
          Full Stack Developer
        </Badge>
        <Badge variant="outline" className="bg-secondary/10 text-secondary border-secondary/20 px-4 py-1.5 rounded-full text-sm font-medium">
          AI Specialist
        </Badge>
        <Badge variant="outline" className="bg-accent/10 text-accent border-accent/20 px-4 py-1.5 rounded-full text-sm font-medium">
          UI/UX Designer
        </Badge>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="relative mb-4 inline-block"
      >
        <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight">
          Hi, I&apos;m <span className="glow-text relative">
            Rahul
            <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-primary via-secondary to-accent rounded-full"></span>
          </span>
        </h1>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="text-2xl md:text-3xl lg:text-5xl font-bold mb-8 h-14 md:h-16 lg:h-20 flex items-center"
      >
        <TypewriterEffect texts={typingTexts} />
      </motion.div>
      
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.8 }}
        className="text-lg md:text-xl mb-8 text-foreground/80 max-w-2xl leading-relaxed"
      >
        I combine cutting-edge AI with robust full-stack development to create intelligent, 
        scalable applications that solve real-world problems. My expertise spans React, Node.js, 
        Python, and modern AI frameworks.
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="flex flex-wrap gap-4 mb-8"
      >
        <Button className="premium-button group" size="lg">
          <FileText className="mr-2 h-5 w-5 group-hover:animate-float" />
          Download Resume
        </Button>
        <Button variant="outline" size="lg" asChild className="text-base px-6 py-6 border-2 hover:bg-primary/5 backdrop-blur-sm">
          <Link to="/contact">
            <Mail className="mr-2 h-5 w-5" />
            Contact Me
          </Link>
        </Button>
      </motion.div>
      
      <HeroSocialLinks />
    </motion.div>
  );
};

export default HeroText;
