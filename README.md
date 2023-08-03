# 记账系统



## 启动

`yarn install`

`yarn dev`

-----





## 项目搭建

`yarn create vite`

> Vue & Typescript

`yarn add vue-router@4`



## 预设置

### 💡设置`src @`路径别名

> 下载node类型声明包(防止引入`path`、`__dirname`失败) `npm install @types/node --save-dev`  

```ts
// vite.config.ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    // 别名
    alias: {
      '@': path.resolve(__dirname, './src'),
    }
  }
})

```

```json
// ts.config.json
"compilerOptions": {
    "baseUrl": ".", // 用于设置解析非相对模块名称的基本目录，相对模块不会受到baseUrl的影响
    "paths": { // 用于设置模块名到基于baseUrl的路径映射
      "@/*": [
        "src/*"
      ]
    },
}
```

### 💡环境变量

<u>项目根目录下创建:</u>

* `.env` 公共的环境变量，任何环境都会读取
* `.env.development` 开发环境读取
* `.env.production` 生产环境读取

<u>`package.json`修改项目启动脚本</u>

```json
"scripts": {
    "serve": "vite",
    "dev": "vite --mode development",  //此时自动读取.env.development环境变量
    "prod": "vite --mode production",
  	//...
}
```

<u>设置环境变量</u>(以`.env.development`文件为例)

```env
# 默认环境变量必须以`VITE_`开头
VITE_NODE_ENV = development
VITE_API_BASE_URL = http://localhost:8090
```

<u>获取环境变量</u>

通过<strong style="color:red;">`import.meta.env.XXX` </strong>获取

> 可以事先在`vite-env.d.ts` 文件中定义`import.meta.env`的接口，以获得**自动补全**和**类型检查**的能力。
>
> ```ts
> /// <reference types="vite/client" />
> 
> // 定义import.meta.env的接口
> interface ImportMetaEnv {
>     readonly VITE_NODE_ENV: string
>     readonly VITE_API_BASE_URL: string
> }
> ```

......