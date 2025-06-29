"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, MapPin, Clock, Github, Linkedin, Twitter } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { contactFormSchema, type ContactFormData } from "@/lib/validations";
import { contactInfo } from "@/lib/constants";

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log("Form data:", data);
    setSubmitSuccess(true);
    setIsSubmitting(false);
    reset();
    
    // Reset success message after 5 seconds
    setTimeout(() => setSubmitSuccess(false), 5000);
  };

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
              Get in <span className="gradient-text">Touch</span>
            </h1>
            <p className="text-xl text-neutral-300 leading-relaxed">
              I'm always interested in new opportunities and exciting projects. 
              Whether you have a question or just want to say hi, I'll try my best to get back to you!
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl text-neutral-50">Send a Message</CardTitle>
                  <CardDescription className="text-neutral-300">
                    Fill out the form below and I'll get back to you as soon as possible.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {submitSuccess && (
                    <div className="mb-6 p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                      <p className="text-green-400 text-sm">
                        Thank you for your message! I'll get back to you soon.
                      </p>
                    </div>
                  )}
                  
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-neutral-300 mb-2">
                          Name
                        </label>
                        <Input
                          id="name"
                          placeholder="Your name"
                          {...register("name")}
                        />
                        {errors.name && (
                          <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>
                        )}
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-neutral-300 mb-2">
                          Email
                        </label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="your.email@example.com"
                          {...register("email")}
                        />
                        {errors.email && (
                          <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>
                        )}
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-neutral-300 mb-2">
                        Subject
                      </label>
                      <Input
                        id="subject"
                        placeholder="What's this about?"
                        {...register("subject")}
                      />
                      {errors.subject && (
                        <p className="text-red-400 text-sm mt-1">{errors.subject.message}</p>
                      )}
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-neutral-300 mb-2">
                        Message
                      </label>
                      <Textarea
                        id="message"
                        placeholder="Tell me about your project or question..."
                        rows={6}
                        {...register("message")}
                      />
                      {errors.message && (
                        <p className="text-red-400 text-sm mt-1">{errors.message.message}</p>
                      )}
                    </div>
                    
                    <Button
                      type="submit"
                      size="lg"
                      variant="accent"
                      disabled={isSubmitting}
                      className="w-full"
                    >
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-8"
            >
              {/* Contact Details */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl text-neutral-50">Contact Information</CardTitle>
                  <CardDescription className="text-neutral-300">
                    Here are the best ways to reach me.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-accent-600/20 rounded-lg flex items-center justify-center">
                      <Mail className="h-6 w-6 text-accent-400" />
                    </div>
                    <div>
                      <p className="text-neutral-50 font-medium">Email</p>
                      <a
                        href={`mailto:${contactInfo.email}`}
                        className="text-accent-400 hover:text-accent-300 transition-colors"
                      >
                        {contactInfo.email}
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-accent-600/20 rounded-lg flex items-center justify-center">
                      <MapPin className="h-6 w-6 text-accent-400" />
                    </div>
                    <div>
                      <p className="text-neutral-50 font-medium">Location</p>
                      <p className="text-neutral-300">{contactInfo.location}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-accent-600/20 rounded-lg flex items-center justify-center">
                      <Clock className="h-6 w-6 text-accent-400" />
                    </div>
                    <div>
                      <p className="text-neutral-50 font-medium">Availability</p>
                      <p className="text-neutral-300">{contactInfo.availability}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Social Links */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl text-neutral-50">Follow Me</CardTitle>
                  <CardDescription className="text-neutral-300">
                    Connect with me on social media and see what I'm working on.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-4">
                    <a
                      href={contactInfo.social.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col items-center p-4 rounded-lg bg-primary-800/50 hover:bg-primary-700/50 transition-colors group"
                    >
                      <Github className="h-8 w-8 text-neutral-400 group-hover:text-neutral-50 transition-colors mb-2" />
                      <span className="text-sm text-neutral-300 group-hover:text-neutral-50 transition-colors">
                        GitHub
                      </span>
                    </a>
                    
                    <a
                      href={contactInfo.social.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col items-center p-4 rounded-lg bg-primary-800/50 hover:bg-primary-700/50 transition-colors group"
                    >
                      <Linkedin className="h-8 w-8 text-neutral-400 group-hover:text-neutral-50 transition-colors mb-2" />
                      <span className="text-sm text-neutral-300 group-hover:text-neutral-50 transition-colors">
                        LinkedIn
                      </span>
                    </a>
                    
                    <a
                      href={contactInfo.social.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col items-center p-4 rounded-lg bg-primary-800/50 hover:bg-primary-700/50 transition-colors group"
                    >
                      <Twitter className="h-8 w-8 text-neutral-400 group-hover:text-neutral-50 transition-colors mb-2" />
                      <span className="text-sm text-neutral-300 group-hover:text-neutral-50 transition-colors">
                        Twitter
                      </span>
                    </a>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Response */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl text-neutral-50">Quick Response</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-neutral-300 leading-relaxed">
                    I typically respond to emails within 24 hours. For urgent matters or quick questions, 
                    feel free to reach out on social media where I'm more active.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
} 