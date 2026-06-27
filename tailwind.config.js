/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    screens: {
      xs: '375px',
      sm: '425px',
      tablet: '768px',
      laptop: '1024px',
      desktop: '1280px',
      xl: '1536px',
      '2k': '1920px',
    },
    extend: {
      colors: {
        cyan: { DEFAULT: '#22D3EE', hover: '#06B6D4' },
        blue: { DEFAULT: '#3B82F6', glow: '#60A5FA' },
        purple: { DEFAULT: '#8B5CF6' },
        space: '#020617',
        success: '#22C55E',
        warning: '#F97316',
        danger: '#EF4444',
        slate: { para: '#CBD5E1', muted: '#64748B' },
      },
      fontFamily: {
        orbitron: ['Orbitron', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
        grotesk: ['"Space Grotesk"', 'sans-serif'],
      },
      borderRadius: {
        sm: '12px', md: '20px', card: '28px', popup: '32px', hero: '40px', pill: '999px',
      },
      boxShadow: {
        soft: '0 0 20px rgba(34,211,238,.12)',
        medium: '0 0 40px rgba(34,211,238,.18)',
        large: '0 0 60px rgba(59,130,246,.25)',
        ultra: '0 0 80px rgba(139,92,246,.3)',
        glowCyan: '0 0 40px rgba(34,211,238,.25)',
        glowBlue: '0 0 40px rgba(59,130,246,.3)',
        glowPurple: '0 0 40px rgba(139,92,246,.3)',
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        floatSlow: 'float 9s ease-in-out infinite',
        pulseGlow: 'pulseGlow 3s ease-in-out infinite',
        spinSlow: 'spin 20s linear infinite',
        spinSlower: 'spin 30s linear infinite',
      },
      keyframes: {
        float: {
          '0%,100%': { transform: 'translateY(0px) rotate(-2deg)' },
          '50%': { transform: 'translateY(-14px) rotate(2deg)' },
        },
        pulseGlow: {
          '0%,100%': { opacity: 0.6, filter: 'drop-shadow(0 0 6px #22D3EE)' },
          '50%': { opacity: 1, filter: 'drop-shadow(0 0 18px #22D3EE)' },
        },
      },
    },
  },
  plugins: [],
}
