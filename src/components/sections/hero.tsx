"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Github, Linkedin, Twitter, Sparkles, Code, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { siteConfig } from "@/lib/constants"

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-neutral-50 via-primary-50/30 to-secondary-50/30 dark:from-neutral-950 dark:via-primary-950/30 dark:to-secondary-950/30">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/10 dark:bg-primary-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary-500/10 dark:bg-secondary-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-accent-500/5 dark:bg-accent-500/10 rounded-full blur-2xl animate-pulse delay-500" />
        <div className="absolute top-1/3 right-1/3 w-48 h-48 bg-primary-400/5 dark:bg-primary-400/10 rounded-full blur-xl animate-pulse delay-1500" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-screen py-20">
          {/* Left Column - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            {/* Enhanced Greeting */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="inline-flex items-center px-4 py-2 bg-primary-500/10 dark:bg-primary-500/20 rounded-full text-primary-600 dark:text-primary-400 text-sm font-medium mb-6"
            >
              <Sparkles className="h-4 w-4 mr-2" />
              Welcome to my portfolio
            </motion.div>

            {/* Greeting */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-lg text-neutral-600 dark:text-neutral-300 mb-4"
            >
              Hello, I'm
            </motion.p>

            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-neutral-900 dark:text-neutral-50 mb-6"
            >
              <span className="gradient-text">{siteConfig.name}</span>
            </motion.h1>

            {/* Title */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-xl md:text-2xl lg:text-3xl text-neutral-700 dark:text-neutral-300 mb-8"
            >
              {siteConfig.title}
            </motion.h2>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-lg text-neutral-600 dark:text-neutral-400 mb-12 max-w-xl leading-relaxed"
            >
              {siteConfig.description}
            </motion.p>

            {/* Enhanced CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="flex flex-col sm:flex-row items-center lg:items-start lg:justify-start justify-center gap-4 mb-12"
            >
              <Button size="lg" variant="primary" asChild className="group button-glow">
                <Link href="/projects">
                  <Code className="mr-2 h-5 w-5" />
                  View My Work
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="glass"
                asChild
                className="group"
              >
                <Link href="/contact">
                  <Zap className="mr-2 h-5 w-5" />
                  Get in Touch
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </motion.div>

            {/* Enhanced Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex items-center justify-center lg:justify-start space-x-4"
            >
              <Link
                href={siteConfig.links.github}
                className="p-3 text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-50 transition-all duration-300 rounded-lg bg-white/50 dark:bg-neutral-800/50 backdrop-blur-sm hover:bg-white/80 dark:hover:bg-neutral-700/80 border border-neutral-200/50 dark:border-neutral-700/50 hover:border-neutral-300/50 dark:hover:border-neutral-600/50 group"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5 group-hover:scale-110 transition-transform" />
              </Link>
              <Link
                href={siteConfig.links.linkedin}
                className="p-3 text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-50 transition-all duration-300 rounded-lg bg-white/50 dark:bg-neutral-800/50 backdrop-blur-sm hover:bg-white/80 dark:hover:bg-neutral-700/80 border border-neutral-200/50 dark:border-neutral-700/50 hover:border-neutral-300/50 dark:hover:border-neutral-600/50 group"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5 group-hover:scale-110 transition-transform" />
              </Link>
              <Link
                href={siteConfig.links.twitter}
                className="p-3 text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-50 transition-all duration-300 rounded-lg bg-white/50 dark:bg-neutral-800/50 backdrop-blur-sm hover:bg-white/80 dark:hover:bg-neutral-700/80 border border-neutral-200/50 dark:border-neutral-700/50 hover:border-neutral-300/50 dark:hover:border-neutral-600/50 group"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5 group-hover:scale-110 transition-transform" />
              </Link>
            </motion.div>
          </motion.div>

          {/* Right Column - Enhanced Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative flex items-center justify-center"
          >
            {/* Enhanced Decorative Elements */}
            <div className="absolute inset-0">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary-500/20 dark:bg-primary-500/30 rounded-full blur-2xl" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-secondary-500/20 dark:bg-secondary-500/30 rounded-full blur-xl" />
              <div className="absolute top-1/2 right-0 w-16 h-16 bg-accent-500/20 dark:bg-accent-500/30 rounded-full blur-lg" />
            </div>

            {/* Main Image Container */}
            <div className="relative z-10">
              <motion.div
                animate={{
                  y: [0, -10, 0],
                  rotate: [0, 1, 0],
                }}
                transition={{
                  duration: 6,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
                className="relative"
              >
                {/* Enhanced Image with border and shadow */}
                <div className="relative w-80 h-80 md:w-96 md:h-96 lg:w-[450px] lg:h-[450px]">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 via-secondary-500/20 to-accent-500/20 rounded-3xl blur-xl" />
                  <div className="relative w-full h-full bg-white/50 dark:bg-neutral-800/50 backdrop-blur-sm rounded-3xl border border-neutral-300/50 dark:border-neutral-700/50 overflow-hidden shadow-2xl">
                    <Image
                      src="/placeholder.svg?height=450&width=450"
                      alt="Profile"
                      fill
                      className="object-cover"
                      priority
                    />
                    {/* Enhanced overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-white/20 dark:from-neutral-900/20 via-transparent to-transparent" />
                  </div>
                </div>

                {/* Enhanced floating elements */}
                <motion.div
                  animate={{
                    y: [0, -15, 0],
                    x: [0, 5, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                    delay: 1,
                  }}
                  className="absolute -top-4 -right-4 w-16 h-16 bg-primary-500/30 dark:bg-primary-500/40 rounded-full blur-sm"
                />
                <motion.div
                  animate={{
                    y: [0, 10, 0],
                    x: [0, -3, 0],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                    delay: 2,
                  }}
                  className="absolute -bottom-4 -left-4 w-12 h-12 bg-secondary-500/30 dark:bg-secondary-500/40 rounded-full blur-sm"
                />
                <motion.div
                  animate={{
                    y: [0, -8, 0],
                    x: [0, 8, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                    delay: 0.5,
                  }}
                  className="absolute top-1/2 -right-8 w-8 h-8 bg-accent-500/30 dark:bg-accent-500/40 rounded-full blur-sm"
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          className="w-6 h-10 border-2 border-neutral-500 dark:border-neutral-400 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            className="w-1 h-3 bg-neutral-500 dark:bg-neutral-400 rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  )
}
