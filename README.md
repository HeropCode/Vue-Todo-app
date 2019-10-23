# Vue Todo app

Vue 프로젝트를 진행하기 전에 웹팩(Webpack)을 이용해 개발 환경을 구성합니다.  
Vue CLI를 사용하지 않음으로 Vue 기반 프로젝트가 기본적으로 어떻게 동작하는지 이해합니다.

## 설치

의존성 모듈 설치

```bash
$ npm install --save MODULE_NAME
# or
$ npm i MODULE_NAME
```

개발용 의존성 모듈 설치

```bash
$ npm install --save-dev MODULE_NAME
# or
$ npm i -D MODULE_NAME
```

### Webpack

`webpack`은 웹팩(Webpack)의 핵심 패키지이며,  
`webpack-cli`는 터미널에서 웹팩 명령(Commands)를 실행할 수 있게 해주는 도구입니다. 

```bash
$ npm i -D webpack webpack-cli
```

개발용 실시간 Reload 서버를 실행하기 위해 `webpack-dev-server`를 설치합니다. 

```bash
$ npm i -D webpack-dev-server
```

`webpack-merge`는 웹팩 Config 객체를 병합하기 위해 설치합니다.  
웹팩을 개발용(`serve`)과 배포용(`build`)으로 구분해 실행하기 위해 사용합니다.

```bash
$ npm i -D webpack-merge
```

### Babel

바벨(Babel)은 ES6 이상의 코드를 ES5 이하 버전으로 변환하기 위해 사용합니다.  
`@babel/core`는 바벨이 실제 동작하는 모듈이고,  
`@babel/preset-env`는 바벨의 지원 스펙을 지정합니다.  
`babel-loader`는 웹팩(Webpack) 지원을 위해 사용합니다.

```bash
$ npm i -D @babel/core @babel/preset-env babel-loader
```

`.babelrc` 파일을 생성하고 다음 옵션을 추가합니다.

```json
{
  "presets": ["@babel/preset-env"]
}
```

### Vue

Vue를 설치합니다.  
일반 의존성 모듈로 설치해야 합니다.(`-D`가 없어야 합니다!)

```bash
$ npm i vue
```

웹팩에서 `.vue` 파일을 해석할 수 있도록 다음 모듈들을 설치합니다.

```bash
$ npm i -D vue-template-compiler vue-loader vue-style-loader css-loader
```

만약 CSS Preprocessor Sass(SCSS)를 사용하려면 다음 모듈을 추가로 설치합니다.
8버전의 'Peer Dependency' 이슈로 때문에 7버전으로 설치합니다.

```bash
$ npm i -D node-sass sass-loader@^7
```

`.vue` 파일 내에서 다음과 같이 사용할 수 있습니다.

```vue
<style lang="scss"></style>
```

### ESLint

```bash
npm i -D eslint@^5 babel-eslint eslint-config-standard@^12 eslint-plugin-import eslint-plugin-node eslint-plugin-promise eslint-plugin-standard eslint-plugin-vue
```

`.eslintrc.js` 파일을 생성하고 다음 옵션을 추가합니다.  
코드 규칙을 검사하기 위한 옵션을 제공합니다.

```js
module.exports = {
  root: true,
  parserOptions: {
    parser: "babel-eslint",
    ecmaVersion: 2015,
    sourceType: 'module'
  },
  env: {
    browser: true,
    node: true
  },
  extends: [
    'standard',
    "plugin:vue/recommended"
  ],
  plugins: [
    "vue"
  ]
}
```

`.eslintignore` 파일을 생성하고 다음 내용을 추가합니다.  
코드 규칙을 검사할 때 무시할 파일이나 디렉터리를 지정합니다.

```text
node_modules/
dist/
assets/
```

### 기타

`index.html`을 사용하기 위해 `html-webpack-plugin`을 설치합니다.

```bash
$ npm i -D html-webpack-plugin
```

파비콘(Favicon)을 사용하기 위해 `copy-webpack-plugin`을 설치합니다.

```bash
$ npm i -D copy-webpack-plugin
```

빌드(build)시 output.path 디렉터리 내 기존 모든 파일 삭제

```bash
$ npm i -D clean-webpack-plugin
```

#### Autoprefixer(PostCSS)

Autoprefixer를 설치하기 위해 다음 모듈들을 설치합니다. 

```bash
$ npm i -D postcss-loader autoprefixer
```

`postcss.config.js` 파일을 생성하고 다음과 같이 `autoprefixer` 모듈을 플러그인으로 지정합니다.

```js
module.exports = {
  plugins: [
    require('autoprefixer')
  ]
};
```

`package.json` 파일에 다음 옵션을 추가해 대상 브라우저를 설정합니다. 

```json
{
  "browserslist": [
    "last 2 versions",
    "ie >= 10"
  ]
}
```

## package.json

- `npm run serve`: 개발용 서버를 실행합니다  
- `npm run build`: 배포용 파일을 빌드할 수 있습니다  
- `npm run lint`: 코드 규칙을 검사합니다
- `npm run lint:fix`: 코드 규칙을 검사하고 수정합니다

```json
{
  "scripts": {
    "serve": "webpack-dev-server --mode development",
    "build": "webpack --mode production",
    "lint": "eslint --ext .js,.vue .",
    "lint:fix": "eslint --fix --ext .js,.vue ."
  }
}
```