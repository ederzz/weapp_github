import * as echarts from '../../echarts/ec-canvas/echarts'

function getOptions(data) {
    if (!data || JSON.stringify(data) === '{}') {
        return {}
    }

    const year = new Date().getFullYear()
    const keys = Object.keys(data)
    const seriesData = []
    keys.forEach(key => {
        const dataByMonth = data[key]
        const internalKeys = Object.keys(dataByMonth)
        internalKeys.forEach(iKey => {
            const month = key < 10 ? `0${key}` : key
            const day = iKey < 10 ? `0${iKey}` : iKey
            seriesData.push([
                `2018-${month}-${day}`,
                dataByMonth[iKey]
            ])
        })
    })

    const options = {
        calendar: {
            top: 20,
            left: 20,
            right: 20,
            cellSize: [7],
            range: '2018',
            itemStyle: {
                borderWidth: 1,
                borderColor: '#fff'
            },
            splitLine: {
                show: false
            },
            dayLabel: {
                fontSize: 6
            },
            monthLabel: {
                fontSize: 10
            },
            yearLabel: {show: false}
        },
        visualMap: {
            type: 'piecewise',
            pieces: [
                {gte: 1, lte: 2, color: '#cce395'},       
                {gte: 3, lte: 4, color: '#8ec77a'},       
                {gte: 5, lte: 6, color: '#4a994a'},       
                {gte: 7, color: '#31602a'},       
                {value: 0, color: '#ecedf1'}
            ],
            show: false
        },
        series: [{
            type: 'heatmap',
            data: seriesData,
            coordinateSystem: 'calendar'
        }]
    }

    return options
}

Component({
    properties: {
        contributions: {
            type: Object,
            value: {},
            observer(val) {
                if (!this.chart && !this.ecComponent) {
                    return null
                }

                if (this.chart) {
                    this.chart.setOption(getOptions(val))
                } else {
                    this.ecComponent.init((canvas, width, height) => {
                        const chart = echarts.init(canvas, null, {
                        width: width,
                        height: height
                        })
                        canvas.setChart(chart)
                    
                        that.chart = chart
                        const options = getOptions(val)
                        chart.setOption(options)
            
                        return chart
                    })
                }
            }
        }
    },
    data: {
        ec: {
            onInit: {} 
        }
    },
    ready() {
        const that = this
        const {
            contributions
        } = this.data
        this.ecComponent = this.selectComponent('#contributions-chart')

        function initChart(canvas, width, height) {
            const chart = echarts.init(canvas, null, {
              width: width,
              height: height
            })
            canvas.setChart(chart)
          
            that.chart = chart
            const options = getOptions(contributions)
            chart.setOption(options)

            return chart
        }

        this.setData({
            ec: {
                onInit: initChart
            }
        })
    },
    methods: {}
})