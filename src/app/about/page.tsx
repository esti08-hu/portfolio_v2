import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardGlass, CardGradient } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { skills } from "@/lib/constants";
import { Sparkles, Code, Palette, Database, Smartphone, Heart, Target, Rocket } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-primary-50/30 to-secondary-50/30 dark:from-neutral-950 dark:via-primary-950/30 dark:to-secondary-950/30">
      {/* Enhanced Hero Section */}
      <section className="pt-20 pb-16 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/10 dark:bg-primary-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary-500/10 dark:bg-secondary-500/20 rounded-full blur-3xl" />
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
              <Sparkles className="h-4 w-4 mr-2" />
              About Me
            </motion.div>

            <h1 className="text-4xl md:text-6xl font-bold text-neutral-900 dark:text-neutral-50 mb-6">
              About <span className="gradient-text">Me</span>
            </h1>
            <p className="text-xl text-neutral-600 dark:text-neutral-300 leading-relaxed">
              I'm a passionate full-stack developer and machine learning engineer based in Ethiopia, 
              dedicated to building intelligent, accessible, and user-focused digital products that improve lives.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Personal Story */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-4xl mx-auto"
          >
            <CardGlass className="mb-12">
              <CardHeader>
                <CardTitle className="text-2xl text-neutral-900 dark:text-neutral-50 flex items-center">
                  <Code className="h-6 w-6 mr-3 text-primary-500" />
                  My Journey
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 text-neutral-600 dark:text-neutral-300 leading-relaxed">
                <p>
                  My journey into technology began with a curiosity about how things work and a desire to solve real-world problems. 
                  Growing up in Ethiopia, I witnessed firsthand how technology could bridge gaps and create opportunities for communities.
                </p>
                <p>
                  I started my programming journey with simple HTML and CSS, gradually moving to JavaScript and then diving deep into 
                  full-stack development. The more I learned, the more I realized the potential of combining traditional software development 
                  with emerging technologies like machine learning.
                </p>
                <p>
                  Today, I specialize in building scalable web applications using modern technologies like Next.js, NestJS, and FastAPI. 
                  I'm particularly passionate about integrating machine learning into web applications to create intelligent, personalized experiences.
                </p>
                <p>
                  When I'm not coding, you'll find me exploring new technologies, contributing to open-source projects, or sharing knowledge 
                  with the developer community. I believe in continuous learning and staying up-to-date with the latest industry trends.
                </p>
              </CardContent>
            </CardGlass>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Skills Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-neutral-50 mb-4">
              Skills & <span className="gradient-text">Technologies</span>
            </h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto">
              I work with a wide range of technologies to build robust and scalable applications.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Object.entries(skills).map(([category, skillList], index) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 * (index + 1) }}
              >
                <CardGradient className="h-full card-hover">
                  <CardHeader>
                    <CardTitle className="text-lg text-neutral-900 dark:text-neutral-50 capitalize flex items-center">
                      {category === 'frontend' && <Code className="h-5 w-5 mr-2 text-primary-500" />}
                      {category === 'backend' && <Database className="h-5 w-5 mr-2 text-secondary-500" />}
                      {category === 'ml' && <Smartphone className="h-5 w-5 mr-2 text-accent-500" />}
                      {category === 'devops' && <Palette className="h-5 w-5 mr-2 text-primary-500" />}
                      {category}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {skillList.map((skill) => (
                        <div
                          key={skill.name}
                          className="flex items-center space-x-3 p-3 rounded-lg bg-white/50 dark:bg-neutral-800/50 hover:bg-white/80 dark:hover:bg-neutral-700/80 transition-all duration-300 border border-white/20 dark:border-neutral-700/50"
                        >
                          <div className="w-8 h-8 bg-primary-500/20 dark:bg-primary-500/30 rounded-lg flex items-center justify-center">
                            <span className="text-primary-600 dark:text-primary-400 text-sm font-medium">
                              {skill.icon.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <span className="text-neutral-700 dark:text-neutral-300 text-sm font-medium">
                            {skill.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </CardGradient>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Values Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-neutral-50 mb-4">
              Core <span className="gradient-text">Values</span>
            </h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto">
              These principles guide my work and help me deliver exceptional results.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Quality First",
                description: "I believe in writing clean, maintainable code and building robust, scalable solutions that stand the test of time.",
                icon: Sparkles,
                color: "text-primary-500"
              },
              {
                title: "User-Centric",
                description: "Every decision I make is driven by user needs and experience. I build products that people love to use.",
                icon: Target,
                color: "text-secondary-500"
              },
              {
                title: "Continuous Learning",
                description: "Technology evolves rapidly, and I'm committed to staying current with the latest tools, frameworks, and best practices.",
                icon: Rocket,
                color: "text-accent-500"
              }
            ].map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 * (index + 1) }}
              >
                <CardGlass className="h-full text-center card-hover">
                  <CardHeader>
                    <div className={`text-4xl mb-4 ${value.color}`}>
                      <value.icon className="h-12 w-12 mx-auto" />
                    </div>
                    <CardTitle className="text-xl text-neutral-900 dark:text-neutral-50">
                      {value.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed">
                      {value.description}
                    </p>
                  </CardContent>
                </CardGlass>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-center"
          >
            <CardGradient className="max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle className="text-2xl text-neutral-900 dark:text-neutral-50">
                  Ready to work together?
                </CardTitle>
                <CardDescription className="text-neutral-600 dark:text-neutral-300">
                  Let's discuss your project and see how I can help bring your ideas to life.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button variant="primary" size="lg" asChild>
                    <a href="/contact">Get in Touch</a>
                  </Button>
                  <Button variant="glass" size="lg" asChild>
                    <a href="/projects">View Projects</a>
                  </Button>
                </div>
              </CardContent>
            </CardGradient>
          </motion.div>
        </div>
      </section>
    </div>
  );
} 