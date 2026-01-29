module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#8B5CF6',
        secondary: '#EC4899',
        success: '#10B981',
        danger: '#EF4444',
        warning: '#F59E0B',
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
