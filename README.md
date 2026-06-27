# Sarvesh — Cyberpunk Portfolio V3

React + Vite · Tailwind · Framer Motion · GSAP + ScrollTrigger · Lenis · React Three Fiber + drei + postprocessing (Bloom/Vignette/Noise)

## 1. Install
```bash
npm install
```
If you hit any peer-dependency error:
```bash
npm install --legacy-peer-deps
```

## 2. Drop in your assets — EXACT paths the code expects

```
src/assets/logo/logo.png
src/assets/logo/favicon.ico

src/assets/avatar/avatar.png              <- transparent, no white background

src/assets/robot/ai-robot.png             <- transparent

src/assets/spaceship/spaceship.png        <- transparent

src/assets/planets/home.png
src/assets/planets/about.png
src/assets/planets/skills.png
src/assets/planets/projects.png
src/assets/planets/experience.png
src/assets/planets/achievements.png
src/assets/planets/contact.png

src/assets/globe/earth.png                <- used as a real Three.js texture

src/assets/textures/galaxy-bg.jpg         <- background ONLY, never behind PNGs
src/assets/textures/nebula.png            <- background ONLY
src/assets/textures/stars.png             (optional — drei Stars are procedural, this is unused unless you wire it in)
src/assets/textures/noise.png             (optional — current build uses postprocessing Noise instead)

src/assets/projects/weather-app.png
src/assets/projects/password-generator.png
src/assets/projects/shopping-cart.png
src/assets/projects/studynotion.png
src/assets/projects/netflix-clone.png
src/assets/projects/ai-chatbot.png

src/assets/resume/resume.pdf
```

**On "removing backgrounds":** this still has to be done once, outside the code, with
remove.bg / Photoshop / GIMP, exporting transparent PNGs for avatar / robot / spaceship /
planets / earth / logo. The app already treats `galaxy-bg.jpg` / `nebula.png` as a pure
backdrop — nothing else ever renders a background behind your transparent assets.

Missing assets fail gracefully (the `onError` handlers hide broken images) so the site
still runs while you add files incrementally.

## 3. Run
```bash
npm run dev
```

## 4. Build
```bash
npm run build
```

---

## What's implemented (maps to your Documents 1–30)

- **7-layer-style background**: galaxy + nebula planes, drei `Stars`, `Sparkles` particles,
  shooting stars, mouse parallax, Bloom/Vignette/Noise postprocessing — one single Canvas
  (Document 15 rule: never multiple canvases).
- **Navbar**: glass, shrink-on-scroll, GSAP-staggered link entrance, active underline,
  theme toggle, mobile glass drawer.
- **Left Planet Navigation**: your real PNGs (no CSS planets), numbered labels, active glow
  ring, animated energy line, collapses to a **bottom dock** on mobile.
- **Hero**: 3-column desktop / stacked-with-avatar-first mobile layout, gradient name,
  animated counters, magnetic/ripple/shine buttons, hexagon hologram platform, orbit rings
  (count scales 1→3 by device tier), energy beam, decorative planets, floating spaceship,
  full dashboard (Location/Status/TechStack/AI Assistant) all built on one shared `GlassCard`.
- **AI Assistant**: working chat, quick-reply buttons, typing-dots indicator, robot avatar.
- **About**: avatar card + education/CGPA/animated counters.
- **Skills Galaxy**: orbiting react-icons around your `skills.png` planet — auto-swaps to a
  lightweight horizontal carousel on mobile (Document 7 #14: orbit is expensive, carousel isn't).
- **Projects**: tilt-on-hover (desktop only), image zoom, scan-line sweep, status chip,
  GitHub/Live buttons, staggered reveal.
- **Experience**: glowing animated timeline with pulsing dots.
- **Achievements**: constellation layout with connecting lines.
- **Contact**: real 3D globe (your `earth.png` as an actual Three.js texture) + glass form.
- **Footer, Loader ("INITIALIZING UNIVERSE..."), custom two-layer Cursor, top Scroll
  Progress bar** — all built.
- **Performance system** (`usePerformanceTier.js`) — implements your Document 7 tables
  exactly: particles (200/150/80/35), stars (1200/900/600/300), bloom
  (high/medium/low/off), blur, orbit-ring count, lights, and disables cursor / tilt /
  parallax / magnetic-hover on touch devices and under `prefers-reduced-motion`. This is
  the single source of truth — sections just read `perf.*` instead of hardcoding numbers.
- **GSAP**: registered `ScrollTrigger`, master fade-up-blur reveal per section (`once: true`
  so it doesn't re-fire and tax the main thread on scroll-back).
- **Lenis**: smooth scroll on desktop, native scroll on touch (battery, per Document 7 #31).
- **Fonts**: Orbitron (name/logo/numbers), Poppins (body), Space Grotesk (buttons/nav/labels).
- **Accessibility**: focus-visible rings, `prefers-reduced-motion` support, alt text on
  all images.

## Deliberately NOT built (would multiply scope without a clear spec)

Your docs (9–13, 19, 30) list a long "stretch" wishlist beyond the core site:
- Sound design / ambient toggle
- Cyber command palette (Ctrl+K)
- AI terminal mode / voice assistant
- Live GitHub/LeetCode stats widgets, live weather widget, world clock
- PWA manifest / offline support
- Multi-language switcher
- Admin CMS panel
- Easter eggs (Konami code, etc.)

These are genuinely separate sub-projects each. The architecture here (small components,
shared `GlassCard`/`GlassButton`, central `perf` object, data files) is built so you can
drop any of these in later without restructuring anything.

## Editing content
Almost everything text-based lives in `src/data/*.js` — edit those files, not the
components, when you want to change projects, skills, experience, achievements, or social
links.

## File map
```
src/
├── assets/                 <- your images/textures (see paths above)
├── components/
│   ├── navbar/Navbar.jsx
│   ├── planetNavigation/PlanetNavigation.jsx
│   ├── hero/{Hero,HeroLeft,HeroCenter,HeroRight}.jsx
│   ├── cards/{GlassCard,LocationCard,StatusCard,TechStackCard,AIAssistantCard}.jsx
│   ├── about/About.jsx
│   ├── skills/SkillsGalaxy.jsx
│   ├── projects/{Projects,ProjectCard}.jsx
│   ├── experience/Experience.jsx
│   ├── achievements/Achievements.jsx
│   ├── contact/{Contact,EarthGlobe}.jsx
│   ├── footer/Footer.jsx
│   ├── loader/Loader.jsx
│   ├── cursor/Cursor.jsx
│   ├── common/{SectionTitle,GlassButton,ScrollProgress}.jsx
│   └── three/Scene.jsx
├── data/{projects,skills,experience,achievements,social}.js
├── hooks/{useLenis,useWindowSize,usePerformanceTier,useMouse,useScrollSpy}.js
├── App.jsx
└── main.jsx
```
