import React from 'react';
import { Github, Linkedin, Mail, Heart } from 'lucide-react';

const socialLinks = [
  { name: 'GitHub', href: 'https://github.com', icon: Github },
  { name: 'LinkedIn', href: 'https://linkedin.com', icon: Linkedin },
  { name: 'Email', href: 'mailto:estioame@gmail.com', icon: Mail },
];

const quickLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Projects', href: '#projects' },
  { name: 'Blog', href: '#blog' },
  { name: 'Contact', href: '#contact' },
];

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900/50 border-t border-slate-700/50 backdrop-blur-sm" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand & Quote */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold gradient-text">EstifanosAmeha</h3>
            <p className="text-neutral-400 text-sm leading-relaxed">
              "Building intelligent, accessible, and user-focused digital products that improve lives."
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-neutral-100">Quick Links</h4>
            <div className="grid grid-cols-2 gap-2">
              {quickLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-neutral-400 hover:text-blue-400 text-sm transition-colors duration-300"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>

          {/* Contact & Social */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-neutral-100">Connect</h4>
            <div className="flex space-x-4">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-400 hover:text-blue-400 transition-colors duration-300 p-2 rounded-lg hover:bg-blue-500/10"
                  aria-label={`Visit ${link.name} profile`}
                >
                  <link.icon size={20} />
                </a>
              ))}
            </div>
            <p className="text-neutral-500 text-sm">
              Available for freelance work and collaborations
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-slate-700/50 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-neutral-500 text-sm">
            © {new Date().getFullYear()} EstifanosAmeha. All rights reserved.
          </p>
          <p className="text-neutral-500 text-sm flex items-center gap-1 mt-2 sm:mt-0">
            Made with <Heart size={14} className="text-red-400" aria-hidden="true" /> using React & Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
};