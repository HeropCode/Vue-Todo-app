# Vue Todo list app

웹팩(Webpack)을 이용해 개발 환경을 구성합니다.<br>
[Vue CLI](https://cli.vuejs.org/)를 사용하지 않음으로 Vue 기반 프로젝트가 기본적으로 어떻게 동작하는지 이해합니다.

> 각 코드에 주석이 작성되어 있으니, 완성된 코드도 꼭 참고하세요.

# Chapter 1

Vue.js를 사용해 스타일 없이 기본적인 Todo App를 만듭니다.

## npm install

### 의존성 모듈 설치

패키지의 배포 시 포함될 의존성 모듈을 지정합니다.

```bash
$ npm install --save MODULE_NAME
# or
$ npm i MODULE_NAME
```

### 개발용 의존성 모듈 설치

패키지의 개발 시 사용될 의존성 모듈을 지정합니다.(배포 시 포함되지 않습니다)

```bash
$ npm install --save-dev MODULE_NAME
# or
$ npm i -D MODULE_NAME
```

## 한 번에 설치하기

```bash
$ npm i vue @babel/polyfill & npm i -D webpack webpack-cli webpack-dev-server webpack-merge @babel/core @babel/preset-env babel-loader vue-template-compiler vue-loader vue-style-loader css-loader node-sass sass-loader@^7 eslint@^5 babel-eslint eslint-config-standard@^12 eslint-plugin-import eslint-plugin-node eslint-plugin-promise eslint-plugin-standard eslint-plugin-vue html-webpack-plugin copy-webpack-plugin clean-webpack-plugin postcss-loader autoprefixer
```

## Webpack

[webpack](https://github.com/webpack/webpack)은 웹팩(Webpack)의 핵심 패키지이며,<br>
[webpack-cli](https://github.com/webpack/webpack-cli)는 터미널에서 웹팩 명령(Commands)를 실행할 수 있게 해주는 도구입니다.

```bash
$ npm i -D webpack webpack-cli
```

개발용으로 실시간 Reload 서버를 실행하기 위해 [webpack-dev-server](https://github.com/webpack/webpack-dev-server)를 설치합니다.

```bash
$ npm i -D webpack-dev-server
```

[webpack-merge](https://github.com/survivejs/webpack-merge)는 웹팩 Config 객체를 병합(merge)하기 위해 설치합니다.<br>
웹팩을 개발용(`dev`)과 배포용(`build`)으로 구분해 실행할 수 있습니다.

```bash
$ npm i -D webpack-merge
```

`webpack.config.js` 파일을 생성합니다.<br>
자세한 설정 내용은 [완성된 파일(webpack.config.js)](https://github.com/HeropCode/Vue-Todo-app/blob/master/webpack.config.js)을 참고하세요.

## Babel

[바벨(Babel)](https://babeljs.io/)은 ES6 이상의 코드를 ES5 이하 버전으로 변환하기 위해 사용합니다.

- [@babel/core](https://babeljs.io/docs/en/babel-core): 바벨이 실제 동작하는 모듈입니다.
- [@babel/preset-env](https://babeljs.io/docs/en/babel-preset-env): 바벨의 지원 스펙을 지정합니다.
- [babel-loader](https://github.com/babel/babel-loader): 웹팩(Webpack) 지원을 위해 사용합니다.

```bash
$ npm i -D @babel/core @babel/preset-env babel-loader
```

`.babelrc` 파일을 생성하고 다음 옵션을 추가합니다.

```json
{
  "presets": ["@babel/preset-env"]
}
```

구형 및 일부 브라우저에서 지원하지 않는 기능들을 지원할 수 있도록 [@babel/polyfill](https://babeljs.io/docs/en/babel-polyfill)을 의존성 모듈로 설치합니다.(`-D`(`--save-dev`)가 없어야 합니다!)

- `@babel/ployfill`

```bash
$ npm i @babel/polyfill
```

설치 후 `webpack.config.js`에 다음과 같이 설정합니다.

```js
// ...
require('@babel/polyfill')

const config = {
  // ...
  entry: {
    app: [
      '@babel/polyfill',
      path.join(__dirname, 'main.js')
    ]
  }
  // ...
}
```

## Vue

[vue](https://github.com/vuejs/vue)를 설치합니다.(`-D`(`--save-dev`)가 없어야 합니다!)

```bash
$ npm i vue
```

웹팩에서 `.vue` 파일을 해석할 수 있도록 다음 모듈들을 설치합니다.

- [vue-template-compiler](https://www.npmjs.com/package/vue-template-compiler)
- [vue-loader](https://www.npmjs.com/package/vue-loader)
- [vue-style-loader](https://www.npmjs.com/package/vue-style-loader)
- [css-loader](https://www.npmjs.com/package/css-loader)

```bash
$ npm i -D vue-template-compiler vue-loader vue-style-loader css-loader
```

만약 CSS Preprocessor Sass(SCSS)를 사용하려면 다음 모듈을 추가로 설치합니다.<br>
[sass-loader](https://github.com/webpack-contrib/sass-loader)는 8버전의 호환성 모듈(Peer Dependency) 이슈로 7버전을 설치합니다.

- [node-sass](https://github.com/sass/node-sass)
- [sass-loader](https://github.com/webpack-contrib/sass-loader)

```bash
$ npm i -D node-sass sass-loader@^7
```

`.vue` 파일 내에서 다음과 같이 사용할 수 있습니다.

```vue
<style lang="scss"></style>
<!-- or -->
<style lang="sass"></style>
```

## ESLint

'ESLint'는 코드 품질과 코딩 스타일 문제를 식별하기 위한 정적 코드 분석 도구입니다.<br>
[eslint](https://github.com/eslint/eslint)는 6버전의 호환성 모듈(Peer Dependency) 이슈로 5버전을 설치합니다.

```bash
npm i -D eslint@^5 babel-eslint eslint-config-standard@^12 eslint-plugin-import eslint-plugin-node eslint-plugin-promise eslint-plugin-standard eslint-plugin-vue
```

`.eslintrc.js` 파일을 생성하고 다음 옵션을 추가합니다.<br>
코드 규칙을 검사하기 위한 옵션을 제공합니다.

```js
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
    // 'plugin:vue/strongly-recommended',
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
```

`.eslintignore` 파일을 생성하고 다음 내용을 추가합니다.<br>
코드 규칙을 검사할 때 무시할 파일이나 디렉터리를 지정합니다.

```text
node_modules/
dist/
assets/
```

'ESLint' 규칙을 비활성화해야 하는 경우 다음과 같이 작성할 수 있습니다.<br>
자세한 사용법은 [Disabling Rules with Inline Comments](https://eslint.org/docs/user-guide/configuring#disabling-rules-with-inline-comments)에서 확인할 수 있습니다.

```js
// eslint-disable-next-line
if (true) console.log("ESLint");
```

## 기타 설치

최초 실행될 `index.html`을 사용하기 위해 [html-webpack-plugin](https://webpack.js.org/plugins/html-webpack-plugin/)을 설치합니다.

```bash
$ npm i -D html-webpack-plugin
```

파비콘(Favicon)을 배포용으로 복사하기 위해 [copy-webpack-plugin](https://github.com/webpack-contrib/copy-webpack-plugin)을 설치합니다.

```bash
$ npm i -D copy-webpack-plugin
```

[clean-webpack-plugin](https://github.com/johnagan/clean-webpack-plugin)를 사용해 빌드(build)시 발생할 수 있는 충돌을 최소화하기 위해 `output.path`에 설정된 디렉터리 내 기존 모든 파일 삭제합니다.

```bash
$ npm i -D clean-webpack-plugin
```

### Autoprefixer(PostCSS)

CSS에 자동으로 공급 업체 접두사(Vendor prefix)를 적용하기 위해 [autoprefixer](https://github.com/postcss/autoprefixer)를 설치합니다.

```bash
$ npm i -D postcss-loader autoprefixer
```

`postcss.config.js` 파일을 생성하고 다음과 같이 [autoprefixer](https://github.com/postcss/autoprefixer) 모듈을 플러그인으로 지정합니다.

```js
module.exports = {
  plugins: [
    require('autoprefixer')
  ]
}
```

`package.json` 파일에 다음 옵션을 추가해 대상 브라우저를 설정합니다.<br>
설정에 대한 자세한 내용은 [Browserslist](https://github.com/browserslist/browserslist)에서 확인할 수 있습니다.

```json
{
  "browserslist": [
    "last 2 versions",
    "ie >= 10"
  ]
}
```

## package.json

- `npm run dev`: 개발용 서버를 실행합니다.
- `npm run build`: 배포용 파일을 빌드할 수 있습니다.
- `npm run lint`: 코드 규칙을 검사합니다.
- `npm run lint:fix`: 코드 규칙을 검사하고 수정합니다.

```json
{
  "scripts": {
    "dev": "webpack-dev-server --mode development",
    "build": "webpack --mode production",
    "lint": "eslint --ext .js,.vue .",
    "lint:fix": "eslint --fix --ext .js,.vue ."
  }
}
```

## .gitignore

버전 관리 시 필요하지 않은 파일이나 디렉터리를 지정할 수 있습니다.

```shell
# 기본 디렉터리 혹은 파일
.DS_Store
node_modules
/dist

# 로컬 환경변수 파일
.env.local
.env.*.local

# 로그 파일
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# 에디터 디렉터리 혹은 파일들
.idea
.vscode
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?
```

## Modules

개발에 필요한 각 모듈의 간단한 사용법을 정리합니다.

### Lowdb

https://github.com/typicode/lowdb

[JSON](https://ko.wikipedia.org/wiki/JSON) 형식으로 데이터를 저장하는 심플한 DB(데이터베이스)입니다.<br>
사용자 환경의 LocalStorage를 DB로 구성하기 위해 사용합니다.<br>
기본적으로 제공되는 몇 가지 API를 제외하면, 대부분 [Lodash API](https://lodash.com/docs/4.17.15)를 사용할 수 있습니다.

```js
import low from 'lowdb'
import LocalStorage from 'lowdb/adapters/LocalStorage'

const adapter = new LocalStorage(DB_NAME)
const db = low(adapter)
```

```js
// Lodash API를 사용하기 때문에(Lodash chain), A, B, C는 모두 같은 결과를 가집니다.
const A = db.get('todos').value()
const B = _.get(this.db.value(), 'todos')
const C = db.getState().todos // `getState()` is Lowdb API

// Lodash `get` - https://lodash.com/docs/4.17.15#get
// Lodash `value` - https://lodash.com/docs/4.17.15#prototype-value
```

### Crypto random string

https://github.com/sindresorhus/crypto-random-string

`todo` 객체에서 ID로 사용할 고유한 랜덤 문자열을 생성합니다.

```js
import cryptoRandomString from 'crypto-random-string'

cryptoRandomString({ length: 10 })
// E.g. '2cf05d94db'
```

### Lodash

https://lodash.com/

다양한 유틸리티 기능을 제공 하는 자바스크립트 라이브러리입니다.<br>
필요하지 않은 기능을 추후 번들에 포함하지 않기 위해서 다음과 같이 <strong>개별적으로 가져와 사용</strong>합니다.

```js
import _find from 'lodash/find'
import _findIndex from 'lodash/findIndex'
import _assign from 'lodash/assign'
import _cloneDeep from 'lodash/cloneDeep'
import _forEachRight from 'lodash/forEachRight'
```

### Dayjs

https://github.com/iamkun/dayjs

날짜 및 시간을 분석, 유효성 검사, 표시 등의 기능을 제공하는 <strong>경량화</strong>된 자바스크립트 라이브러리입니다.<br>
[Momentjs](https://github.com/moment/moment/)를 사용하는 경우 사용 방법은 매우 쉽습니다.

```js
dayjs().format('YYYY년 MM월 DD일')
```

# Chapter 2

스타일 적용을 적용하고, 그에 따라 일부 구조를 변경합니다.

## 구글 메터리얼 아이콘

```html
<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
```

# Chapter 3

Vue Router를 사용합니다.

# Chapter 4

Vuex를 사용합니다.
