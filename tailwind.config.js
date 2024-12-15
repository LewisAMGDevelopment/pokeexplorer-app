/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors')

module.exports = {
  mode: 'jit',
  content: [
    "./src/**/*.{html,js}",
    "./node_modules/flowbite/**/*.js"
  ],
  safelist: [
    'bg-gray-400',
    'bg-red-500',
    'bg-blue-500',
    'bg-yellow-400',
    'bg-green-500',
    'bg-blue-300',
    'bg-red-700',
    'bg-purple-500',
    'bg-yellow-600',
    'bg-indigo-400',
    'bg-pink-500',
    'bg-green-400',
    'bg-yellow-700',
    'bg-indigo-700',
    'bg-gray-700',
    'bg-gray-500',
    'bg-pink-300',
    'bg-purple-700'
  ],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      slate: colors.slate,
      zinc: colors.zinc,
      neutral: colors.neutral,
      stone: colors.stone,
      red: colors.red,
      orange: colors.orange,
      amber: colors.amber,
      yellow: colors.yellow,
      lime: colors.lime,
      green: colors.green,
      emerald: colors.emerald,
      teal: colors.teal,
      cyan: colors.cyan,
      sky: colors.sky,
      blue: colors.blue,
      indigo: colors.indigo,
      violet: colors.violet,
      purple: colors.purple,
      fuchsia: colors.fuchsia,
      pink: colors.pink,
      rose: colors.rose,
    },
    fontFamily: {
      custom: ['pixelmania', 'sans-serif'],
    },
    extend: {
    },
  },
  plugins: [require('flowbite/plugin')],
}