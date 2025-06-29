# Personal Portfolio - Full-Stack Developer & ML Engineer

A modern, responsive portfolio website built with Next.js 15, TypeScript, and Tailwind CSS. Features a dark theme design system, smooth animations, and showcases full-stack development and machine learning projects.

## 🚀 Features

- **Modern Design**: Dark theme with glassmorphism effects and gradient accents
- **Responsive Layout**: Optimized for all devices and screen sizes
- **Smooth Animations**: Framer Motion animations for enhanced user experience
- **TypeScript**: Full type safety and better developer experience
- **Performance**: Optimized with Next.js 15 App Router and server components
- **SEO Ready**: Meta tags, Open Graph, and structured data
- **Contact Form**: Functional contact form with validation
- **Project Showcase**: Detailed project pages with filtering capabilities

## 🛠 Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS v4, Custom CSS Variables
- **Animations**: Framer Motion
- **Forms**: React Hook Form, Zod validation
- **Icons**: Lucide React
- **Deployment**: Vercel (recommended)

## 📁 Project Structure

```
portfolio/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── about/             # About page
│   │   ├── projects/          # Projects listing
│   │   ├── blog/              # Blog page
│   │   ├── contact/           # Contact page
│   │   ├── globals.css        # Global styles and design system
│   │   ├── layout.tsx         # Root layout
│   │   └── page.tsx           # Homepage
│   ├── components/
│   │   ├── ui/                # Reusable UI components
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── input.tsx
│   │   │   └── textarea.tsx
│   │   ├── layout/            # Layout components
│   │   │   ├── header.tsx
│   │   │   └── footer.tsx
│   │   └── sections/          # Page sections
│   │       └── hero.tsx
│   └── lib/
│       ├── constants.ts       # Site configuration and data
│       ├── utils.ts           # Utility functions
│       └── validations.ts     # Zod validation schemas
```

## 🎨 Design System

The portfolio uses a comprehensive design system with:

- **Color Palette**: Dark theme with primary, secondary, accent, and neutral colors
- **Typography**: Inter for headings, JetBrains Mono for code
- **Spacing**: Consistent spacing scale using CSS custom properties
- **Components**: Reusable UI components with variants and states
- **Animations**: Smooth transitions and micro-interactions

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd portfolio
```

2. Install dependencies:
```bash
pnpm install
```

3. Start the development server:
```bash
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
pnpm build
pnpm start
```

## 📝 Customization

### Personal Information

Update your personal information in `src/lib/constants.ts`:

```typescript
export const siteConfig = {
  name: "Your Name",
  title: "Your Title",
  description: "Your description",
  url: "https://yourdomain.com",
  links: {
    github: "https://github.com/yourusername",
    linkedin: "https://linkedin.com/in/yourusername",
    twitter: "https://twitter.com/yourusername",
    email: "hello@yourdomain.com",
  },
};
```

### Projects

Add your projects to the `projects` array in `src/lib/constants.ts`:

```typescript
export const projects = [
  {
    id: "project-slug",
    title: "Project Title",
    description: "Project description",
    image: "/images/projects/project.png",
    tags: ["Next.js", "TypeScript", "Tailwind"],
    category: "fullstack",
    featured: true,
    liveUrl: "https://project.com",
    githubUrl: "https://github.com/username/project",
    year: 2024,
    // ... other properties
  },
];
```

### Skills

Update your skills in the `skills` object in `src/lib/constants.ts`:

```typescript
export const skills = {
  frontend: [
    { name: "Next.js", icon: "nextjs" },
    { name: "React", icon: "react" },
    // ... more skills
  ],
  // ... other categories
};
```

### Styling

The design system is defined in `src/app/globals.css`. You can customize:

- Colors: Update CSS custom properties in `:root`
- Typography: Modify font variables
- Spacing: Adjust spacing scale
- Animations: Customize transition durations

## 📱 Pages

### Home (`/`)
- Hero section with animated introduction
- Call-to-action buttons
- Social media links

### About (`/about`)
- Personal story and journey
- Skills and technologies
- Core values and principles

### Projects (`/projects`)
- Project grid with filtering
- Project cards with details
- Links to live demos and code

### Blog (`/blog`)
- Coming soon page
- Future blog posts will be added here

### Contact (`/contact`)
- Contact form with validation
- Contact information
- Social media links

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically

### Other Platforms

The portfolio can be deployed to any platform that supports Next.js:

- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Contact

If you have any questions or suggestions, feel free to reach out:

- Email: hello@yourdomain.com
- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [Your Name](https://linkedin.com/in/yourusername)

---

Built with ❤️ using Next.js, TypeScript, and Tailwind CSS
