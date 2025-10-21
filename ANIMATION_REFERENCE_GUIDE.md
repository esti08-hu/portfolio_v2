# Animation Reference Guide - Quick Lookup

## 🎯 Animation Classes Quick Reference

### Fade-In Animation
```html
<!-- Basic fade-in -->
<div class="animate-fade-in">Content</div>

<!-- With delay -->
<div class="animate-fade-in delay-100">Content</div>
<div class="animate-fade-in delay-200">Content</div>
<div class="animate-fade-in delay-300">Content</div>
```

**CSS Generated**:
```css
animation: fadeIn 0.8s ease-out forwards;

@keyframes fadeIn {
  0% { opacity: 0; transform: translateY(20px); }
  100% { opacity: 1; transform: translateY(0); }
}
```

---

### Float Animation
```html
<!-- Floating element -->
<div class="animate-float">Content</div>

<!-- With delay for offset -->
<div class="animate-float delay-1000">Content</div>
```

**CSS Generated**:
```css
animation: float 6s ease-in-out infinite;

@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
}
```

---

### Glow Animation
```html
<!-- Glowing element -->
<div class="animate-glow">Content</div>
```

**CSS Generated**:
```css
animation: glow 2s ease-in-out infinite alternate;

@keyframes glow {
  0% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.3); }
  100% { box-shadow: 0 0 40px rgba(59, 130, 246, 0.6); }
}
```

---

### Pulse Animation
```html
<!-- Pulsing element -->
<div class="animate-pulse">Content</div>

<!-- With delay -->
<div class="animate-pulse delay-1000">Content</div>
```

**CSS Generated**:
```css
animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}
```

---

## 🎨 Transition Classes Quick Reference

### Scale Transforms
```html
<!-- Hover scale up -->
<div class="hover:scale-105">Hover me</div>

<!-- Hover scale up (2%) -->
<div class="hover:scale-[1.02]">Hover me</div>

<!-- Active scale down -->
<div class="active:scale-95">Click me</div>
```

### Color Transitions
```html
<!-- Text color on hover -->
<div class="text-white hover:text-blue-400 transition-colors">Hover me</div>

<!-- Background color on hover -->
<div class="bg-slate-700 hover:bg-slate-600 transition-colors">Hover me</div>

<!-- Border color on hover -->
<div class="border-slate-600 hover:border-blue-500 transition-colors">Hover me</div>
```

### Shadow Transitions
```html
<!-- Shadow on hover -->
<div class="shadow-lg hover:shadow-xl transition-shadow">Hover me</div>

<!-- Colored shadow -->
<div class="hover:shadow-blue-500/10 transition-shadow">Hover me</div>
```

### Transform Transitions
```html
<!-- Transform on hover -->
<div class="hover:scale-105 transition-transform">Hover me</div>

<!-- All transitions -->
<div class="hover:scale-105 hover:shadow-xl transition-all">Hover me</div>
```

---

## ⏱️ Duration Classes

```css
duration-75    /* 75ms */
duration-100   /* 100ms */
duration-150   /* 150ms */
duration-200   /* 200ms */
duration-300   /* 300ms */  ← Most common
duration-500   /* 500ms */
duration-700   /* 700ms */
duration-1000  /* 1000ms */
```

---

## 🎯 Easing Functions

```css
ease-linear      /* linear */
ease-in          /* cubic-bezier(0.4, 0, 1, 1) */
ease-out         /* cubic-bezier(0, 0, 0.2, 1) */
ease-in-out      /* cubic-bezier(0.4, 0, 0.2, 1) */
```

---

## 🔄 Delay Classes

```css
delay-75       /* 75ms */
delay-100      /* 100ms */
delay-150      /* 150ms */
delay-200      /* 200ms */
delay-300      /* 300ms */
delay-500      /* 500ms */
delay-700      /* 700ms */
delay-1000     /* 1000ms */
```

**Usage for Staggered Animation**:
```html
<div class="animate-fade-in delay-0">First</div>
<div class="animate-fade-in delay-100">Second</div>
<div class="animate-fade-in delay-200">Third</div>
<div class="animate-fade-in delay-300">Fourth</div>
```

---

## 🎬 Common Animation Patterns

### Pattern 1: Fade In on Load
```jsx
<div className="animate-fade-in">
  Content fades in on page load
</div>
```

### Pattern 2: Staggered List
```jsx
{items.map((item, index) => (
  <div key={item.id} className={`animate-fade-in delay-${index * 100}`}>
    {item.name}
  </div>
))}
```

### Pattern 3: Hover Scale
```jsx
<div className="hover:scale-105 transition-transform duration-300">
  Hover to scale up
</div>
```

### Pattern 4: Hover Color Change
```jsx
<div className="text-white hover:text-blue-400 transition-colors duration-300">
  Hover to change color
</div>
```

### Pattern 5: Hover Shadow
```jsx
<div className="shadow-lg hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300">
  Hover to enhance shadow
</div>
```

### Pattern 6: Group Hover
```jsx
<div className="group">
  <img className="group-hover:scale-105 transition-transform" />
  <h3 className="group-hover:text-blue-400 transition-colors">Title</h3>
</div>
```

### Pattern 7: Focus Ring
```jsx
<input className="focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all" />
```

### Pattern 8: Floating Element
```jsx
<div className="animate-float">
  Floats up and down continuously
</div>
```

---

## 🎨 Glassmorphism Pattern

```jsx
<div className="glass-card">
  {/* Automatically gets: */}
  {/* - backdrop-blur(12px) */}
  {/* - semi-transparent background */}
  {/* - subtle border */}
  {/* - rounded corners */}
</div>
```

**CSS**:
```css
.glass-card {
  background: var(--gradient-card);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
}
```

---

## 🌈 Gradient Pattern

```jsx
<span className="gradient-text">
  Text with gradient fill
</span>
```

**CSS**:
```css
.gradient-text {
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
```

---

## 📱 Responsive Animation

```jsx
<!-- Different animations on different screen sizes -->
<div className="animate-fade-in sm:animate-float lg:animate-glow">
  Animation changes by screen size
</div>
```

---

## ⚡ Performance Tips

### ✅ DO Use
```css
/* Fast properties */
transform: scale(1.05);
transform: translateY(20px);
opacity: 0.5;
```

### ❌ DON'T Use
```css
/* Slow properties */
width: 100px;
height: 100px;
left: 20px;
top: 20px;
```

---

## 🔍 Browser DevTools Tips

### Inspect Animation
1. Right-click element → Inspect
2. Go to Animations tab
3. Hover over element to see animation
4. Slow down animation with playback speed

### Test Performance
1. Open DevTools → Performance tab
2. Record while interacting
3. Look for smooth 60fps (green)
4. Avoid jank (red)

---

## 📊 Animation Timing Guide

| Use Case | Duration | Easing |
|----------|----------|--------|
| Hover effect | 200-300ms | ease-out |
| Page transition | 300-500ms | ease-in-out |
| Loading animation | 1-2s | ease-in-out |
| Continuous animation | 3-6s | ease-in-out |
| Stagger delay | 100-200ms | - |

---

## 🎯 Common Mistakes to Avoid

1. ❌ Animations too slow (>1s for UI)
2. ❌ Animating expensive properties
3. ❌ Too many simultaneous animations
4. ❌ Animations that interfere with UX
5. ❌ Not testing on mobile
6. ❌ Forgetting `transition-all` or specific property
7. ❌ Using `animation` when `transition` is better
8. ❌ Not considering accessibility (prefers-reduced-motion)

---

## ✨ Pro Tips

1. **Stagger animations** for visual interest
2. **Use delays** to create sequences
3. **Combine scale + shadow** for depth
4. **Keep durations consistent** (300ms standard)
5. **Test on real devices** for performance
6. **Use DevTools** to debug animations
7. **Prefer transform** over position changes
8. **Group related animations** with classes

