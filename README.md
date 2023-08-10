# Tailwindcss 版本

使用`Flowbite UI`组件库(tailwindcss version)

## tailwind 初始化

```
yarn add tailwindcss postcss autoprefixer --dev
npx tailwindcss init -p //生成tailwind.config.js配置文件
```

```js
//tailwind.config.js
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

```css
/*/src/index.css*/
@tailwind base;
@tailwind components;
@tailwind utilities;
```

> 若要忽略`@tailwind`报错提示：
>
> ```json
> //.vscode/settings.json
> {
>   "css.lint.unknownAtRules": "ignore"
> }
> ```



## 配置 `Flowbite`

```
yarn add flowbite
```

```js
//tailwind.config.js
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('flowbite/plugin')
  ],
}
```

> 😅踩坑了
>
> <font color=red>plugins放在了theme配置之后,这样可以确保theme正常生效</font>

