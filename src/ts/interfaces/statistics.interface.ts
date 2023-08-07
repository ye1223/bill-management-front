export interface TimeRange {
	startTime: ''
	endTime: ''
}
// BillTrend 返回数据
export interface BillTrend {
	legendData: string[]
	xAxisData: string[]
	series: {
		name: string
		data: number[]
		type: string
		smooth: boolean
	}[]
}
// CostRank 返回数据
export interface RankData {
	seriesData: number[]
	xAxisData: string[]
}
