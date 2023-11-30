/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [ "./src/**/*.js",
],
  theme: {
    extend: {
      fontFamily: {
        'myfont': ['MyFont', 'cursive'],
        'serif': ['Georgia', 'serif'],
        'sans': ['Arial', 'sans-serif'],
        'monospace': ['Courier New', 'monospace'],
        'display': ['Impact', 'sans-serif'],
        'handwriting': ['Pacifico', 'cursive'],
        'heading': ['Oswald', 'sans-serif'],
        'fancy': ['Dancing Script', 'cursive'],
        'script': ['Lobster', 'cursive'],
        'modern': ['Montserrat', 'sans-serif'],
        'fun': ['Comic Sans MS', 'cursive'],
        'elegant': ['Playfair Display', 'serif'],
        'tech': ['Roboto Mono', 'monospace'],
        'artistic': ['Brush Script MT', 'cursive'],
        'vintage': ['Old Standard TT', 'serif'],
        'minimal': ['Helvetica Neue', 'sans-serif'],
        'bold': ['Bebas Neue', 'sans-serif'],
        'retro': ['Press Start 2P', 'cursive'],
        'futuristic': ['Exo', 'sans-serif'],
        'friendly': ['Quicksand', 'sans-serif'],
        'classic': ['Bodoni Moda', 'serif'],
      },
    },
  },
  plugins: [],
};

