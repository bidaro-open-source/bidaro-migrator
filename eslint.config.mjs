import antfu from '@antfu/eslint-config'

export default antfu({
  vue: false,
  typescript: true,
  stylistic: {
    indent: 2,
    quotes: 'single',
  },
  ignores: [
    '.github/**',
    '.hooks/**',
    '.nuxt/**',
    '.vscode/**',
    'src/templates',
  ],
  rules: {
    'antfu/no-top-level-await': 'off',
  },
})
