import { RouteRecordRaw } from 'vue-router'

//RouterRecordRaw是路由组件对象
const routes: RouteRecordRaw[] = [
	{
		path: '/',
		redirect: '/login'
	},
	{
		path: '/login',
		name: 'Login',
		component: () => import('@/pages/Login.vue'),
		meta: {
			title: '登录'
		}
	},
	{
		path: '/',
		name: 'Main',
		component: () => import('@/pages/Main.vue'),
		children: [
			{
				path: 'bill',
				name: 'BillHome',
				component: () => import('@/pages/bill/BillHome.vue'),
				children: [
					{
						path: 'manage',
						name: 'ManageBill',
						component: () =>
							import('@/pages/bill/ManageBill.vue'),
						meta: {
							title: '账单管理'
						}
					},
					{
						path: 'toAdd',
						name: 'AddBill',
						component: () =>
							import('@/pages/bill/AddBill.vue'),
						meta: {
							title: '新增账单'
						}
					},
					{
						path: 'toUpdate',
						name: 'UpdateBill',
						component: () =>
							import('@/pages/bill/UpdateBill.vue'),
						meta: {
							title: '更新账单'
						}
					}
				]
			},
			{
				path: 'category',
				name: 'CategoryHome',
				component: () =>
					import('@/pages/category/CategoryHome.vue'),
				children: [
					{
						path: 'manage',
						name: 'ManageCategory',
						component: () =>
							import(
								'@/pages/category/ManageCategory.vue'
							),
						meta: {
							title: '账单分类管理'
						}
					}
				]
			},
			{
				path: 'profile',
				name: 'ProfileHome',
				component: () =>
					import('@/pages/profile/ProfileHome.vue'),
				children: [
					{
						path: 'info',
						name: 'ProfileInfo',
						component: () =>
							import(
								'@/pages/profile/ProfileInfo.vue'
							),
						meta: {
							title: '个人信息'
						}
					}
				]
			},
			{
				path: 'statistics',
				name: 'StatisticsHome',
				component: () =>
					import('@/pages/statistics/StatisticsHome.vue'),
				children: [
					{
						path: 'billTrend',
						name: 'BillTrend',
						component: () =>
							import(
								'@/pages/statistics/BillTrend.vue'
							),
						meta: {
							title: '每日账单'
						}
					},
					{
						path: 'costRank',
						name: 'CostRank',
						component: () =>
							import(
								'../pages/statistics/CostRank.vue'
							),
						meta: {
							title: '消费排行榜'
						}
					},
					{
						path: 'categoryInPie',
						name: 'CategoryInPie',
						component: () =>
							import(
								'@/pages/statistics/CategoryCostPie.vue'
							),
						meta: {
							title: '收入分类统计'
						}
					},
					{
						path: 'categoryCostPie',
						name: 'CategoryCostPie',
						component: () =>
							import(
								'@/pages/statistics/CategoryInPie.vue'
							),
						meta: {
							title: '消费分类统计'
						}
					}
				]
			}
		]
	}
]

export default routes
