import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export const newsletterSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

export const projectFilterSchema = z.object({
  category: z.enum(["all", "fullstack", "frontend", "backend", "ml"]).optional(),
  year: z.number().min(2020).max(2024).optional(),
  search: z.string().optional(),
});

export const blogPostSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  content: z.string().min(50, "Content must be at least 50 characters"),
  tags: z.array(z.string()).min(1, "At least one tag is required"),
  featured: z.boolean().optional(),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
export type NewsletterData = z.infer<typeof newsletterSchema>;
export type ProjectFilterData = z.infer<typeof projectFilterSchema>;
export type BlogPostData = z.infer<typeof blogPostSchema>; 