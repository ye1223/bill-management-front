import { onBeforeMount, reactive, ref } from 'vue'
// import echarts, { type ECOption } from '@/util/echarts'
import * as echarts from 'echarts'
import { appJsonPost, formGet } from '@/api/request'
import { ElMessage } from 'element-plus'


const useChart = (name: string, el: HTMLDivElement, options: any) => {
    console.log(1111111)
	const searchFormData = reactive({
		timeRangeArr: []
	})

	let postData: any
	switch (name) {
		case 'DailyBill':
			postData = {
				startDate: searchFormData.timeRangeArr[0],
				endDate: searchFormData.timeRangeArr[1]
			}
			break
		case 'ConsumeRank':
			postData = {
				startDate: searchFormData.timeRangeArr[0],
				endDate: searchFormData.timeRangeArr[1]
			}
			break
		case 'IncomeCategory':
			postData = {
                'startDate': searchFormData.timeRangeArr[0],
                'endDate': searchFormData.timeRangeArr[1],
                'natureId':1
              }
			break
		case 'ConsumeCategory':
			postData = {
				startDate: searchFormData.timeRangeArr[0],
				endDate: searchFormData.timeRangeArr[1],
				natureId: 2
			}
			break
        default: 
            throw new Error('postdata错误')
	}
	let echart: echarts.ECharts

	onBeforeMount(() => {
		// 获取默认的时间区间
		formGet<[]>({
			url: '/statistics/getDefaultTimeRange'
		}).then(res => {
			searchFormData.timeRangeArr = [...res.data]
			loadChart()
		})
	})
	const loadChart = () => {
		echart = echarts.init(el)
		echart.setOption(options)
		updateChart()
	}

	const updateChart = () => {
		// 如果不是选择日期的话
		if (!searchFormData.timeRangeArr.length) {
			ElMessage.error('请选择日期')
			return
		}
		if (searchFormData.timeRangeArr.length === 2) {
			console.log(searchFormData.timeRangeArr[0])
			appJsonPost({
				url: '/statistics/loadBillTrend',
				data: postData
			})
		}
	}
	return {
		searchFormData,
		loadChart
	}
}

export default useChart
