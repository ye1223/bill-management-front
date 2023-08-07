<script lang="ts" setup>
import { onBeforeMount, reactive, ref } from 'vue'
import * as echarts from 'echarts'
import { appJsonPost, formGet } from '@/api/request'
import { ElMessage } from 'element-plus'
import { CategoryPie } from '@/ts/interfaces/statistics.interface'

const searchFormData = reactive({
	timeRangeArr: []
})

// 获取默认时间区间
const getDefaultTimeRange = () => {
	formGet<[]>({
		url: '/statistics/getDefaultTimeRange'
	}).then(res => {
		searchFormData.timeRangeArr = [...res.data]
		loadChart()
	})
}
onBeforeMount(() => {
	getDefaultTimeRange()
})

// 图表HTML节点
const chart = ref<HTMLDivElement>()

let echart: echarts.ECharts
const options = {
	title: {
		text: '收入分类统计',
		subtext: '统计口径:指定时间区间内每个分类收入金额占比',
		left: 'center'
	},
	tooltip: {
		trigger: 'item',
		formatter: '{b}占比:{c}%'
	},
	legend: {
		orient: 'vertical',
		left: 'left'
	},
	series: [
		{
			name: '消费收入统计',
			type: 'pie',
			radius: '50%',
			data: [
				{ value: 1048, name: '搜索引擎' },
				{ value: 735, name: '直接访问' },
				{ value: 580, name: '邮件营销' },
				{ value: 484, name: '联盟广告' },
				{ value: 300, name: '视频广告' }
			],
			emphasis: {
				itemStyle: {
					shadowBlur: 10,
					shadowOffsetX: 0,
					shadowColor: 'rgba(0, 0, 0, 0.5)'
				}
			}
		}
	]
}

// 加载图表
const loadChart = () => {
	echart = echarts.init(chart.value)
	// true:表示不进行合并,全部更新，老的删除
	echart.setOption(options, true)
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
		appJsonPost<any, CategoryPie>({
			url: '/statistics/loadCategoryPie',
			data: {
				startDate: searchFormData.timeRangeArr[0],
				endDate: searchFormData.timeRangeArr[1],
				natureId: 1
			}
		})
			.then(res => {
				options.series = [
					{
						name: '收入分类统计',
                        // @ts-ignore
						data: res.data.seriesData
					}
				]
                echart.setOption(options)
			})
			.catch(err => {
                console.log(err)
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
