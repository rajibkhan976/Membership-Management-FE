import { useEffect } from 'react'
import * as am5 from '@amcharts/amcharts5'
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated'
import * as am5percent from '@amcharts/amcharts5/percent'
import am5themes_Responsive from '@amcharts/amcharts5/themes/Responsive'

export type DoughnutChartProps = {
  data: { propertyName: string; sales: number }[]
  radius: number
  innerRadius: number
  CircleWidth: number
}
const DoughnutChart = (props: DoughnutChartProps) => {
  const { data, radius, innerRadius, CircleWidth } = props
  useEffect(() => {
    const root = am5.Root.new('chartdiv')

    root.setThemes([am5themes_Animated.new(root), am5themes_Responsive.new(root)])

    const chart = root.container.children.push(
      am5percent.PieChart.new(root, {
        layout: root.verticalLayout,
        radius: am5.percent(radius),
        innerRadius: am5.percent(innerRadius),
        cursorOverStyle: 'pointer',
        width: CircleWidth || am5.percent(100),
        centerX: am5.percent(50),
        x: am5.percent(50),
        centerY: am5.percent(50),
        y: am5.percent(50),
      })
    )

    // Define data

    // Create series
    const series = chart.series.push(
      am5percent.PieSeries.new(root, {
        name: 'Series',
        valueField: 'sales',
        categoryField: 'propertyName',
      })
    )
    series.data.setAll(data)

    series.appear(1000)
    chart.appear(1000, 100)

    // Add legend
    const legend = chart.children.push(
      am5.Legend.new(root, {
        centerX: am5.percent(50),
        x: am5.percent(50),
        layout: root.horizontalLayout,
      })
    )

    legend.data.setAll(series.dataItems)

    return () => root.dispose()
  }, [])

  return <div id="chartdiv" style={{ width: '100%', height: '500px' }}></div>
}

export default DoughnutChart
