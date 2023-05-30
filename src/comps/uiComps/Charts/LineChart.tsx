import { useEffect } from 'react'
import * as am5 from '@amcharts/amcharts5'
import * as am5xy from '@amcharts/amcharts5/xy'
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated'
import am5themes_Responsive from '@amcharts/amcharts5/themes/Responsive'

export type LineChartProps = {
  data: { category: string; value1: number }[]
  ChartName?: string
  unitValue?: string
  LineChartWidth?: number
}

const LineChart = (props: LineChartProps) => {
  const { data, ChartName, unitValue, LineChartWidth } = props
  useEffect(() => {
    const root = am5.Root.new('chartdiv')

    root.setThemes([am5themes_Animated.new(root), am5themes_Responsive.new(root)])

    const chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panY: true,
        layout: root.verticalLayout,
        width: LineChartWidth || am5.percent(100),
        centerX: am5.percent(50),
        x: am5.percent(50),
        centerY: am5.percent(50),
        y: am5.percent(50),
      })
    )

    // Define data

    // Create Y-axis
    const yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererY.new(root, {}),
      })
    )

    // Create X-Axis
    const xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(root, {
        renderer: am5xy.AxisRendererX.new(root, {}),
        categoryField: 'category',
        paddingTop: 20,
      })
    )
    xAxis.data.setAll(data)

    // Create series
    const series = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        name: ChartName,
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: 'value1',
        categoryXField: 'category',
      })
    )
    series.data.setAll(data)

    series.columns.template.setAll({
      tooltipText: '{category}: {value1}' + ' ' + unitValue,
      cursorOverStyle: 'pointer',
    })

    series.appear()
    chart.appear()

    // Add legend
    const legend = chart.children.push(
      am5.Legend.new(root, {
        nameField: 'name',
        fillField: 'color',
        strokeField: 'color',
        centerX: am5.percent(50),
        x: am5.percent(50),
        marginTop: 20,
      })
    )

    legend.data.setAll(chart.series.values)

    // Add cursor
    chart.set('cursor', am5xy.XYCursor.new(root, {}))

    return () => {
      root.dispose()
    }
  }, [])

  return <div id="chartdiv" style={{ width: '100%', height: '500px' }}></div>
}
export default LineChart
