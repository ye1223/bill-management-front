import { createRouter, createWebHashHistory, RouterOptions } from 'vue-router'
import routes from './config'
import { getItem } from '@/util/storage'
import { TOKEN_KEY } from '@/constants'
import * as NProgress from '@/util/nprogress'

// RouterOptions是路由选项类型
const options: RouterOptions = {
	history: createWebHashHistory(),
	routes
}

const router = createRouter(options)

router.beforeEach((to, _, next) => {
	NProgress.start()
	if (['/', '/login'].includes(to.path)) {
		// 当前路由不用拦截
		next()
	} else {
		const token = getItem(TOKEN_KEY)
		if (token) {
			// 无权限指定跳转到哪里
			return next()
		}
		return next({ path: '/' })
	}
})

// 后置路由导航设置页面标题
router.afterEach(to => {
	document.title = to.meta.title
	NProgress.close()
})

export default router
