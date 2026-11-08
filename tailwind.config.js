export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: { extend: {
    colors: { green: '#102319', forest: '#172A20', gold: '#C5A16E', beige: '#EDE0CE', cream: '#F6EBDD', ink: '#171713' },
    keyframes: {
      float: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-8px)' } },
      cue: { '0%': { transform: 'scaleY(0)', transformOrigin: 'top' }, '50%': { transform: 'scaleY(1)', transformOrigin: 'top' }, '51%': { transformOrigin: 'bottom' }, '100%': { transform: 'scaleY(0)', transformOrigin: 'bottom' } },
      drift: { '0%': { transform: 'translateY(0)', opacity: '0' }, '15%': { opacity: '.7' }, '100%': { transform: 'translateY(-75vh)', opacity: '0' } },
    },
    animation: { float: 'float 6s ease-in-out infinite', cue: 'cue 2.2s ease-in-out infinite', drift: 'drift 18s linear infinite both' },
    backgroundImage: { 'gold-grad': 'linear-gradient(135deg,#a67c4e 0%,#dcbd89 45%,#b08555 100%)' },
    fontFamily: { serif: ['"Cormorant Garamond"', 'Georgia', 'serif'], sans: ['Jost', 'system-ui', 'sans-serif'] },
  } },
  plugins: [],
}
