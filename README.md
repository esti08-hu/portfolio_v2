# Estifanos Ameha - Portfolio

A modern, responsive portfolio website built with React, TypeScript, and Tailwind CSS. Showcasing full-stack development skills, machine learning expertise, and professional projects.

## 🚀 Features

- **Modern Design**: Clean, professional UI with smooth animations
- **Responsive**: Optimized for all devices and screen sizes
- **Performance**: Fast loading with optimized assets and code splitting
- **SEO Optimized**: Meta tags, structured data, and social media cards
- **PWA Ready**: Progressive Web App with offline capabilities
- **Contact Form**: Functional contact form with validation
- **Analytics**: Google Analytics integration
- **Accessibility**: WCAG compliant with proper ARIA labels

## 🛠 Tech Stack

### Frontend

- **React 18** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **React Hook Form** - Form handling
- **Zod** - Schema validation
- **Lucide React** - Icons

### Development

- **Vite** - Build tool
- **ESLint** - Code linting
- **PWA Plugin** - Progressive Web App support

## 📦 Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/portfolio-v2.git
   cd portfolio-v2
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start development server**

   ```bash
   npm run dev
   ```

4. **Build for production**

   ```bash
   npm run build
   ```

## 🎨 Customization

### Personal Information

Update the following files with your information:

1. **`src/components/SEO.tsx`** - Update meta tags and structured data
2. **`src/components/sections/Hero.tsx`** - Update name, title, and description
3. **`src/components/sections/About.tsx`** - Update personal story and skills
4. **`src/components/sections/Projects.tsx`** - Add your real projects
5. **`src/components/sections/Contact.tsx`** - Update contact information

### Styling

- **Colors**: Update color scheme in `tailwind.config.js`
- **Fonts**: Change fonts in `index.html` and `tailwind.config.js`
- **Animations**: Modify animations in `src/styles/globals.css`

### Content

- **Projects**: Replace placeholder projects with your real work
- **Skills**: Update skills and technologies in About section
- **Experience**: Add your actual work experience and achievements
- **Blog**: Add your blog posts or remove the section

## 📁 Project Structure

```

src/
├── components/
│   ├── layout/          # Header, Footer
│   ├── sections/        # Main page sections
│   ├── ui/             # Reusable UI components
│   └── SEO.tsx         # SEO component
├── styles/
│   └── globals.css     # Global styles and animations
├── App.tsx             # Main app component
└── main.tsx           # Entry point
```

## 🚀 Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Configure build settings:
   - Build Command: `npm run build`
   - Output Directory: `dist`
3. Deploy automatically on push to main branch

### Netlify

1. Connect your repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`

### GitHub Pages

1. Add `gh-pages` dependency
2. Update `package.json` scripts
3. Deploy with `npm run deploy`

## 📊 Performance

- **Lighthouse Score**: 95+ across all metrics
- **Core Web Vitals**: Optimized for all metrics
- **Bundle Size**: < 500KB gzipped
- **Loading Time**: < 2 seconds on 3G

## 🔧 Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Lint code
npm run type-check   # TypeScript type checking
```

## 📝 Environment Variables

Create a `.env` file for environment variables:

```env
VITE_GA_TRACKING_ID=your-ga-tracking-id
VITE_CONTACT_EMAIL=estioame@gmail.com
VITE_SITE_URL=https://yourdomain.com
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Lucide React](https://lucide.dev/) for the beautiful icons
- [Framer Motion](https://www.framer.com/motion/) for smooth animations
- [Vite](https://vitejs.dev/) for the fast build tool

## 📞 Contact

- **Email**: [estioame@gmail.com](mailto:estioame@gmail.com)
- **LinkedIn**: [Estifanos Ameha](https://www.linkedin.com/in/estifanosameha/)
- **GitHub**: [@esti08-hu](https://github.com/esti08-hu)

---

Made with ❤️ by [Estifanos Ameha](https://yourdomain.com)
