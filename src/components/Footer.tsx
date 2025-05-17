
import { Link } from 'react-router-dom';
import { Github, Linkedin, Twitter } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Footer() {
  return (
    <footer className="py-10 border-t border-border backdrop-blur-sm bg-background/80">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row gap-8 justify-between items-center">
          <div className="flex flex-col items-center md:items-start">
            <Link to="/" className="text-xl font-bold glow-text mb-2">Thota Rahul</Link>
            <p className="text-sm text-foreground/70">
              Full Stack Developer & AI Specialist
            </p>
          </div>

          <nav className="flex flex-col md:flex-row items-center gap-6">
            <div className="flex flex-wrap justify-center gap-6">
              <Link to="/" className="text-sm text-foreground/70 hover:text-foreground transition-colors">
                Home
              </Link>
              <Link to="/about" className="text-sm text-foreground/70 hover:text-foreground transition-colors">
                About
              </Link>
              <Link to="/experience" className="text-sm text-foreground/70 hover:text-foreground transition-colors">
                Experience
              </Link>
              <Link to="/hackathons" className="text-sm text-foreground/70 hover:text-foreground transition-colors">
                Hackathons
              </Link>
              <Link to="/certifications" className="text-sm text-foreground/70 hover:text-foreground transition-colors">
                Certifications
              </Link>
              <Link to="/outreach" className="text-sm text-foreground/70 hover:text-foreground transition-colors">
                Outreach
              </Link>
              <Link to="/contact" className="text-sm text-foreground/70 hover:text-foreground transition-colors">
                Contact
              </Link>
            </div>
          </nav>

          <div className="flex flex-col items-center md:items-end gap-3">
            <div className="flex gap-2">
              <Button variant="outline" size="icon" className="rounded-full h-9 w-9 border-border/40 bg-background/50 hover:bg-primary/10">
                <a href="https://github.com/" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                  <Github className="h-4 w-4" />
                </a>
              </Button>
              <Button variant="outline" size="icon" className="rounded-full h-9 w-9 border-border/40 bg-background/50 hover:bg-primary/10">
                <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                  <Linkedin className="h-4 w-4" />
                </a>
              </Button>
              <Button variant="outline" size="icon" className="rounded-full h-9 w-9 border-border/40 bg-background/50 hover:bg-primary/10">
                <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                  <Twitter className="h-4 w-4" />
                </a>
              </Button>
            </div>
            <p className="text-sm text-foreground/60">
              Built with 💻 by Thota Rahul • © {new Date().getFullYear()}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
