import { useEffect } from 'react'
import * as am5 from '@amcharts/amcharts5'
import * as am4charts from '@amcharts/amcharts5'
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated'
import am5themes_Responsive from '@amcharts/amcharts5/themes/Responsive'
import * as am5percent from '@amcharts/amcharts5/percent'

export type PyramidChartProps = {
  data: { value: number; category: string }[]
  PyramidWidth?: number
  color: any
  ChartData?: any
}
const PyramidChart = (props: PyramidChartProps) => {
  const { data, PyramidWidth, color, ChartData } = props
  useEffect(() => {
    const root = am5.Root.new('chartdiv')
    root.setThemes([am5themes_Animated.new(root), am5themes_Responsive.new(root)])
    root._logo?.dispose()
    const chart = root.container.children.push(
      am5percent.SlicedChart.new(root, {
        layout: root.verticalLayout,
        width: PyramidWidth,
        centerX: am5.percent(50),
        x: am5.percent(50),
        centerY: am5.percent(50),
        y: am5.percent(50),
      })
    )

    // Create series
    // https://www.amcharts.com/docs/v5/charts/percent-charts/sliced-chart/#Series

    const series = chart.series.push(
      am5percent.PyramidSeries.new(root, {
        orientation: 'vertical',
        valueField: 'value',
        categoryField: 'category',
        topWidth: am5.percent(80),
        bottomWidth: 50,
        endLocation: 1,
        // bottomRatio: 10,
        // ariaHidden: true,
        // draggable: true,
        // forceHidden: true,
        position: 'relative',
        x: -10,
        y: -10,
        valueIs: 'area',
        height: 329,
      })
    )

    series.labels.template.set('forceHidden', true)
    series.ticks.template.set('forceHidden', true)

    const colorArray = []
    for (let index = 0; index < color.length; index++) {
      colorArray.push(am5.color(color[index]))
    }

    series.get('colors')?.set('colors', colorArray)

    // series.ticks.template.setAll({
    //   location: 0.8,
    // })

    // Set data
    // https://www.amcharts.com/docs/v5/charts/percent-charts/sliced-chart/#Setting_data
    series.data.setAll(data)

    // Play initial series animation
    // https://www.amcharts.com/docs/v5/concepts/animations/#Animation_of_series
    series.appear()

    // Create legend
    //www.amcharts.com/docs/v5/charts/percent-charts/legend-percent-series/
    // const legend = chart.children.push(
    //   am5.Legend.new(root, {
    //     centerX: am5.percent(50),
    //     x: am5.percent(50),
    //     marginTop: 0,
    //     marginBottom: 40,
    //   })
    // )
    // legend.data.setAll(am5.array.copy(series.dataItems))

    // Make stuff animate on load
    // https://www.amcharts.com/docs/v5/concepts/animations/
    chart.appear(1000, 100)

    return () => root.dispose()
  }, [data])
  return <div id="chartdiv" style={{ width: '100%', height: '500px', cursor: 'pointer', position: 'inherit' }}></div>
}

export default PyramidChart
