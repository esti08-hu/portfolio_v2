import React from 'react';
import { ArrowRight, Download, Github, ExternalLink } from 'lucide-react';
import { Button } from '../ui/Button';

const techStack = [
  'Next.js', 'TypeScript', 'NestJS', 'PostgreSQL', 'Docker', 'Python', 'TailwindCSS'
];

export const Hero: React.FC = () => {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900/20 to-slate-900"></div>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="text-center space-y-8">
          {/* Greeting */}
          <div className="space-y-2">
            <p className="text-blue-400 text-lg font-medium animate-fade-in">
              Hello, I'm
            </p>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white animate-fade-in delay-100">
              <span className="gradient-text">Estifanos Ameha</span>
            </h1>
          </div>

          {/* Title & Description */}
          <div className="space-y-6 max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-neutral-200 animate-fade-in delay-200">
              Full-Stack Developer & Machine Learning Enthusiast
            </h2>
            <p className="text-lg sm:text-xl text-neutral-400 leading-relaxed animate-fade-in delay-300">
              I build intelligent, scalable, and user-focused digital products that solve real-world problems. 
              Currently crafting beautiful experiences with modern technologies while exploring the intersection 
              of web development and artificial intelligence.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in delay-400">
            <Button 
              variant="primary" 
              size="lg" 
              icon={ArrowRight}
              iconPosition="right"
              href="#projects"
              className="animate-glow"
            >
              View My Work
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              icon={Download}
              href="/resume.pdf"
              className="hover:bg-white/5"
            >
              Download Resume
            </Button>
          </div>

          {/* Tech Stack */}
          <div className="pt-12 animate-fade-in delay-500">
            <p className="text-neutral-500 text-sm mb-4">Technologies I work with</p>
            <div className="flex flex-wrap justify-center gap-3">
              {techStack.map((tech, index) => (
                <span
                  key={tech}
                  className="px-3 py-1 bg-slate-800/50 border border-slate-700/50 rounded-full text-sm text-neutral-300 hover:border-blue-500/50 hover:text-blue-400 transition-colors duration-300 cursor-default"
                  style={{ animationDelay: `${600 + index * 100}ms` }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 border-2 border-neutral-600 rounded-full flex justify-center">
              <div className="w-1 h-2 bg-blue-400 rounded-full mt-2 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 right-20 animate-float">
        <div className="w-20 h-20 bg-gradient-to-br from-blue-500/20 to-teal-500/20 rounded-lg backdrop-blur-sm border border-white/10 flex items-center justify-center">
          <Github size={32} className="text-blue-400" />
        </div>
      </div>
      <div className="absolute bottom-20 left-20 animate-float delay-1000">
        <div className="w-16 h-16 bg-gradient-to-br from-teal-500/20 to-orange-500/20 rounded-full backdrop-blur-sm border border-white/10 flex items-center justify-center">
          <ExternalLink size={24} className="text-teal-400" />
        </div>
      </div>
    </section>
  );
};