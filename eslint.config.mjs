import antfu from '@antfu/eslint-config'

export default antfu({
  vue: false,
  typescript: true,
  stylistic: {
    indent: 2,
    quotes: 'single',
  },
  ignores: [
    'src/templates',
  ],
})
