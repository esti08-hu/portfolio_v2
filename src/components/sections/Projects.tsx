import React, { useState } from 'react';
import { ExternalLink, Github, Filter, Calendar, Code2, Brain, Database, Smartphone } from 'lucide-react';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { HoverEffects } from '../interactions/HoverEffects';

const projects = [
  {
    id: 'nutri-focus',
    title: 'Nutri Focus',
    subtitle: 'AI-Powered Ethiopian Nutrition System',
    description: 'An intelligent nutrition recommendation system that provides personalized dietary advice based on Ethiopian cuisine, user goals, and health preferences using machine learning.',
    longDescription: 'Nutri Focus bridges the gap between traditional Ethiopian nutrition knowledge and modern AI technology. The system analyzes user profiles, dietary preferences, and health goals to provide culturally relevant and scientifically accurate nutrition recommendations.',
    image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800',
    technologies: ['Next.js', 'NestJS', 'FastAPI', 'PostgreSQL', 'Python', 'scikit-learn', 'Docker', 'TypeScript'],
    category: 'Full-Stack',
    year: '2024',
    featured: true,
    status: 'Completed',
    demoUrl: '#',
    githubUrl: '#',
    highlights: [
      '95%+ ML accuracy on prediction test set',
      'Sub-200ms response times for real-time recommendations',
      'Microservices architecture with Docker orchestration',
      'Comprehensive test coverage across all services'
    ],
    challenges: [
      'Integrating ML models with real-time web services',
      'Handling cultural food preferences in recommendation algorithms',
      'Optimizing performance across distributed microservices'
    ]
  },
  {
    id: 'linkpharm',
    title: 'LinkPharm',
    subtitle: 'B2B Pharmaceutical Marketplace',
    description: 'Contributed to a B2B pharmaceutical marketplace as a Backend Developer, engineering robust backend services to streamline transactions and logistics.',
    longDescription: 'As a Backend Developer Intern at 1888 EC, I was a key contributor to the LinkPharm project, a B2B pharmaceutical marketplace. My role involved engineering scalable backend services to facilitate seamless business-to-business transactions and optimize logistics. This project provided me with practical experience in a modern tech stack and a professional venture studio environment.',
    image: 'https://images.pexels.com/photos/2280547/pexels-photo-2280547.jpeg?auto=compress&cs=tinysrgb&w=800',
    technologies: ['NestJS', 'Drizzle ORM', 'PostgreSQL', 'TypeScript', 'Docker'],
    category: 'Backend',
    year: '2024',
    featured: false,
    status: 'Completed',
    demoUrl: '#',
    githubUrl: '#',
    highlights: [
      'Engineered backend services for a B2B platform',
      'Gained practical experience with a modern tech stack',
      'Worked within a professional venture studio setting',
      'Utilized Docker for containerization'
    ],
    challenges: [
      'Ensuring data integrity in a high-transaction environment',
      'Managing logistics and inventory through the backend services'
    ]
  },
  {
    id: 'e-commerce-platform',
    title: 'E-commerce Platform',
    subtitle: 'Full-Stack E-commerce Application',
    description: 'A comprehensive e-commerce platform featuring a shopping cart, filtering, and secure checkout, built with a modern full-stack.',
    longDescription: 'This project involved developing a full-stack e-commerce application using Next.js (frontend) and Express.js (backend), with Prisma for database management. The application features a monorepo architecture for improved code maintainability and a responsive, user-friendly interface optimized for multiple devices.',
    image: 'https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&cs=tinysrgb&w=800',
    technologies: ['Next.js', 'Express.js', 'Prisma', 'Tailwind CSS', 'Monorepo'],
    category: 'Full-Stack',
    year: '2024',
    featured: false,
    status: 'Completed',
    demoUrl: '#',
    githubUrl: '#',
    highlights: [
      'Implemented a monorepo architecture',
      'Created a shopping cart and secure checkout process',
      'Optimized for mobile responsiveness',
      'Gained hands-on experience in modern web development'
    ],
    challenges: [
      'Managing state across the front-end and back-end',
      'Integrating secure payment gateways',
      'Ensuring data consistency between services'
    ]
  },
  {
    id: 'pfms',
    title: 'Personal Financial Management System',
    subtitle: 'Budgeting & Expense Tracker',
    description: 'A full-stack budgeting and expense tracking application that allows users to manage personal finances and visualize spending habits.',
    longDescription: 'This project is a personal financial management system built to help users efficiently track and manage their personal finances. The application features a secure, role-based access control system and a dynamic dashboard with visualizations to provide a clear overview of financial trends.',
    image: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=800',
    technologies: ['NestJS', 'Next.js', 'PostgreSQL', 'Drizzle ORM'],
    category: 'Full-Stack',
    year: '2025',
    featured: false,
    status: 'Completed',
    demoUrl: '#',
    githubUrl: '#',
    highlights: [
      'Secure role-based access control system',
      'Dynamic dashboard with data visualizations',
      'Efficient query design for data retrieval'
    ],
    challenges: [
      'Designing an intuitive and user-friendly interface',
      'Ensuring data integrity and security',
      'Handling complex transactional data'
    ]
  },
  {
    id: 'backos-internship',
    title: 'Web Developer Internship Projects',
    subtitle: 'Web Applications for Backos Technology',
    description: 'Developed full-stack web applications like a To-Do List and a Library System during a web development internship.',
    longDescription: 'As a Web Developer Intern at Backos Technology, I developed several full-stack web applications, including a To-Do List and a Library System. I focused on implementing responsive front-end designs and optimizing backend performance. This experience was crucial for applying theoretical knowledge in practical scenarios and collaborating within a professional development environment.',
    image: 'https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&cs=tinysrgb&w=800',
    technologies: ['JavaScript', 'PHP', 'HTML', 'CSS', 'MySQL'],
    category: 'Full-Stack',
    year: '2023',
    featured: false,
    status: 'Completed',
    demoUrl: '#',
    githubUrl: '#',
    highlights: [
      'Developed both front-end and back-end services',
      'Applied responsive design principles',
      'Collaborated with a professional team',
      'Gained hands-on experience in a professional environment'
    ],
    challenges: [
      'Optimizing performance with a LAMP stack',
      'Working with legacy codebases',
      'Debugging and resolving cross-browser compatibility issues'
    ]
  },
  {
    id: 'ecommerce-api',
    title: 'E-Commerce API',
    subtitle: 'Scalable REST API System',
    description: 'Enterprise-grade RESTful API built with NestJS featuring advanced authentication, role-based access control, and comprehensive product management.',
    image: 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=800',
    technologies: ['NestJS', 'PostgreSQL', 'JWT', 'Swagger', 'Docker', 'Redis'],
    category: 'Backend',
    year: '2023',
    featured: false,
    status: 'Completed',
    demoUrl: '#',
    githubUrl: '#',
    highlights: [
      'Comprehensive API documentation with Swagger',
      'Advanced RBAC system with multiple user roles',
      'Redis caching for optimal performance',
      'Automated testing with 90%+ coverage'
    ]
  },
  {
    id: 'portfolio-dashboard',
    title: 'Analytics Dashboard',
    subtitle: 'Real-time Data Visualization',
    description: 'Interactive dashboard for tracking portfolio performance with real-time charts, data visualization, and comprehensive reporting features.',
    image: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=800',
    technologies: ['React', 'D3.js', 'Chart.js', 'FastAPI', 'PostgreSQL', 'WebSocket'],
    category: 'Frontend',
    year: '2023',
    featured: false,
    status: 'Completed',
    demoUrl: '#',
    githubUrl: '#',
    highlights: [
      'Real-time data updates via WebSocket',
      'Interactive charts and visualizations',
      'Responsive design for all devices',
      'Export functionality for reports'
    ]
  },
  {
    id: 'devlink-platform',
    title: 'DevLink',
    subtitle: 'Developer Social Platform',
    description: 'A modern social platform designed specifically for developers to share technical content, collaborate on projects, and build professional networks.',
    image: 'https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&cs=tinysrgb&w=800',
    technologies: ['Next.js', 'Prisma', 'tRPC', 'PostgreSQL', 'NextAuth.js', 'Tailwind CSS'],
    category: 'Full-Stack',
    year: '2024',
    featured: false,
    status: 'In Progress',
    demoUrl: '#',
    githubUrl: '#',
    highlights: [
      'Real-time messaging and notifications',
      'Advanced code syntax highlighting',
      'Project collaboration tools',
      'Professional networking features'
    ]
  },
  {
    id: 'studysync-ai',
    title: 'StudySync',
    subtitle: 'AI-Powered Study Assistant',
    description: 'Smart note-taking application with AI summarization, flashcard generation, and personalized study schedules for enhanced learning efficiency.',
    image: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=800',
    technologies: ['React', 'Node.js', 'OpenAI API', 'MongoDB', 'Express.js', 'Socket.io'],
    category: 'AI/ML',
    year: '2023',
    featured: false,
    status: 'Completed',
    demoUrl: '#',
    githubUrl: '#',
    highlights: [
      'AI-powered content summarization',
      'Automated flashcard generation',
      'Spaced repetition learning algorithm',
      'Real-time collaborative study sessions'
    ]
  },
];

const categories = ['All', 'Full-Stack', 'AI/ML', 'Backend', 'Frontend'];

const categoryIcons = {
  'Full-Stack': Code2,
  'AI/ML': Brain,
  'Backend': Database,
  'Frontend': Smartphone
};

export const Projects: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState<string | null>(null);

  const filteredProjects = selectedCategory === 'All' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  const featuredProject = projects.find(p => p.featured);

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-xl text-neutral-400 max-w-3xl mx-auto">
            A showcase of my technical expertise through real-world applications, 
            from AI-powered systems to scalable web platforms
          </p>
        </div>

        {/* Featured Project */}
        {featuredProject && (
          <div className="mb-20">
            <Card variant="glass" className="overflow-hidden">
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                {/* Project Image */}
                <div className="relative">
                  <img
                    src={featuredProject.image}
                    alt={featuredProject.title}
                    className="w-full h-64 lg:h-80 object-cover rounded-lg"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-gradient-to-r from-blue-600 to-blue-800 text-white text-sm font-medium rounded-full">
                      Featured Project
                    </span>
                  </div>
                </div>

                {/* Project Details */}
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-3xl font-bold text-white">{featuredProject.title}</h3>
                      <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs font-medium rounded-full">
                        {featuredProject.status}
                      </span>
                    </div>
                    <p className="text-lg text-blue-400 font-medium mb-4">{featuredProject.subtitle}</p>
                    <p className="text-neutral-300 leading-relaxed">{featuredProject.longDescription}</p>
                  </div>

                  {/* Key Highlights */}
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-3">Key Achievements</h4>
                    <ul className="space-y-2">
                      {featuredProject.highlights.map((highlight, index) => (
                        <li key={index} className="flex items-start gap-2 text-neutral-300">
                          <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Technologies */}
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-3">Technologies Used</h4>
                    <div className="flex flex-wrap gap-2">
                      {featuredProject.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 bg-slate-700/50 border border-slate-600/50 rounded-full text-sm text-neutral-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-4 pt-4">
                    <Button
                      variant="primary"
                      icon={ExternalLink}
                      iconPosition="right"
                      href={featuredProject.demoUrl}
                    >
                      Live Demo
                    </Button>
                    <Button
                      variant="outline"
                      icon={Github}
                      href={featuredProject.githubUrl}
                    >
                      View Code
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => {
            const Icon = category !== 'All' ? categoryIcons[category as keyof typeof categoryIcons] : Filter;
            return (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg'
                    : 'bg-slate-700/50 text-neutral-300 hover:bg-slate-600/50 hover:text-white'
                }`}
              >
                {Icon && <Icon size={16} />}
                {category}
              </button>
            );
          })}
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.filter(p => !p.featured).map((project) => (
            <div
              key={project.id}
              onClick={() => setSelectedProject(selectedProject === project.id ? null : project.id)}
              className="cursor-pointer"
            >
              <Card
                variant="glass"
                className="group overflow-hidden"
              >
              {/* Project Image */}
              <div className="relative mb-6">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 right-3 flex gap-2">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    project.status === 'Completed' 
                      ? 'bg-green-500/20 text-green-400' 
                      : 'bg-orange-500/20 text-orange-400'
                  }`}>
                    {project.status}
                  </span>
                </div>
                <div className="absolute bottom-3 left-3">
                  <div className="flex items-center gap-1 text-neutral-400 text-sm">
                    <Calendar size={14} />
                    {project.year}
                  </div>
                </div>
              </div>

              {/* Project Info */}
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
                      {project.title}
                    </h3>
                    <span className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs font-medium rounded-full">
                      {project.category}
                    </span>
                  </div>
                  <p className="text-neutral-400 text-sm mb-3">{project.subtitle}</p>
                  <p className="text-neutral-300 text-sm leading-relaxed">{project.description}</p>
                </div>

                {/* Technologies Preview */}
                <div className="flex flex-wrap gap-1">
                  {project.technologies.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 bg-slate-700/50 text-neutral-400 text-xs rounded"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="px-2 py-1 bg-slate-700/50 text-neutral-400 text-xs rounded">
                      +{project.technologies.length - 3} more
                    </span>
                  )}
                </div>

                {/* Expanded Details */}
                {selectedProject === project.id && (
                  <div className="pt-4 border-t border-slate-600/50 space-y-4 animate-fade-in">
                    <div>
                      <h4 className="text-sm font-semibold text-white mb-2">Key Features</h4>
                      <ul className="space-y-1">
                        {project.highlights.map((highlight, index) => (
                          <li key={index} className="flex items-start gap-2 text-neutral-300 text-sm">
                            <div className="w-1 h-1 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                            {highlight}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-sm font-semibold text-white mb-2">All Technologies</h4>
                      <div className="flex flex-wrap gap-1">
                        {project.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-1 bg-slate-700/50 border border-slate-600/50 text-neutral-300 text-xs rounded"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-2 pt-2">
                  <HoverEffects effect="scale">
                    <Button
                      variant="primary"
                      size="sm"
                      icon={ExternalLink}
                      href={project.demoUrl}
                      className="flex-1"
                    >
                      Demo
                    </Button>
                  </HoverEffects>
                  <HoverEffects effect="scale">
                    <Button
                      variant="outline"
                      size="sm"
                      icon={Github}
                      href={project.githubUrl}
                      className="flex-1"
                    >
                      Code
                    </Button>
                  </HoverEffects>
                </div>
              </div>
            </Card>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <Card variant="glass" className="max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">
              Interested in Working Together?
            </h3>
            <p className="text-neutral-400 mb-6">
              I'm always excited to take on new challenges and collaborate on innovative projects. 
              Let's discuss how we can bring your ideas to life.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <HoverEffects effect="glow">
                <Button
                  variant="primary"
                  size="lg"
                  href="#contact"
                >
                  Start a Conversation
                </Button>
              </HoverEffects>
              <HoverEffects effect="scale">
                <Button
                  variant="outline"
                  size="lg"
                  href="/resume.pdf"
                >
                  Download Resume
                </Button>
              </HoverEffects>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};
