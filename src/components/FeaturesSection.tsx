
'use client';

import { motion } from 'framer-motion';
import { Code, Database, AreaChart } from 'lucide-react';

const features = [
  {
    title: "Full Stack Platforms",
    description: "Building modern web applications with Next.js, Supabase, and PostgreSQL for high-performance, scalable solutions.",
    icon: Code,
    delay: 0,
  },
  {
    title: "GenAI Tools",
    description: "Creating intelligent AI assistants and tools using LangChain, GPT-4, and advanced prompt engineering techniques.",
    icon: Database,
    delay: 0.2,
  },
  {
    title: "Realtime Dashboards",
    description: "Developing responsive ICU monitoring systems with Socket.IO and interactive charts for critical data visualization.",
    icon: AreaChart,
    delay: 0.4,
  },
];

export default function FeaturesSection() {
  return (
    <section className="py-20" id="features">
      <div className="container mx-auto px-4 md:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold mb-12 text-center"
        >
          My <span className="glow-text">Expertise</span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: feature.delay, duration: 0.6 }}
              className="glass-card p-6"
            >
              <div className="h-12 w-12 rounded-xl bg-primary/20 flex items-center justify-center mb-5">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-foreground/80">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
