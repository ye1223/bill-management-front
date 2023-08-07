<script lang="ts" setup>
import { appJsonPost, formGet } from '@/api/request'
import { ref, reactive, onBeforeMount } from 'vue'
import * as echarts from 'echarts'
import { ElMessage } from 'element-plus'
import { RankData } from '@/ts/interfaces/statistics.interface'
// import useChart from '@/hooks/useChart'

const chart = ref()
// onMounted(()=>{
//     console.log(chart.value)
// })
const options = {
	title: {
		text: '选定时间区间内的消费排行榜',
		subtext: '统计口径:每日的消费金额从高到低排序',
		padding: [10, 10, 10, 20],
		textStyle: {
			color: '#5FB878'
		},
		subtextStyle: {
			color: '#888'
		}
	},
	tooltip: {
		// {a}:系列名 {b}:x轴的值  {c}:y轴的值
		formatter: '{b}的消费:{c}'
	},
	grid: {
		show: true,
		top: 90 //坐标系距离整个chart顶部90px
	},
	legend: {
		show: false
	},
	xAxis: {
		name: '商品名',
		data: ['a', 'b']
	},
	yAxis: {
		type: 'value',
		name: '销量',
		axisLine: {
			show: true // 显示y轴坐标轴线
		}
	},
	series: [
		{
			name: 'series-rank',
			type: 'bar',
			data: [1, 2],
			// 设置柱条宽度,避免过少时很宽;过多时重叠
			barMaxWidth: 40
		}
	]
}
//     const { searchFormData, loadChart } = useChart(
//     'ConsumeRank',
// 	chart.value as HTMLDivElement,
// 	options
// )
const searchFormData = reactive({
	timeRangeArr: []
})
onBeforeMount(() => {
	// 获取默认的时间区间
	formGet<[]>({
		url: '/statistics/getDefaultTimeRange'
	}).then(res => {
		searchFormData.timeRangeArr = [...res.data]
		loadChart()
	})
})
let echart: echarts.ECharts
const loadChart = () => {
	echart = echarts.init(chart.value)
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
		appJsonPost<any, RankData>({
			url: '/statistics/loadCostRank',
			data: {
				startDate: searchFormData.timeRangeArr[0],
				endDate: searchFormData.timeRangeArr[1]
			}
		})
			.then(res => {
				options.xAxis.data = res.data.xAxisData
				options.series = [
					{
						name: 'series-rank',
						type: 'bar',
						barMaxWidth: 40,
						data: res.data.seriesData
					}
				]
				echart.setOption(options)
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
					<el-button type="primary" @click="loadChart()"
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
