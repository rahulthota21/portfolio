
'use client';

import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Home } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <motion.div 
        className="flex-1 flex flex-col items-center justify-center p-4 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="glass-card p-8 w-full max-w-lg">
          <h1 className="text-6xl font-bold mb-2">404</h1>
          <p className="text-2xl font-semibold mb-6">Page Not Found</p>
          <p className="text-foreground/80 mb-8">
            The page you are looking for doesn't exist or has been moved.
          </p>
          <Button asChild>
            <Link to="/" className="flex items-center">
              <Home className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>
        </div>
      </motion.div>
      <Footer />
    </div>
  );
};

export default NotFound;
