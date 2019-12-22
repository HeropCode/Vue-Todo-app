module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint',
    ecmaVersion: 2015, // same as 6
    sourceType: 'module'
  },
  // 사전에 정의된 전역 변수 설정
  env: {
    browser: true,
    node: true
  },
  // 사용 가능한 규칙 세트 확장
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
    // 다음과 같은 예외 규칙을 추가할 수 있습니다
    'no-new': 0,
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
