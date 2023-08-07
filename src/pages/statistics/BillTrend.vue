<script lang="ts" setup>
import { appJsonPost, formGet } from '@/api/request'
import { reactive, onBeforeMount, ref } from 'vue'
import * as echarts from 'echarts'
import { ElMessage } from 'element-plus'
import { BillTrend } from '@/ts/interfaces/statistics.interface'
const searchFormData = reactive({
	timeRangeArr: []
})

// 获取默认时间区间
const getDefaultTimeRange = () => {
	formGet<[]>({
		url: '/statistics/getDefaultTimeRange'
	}).then(res => {
		searchFormData.timeRangeArr = [...res.data]
		loadTrend()
	})
}
onBeforeMount(() => {
	getDefaultTimeRange()
})

// 图表HTML节点
const chart = ref<HTMLDivElement>()

let trendChart: echarts.ECharts
const options = {
	title: {
		text: '选定时间区间内的每日账单',
		subtext: '统计口径:按天统计每日的账单',
		padding: [10, 10, 10, 20],
		textStyle: {
			color: '#5FB878'
		},
		subtextStyle: {
			color: '#888'
		}
	},
	tooltip: {
		formatter: '{b}号{a}金额:{c}'
	},
	grid: {
		show: true,
		top: 90 //坐标系距离整个chart顶部90px
	},
	legend: {
		data: ['x商品']
	},
	xAxis: {
		name: '日期',
		type: 'category',
		data: ['2021-12-01', '2021-12-02', '2021-12-03', '2021-12-04']
	},
	yAxis: {
		type: 'value',
		name: '进价',
		axisLine: {
			show: true // 显示y轴坐标轴线
		}
	},
	series: [
		{
			name: 'x商品',
			data: [820, 932, 901, 934, 1290, 1330, 1320],
			type: 'line',
			smooth: true
		}
	]
}

// 加载图表
const loadTrend = () => {
	trendChart = echarts.init(chart.value)
	// true:表示不进行合并,全部更新，老的删除
	trendChart.setOption(options, true)
	updateTrend()
}
// 更新图表
const updateTrend = () => {
	// 如果不是选择日期的话
	if (!searchFormData.timeRangeArr.length) {
		ElMessage.error('请选择日期')
		return
	}
	if (searchFormData.timeRangeArr.length === 2) {
		appJsonPost<any, BillTrend>({
			url: '/statistics/loadBillTrend',
			data: {
				startDate: searchFormData.timeRangeArr[0],
				endDate: searchFormData.timeRangeArr[1]
			}
		})
			.then(res => {
				options.legend.data = res.data.legendData
				options.xAxis.data = res.data.xAxisData
				options.series = res.data.series
				// 设置真实数据
				trendChart.setOption(options, true)
			})
			.catch(err => {
				ElMessage.error(err.msg)
			})
	}
}
</script>

<template>
	<el-row>
		<el-col :span="24">
			<el-form :model="searchFormData" :inline="true" size="small">
				<el-form-item label="选择区间:" label-width="120">
					<el-date-picker
						v-model="searchFormData.timeRangeArr"
						type="daterange"
						range-separator="至"
						start-placeholder="开始日期"
						end-placeholder="结束日期"
						:editable="true"
						prefix-icon="el-icon-date"
						value-format="YYYY-MM-DD"
						:unlink-panels="true"
					>
					</el-date-picker>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="loadTrend()"
						>查询</el-button
					>
				</el-form-item>
			</el-form>
		</el-col>
	</el-row>
	<el-row>
		<el-col :span="24">
			<div style="height: 500px" ref="chart"></div>
		</el-col>
	</el-row>
</template>

<style lang=""></style>
