"use client"

import { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { ExternalLink, Github, ArrowRight, Search, Filter, Star, Calendar, Code, Eye, Sparkles } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardGlass, CardGradient } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { projects } from "@/lib/constants"

export default function ProjectsPage() {
  const [filter, setFilter] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("recent")

  const categories = [
    { id: "all", name: "All Projects", count: projects.length },
    { id: "fullstack", name: "Full Stack", count: projects.filter((p) => p.category === "fullstack").length },
    { id: "frontend", name: "Frontend", count: projects.filter((p) => p.category === "frontend").length },
    { id: "backend", name: "Backend", count: projects.filter((p) => p.category === "backend").length },
    { id: "ml", name: "Machine Learning", count: projects.filter((p) => p.category === "ml").length },
  ]

  const filteredAndSortedProjects = useMemo(() => {
    const filtered = projects.filter((project) => {
      const matchesFilter = filter === "all" || project.category === filter
      const matchesSearch =
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      return matchesFilter && matchesSearch
    })

    switch (sortBy) {
      case "recent":
        return filtered.sort((a, b) => b.year - a.year)
      case "featured":
        return filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))
      case "alphabetical":
        return filtered.sort((a, b) => a.title.localeCompare(b.title))
      default:
        return filtered
    }
  }, [filter, searchQuery, sortBy])

  const stats = [
    { label: "Total Projects", value: projects.length, icon: Code },
    { label: "Featured", value: projects.filter((p) => p.featured).length, icon: Star },
    { label: "This Year", value: projects.filter((p) => p.year === new Date().getFullYear()).length, icon: Calendar },
    { label: "Live Projects", value: projects.filter((p) => p.liveUrl).length, icon: Eye },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-primary-50/30 to-secondary-50/30 dark:from-neutral-950 dark:via-primary-950/30 dark:to-secondary-950/30">
      {/* Enhanced Hero Section */}
      <section className="relative pt-20 pb-16 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/5 dark:bg-primary-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary-500/5 dark:bg-secondary-500/10 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center px-4 py-2 bg-primary-500/10 dark:bg-primary-500/20 rounded-full text-primary-600 dark:text-primary-400 text-sm font-medium mb-6"
            >
              <Code className="h-4 w-4 mr-2" />
              Portfolio Showcase
            </motion.div>

            <h1 className="text-4xl md:text-6xl font-bold text-neutral-900 dark:text-neutral-50 mb-6">
              My <span className="gradient-text">Projects</span>
            </h1>
            <p className="text-xl text-neutral-600 dark:text-neutral-300 leading-relaxed mb-8">
              Here are some of the projects I've worked on, showcasing my skills in full-stack development, machine
              learning, and creating meaningful user experiences.
            </p>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  variants={itemVariants}
                  className="bg-white/50 dark:bg-neutral-800/30 backdrop-blur-sm rounded-xl p-4 border border-neutral-200/50 dark:border-neutral-700/50 card-hover"
                >
                  <stat.icon className="h-5 w-5 text-primary-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-neutral-900 dark:text-neutral-50">{stat.value}</div>
                  <div className="text-sm text-neutral-600 dark:text-neutral-400">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Filter and Search Section */}
      <section className="py-8 sticky top-16 z-40 bg-white/80 dark:bg-neutral-950/80 backdrop-blur-xl border-b border-neutral-200/50 dark:border-neutral-800/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col lg:flex-row items-center justify-between gap-6"
          >
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-400" />
              <Input
                type="text"
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white/50 dark:bg-neutral-800/50 border-neutral-300/50 dark:border-neutral-700/50 focus:border-primary-400 dark:focus:border-primary-400"
              />
            </div>

            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((category) => (
                <motion.div key={category.id} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    variant={filter === category.id ? "primary" : "outline"}
                    size="sm"
                    onClick={() => setFilter(category.id)}
                    className="relative group transition-all duration-300"
                  >
                    {category.name}
                    <span className="ml-2 text-xs bg-primary-500/20 dark:bg-primary-500/30 px-1.5 py-0.5 rounded-full">
                      {category.count}
                    </span>
                  </Button>
                </motion.div>
              ))}
            </div>

            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-neutral-500" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-white/50 dark:bg-neutral-800/50 border border-neutral-300/50 dark:border-neutral-700/50 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary-400"
              >
                <option value="recent">Most Recent</option>
                <option value="featured">Featured First</option>
                <option value="alphabetical">A-Z</option>
              </select>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Projects Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatePresence mode="wait">
            {filteredAndSortedProjects.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="text-center py-16"
              >
                <div className="w-24 h-24 bg-neutral-200 dark:bg-neutral-800 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="h-8 w-8 text-neutral-400" />
                </div>
                <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-50 mb-2">No projects found</h3>
                <p className="text-neutral-600 dark:text-neutral-400">Try adjusting your search or filter criteria.</p>
              </motion.div>
            ) : (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {filteredAndSortedProjects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    variants={itemVariants}
                    transition={{ delay: index * 0.1 }}
                    className="group"
                  >
                    <CardGradient className="h-full card-hover overflow-hidden">
                      {/* Project Image */}
                      <div className="relative h-48 overflow-hidden">
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                        {project.featured && (
                          <div className="absolute top-4 right-4 bg-primary-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center">
                            <Star className="h-3 w-3 mr-1" />
                            Featured
                          </div>
                        )}
                      </div>

                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle className="text-xl text-neutral-900 dark:text-neutral-50 mb-2">
                              {project.title}
                            </CardTitle>
                            <CardDescription className="text-neutral-600 dark:text-neutral-400 mb-3">
                              {project.description}
                            </CardDescription>
                          </div>
                        </div>

                        {/* Project Tags */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-1 bg-primary-500/10 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 text-xs rounded-full"
                            >
                              {tag}
                            </span>
                          ))}
                          {project.tags.length > 3 && (
                            <span className="px-2 py-1 bg-neutral-500/10 dark:bg-neutral-500/20 text-neutral-600 dark:text-neutral-400 text-xs rounded-full">
                              +{project.tags.length - 3}
                            </span>
                          )}
                        </div>
                      </CardHeader>

                      <CardContent>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-neutral-500 dark:text-neutral-400">
                            {project.year}
                          </span>
                          <div className="flex space-x-2">
                            {project.liveUrl && (
                              <Button size="sm" variant="outline" asChild>
                                <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                                  <ExternalLink className="h-4 w-4" />
                                </Link>
                              </Button>
                            )}
                            {project.githubUrl && (
                              <Button size="sm" variant="outline" asChild>
                                <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                                  <Github className="h-4 w-4" />
                                </Link>
                              </Button>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </CardGradient>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  )
}
