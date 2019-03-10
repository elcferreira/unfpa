module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    // parser: 'babel-eslint'
  },
  extends: [
    'plugin:vue/base'
  ],
  // add your custom rules here
  rules: {
    'no-console': 'off'
  },
  plugins: [
    'vue'
  ]
}
