import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-primary-950">
      {/* Hero Section */}
      <section className="pt-20 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-neutral-50 mb-6">
              Blog & <span className="gradient-text">Insights</span>
            </h1>
            <p className="text-xl text-neutral-300 leading-relaxed">
              Sharing my thoughts on technology, development practices, and the journey of building digital products.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Coming Soon */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-2xl mx-auto text-center"
          >
            <Card>
              <CardHeader>
                <CardTitle className="text-3xl text-neutral-50 mb-4">
                  Coming Soon! 🚀
                </CardTitle>
                <CardDescription className="text-lg text-neutral-300">
                  I'm working on some exciting blog posts about my development journey, 
                  technical insights, and lessons learned from building projects like Nutri Focus.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-neutral-400">
                  Topics I'm planning to cover:
                </p>
                <ul className="text-left space-y-2 text-neutral-300">
                  <li>• Building Nutri Focus: A Full-Stack ML Journey</li>
                  <li>• Microservices in Action: Real Lessons from Nutri Focus</li>
                  <li>• Why I Love Next.js 15: Routing, Streaming & Productivity</li>
                  <li>• The Future of AI in Healthcare (and How Developers Can Prepare)</li>
                </ul>
                <div className="pt-4">
                  <Button variant="accent" asChild>
                    <Link href="/contact">
                      Get Notified
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
  );
} 