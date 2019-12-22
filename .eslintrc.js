module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint',
    ecmaVersion: 2015,
    sourceType: 'module'
  },
  env: {
    browser: true,
    node: true
  },
  extends: [
    // https://github.com/standard/eslint-config-standard
    'standard',
    // https://eslint.vuejs.org/rules/
    // 'plugin:vue/base'
    'plugin:vue/essential'
    // 'plugin:vue/strongly-recommended'
    // 'plugin:vue/recommended'
  ],
  plugins: [
    'vue'
  ],
  rules: {
    // 예외 규칙을 추가할 수 있습니다
    'vue/html-self-closing': ['error', {
      'html': {
        'void': 'always',
        'normal': 'always',
        'component': 'always'
      },
      'svg': 'always',
      'math': 'always'
    }]
  }
}
