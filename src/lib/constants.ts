export const siteConfig = {
  name: "Your Name",
  title: "Full-Stack Developer & ML Engineer",
  description: "Building intelligent, accessible, and user-focused digital products that improve lives.",
  url: "https://yourname.dev",
  ogImage: "https://yourname.dev/og.jpg",
  links: {
    github: "https://github.com/yourusername",
    linkedin: "https://linkedin.com/in/yourusername",
    twitter: "https://twitter.com/yourusername",
    email: "hello@yourname.dev",
  },
};

export const navigation = [
  { title: "Home", href: "/" },
  { title: "About", href: "/about" },
  { title: "Projects", href: "/projects" },
  { title: "Blog", href: "/blog" },
  { title: "Contact", href: "/contact" },
];

export const skills = {
  frontend: [
    { name: "Next.js", icon: "nextjs" },
    { name: "React", icon: "react" },
    { name: "TypeScript", icon: "typescript" },
    { name: "Tailwind CSS", icon: "tailwind" },
    { name: "Framer Motion", icon: "framer" },
  ],
  backend: [
    { name: "NestJS", icon: "nestjs" },
    { name: "FastAPI", icon: "fastapi" },
    { name: "PostgreSQL", icon: "postgresql" },
    { name: "Drizzle ORM", icon: "drizzle" },
    { name: "REST APIs", icon: "api" },
  ],
  ml: [
    { name: "Python", icon: "python" },
    { name: "scikit-learn", icon: "sklearn" },
    { name: "pandas", icon: "pandas" },
    { name: "NumPy", icon: "numpy" },
    { name: "Jupyter", icon: "jupyter" },
  ],
  devops: [
    { name: "Docker", icon: "docker" },
    { name: "GitHub Actions", icon: "github" },
    { name: "Vercel", icon: "vercel" },
    { name: "Linux", icon: "linux" },
    { name: "CI/CD", icon: "cicd" },
  ],
};

export const projects = [
  {
    id: "nutri-focus",
    title: "Nutri Focus",
    description: "AI-powered Ethiopian nutrition recommendation system with personalized diet advice based on goals, lifestyle, and food preferences.",
    image: "/images/projects/nutri-focus.png",
    tags: ["Next.js", "NestJS", "FastAPI", "PostgreSQL", "Python", "ML"],
    category: "fullstack",
    featured: true,
    liveUrl: "https://nutri-focus.vercel.app",
    githubUrl: "https://github.com/yourusername/nutri-focus",
    year: 2024,
    challenges: [
      "Integrating trained ML model into multi-layered application",
      "Real-time response across distributed services",
      "Data validation, security, and performance optimization",
      "Clean, scalable microservice orchestration"
    ],
    solutions: [
      "Built modular microservices with NestJS, FastAPI, and Next.js",
      "Developed ML pipeline using scikit-learn for food classification",
      "Designed real-time interface for dietary feedback and tracking",
      "Deployed and tested using Docker and CI workflows"
    ],
    results: [
      "95%+ ML accuracy on prediction test set",
      "Smooth user experience with sub-200ms response times",
      "Positive feedback from test users (students and health professionals)"
    ],
    techStack: {
      frontend: ["Next.js 15", "Tailwind CSS", "TypeScript", "Framer Motion"],
      backend: ["NestJS", "FastAPI", "PostgreSQL", "Drizzle ORM"],
      ml: ["Python", "pandas", "scikit-learn", "NumPy"],
      devops: ["Docker", "GitHub Actions", "Vercel"]
    }
  },
  {
    id: "devlink",
    title: "DevLink",
    description: "A developer social platform focused on technical content sharing and community building.",
    image: "/images/projects/devlink.png",
    tags: ["Next.js", "Prisma", "tRPC", "TypeScript"],
    category: "fullstack",
    featured: false,
    liveUrl: "https://devlink.vercel.app",
    githubUrl: "https://github.com/yourusername/devlink",
    year: 2024,
    techStack: {
      frontend: ["Next.js", "TypeScript", "Tailwind CSS"],
      backend: ["tRPC", "Prisma", "PostgreSQL"],
      auth: ["NextAuth.js", "JWT"]
    }
  },
  {
    id: "study-sync",
    title: "StudySync",
    description: "Smart note-taking tool with AI-summarization features for students and researchers.",
    image: "/images/projects/study-sync.png",
    tags: ["React", "Node.js", "OpenAI API", "MongoDB"],
    category: "fullstack",
    featured: false,
    liveUrl: "https://study-sync.vercel.app",
    githubUrl: "https://github.com/yourusername/study-sync",
    year: 2023,
    techStack: {
      frontend: ["React", "TypeScript", "Material-UI"],
      backend: ["Node.js", "Express", "MongoDB"],
      ai: ["OpenAI API", "Natural Language Processing"]
    }
  }
];

export const blogPosts = [
  {
    id: "building-nutri-focus",
    title: "Building Nutri Focus: A Full-Stack ML Journey",
    description: "Deep dive into the tech and thinking behind my most important project - an AI-powered nutrition recommendation system.",
    image: "/images/blog/nutri-focus-journey.jpg",
    date: "2024-01-15",
    readTime: 8,
    tags: ["Full-Stack", "Machine Learning", "Next.js", "NestJS"],
    featured: true,
    excerpt: "Building Nutri Focus taught me more about microservices, ML integration, and user experience than any tutorial ever could. Here's what I learned..."
  },
  {
    id: "microservices-lessons",
    title: "Microservices in Action: Real Lessons from Nutri Focus",
    description: "Share mistakes, decisions, and wins — humanize the engineering journey of building distributed systems.",
    image: "/images/blog/microservices.jpg",
    date: "2024-01-10",
    readTime: 6,
    tags: ["Microservices", "Architecture", "DevOps"],
    featured: false,
    excerpt: "Microservices sound great in theory, but implementing them in practice reveals challenges you never expected. Here are the real lessons..."
  },
  {
    id: "nextjs-15-love",
    title: "Why I Love Next.js 15: Routing, Streaming & Productivity",
    description: "Opinion + tutorial piece; shows your frontend capability and technical voice.",
    image: "/images/blog/nextjs-15.jpg",
    date: "2024-01-05",
    readTime: 5,
    tags: ["Next.js", "React", "Frontend"],
    featured: false,
    excerpt: "Next.js 15 brings game-changing features that make building modern web apps faster and more enjoyable than ever..."
  },
  {
    id: "ai-healthcare-future",
    title: "The Future of AI in Healthcare (and How Developers Can Prepare)",
    description: "Visionary thought piece to show maturity, leadership, and awareness of industry trends.",
    image: "/images/blog/ai-healthcare.jpg",
    date: "2023-12-20",
    readTime: 7,
    tags: ["AI", "Healthcare", "Future Tech"],
    featured: false,
    excerpt: "As AI continues to revolutionize healthcare, developers need to understand both the opportunities and responsibilities that come with building health-tech solutions..."
  }
];

export const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Senior Frontend Developer",
    company: "TechCorp",
    content: "Working with you on the Nutri Focus project was a pleasure. Your attention to detail and ability to bridge frontend and ML requirements was impressive.",
    avatar: "/images/testimonials/sarah.jpg"
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Product Manager",
    company: "HealthTech Inc",
    content: "Your technical skills are matched by your communication abilities. You made complex ML concepts accessible to our entire team.",
    avatar: "/images/testimonials/michael.jpg"
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Full-Stack Developer",
    company: "StartupXYZ",
    content: "I've learned so much from collaborating with you. Your code is clean, well-documented, and your problem-solving approach is methodical.",
    avatar: "/images/testimonials/emily.jpg"
  }
];

export const contactInfo = {
  email: "hello@yourname.dev",
  location: "Addis Ababa, Ethiopia",
  availability: "Available for new opportunities",
  social: {
    github: "https://github.com/yourusername",
    linkedin: "https://linkedin.com/in/yourusername",
    twitter: "https://twitter.com/yourusername",
  }
}; 