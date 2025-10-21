# Animation Code Examples & Implementation Guide

## Current Animations in Your Portfolio

### 1. Hero Section Animations

#### Fade-In Text with Delays
```jsx
// Hero.tsx - Staggered fade-in effect
<p className="text-blue-400 text-lg font-medium animate-fade-in">
  Hello, I'm
</p>
<h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white animate-fade-in delay-100">
  <span className="gradient-text">Estifanos Ameha</span>
</h1>
<h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-neutral-200 animate-fade-in delay-200">
  Full-Stack Developer & Machine Learning Enthusiast
</h2>
```

#### Floating Decorative Elements
```jsx
// Hero.tsx - Floating animation
<div className="absolute top-20 right-20 animate-float">
  <div className="w-20 h-20 bg-gradient-to-br from-blue-500/20 to-teal-500/20 rounded-lg backdrop-blur-sm border border-white/10">
    <Github size={32} className="text-blue-400" />
  </div>
</div>
<div className="absolute bottom-20 left-20 animate-float delay-1000">
  <div className="w-16 h-16 bg-gradient-to-br from-teal-500/20 to-orange-500/20 rounded-full backdrop-blur-sm border border-white/10">
    <ExternalLink size={24} className="text-teal-400" />
  </div>
</div>
```

#### Pulsing Background Elements
```jsx
// Hero.tsx - Animated background blobs
<div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
<div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
```

---

### 2. Card Hover Animations

#### Glass Card with Scale & Shadow
```jsx
// Card.tsx - Hover effects
const hoverClasses = hover ? 'hover:transform hover:scale-[1.02] hover:shadow-xl hover:shadow-blue-500/10' : '';

// Usage in Projects section
<Card
  variant="glass"
  className="group cursor-pointer overflow-hidden"
  onClick={() => setSelectedProject(selectedProject === project.id ? null : project.id)}
>
  <img
    src={project.image}
    alt={project.title}
    className="w-full h-48 object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
  />
</Card>
```

#### Button Interactions
```jsx
// Button.tsx - Scale on hover and active
const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95';

// Gradient color shift on hover
const variants = {
  primary: 'bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-500 hover:to-blue-700 text-white shadow-lg hover:shadow-xl focus:ring-blue-500',
  secondary: 'bg-gradient-to-r from-teal-600 to-teal-800 hover:from-teal-500 hover:to-teal-700 text-white shadow-lg hover:shadow-xl focus:ring-teal-500',
};
```

---

### 3. Form Input Animations

#### Focus Ring Effect
```jsx
// Contact.tsx - Input focus animation
<input
  {...register('name')}
  type="text"
  className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-neutral-400 transition-colors duration-300"
  placeholder="Your full name"
/>
```

#### Hover State on Contact Info
```jsx
// Contact.tsx - Hover background change
<a
  href={info.href}
  className="flex items-center space-x-4 p-3 rounded-lg hover:bg-slate-700/30 transition-colors duration-300"
>
  {/* Content */}
</a>
```

---

### 4. Blog & Project Grid Animations

#### Blog Card Hover
```jsx
// Blog.tsx - Scale and color change
<Card
  variant="glass"
  className="group cursor-pointer overflow-hidden hover:transform hover:scale-[1.02] transition-all duration-300"
>
  <img
    src={post.image}
    alt={post.title}
    className="w-full h-48 object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
  />
  <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors mb-3 line-clamp-2">
    {post.title}
  </h3>
</Card>
```

---

### 5. CSS Keyframe Definitions

#### In tailwind.config.js
```javascript
animation: {
  'fade-in': 'fadeIn 0.8s ease-out forwards',
  'float': 'float 6s ease-in-out infinite',
  'glow': 'glow 2s ease-in-out infinite alternate',
},
keyframes: {
  fadeIn: {
    '0%': { opacity: '0', transform: 'translateY(20px)' },
    '100%': { opacity: '1', transform: 'translateY(0)' },
  },
  float: {
    '0%, 100%': { transform: 'translateY(0px)' },
    '50%': { transform: 'translateY(-20px)' },
  },
  glow: {
    '0%': { boxShadow: '0 0 20px rgba(59, 130, 246, 0.3)' },
    '100%': { boxShadow: '0 0 40px rgba(59, 130, 246, 0.6)' },
  },
},
```

#### In globals.css
```css
.animate-float {
  animation: float 6s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
}

.animate-glow {
  animation: glow 2s ease-in-out infinite alternate;
}

@keyframes glow {
  from { box-shadow: 0 0 20px rgba(59, 130, 246, 0.3); }
  to { box-shadow: 0 0 40px rgba(59, 130, 246, 0.6); }
}
```

---

## Animation Timing Classes Used

| Class | Duration | Easing | Effect |
|-------|----------|--------|--------|
| `animate-fade-in` | 0.8s | ease-out | Fade + slide up |
| `animate-float` | 6s | ease-in-out | Vertical float |
| `animate-glow` | 2s | ease-in-out | Box shadow pulse |
| `animate-pulse` | 2s | cubic-bezier | Opacity pulse |
| `transition-all` | 300ms | ease | All properties |
| `transition-transform` | 300ms | ease | Transform only |
| `transition-colors` | 300ms | ease | Color only |
| `delay-100` | +100ms | - | Stagger effect |
| `delay-200` | +200ms | - | Stagger effect |
| `delay-300` | +300ms | - | Stagger effect |
| `delay-1000` | +1000ms | - | Stagger effect |

---

## Transition Utilities Used

```css
/* Duration */
duration-300  /* 300ms */
duration-500  /* 500ms */

/* Easing */
ease-out      /* cubic-bezier(0, 0, 0.2, 1) */
ease-in-out   /* cubic-bezier(0.4, 0, 0.2, 1) */

/* Transform */
hover:scale-105       /* 105% size */
hover:scale-[1.02]    /* 102% size */
active:scale-95       /* 95% size */

/* Shadow */
shadow-lg             /* Large shadow */
hover:shadow-xl       /* Extra large on hover */
shadow-blue-500/10    /* Colored shadow */

/* Colors */
hover:text-blue-400   /* Color change */
hover:bg-slate-700/30 /* Background change */
focus:ring-blue-500   /* Focus ring */
```

---

## Performance Tips

1. **Use `transform` and `opacity`** - Most performant properties
2. **Avoid animating**: width, height, left, right, top, bottom
3. **Use `will-change` sparingly** - Only on elements that animate
4. **Prefer `transition` over `animation`** for simple effects
5. **Use `duration-300`** - Fast enough to feel responsive
6. **Batch animations** - Stagger with delays for visual interest

