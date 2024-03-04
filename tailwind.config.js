module.exports = {
  content: ["./*.html"],
  theme: {
    screens: {
      'sm': '430px',
      // => @media (min-width: 430px) { ... }

      'md': '693px',
      // => @media (min-width: 693px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1440px',
      // => @media (min-width: 1440px) { ... }
    },
    fontFamily: {
      sans: ['"Barlow Semi Condensed", sans-serif']
    },
    extend: {
      backgroundImage: {
        'scissors-gradient': 'linear-gradient(to right, hsl(39, 89%, 49%), hsl(40, 84%, 53%))',
        'paper-gradient': 'linear-gradient(to right, hsl(230, 89%, 62%), hsl(230, 89%, 65%))',
        'rock-gradient': 'linear-gradient(to right, hsl(349, 71%, 52%), hsl(349, 70%, 56%))',
        'lizard-gradient': 'linear-gradient(to right, hsl(261, 73%, 60%), hsl(261, 72%, 63%))',
        'radial-gradient': 'linear-gradient(to right, hsl(214, 47%, 23%), hsl(237, 49%, 15%))',
        'cyan-gradient': 'linear-gradient(to right, hsl(189, 59%, 53%), hsl(189, 58%, 57%))',
      },
      colors: {
        'dark': 'hsl(229, 25%, 31%)',
        'score': 'hsl(229, 64%, 46%)',
        'header': 'hsl(217, 16%, 45%)',
      }
    },
  },
  plugins: [],
}
