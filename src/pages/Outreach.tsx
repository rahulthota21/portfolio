
'use client';

import { motion } from 'framer-motion';
import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Users, Calendar, MapPin, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Outreach = () => {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const outreachActivities = [
    {
      title: 'SSR AI Workshop',
      date: 'March 2024',
      location: 'Hyderabad',
      attendees: '100+ high school students',
      description: 'Conducted a comprehensive workshop teaching real-time image classification and AI demonstrations. Shared ethical AI use practices and provided guidance on future technology trends.',
      topics: [
        'Introduction to AI and Machine Learning',
        'Real-time image classification with webcams',
        'Ethical considerations in AI development',
        'Career paths in AI and technology',
        'Hands-on demos with pre-trained models'
      ],
      impact: 'Inspired young students to pursue careers in technology and AI, with several participants initiating their own AI projects after the workshop.'
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
              Community <span className="glow-text">Outreach</span>
            </h1>
            <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
              Sharing knowledge, inspiring the next generation, and giving back to the tech community.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            {outreachActivities.map((activity, index) => (
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
                      <h2 className="text-2xl font-bold mb-3">{activity.title}</h2>
                      <div className="flex flex-wrap gap-4">
                        <div className="flex items-center text-foreground/70">
                          <Calendar className="h-4 w-4 mr-2" />
                          <span>{activity.date}</span>
                        </div>
                        <div className="flex items-center text-foreground/70">
                          <MapPin className="h-4 w-4 mr-2" />
                          <span>{activity.location}</span>
                        </div>
                        <div className="flex items-center text-foreground/70">
                          <Users className="h-4 w-4 mr-2" />
                          <span>{activity.attendees}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <p className="mb-6 text-foreground/80">{activity.description}</p>

                  <h3 className="text-lg font-semibold mb-3">Topics Covered:</h3>
                  <ul className="space-y-2 mb-6">
                    {activity.topics.map((topic, i) => (
                      <li key={i} className="flex items-start">
                        <ArrowRight className="h-4 w-4 mr-2 text-primary mt-1 flex-shrink-0" />
                        <span>{topic}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 p-4 bg-accent/10 rounded-lg">
                    <h4 className="text-lg font-semibold mb-2">Impact:</h4>
                    <p className="text-foreground/90">{activity.impact}</p>
                  </div>
                </div>
              </motion.div>
            ))}

            <div className="text-center mt-16">
              <Button variant="outline" size="lg" asChild>
                <Link to="/contact" className="flex items-center">
                  Contact For Speaking Opportunities
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

export default Outreach;
