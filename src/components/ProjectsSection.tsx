'use client';

import { motion } from 'framer-motion';
import { Github, ExternalLink, Star, Code, PanelRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState } from 'react';
import { cn } from '@/lib/utils';

// This projects array can be moved to a separate file in the future
// for easier management as your portfolio grows
const projects = [
  {
    title: 'Mock\'n-Hire',
    description: 'AI-powered interview preparation platform with personalized feedback and industry-specific questions.',
    techStack: ['Next.js', 'OpenAI', 'Firebase', 'TailwindCSS'],
    github: '#',
    liveLink: '#',
    featured: true,
    category: 'AI',
  },
  {
    title: 'InsightGPT PRO',
    description: 'Advanced analytics dashboard combining NLP and data visualization for business intelligence.',
    techStack: ['React', 'Python', 'PyTorch', 'FastAPI'],
    github: '#',
    liveLink: '#',
    featured: true,
    category: 'AI',
  },
  {
    title: 'Smart Patient Monitor',
    description: 'Real-time vital signs monitoring system with predictive analytics for early intervention.',
    techStack: ['TensorFlow', 'Socket.IO', 'React', 'Node.js'],
    github: '#',
    liveLink: '#',
    featured: false,
    category: 'Healthcare',
  },
  {
    title: 'Medical Equipment Tracker',
    description: 'IoT-based solution for tracking medical equipment location and maintenance status.',
    techStack: ['MQTT', 'Arduino', 'Express', 'MongoDB'],
    github: '#',
    liveLink: '#',
    featured: false,
    category: 'IoT',
  },
  {
    title: 'Sentiment Chatbot',
    description: 'Emotion-aware virtual assistant providing personalized responses based on user sentiment.',
    techStack: ['BERT', 'React Native', 'Flask', 'Redis'],
    github: '#',
    liveLink: '#',
    featured: true,
    category: 'AI',
  },
  {
    title: 'AffectLearn (WIP)',
    description: 'Adaptive learning platform that adjusts content based on user engagement metrics.',
    techStack: ['Next.js', 'Supabase', 'ML', 'WebRTC'],
    github: '#',
    liveLink: '#',
    featured: false,
    category: 'EdTech',
  },
];

export default function ProjectsSection() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  
  const filteredProjects = categoryFilter 
    ? projects.filter(project => project.category === categoryFilter)
    : projects;

  const categories = Array.from(new Set(projects.map(project => project.category)));

  return (
    <section className="py-24 tech-pattern" id="projects">
      <div className="container mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="section-header">
            Featured <span className="section-header-highlight">Projects</span>
          </h2>
          <p className="text-lg max-w-2xl mx-auto text-foreground/80 mb-6">
            Explore my portfolio of innovative projects spanning various technologies and domains.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-8">
            <div className="flex items-center bg-muted/50 p-1 rounded-lg">
              <button
                onClick={() => setViewMode('grid')}
                className={cn(
                  "p-2 rounded-md transition-all duration-200",
                  viewMode === 'grid' ? "bg-primary text-white" : "hover:bg-muted"
                )}
                aria-label="Grid view"
              >
                <PanelRight className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={cn(
                  "p-2 rounded-md transition-all duration-200",
                  viewMode === 'list' ? "bg-primary text-white" : "hover:bg-muted"
                )}
                aria-label="List view"
              >
                <Code className="h-4 w-4" />
              </button>
            </div>
            
            <div className="flex flex-wrap gap-2 justify-center">
              <Button 
                variant={categoryFilter === null ? "secondary" : "outline"} 
                size="sm" 
                onClick={() => setCategoryFilter(null)}
                className="rounded-full"
              >
                All
              </Button>
              {categories.map(category => (
                <Button
                  key={category}
                  variant={categoryFilter === category ? "secondary" : "outline"}
                  size="sm"
                  onClick={() => setCategoryFilter(category)}
                  className="rounded-full"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </motion.div>

        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="relative group"
              >
                <Card className="neo-glass-card relative overflow-hidden h-full flex flex-col shadow-lg hover:shadow-xl transition-all duration-300 border border-foreground/10">
                  {project.featured && (
                    <div className="absolute top-4 right-4 z-10">
                      <div className="flex items-center p-1.5 rounded-full bg-accent/20 backdrop-blur-sm">
                        <Star className="h-3.5 w-3.5 text-accent fill-accent" />
                      </div>
                    </div>
                  )}
                  
                  <CardHeader className="p-6">
                    <Badge variant="outline" className="w-fit mb-2">{project.category}</Badge>
                    <CardTitle className="text-xl font-bold">{project.title}</CardTitle>
                    <CardDescription className="text-foreground/80">{project.description}</CardDescription>
                  </CardHeader>
                  
                  <CardContent className="p-6 pt-0 flex-grow">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.techStack.map((tech, i) => (
                        <span 
                          key={i} 
                          className="px-2 py-1 rounded-full text-xs font-medium bg-secondary/10 text-secondary"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                  
                  <CardFooter className="border-t border-border p-4 flex justify-between">
                    <Button variant="ghost" size="sm" className="text-foreground/70 hover:text-foreground" asChild>
                      <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex items-center">
                        <Github className="h-4 w-4 mr-1" />
                        Code
                      </a>
                    </Button>
                    <Button variant="ghost" size="sm" className="text-foreground/70 hover:text-foreground" asChild>
                      <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="flex items-center">
                        <ExternalLink className="h-4 w-4 mr-1" />
                        Demo
                      </a>
                    </Button>
                  </CardFooter>
                  
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl" />
                </Card>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="space-y-6">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
              >
                <Card className="neo-glass-card overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-foreground/10">
                  <div className="flex flex-col md:flex-row md:items-center">
                    <div className="p-6 flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="outline">{project.category}</Badge>
                        {project.featured && (
                          <div className="flex items-center gap-1 text-accent text-sm">
                            <Star className="h-3.5 w-3.5 fill-accent" />
                            <span className="text-xs font-medium">Featured Project</span>
                          </div>
                        )}
                      </div>
                      
                      <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                      <p className="text-foreground/80 mb-4">{project.description}</p>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.techStack.map((tech, i) => (
                          <span 
                            key={i} 
                            className="px-2 py-1 rounded-full text-xs font-medium bg-secondary/10 text-secondary"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex md:flex-col gap-2 p-6 md:border-l border-border">
                      <Button variant="outline" size="sm" className="flex-1" asChild>
                        <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center">
                          <Github className="h-4 w-4 mr-2" />
                          Code
                        </a>
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1" asChild>
                        <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Demo
                        </a>
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        )}

        <div className="mt-16 text-center">
          <Button className="premium-button" asChild>
            <a href="/projects">
              View All Projects
              <ExternalLink className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
