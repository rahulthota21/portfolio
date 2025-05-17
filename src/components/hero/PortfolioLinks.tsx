
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Award, BookOpen, Heart, Medal } from 'lucide-react';

const PortfolioLinks = () => {
  // Animation variants for staggered children
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <motion.div 
      className="mt-24 mb-20"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.8, duration: 0.8 }}
    >
      <div className="glass p-6 md:p-8 rounded-xl max-w-4xl mx-auto shadow-lg border border-white/10">
        <h4 className="text-center text-base md:text-lg text-foreground/80 mb-8 font-medium">
          <span className="relative inline-block">
            Explore My Portfolio
            <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-primary/50 to-secondary/50"></span>
          </span>
        </h4>
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants}>
            <Link to="/experience" className="group block h-full">
              <div className="bg-foreground/5 group-hover:bg-primary/10 p-5 py-7 rounded-lg text-center transition-all duration-300 border border-transparent group-hover:border-primary/20 h-full shadow-sm group-hover:shadow-md group-hover:shadow-primary/5 group-hover:-translate-y-1">
                <div className="flex flex-col items-center">
                  <div className="p-3 rounded-full bg-primary/10 mb-3 group-hover:bg-primary/20 transition-colors duration-300 group-hover:scale-110">
                    <Award className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-medium group-hover:text-primary transition-colors">Experience</h3>
                </div>
              </div>
            </Link>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <Link to="/hackathons" className="group block h-full">
              <div className="bg-foreground/5 group-hover:bg-secondary/10 p-5 py-7 rounded-lg text-center transition-all duration-300 border border-transparent group-hover:border-secondary/20 h-full shadow-sm group-hover:shadow-md group-hover:shadow-secondary/5 group-hover:-translate-y-1">
                <div className="flex flex-col items-center">
                  <div className="p-3 rounded-full bg-secondary/10 mb-3 group-hover:bg-secondary/20 transition-colors duration-300 group-hover:scale-110">
                    <BookOpen className="h-6 w-6 text-secondary" />
                  </div>
                  <h3 className="font-medium group-hover:text-secondary transition-colors">Hackathons</h3>
                </div>
              </div>
            </Link>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <Link to="/certifications" className="group block h-full">
              <div className="bg-foreground/5 group-hover:bg-accent/10 p-5 py-7 rounded-lg text-center transition-all duration-300 border border-transparent group-hover:border-accent/20 h-full shadow-sm group-hover:shadow-md group-hover:shadow-accent/5 group-hover:-translate-y-1">
                <div className="flex flex-col items-center">
                  <div className="p-3 rounded-full bg-accent/10 mb-3 group-hover:bg-accent/20 transition-colors duration-300 group-hover:scale-110">
                    <Medal className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="font-medium group-hover:text-accent transition-colors">Certifications</h3>
                </div>
              </div>
            </Link>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <Link to="/outreach" className="group block h-full">
              <div className="bg-foreground/5 group-hover:bg-foreground/10 p-5 py-7 rounded-lg text-center transition-all duration-300 border border-transparent group-hover:border-foreground/20 h-full shadow-sm group-hover:shadow-md group-hover:shadow-foreground/5 group-hover:-translate-y-1">
                <div className="flex flex-col items-center">
                  <div className="p-3 rounded-full bg-foreground/10 mb-3 group-hover:bg-foreground/20 transition-colors duration-300 group-hover:scale-110">
                    <Heart className="h-6 w-6" />
                  </div>
                  <h3 className="font-medium group-hover:text-foreground/90 transition-colors">Outreach</h3>
                </div>
              </div>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default PortfolioLinks;
