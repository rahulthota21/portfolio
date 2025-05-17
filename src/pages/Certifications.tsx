
'use client';

import { motion } from 'framer-motion';
import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Award, ExternalLink, Calendar, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Certifications = () => {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const certifications = [
    {
      title: 'Deep Learning Specialization',
      issuer: 'Andrew Ng - Coursera',
      date: 'December 2023',
      skills: ['Neural Networks', 'CNN', 'RNN', 'Transformers'],
      link: '#'
    },
    {
      title: 'AI Primer',
      issuer: 'Springboard',
      date: 'October 2023',
      skills: ['Machine Learning', 'Data Analysis', 'Python'],
      link: '#'
    },
    {
      title: 'TensorFlow Keras Bootcamp',
      issuer: 'Udemy',
      date: 'August 2023',
      skills: ['TensorFlow', 'Keras', 'Model Deployment'],
      link: '#'
    },
    {
      title: 'AWS Cloud Fundamentals',
      issuer: 'CIR, Amrita',
      date: 'July 2023',
      skills: ['AWS', 'Cloud Computing', 'Serverless'],
      link: '#'
    },
    {
      title: 'Machine Learning Specialization',
      issuer: 'IBM',
      date: 'May 2023',
      skills: ['Supervised Learning', 'Unsupervised Learning', 'Reinforcement Learning'],
      link: '#'
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
              Professional <span className="glow-text">Certifications</span>
            </h1>
            <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
              Continuous learning and skill development in AI, machine learning, and cloud technologies.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
            {certifications.map((cert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="glass-card overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex items-start">
                    <Award className="h-6 w-6 text-secondary mr-3 mt-1" />
                    <div>
                      <h3 className="text-xl font-bold mb-1">{cert.title}</h3>
                      <p className="text-foreground/80 mb-3">{cert.issuer}</p>
                      
                      <div className="flex items-center text-sm text-foreground/60 mb-4">
                        <Calendar className="h-3 w-3 mr-1" />
                        <span>{cert.date}</span>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {cert.skills.map((skill, i) => (
                          <span 
                            key={i} 
                            className="px-2 py-1 rounded-full text-xs font-medium bg-secondary/10 text-secondary"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>

                      <Button variant="outline" size="sm" asChild className="mt-2">
                        <a href={cert.link} target="_blank" rel="noopener noreferrer" className="flex items-center">
                          <ExternalLink className="mr-2 h-4 w-4" />
                          Verify Certificate
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-16">
            <Button variant="outline" size="lg" asChild>
              <Link to="/outreach" className="flex items-center">
                Explore My Outreach Programs
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </motion.div>
  );
};

export default Certifications;
