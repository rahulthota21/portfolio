
'use client';

import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';

const skillCategories = [
  {
    name: 'Languages',
    skills: ['Python', 'JavaScript', 'TypeScript', 'C++', 'SQL'],
  },
  {
    name: 'Frameworks',
    skills: ['React', 'Next.js', 'FastAPI', 'Node.js', 'Express', 'Flask'],
  },
  {
    name: 'AI/ML',
    skills: ['TensorFlow', 'PyTorch', 'NLP', 'OCR', 'NER', 'GPT'],
  },
  {
    name: 'Tools',
    skills: ['Supabase', 'Firebase', 'Docker', 'Git', 'Postman', 'CI/CD'],
  },
];

export default function SkillsSection() {
  return (
    <section className="py-20" id="skills">
      <div className="container mx-auto px-4 md:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold mb-12 text-center"
        >
          Technical <span className="glow-text">Skills</span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {skillCategories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="glass-card p-6"
            >
              <h3 className="font-semibold mb-4 text-lg">{category.name}</h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, i) => (
                  <Badge 
                    key={i} 
                    className="bg-primary/10 hover:bg-primary/20 text-primary border-primary/30"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
