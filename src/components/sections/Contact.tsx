import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Mail, MapPin, Phone, Send, Github, Linkedin, MessageSquare } from 'lucide-react';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import toast from 'react-hot-toast';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters')
});

type ContactFormData = z.infer<typeof contactSchema>;

export const Contact: React.FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema)
  });

  const onSubmit = async () => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Here you would typically send the data to your backend
      // Handle form submission
      // console.log('Form submitted:', data);
      
      toast.success('Message sent successfully! I\'ll get back to you soon.');
      reset();
    } catch {
      toast.error('Failed to send message. Please try again.');
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      value: 'estioame@gmail.com',
      href: 'mailto:estioame@gmail.com',
      color: 'text-blue-400'
    },
    {
      icon: MapPin,
      title: 'Location',
      value: 'Adama, Ethiopia',
      href: '#',
      color: 'text-teal-400'
    },
    {
      icon: Phone,
      title: 'Phone',
      value: '+251 (977) 366-352',
      href: 'tel:+251977366352',
      color: 'text-orange-400'
    }
  ];

  const socialLinks = [
    {
      icon: Github,
      href: 'https://github.com/esti08-hu',
      label: 'GitHub',
      color: 'hover:text-white'
    },
    {
      icon: Linkedin,
      href: 'https://linkedin.com/in/estifanosameha/',
      label: 'LinkedIn',
      color: 'hover:text-blue-400'
    }
  ];

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            Let's <span className="gradient-text">Connect</span>
          </h2>
          <p className="text-xl text-neutral-400 max-w-3xl mx-auto">
            Ready to bring your ideas to life? Let's discuss your next project or collaboration opportunity.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <Card variant="glass">
              <h3 className="text-2xl font-semibold text-white mb-6">Get in Touch</h3>
              <div className="space-y-4">
                {contactInfo.map((info, index) => (
                  <a
                    key={index}
                    href={info.href}
                    className="flex items-center space-x-4 p-3 rounded-lg hover:bg-slate-700/30 transition-colors duration-300"
                  >
                    <div className={`w-12 h-12 bg-gradient-to-br from-slate-700/50 to-slate-600/50 rounded-lg flex items-center justify-center`}>
                      <info.icon size={20} className={info.color} />
                    </div>
                    <div>
                      <h4 className="font-medium text-white">{info.title}</h4>
                      <p className="text-neutral-400">{info.value}</p>
                    </div>
                  </a>
                ))}
              </div>
            </Card>

            {/* Social Links */}
            <Card variant="glass">
              <h3 className="text-xl font-semibold text-white mb-4">Follow Me</h3>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-12 h-12 bg-slate-700/50 hover:bg-slate-600/50 rounded-lg transition-colors duration-300 group"
                    aria-label={social.label}
                  >
                    <social.icon size={20} className={`text-neutral-400 group-${social.color} transition-colors duration-300`} />
                  </a>
                ))}
              </div>
            </Card>

            {/* Quick Response */}
            <Card variant="glass">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-lg flex items-center justify-center">
                  <MessageSquare size={20} className="text-green-400" />
                </div>
                <div>
                  <h4 className="font-medium text-white mb-2">Quick Response</h4>
                  <p className="text-neutral-400 text-sm">
                    I typically respond within 24 hours during business days.
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* Contact Form */}
          <Card variant="glass">
            <h3 className="text-2xl font-semibold text-white mb-6">Send Message</h3>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-neutral-300 mb-2">
                  Full Name *
                </label>
                <input
                  {...register('name')}
                  type="text"
                  id="name"
                  className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-neutral-400 transition-colors duration-300"
                  placeholder="Your full name"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-400">{errors.name.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-neutral-300 mb-2">
                  Email Address *
                </label>
                <input
                  {...register('email')}
                  type="email"
                  id="email"
                  className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-neutral-400 transition-colors duration-300"
                  placeholder="email@example.com"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-400">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-neutral-300 mb-2">
                  Subject *
                </label>
                <input
                  {...register('subject')}
                  type="text"
                  id="subject"
                  className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-neutral-400 transition-colors duration-300"
                  placeholder="What's this about?"
                />
                {errors.subject && (
                  <p className="mt-1 text-sm text-red-400">{errors.subject.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-neutral-300 mb-2">
                  Message *
                </label>
                <textarea
                  {...register('message')}
                  id="message"
                  rows={5}
                  className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-neutral-400 transition-colors duration-300 resize-none"
                  placeholder="Tell me about your project or idea..."
                />
                {errors.message && (
                  <p className="mt-1 text-sm text-red-400">{errors.message.message}</p>
                )}
              </div>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                icon={Send}
                iconPosition="right"
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </section>
  );
};