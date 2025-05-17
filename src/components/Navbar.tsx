
'use client';

import { useEffect, useState } from 'react';
import { useTheme } from '@/components/ThemeProvider';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sun, Moon, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Separator } from "@/components/ui/separator";

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <header
      className={cn(
        'fixed top-0 w-full z-50 transition-all duration-300',
        scrolled ? 'glass py-2 shadow-md backdrop-blur-md bg-background/80' : 'py-4'
      )}
    >
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="font-bold text-xl tracking-tight flex items-center">
          <div className="relative">
            <span className="glow-text text-2xl mr-1">&lt;</span>
            <span className="text-2xl font-bold">Rahul</span>
            <span className="glow-text text-2xl ml-1">/&gt;</span>
          </div>
        </Link>

        {/* Desktop menu */}
        <div className="hidden md:flex items-center gap-2">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link 
                  to="/" 
                  className={cn(
                    "px-4 py-2 rounded-md font-medium transition-colors inline-flex items-center", 
                    isActive('/') ? "bg-primary/10 text-primary" : "hover:bg-primary/5"
                  )}
                >
                  Home
                </Link>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <NavigationMenuTrigger
                  className={cn(
                    "rounded-md font-medium",
                    (isActive('/experience') || isActive('/hackathons') || isActive('/certifications') || isActive('/outreach')) && "bg-primary/10 text-primary"
                  )}
                >
                  Portfolio
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-2 p-4 w-[220px]">
                    <li>
                      <NavigationMenuLink asChild>
                        <Link 
                          to="/experience" 
                          className="block select-none rounded-md p-2 hover:bg-accent hover:text-accent-foreground"
                        >
                          Experience
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link 
                          to="/hackathons" 
                          className="block select-none rounded-md p-2 hover:bg-accent hover:text-accent-foreground"
                        >
                          Hackathons
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link 
                          to="/certifications" 
                          className="block select-none rounded-md p-2 hover:bg-accent hover:text-accent-foreground"
                        >
                          Certifications
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link 
                          to="/outreach" 
                          className="block select-none rounded-md p-2 hover:bg-accent hover:text-accent-foreground"
                        >
                          Outreach
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <Link 
                  to="/about" 
                  className={cn(
                    "px-4 py-2 rounded-md font-medium transition-colors inline-flex items-center", 
                    isActive('/about') ? "bg-primary/10 text-primary" : "hover:bg-primary/5"
                  )}
                >
                  About
                </Link>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <Link 
                  to="/contact" 
                  className={cn(
                    "px-4 py-2 rounded-md font-medium transition-colors inline-flex items-center", 
                    isActive('/contact') ? "bg-primary/10 text-primary" : "hover:bg-primary/5"
                  )}
                >
                  Contact
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <Separator orientation="vertical" className="h-6 mx-2" />

          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="rounded-full bg-background/20 backdrop-blur-sm hover:bg-background/30"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>
        </div>

        {/* Mobile menu button */}
        <div className="flex md:hidden items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="rounded-full"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-full"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile menu - improved design */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 w-full md:hidden">
          <div className="bg-background/95 backdrop-blur-md border-t border-border/20 shadow-lg py-2">
            <nav className="container mx-auto flex flex-col space-y-1 px-4">
              <Link
                to="/"
                className={cn(
                  "px-4 py-3 rounded-md font-medium transition-colors", 
                  isActive('/') ? "bg-primary/10 text-primary" : "hover:bg-primary/5"
                )}
              >
                Home
              </Link>
              
              <div className="px-4 py-2 font-medium text-muted-foreground">Portfolio</div>
              
              <Link
                to="/experience"
                className={cn(
                  "px-8 py-2 rounded-md font-medium transition-colors", 
                  isActive('/experience') ? "bg-primary/10 text-primary" : "hover:bg-primary/5"
                )}
              >
                Experience
              </Link>
              <Link
                to="/hackathons"
                className={cn(
                  "px-8 py-2 rounded-md font-medium transition-colors", 
                  isActive('/hackathons') ? "bg-primary/10 text-primary" : "hover:bg-primary/5"
                )}
              >
                Hackathons
              </Link>
              <Link
                to="/certifications"
                className={cn(
                  "px-8 py-2 rounded-md font-medium transition-colors", 
                  isActive('/certifications') ? "bg-primary/10 text-primary" : "hover:bg-primary/5"
                )}
              >
                Certifications
              </Link>
              <Link
                to="/outreach"
                className={cn(
                  "px-8 py-2 rounded-md font-medium transition-colors", 
                  isActive('/outreach') ? "bg-primary/10 text-primary" : "hover:bg-primary/5"
                )}
              >
                Outreach
              </Link>
              
              <Separator className="my-1" />
              
              <Link
                to="/about"
                className={cn(
                  "px-4 py-3 rounded-md font-medium transition-colors", 
                  isActive('/about') ? "bg-primary/10 text-primary" : "hover:bg-primary/5"
                )}
              >
                About
              </Link>
              <Link
                to="/contact"
                className={cn(
                  "px-4 py-3 rounded-md font-medium transition-colors", 
                  isActive('/contact') ? "bg-primary/10 text-primary" : "hover:bg-primary/5"
                )}
              >
                Contact
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
