import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig(({ mode, command }) => {
	// console.log(mode, command)
	const env = loadEnv(mode, process.cwd())
	// console.log(env, process.cwd()) //项目绝对地址
	const BASE_URL = env.VITE_API_BASE_URL

	return {
		plugins: [vue()],
		// envPrefix:"APP_",//APP_  默认是VITE_为开头名
		resolve: {
			alias: {
				'@': path.resolve(__dirname, './src')
			}
		},
		server: {
			proxy: {
				'/api': {
					// target: 'http://localhost:8090',
					target: BASE_URL,
					// target: 'http://tiu4ep.natappfree.cc/',
					changeOrigin: true,
					rewrite: path => path.replace(/^\/api/, '')
				}
			}
		}
	}
})
