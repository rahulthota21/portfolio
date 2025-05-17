
'use client';

import { motion } from 'framer-motion';
import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Briefcase, Calendar, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Experience = () => {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const experiences = [
    {
      role: 'AI Intern',
      company: 'Infosys Springboard',
      period: 'Oct - Dec 2024',
      description: 'Built ML pipelines, dashboards, and deployed solutions using Docker and CI/CD. Worked with TensorFlow and implemented AUC/PR evaluation metrics. Collaborated using Git workflows for effective team coordination.',
      achievements: [
        'Developed and optimized deep learning models for predictive analytics',
        'Created real-time visualization dashboards for model performance metrics',
        'Implemented containerized deployment solutions with Docker',
        'Contributed to automated CI/CD pipelines for model deployment'
      ],
      technologies: ['TensorFlow', 'Docker', 'Git', 'CI/CD', 'Data Visualization']
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
              Professional <span className="glow-text">Experience</span>
            </h1>
            <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
              My journey in AI and full-stack development, building real-world applications
              and solving complex problems.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                className="glass-card mb-8 overflow-hidden"
              >
                <div className="p-8 border-l-4 border-primary">
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                    <div>
                      <h2 className="text-2xl font-bold mb-1">{exp.role}</h2>
                      <div className="flex items-center text-foreground/80">
                        <Briefcase className="h-4 w-4 mr-2" />
                        <span>{exp.company}</span>
                      </div>
                    </div>
                    <div className="mt-4 md:mt-0 flex items-center text-foreground/70 bg-primary/10 px-4 py-1 rounded-full">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span>{exp.period}</span>
                    </div>
                  </div>

                  <p className="mb-6 text-foreground/80">{exp.description}</p>

                  <h3 className="text-lg font-semibold mb-3">Key Achievements:</h3>
                  <ul className="space-y-2 mb-6">
                    {exp.achievements.map((achievement, i) => (
                      <li key={i} className="flex items-start">
                        <ArrowRight className="h-4 w-4 mr-2 text-primary mt-1 flex-shrink-0" />
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-2 mt-4">
                    {exp.technologies.map((tech, i) => (
                      <span 
                        key={i} 
                        className="px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}

            <div className="text-center mt-16">
              <Button variant="outline" size="lg" asChild>
                <Link to="/hackathons" className="flex items-center">
                  See My Hackathons
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

export default Experience;
