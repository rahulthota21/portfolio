
'use client';

import { motion } from 'framer-motion';
import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Award, Calendar, Users, Github, ExternalLink, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Hackathons = () => {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const hackathons = [
    {
      title: 'Tredence Hackathon',
      achievement: 'Top 10 out of 65 Teams',
      date: 'January 2024',
      project: 'AI Travel Planner',
      description: 'Built an intelligent travel planning assistant that leverages OpenAI to create personalized itineraries, integrate with maps, and provide budget management tools. The solution helped users plan trips based on preferences, time constraints and budget.',
      partners: ['Tredence Inc', 'Infinity AI'],
      technologies: ['OpenAI', 'React', 'Maps API', 'Node.js', 'Express'],
      githubLink: '#',
      demoLink: '#'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Navbar />
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Hackathon <span className="glow-text">Achievements</span>
            </h1>
            <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
              Real-world problems, innovative solutions, and rapid prototyping under pressure.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            {hackathons.map((hackathon, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                className="glass-card mb-8 overflow-hidden"
              >
                <div className="p-8">
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                    <div>
                      <div className="flex items-center mb-2">
                        <Award className="h-6 w-6 text-accent mr-2" />
                        <h2 className="text-2xl font-bold">{hackathon.title}</h2>
                      </div>
                      <div className="text-lg font-semibold text-accent">{hackathon.achievement}</div>
                    </div>
                    <div className="mt-4 md:mt-0 flex items-center text-foreground/70 bg-accent/10 px-4 py-1 rounded-full">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span>{hackathon.date}</span>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h3 className="text-xl font-semibold mb-3">Project: {hackathon.project}</h3>
                    <p className="text-foreground/80">{hackathon.description}</p>
                  </div>

                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                    <div className="flex items-center mb-4 md:mb-0">
                      <Users className="h-4 w-4 mr-2 text-foreground/70" />
                      <span className="text-foreground/70 mr-2">Partners:</span>
                      <div className="flex flex-wrap gap-2">
                        {hackathon.partners.map((partner, i) => (
                          <span 
                            key={i} 
                            className="px-3 py-1 rounded-full text-xs font-medium bg-secondary/10 text-secondary"
                          >
                            {partner}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {hackathon.technologies.map((tech, i) => (
                      <span 
                        key={i} 
                        className="px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <Button variant="outline" size="sm" asChild>
                      <a href={hackathon.githubLink} target="_blank" rel="noopener noreferrer" className="flex items-center">
                        <Github className="mr-2 h-4 w-4" />
                        GitHub Repository
                      </a>
                    </Button>
                    <Button variant="outline" size="sm" asChild>
                      <a href={hackathon.demoLink} target="_blank" rel="noopener noreferrer" className="flex items-center">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Live Demo
                      </a>
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}

            <div className="text-center mt-16">
              <Button variant="outline" size="lg" asChild>
                <Link to="/certifications" className="flex items-center">
                  Explore My Certifications
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </motion.div>
  );
};

export default Hackathons;
