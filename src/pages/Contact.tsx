
'use client';

import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Github, Linkedin, Twitter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function Contact() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate form submission
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Message sent!",
        description: "Thank you for reaching out. I'll get back to you soon.",
        duration: 5000
      });
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    }, 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="tech-pattern"
    >
      <Navbar />
      <main>
        <section className="min-h-screen py-20 md:py-32">
          <div className="container mx-auto px-4 md:px-8">
            <div className="max-w-6xl mx-auto">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center mb-12 md:mb-16"
              >
                <h1 className="text-3xl md:text-5xl font-bold mb-4">
                  Let's <span className="glow-text">Connect</span>
                </h1>
                <p className="text-lg md:text-xl text-foreground/80 max-w-2xl mx-auto">
                  Have a project in mind or want to discuss opportunities? I'd love to hear from you!
                </p>
              </motion.div>

              <div className="flex flex-col lg:flex-row gap-12">
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  className="lg:w-2/5"
                >
                  <div className="neo-glass-card p-8 h-full border border-foreground/10">
                    <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
                    
                    <div className="space-y-6 mb-8">
                      <div className="flex items-start">
                        <div className="bg-primary/10 p-3 rounded-full mr-4">
                          <Mail className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-medium">Email</h3>
                          <p className="text-foreground/80">rahul@example.com</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="bg-secondary/10 p-3 rounded-full mr-4">
                          <Phone className="h-6 w-6 text-secondary" />
                        </div>
                        <div>
                          <h3 className="font-medium">Phone</h3>
                          <p className="text-foreground/80">+1 (555) 123-4567</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="bg-accent/10 p-3 rounded-full mr-4">
                          <MapPin className="h-6 w-6 text-accent" />
                        </div>
                        <div>
                          <h3 className="font-medium">Location</h3>
                          <p className="text-foreground/80">San Francisco, California</p>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-medium mb-4">Connect with me</h3>
                      <div className="flex gap-3">
                        <a 
                          href="https://github.com" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="bg-foreground/5 hover:bg-foreground/10 p-3 rounded-full transition-colors duration-200"
                        >
                          <Github className="h-5 w-5" />
                        </a>
                        <a 
                          href="https://linkedin.com" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="bg-foreground/5 hover:bg-foreground/10 p-3 rounded-full transition-colors duration-200"
                        >
                          <Linkedin className="h-5 w-5" />
                        </a>
                        <a 
                          href="https://twitter.com" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="bg-foreground/5 hover:bg-foreground/10 p-3 rounded-full transition-colors duration-200"
                        >
                          <Twitter className="h-5 w-5" />
                        </a>
                      </div>
                    </div>
                  </div>
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                  className="lg:w-3/5"
                >
                  <div className="neo-glass-card p-8 border border-foreground/10">
                    <h2 className="text-2xl font-bold mb-6">Send Message</h2>
                    
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium mb-2">Your Name</label>
                          <Input 
                            type="text" 
                            name="name"
                            value={formData.name}
                            onChange={handleChange} 
                            placeholder="John Doe" 
                            required 
                            className="w-full"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Your Email</label>
                          <Input 
                            type="email" 
                            name="email"
                            value={formData.email}
                            onChange={handleChange} 
                            placeholder="john@example.com" 
                            required 
                            className="w-full"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-2">Subject</label>
                        <Input 
                          type="text" 
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange} 
                          placeholder="Project Inquiry" 
                          required 
                          className="w-full"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-2">Message</label>
                        <Textarea 
                          name="message"
                          value={formData.message}
                          onChange={handleChange} 
                          placeholder="Tell me about your project or inquiry..." 
                          required 
                          className="w-full min-h-[150px]"
                        />
                      </div>
                      
                      <Button 
                        type="submit" 
                        className="premium-button" 
                        disabled={loading}
                      >
                        {loading ? "Sending..." : "Send Message"}
                        <Send className="ml-2 h-4 w-4" />
                      </Button>
                    </form>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </motion.div>
  );
}
