import React, { useState } from 'react';
import { Calendar, Clock, ArrowRight, Search, Tag, BookOpen, Code, Lightbulb, TrendingUp } from 'lucide-react';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';

const blogPosts = [
  {
    id: 'nutri-focus-journey',
    title: 'Building Nutri Focus: A Full-Stack ML Journey',
    excerpt: 'Deep dive into the technical challenges, architectural decisions, and lessons learned while building an AI-powered nutrition recommendation system.',
    content: 'A comprehensive look at how I built Nutri Focus from concept to deployment, covering microservices architecture, ML model integration, and real-world performance optimization.',
    category: 'Case Study',
    tags: ['Machine Learning', 'NestJS', 'Architecture', 'Full-Stack'],
    readTime: '12 min read',
    publishDate: '2024-01-15',
    featured: true,
    image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800',
    author: 'Estifanos Ameha',
    views: 2847,
    likes: 156
  },
  {
    id: 'microservices-lessons',
    title: 'Microservices in Action: Real Lessons from Production',
    excerpt: 'What I learned about service communication, data consistency, and deployment strategies while building distributed systems.',
    content: 'Practical insights from implementing microservices architecture, including common pitfalls, debugging strategies, and performance considerations.',
    category: 'Technical',
    tags: ['Microservices', 'DevOps', 'Architecture', 'Docker'],
    readTime: '8 min read',
    publishDate: '2024-01-08',
    featured: false,
    image: 'https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg?auto=compress&cs=tinysrgb&w=800',
    author: 'Estifanos Ameha',
    views: 1923,
    likes: 89
  },
  {
    id: 'nextjs-15-features',
    title: 'Why I Love Next.js 15: App Router, Streaming & Beyond',
    excerpt: 'Exploring the latest features in Next.js 15 and how they improve developer experience and application performance.',
    content: 'A detailed exploration of Next.js 15 features including the App Router, Server Components, and streaming capabilities.',
    category: 'Tutorial',
    tags: ['Next.js', 'React', 'Frontend', 'Performance'],
    readTime: '10 min read',
    publishDate: '2024-01-02',
    featured: false,
    image: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=800',
    author: 'Estifanos Ameha',
    views: 3421,
    likes: 203
  },
  {
    id: 'ai-healthcare-future',
    title: 'The Future of AI in Healthcare: A Developer\'s Perspective',
    excerpt: 'How developers can prepare for the growing intersection of artificial intelligence and healthcare technology.',
    content: 'Exploring emerging trends in AI healthcare applications and the technical skills developers need to contribute meaningfully.',
    category: 'Opinion',
    tags: ['AI', 'Healthcare', 'Future Tech', 'Career'],
    readTime: '7 min read',
    publishDate: '2023-12-28',
    featured: false,
    image: 'https://images.pexels.com/photos/3825581/pexels-photo-3825581.jpeg?auto=compress&cs=tinysrgb&w=800',
    author: 'Estifanos Ameha',
    views: 1654,
    likes: 127
  },
  {
    id: 'typescript-best-practices',
    title: 'TypeScript Best Practices for Large Applications',
    excerpt: 'Essential patterns and practices for maintaining type safety and code quality in enterprise-scale TypeScript projects.',
    content: 'Comprehensive guide to TypeScript patterns, utility types, and organizational strategies for large codebases.',
    category: 'Tutorial',
    tags: ['TypeScript', 'Best Practices', 'Code Quality', 'Enterprise'],
    readTime: '15 min read',
    publishDate: '2023-12-20',
    featured: false,
    image: 'https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg?auto=compress&cs=tinysrgb&w=800',
    author: 'Estifanos Ameha',
    views: 2156,
    likes: 178
  },
  {
    id: 'database-optimization',
    title: 'PostgreSQL Performance: From Slow to Lightning Fast',
    excerpt: 'Practical techniques for optimizing PostgreSQL queries, indexing strategies, and connection management.',
    content: 'Real-world database optimization techniques with before/after performance metrics and practical examples.',
    category: 'Technical',
    tags: ['PostgreSQL', 'Database', 'Performance', 'Optimization'],
    readTime: '11 min read',
    publishDate: '2023-12-15',
    featured: false,
    image: 'https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg?auto=compress&cs=tinysrgb&w=800',
    author: 'Estifanos Ameha',
    views: 1789,
    likes: 134
  }
];

const categories = ['All', 'Case Study', 'Technical', 'Tutorial', 'Opinion'];
const allTags = Array.from(new Set(blogPosts.flatMap(post => post.tags)));

const categoryIcons = {
  'Case Study': BookOpen,
  'Technical': Code,
  'Tutorial': Lightbulb,
  'Opinion': TrendingUp
};

export const Blog: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesTags = selectedTags.length === 0 || selectedTags.some(tag => post.tags.includes(tag));
    
    return matchesCategory && matchesSearch && matchesTags;
  });

  const featuredPost = blogPosts.find(post => post.featured);
  const regularPosts = filteredPosts.filter(post => !post.featured);

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <section id="blog" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            Technical <span className="gradient-text">Blog</span>
          </h2>
          <p className="text-xl text-neutral-400 max-w-3xl mx-auto">
            Insights, tutorials, and deep dives into modern web development, 
            machine learning, and software architecture
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-12 space-y-6">
          {/* Search Bar */}
          <div className="max-w-md mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" size={20} />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-neutral-400 transition-colors duration-300"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => {
              const Icon = category !== 'All' ? categoryIcons[category as keyof typeof categoryIcons] : BookOpen;
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

          {/* Tag Filter */}
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-wrap justify-center gap-2">
              {allTags.slice(0, 8).map((tag) => (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium transition-all duration-300 ${
                    selectedTags.includes(tag)
                      ? 'bg-teal-500/20 text-teal-400 border border-teal-500/50'
                      : 'bg-slate-700/30 text-neutral-400 hover:bg-slate-600/50 hover:text-neutral-300'
                  }`}
                >
                  <Tag size={12} />
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Featured Article */}
        {featuredPost && selectedCategory === 'All' && !searchTerm && selectedTags.length === 0 && (
          <div className="mb-16">
            <Card variant="glass" className="overflow-hidden">
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                {/* Article Image */}
                <div className="relative">
                  <img
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    className="w-full h-64 lg:h-80 object-cover rounded-lg"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-gradient-to-r from-orange-600 to-orange-800 text-white text-sm font-medium rounded-full">
                      Featured Article
                    </span>
                  </div>
                  <div className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-sm rounded-lg px-3 py-1">
                    <div className="flex items-center gap-4 text-white text-sm">
                      <span className="flex items-center gap-1">
                        <Clock size={14} />
                        {featuredPost.readTime}
                      </span>
                      <span>{featuredPost.views.toLocaleString()} views</span>
                    </div>
                  </div>
                </div>

                {/* Article Details */}
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <span className="px-3 py-1 bg-blue-500/20 text-blue-400 text-sm font-medium rounded-full">
                        {featuredPost.category}
                      </span>
                      <div className="flex items-center gap-1 text-neutral-400 text-sm">
                        <Calendar size={14} />
                        {formatDate(featuredPost.publishDate)}
                      </div>
                    </div>
                    <h3 className="text-3xl font-bold text-white mb-4">{featuredPost.title}</h3>
                    <p className="text-neutral-300 leading-relaxed text-lg">{featuredPost.excerpt}</p>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {featuredPost.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-slate-700/50 border border-slate-600/50 rounded text-sm text-neutral-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Stats and CTA */}
                  <div className="flex items-center justify-between pt-4">
                    <div className="flex items-center gap-4 text-neutral-400 text-sm">
                      <span>{featuredPost.likes} likes</span>
                      <span>•</span>
                      <span>By {featuredPost.author}</span>
                    </div>
                    <Button
                      variant="primary"
                      icon={ArrowRight}
                      iconPosition="right"
                      href={`#blog/${featuredPost.id}`}
                    >
                      Read Article
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Articles Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {regularPosts.map((post) => (
            <Card
              key={post.id}
              variant="glass"
              className="group cursor-pointer overflow-hidden hover:transform hover:scale-[1.02] transition-all duration-300"
            >
              {/* Article Image */}
              <div className="relative mb-6">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3">
                  <span className="px-2 py-1 bg-black/50 backdrop-blur-sm text-white text-xs font-medium rounded-full">
                    {post.category}
                  </span>
                </div>
                <div className="absolute bottom-3 right-3 bg-black/50 backdrop-blur-sm rounded px-2 py-1">
                  <div className="flex items-center gap-1 text-white text-xs">
                    <Clock size={12} />
                    {post.readTime}
                  </div>
                </div>
              </div>

              {/* Article Info */}
              <div className="space-y-4">
                <div>
                  <div className="flex items-center gap-2 mb-2 text-neutral-400 text-sm">
                    <Calendar size={14} />
                    {formatDate(post.publishDate)}
                  </div>
                  <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors mb-3 line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-neutral-300 text-sm leading-relaxed line-clamp-3">{post.excerpt}</p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1">
                  {post.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-slate-700/50 text-neutral-400 text-xs rounded"
                    >
                      {tag}
                    </span>
                  ))}
                  {post.tags.length > 3 && (
                    <span className="px-2 py-1 bg-slate-700/50 text-neutral-400 text-xs rounded">
                      +{post.tags.length - 3}
                    </span>
                  )}
                </div>

                {/* Stats and Read More */}
                <div className="flex items-center justify-between pt-2 border-t border-slate-600/30">
                  <div className="flex items-center gap-3 text-neutral-400 text-xs">
                    <span>{post.views.toLocaleString()} views</span>
                    <span>•</span>
                    <span>{post.likes} likes</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    icon={ArrowRight}
                    iconPosition="right"
                    href={`#blog/${post.id}`}
                    className="text-blue-400 hover:text-blue-300"
                  >
                    Read
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-slate-700/50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search size={32} className="text-neutral-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">No articles found</h3>
            <p className="text-neutral-400 mb-6">
              Try adjusting your search terms or filters to find what you're looking for.
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('All');
                setSelectedTags([]);
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}

        {/* Newsletter Signup */}
        <div className="mt-16">
          <Card variant="glass" className="max-w-2xl mx-auto text-center">
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  Stay Updated with Latest Articles
                </h3>
                <p className="text-neutral-400">
                  Get notified when I publish new technical articles, tutorials, and insights. 
                  No spam, just quality content delivered to your inbox.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-neutral-400 transition-colors duration-300"
                />
                <Button variant="primary" className="sm:px-8">
                  Subscribe
                </Button>
              </div>
              
              <p className="text-neutral-500 text-sm">
                Join 500+ developers who read my weekly insights
              </p>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};