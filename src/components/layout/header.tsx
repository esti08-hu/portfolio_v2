"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Github, Linkedin, Twitter, ArrowUpRight, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"
import { navigation, siteConfig } from "@/lib/constants"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/layout/theme-toggle"

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrollPercent = scrollTop / docHeight

      setScrolled(scrollTop > 10)
      setScrollProgress(scrollPercent)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const closeMenu = () => setIsOpen(false)

  const menuVariants = {
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        when: "afterChildren",
      },
    },
    open: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  }

  const menuItemVariants = {
    closed: {
      opacity: 0,
      x: -20,
    },
    open: {
      opacity: 1,
      x: 0,
    },
  }

  return (
    <>
      {/* Enhanced Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500 z-[60] origin-left"
        style={{ scaleX: scrollProgress }}
        initial={{ scaleX: 0 }}
      />

      <motion.header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled
            ? "bg-white/90 dark:bg-neutral-950/90 backdrop-blur-xl border-b border-neutral-200/50 dark:border-neutral-800/50 shadow-2xl shadow-neutral-950/10 dark:shadow-neutral-950/20"
            : "bg-transparent",
        )}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Enhanced Logo */}
            <Link href="/" className="flex items-center space-x-3 group">
              <motion.div className="relative" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <div className="w-10 h-10 bg-gradient-to-br from-primary-500 via-primary-600 to-secondary-600 rounded-xl flex items-center justify-center shadow-lg shadow-primary-500/25 group-hover:shadow-primary-500/40 transition-all duration-300">
                  <Sparkles className="text-white h-5 w-5" />
                </div>
                {/* Enhanced glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary-500 to-secondary-600 rounded-xl blur-md opacity-0 group-hover:opacity-30 transition-opacity duration-300 -z-10" />
              </motion.div>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-neutral-900 dark:text-neutral-50 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-300">
                  {siteConfig.name}
                </span>
                <span className="text-xs text-neutral-500 dark:text-neutral-500 group-hover:text-neutral-400 dark:group-hover:text-neutral-400 transition-colors duration-300">
                  Portfolio
                </span>
              </div>
            </Link>

            {/* Enhanced Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1">
              {navigation.map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link
                    href={item.href}
                    className={cn(
                      "relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-lg group",
                      pathname === item.href
                        ? "text-primary-600 dark:text-primary-400"
                        : "text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-neutral-50",
                    )}
                  >
                    <span className="relative z-10">{item.title}</span>
                    {/* Enhanced hover background */}
                    <div className="absolute inset-0 bg-primary-100/50 dark:bg-primary-900/50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    {/* Enhanced active indicator */}
                    {pathname === item.href && (
                      <motion.div
                        className="absolute bottom-0 left-1/2 w-1 h-1 bg-primary-500 rounded-full"
                        layoutId="activeIndicator"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        style={{ x: "-50%" }}
                      />
                    )}
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Enhanced Desktop Actions */}
            <div className="hidden md:flex items-center space-x-3">
              {/* Theme Toggle */}
              <ThemeToggle />

              {/* Enhanced Social Links */}
              <div className="flex items-center space-x-2 mr-4">
                {[
                  { href: siteConfig.links.github, icon: Github, label: "GitHub" },
                  { href: siteConfig.links.linkedin, icon: Linkedin, label: "LinkedIn" },
                  { href: siteConfig.links.twitter, icon: Twitter, label: "Twitter" },
                ].map(({ href, icon: Icon, label }) => (
                  <motion.div key={href} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                    <Link
                      href={href}
                      className="p-2 text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-50 transition-all duration-300 rounded-lg hover:bg-primary-100/50 dark:hover:bg-primary-900/50 group"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                    >
                      <Icon className="h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Enhanced CTA Button */}
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  size="sm"
                  variant="primary"
                  asChild
                  className="group relative overflow-hidden shadow-lg shadow-primary-500/25 hover:shadow-primary-500/40"
                >
                  <Link href="/contact" className="flex items-center space-x-2">
                    <span>Get in Touch</span>
                    <ArrowUpRight className="h-4 w-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                  </Link>
                </Button>
              </motion.div>
            </div>

            {/* Enhanced Mobile Menu Button */}
            <div className="md:hidden flex items-center space-x-2">
              <ThemeToggle />
              <motion.button
                className="p-2 text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-50 transition-colors duration-300 rounded-lg hover:bg-primary-100/50 dark:hover:bg-primary-900/50"
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle menu"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <AnimatePresence mode="wait">
                  {isOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <X className="h-5 w-5" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu className="h-5 w-5" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </div>

          {/* Enhanced Mobile Menu */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                variants={menuVariants}
                initial="closed"
                animate="open"
                exit="closed"
                className="md:hidden overflow-hidden"
              >
                <div className="py-4 space-y-2 border-t border-neutral-200/50 dark:border-neutral-800/50">
                  {navigation.map((item, index) => (
                    <motion.div
                      key={item.href}
                      variants={menuItemVariants}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link
                        href={item.href}
                        onClick={closeMenu}
                        className={cn(
                          "block px-4 py-2 text-sm font-medium transition-colors duration-300 rounded-lg",
                          pathname === item.href
                            ? "text-primary-600 dark:text-primary-400 bg-primary-100/50 dark:bg-primary-900/50"
                            : "text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-neutral-50 hover:bg-neutral-100/50 dark:hover:bg-neutral-800/50",
                        )}
                      >
                        {item.title}
                      </Link>
                    </motion.div>
                  ))}
                  
                  {/* Mobile Social Links */}
                  <div className="flex items-center justify-center space-x-4 pt-4 border-t border-neutral-200/50 dark:border-neutral-800/50">
                    {[
                      { href: siteConfig.links.github, icon: Github, label: "GitHub" },
                      { href: siteConfig.links.linkedin, icon: Linkedin, label: "LinkedIn" },
                      { href: siteConfig.links.twitter, icon: Twitter, label: "Twitter" },
                    ].map(({ href, icon: Icon, label }) => (
                      <motion.div key={href} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                        <Link
                          href={href}
                          className="p-2 text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-50 transition-colors duration-300 rounded-lg hover:bg-primary-100/50 dark:hover:bg-primary-900/50"
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={label}
                        >
                          <Icon className="h-5 w-5" />
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.header>
    </>
  )
}
