"use client"

import type React from "react"

import Link from "next/link"
import { motion } from "framer-motion"
import {
  Github,
  Linkedin,
  Twitter,
  Mail,
  Heart,
  ArrowUpRight,
  MapPin,
  Clock,
  Send,
  Code,
  Palette,
  Database,
  Smartphone,
} from "lucide-react"
import { navigation, siteConfig, contactInfo } from "@/lib/constants"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export function Footer() {
  const currentYear = new Date().getFullYear()
  const [email, setEmail] = useState("")
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle newsletter signup
    setIsSubscribed(true)
    setEmail("")
    setTimeout(() => setIsSubscribed(false), 3000)
  }

  const skills = [
    { name: "Frontend", icon: Code, color: "text-blue-400" },
    { name: "Design", icon: Palette, color: "text-purple-400" },
    { name: "Backend", icon: Database, color: "text-green-400" },
    { name: "Mobile", icon: Smartphone, color: "text-orange-400" },
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
    <footer className="relative bg-gradient-to-br from-primary-950 via-primary-900 to-primary-950 border-t border-primary-800/50 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-secondary-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12"
        >
          {/* Brand Section - Enhanced */}
          <motion.div variants={itemVariants} className="lg:col-span-5">
            <div className="flex items-center space-x-3 mb-6">
              <motion.div className="relative" whileHover={{ scale: 1.05, rotate: 5 }} transition={{ duration: 0.3 }}>
                <div className="w-12 h-12 bg-gradient-to-br from-accent-500 via-accent-600 to-secondary-600 rounded-xl flex items-center justify-center shadow-lg shadow-accent-500/25">
                  <span className="text-white font-bold text-lg">{siteConfig.name.charAt(0)}</span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-accent-500 to-secondary-600 rounded-xl blur-md opacity-30 -z-10" />
              </motion.div>
              <div>
                <span className="text-2xl font-bold text-neutral-50 block">{siteConfig.name}</span>
                <span className="text-sm text-accent-400 font-medium">Full-Stack Developer</span>
              </div>
            </div>

            <p className="text-neutral-300 mb-8 max-w-md leading-relaxed">
              Building intelligent, accessible, and user-focused digital products that improve lives. Passionate about
              full-stack development, machine learning, and creating meaningful solutions.
            </p>

            {/* Skills Grid */}
            <div className="grid grid-cols-2 gap-3 mb-8">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  variants={itemVariants}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center space-x-2 p-3 bg-primary-800/30 rounded-lg border border-primary-700/50 hover:border-primary-600/50 transition-all duration-300 group"
                >
                  <skill.icon
                    className={`h-4 w-4 ${skill.color} group-hover:scale-110 transition-transform duration-300`}
                  />
                  <span className="text-sm text-neutral-300 group-hover:text-neutral-200 transition-colors duration-300">
                    {skill.name}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Enhanced Social Links */}
            <div className="flex items-center space-x-3">
              {[
                { href: contactInfo.social.github, icon: Github, label: "GitHub", color: "hover:text-gray-400" },
                { href: contactInfo.social.linkedin, icon: Linkedin, label: "LinkedIn", color: "hover:text-blue-400" },
                { href: contactInfo.social.twitter, icon: Twitter, label: "Twitter", color: "hover:text-sky-400" },
                { href: `mailto:${contactInfo.email}`, icon: Mail, label: "Email", color: "hover:text-red-400" },
              ].map(({ href, icon: Icon, label, color }) => (
                <motion.div key={href} whileHover={{ scale: 1.1, y: -2 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    href={href}
                    className={`p-3 text-neutral-400 ${color} transition-all duration-300 rounded-lg bg-primary-800/30 hover:bg-primary-700/50 border border-primary-700/50 hover:border-primary-600/50 group`}
                    target={href.startsWith("mailto:") ? undefined : "_blank"}
                    rel={href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                    aria-label={label}
                  >
                    <Icon className="h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <h3 className="text-lg font-semibold text-neutral-50 mb-6 flex items-center">
              <span className="w-2 h-2 bg-accent-400 rounded-full mr-3"></span>
              Quick Links
            </h3>
            <ul className="space-y-3">
              {navigation.map((item, index) => (
                <motion.li key={item.href} variants={itemVariants} transition={{ delay: index * 0.05 }}>
                  <Link
                    href={item.href}
                    className="text-neutral-400 hover:text-accent-400 transition-all duration-300 flex items-center group"
                  >
                    <span className="group-hover:translate-x-1 transition-transform duration-300">{item.title}</span>
                    <ArrowUpRight className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <h3 className="text-lg font-semibold text-neutral-50 mb-6 flex items-center">
              <span className="w-2 h-2 bg-secondary-400 rounded-full mr-3"></span>
              Contact
            </h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3 text-neutral-400">
                <MapPin className="h-4 w-4 mt-1 text-accent-400" />
                <span className="text-sm">{contactInfo.location}</span>
              </div>
              <div className="flex items-start space-x-3 text-neutral-400">
                <Clock className="h-4 w-4 mt-1 text-secondary-400" />
                <span className="text-sm">{contactInfo.availability}</span>
              </div>
              <Link
                href={`mailto:${contactInfo.email}`}
                className="flex items-center space-x-3 text-accent-400 hover:text-accent-300 transition-colors group"
              >
                <Mail className="h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
                <span className="text-sm">{contactInfo.email}</span>
              </Link>
            </div>
          </motion.div>

          {/* Newsletter Signup */}
          <motion.div variants={itemVariants} className="lg:col-span-3">
            <h3 className="text-lg font-semibold text-neutral-50 mb-6 flex items-center">
              <span className="w-2 h-2 bg-green-400 rounded-full mr-3"></span>
              Stay Updated
            </h3>
            <p className="text-neutral-400 text-sm mb-4">Get notified about new projects, articles, and updates.</p>
            <form onSubmit={handleNewsletterSubmit} className="space-y-3">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 bg-primary-800/50 border border-primary-700/50 rounded-lg text-neutral-50 placeholder-neutral-500 focus:outline-none focus:border-accent-400 focus:ring-1 focus:ring-accent-400 transition-all duration-300"
                  required
                />
              </div>
              <Button type="submit" size="sm" variant="accent" className="w-full group" disabled={isSubscribed}>
                {isSubscribed ? (
                  "Subscribed! ✓"
                ) : (
                  <>
                    Subscribe
                    <Send className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                  </>
                )}
              </Button>
            </form>
          </motion.div>
        </motion.div>

        {/* Enhanced Bottom Section */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="border-t border-primary-800/50 mt-12 pt-8"
        >
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
              <p className="text-neutral-400 text-sm">
                © {currentYear} {siteConfig.name}. All rights reserved.
              </p>
              <div className="flex items-center space-x-4 text-sm text-neutral-500">
                <Link href="/privacy" className="hover:text-neutral-400 transition-colors">
                  Privacy
                </Link>
                <Link href="/terms" className="hover:text-neutral-400 transition-colors">
                  Terms
                </Link>
              </div>
            </div>

            <motion.div className="flex items-center space-x-2 text-neutral-400 text-sm" whileHover={{ scale: 1.05 }}>
              <span>Made with</span>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, repeatDelay: 2 }}
              >
                <Heart className="h-4 w-4 text-red-500 fill-current" />
              </motion.div>
              <span>in Ethiopia</span>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
