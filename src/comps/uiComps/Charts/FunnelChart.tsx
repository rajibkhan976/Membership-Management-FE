import { useEffect } from 'react'
import * as am5 from '@amcharts/amcharts5'
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated'
import am5themes_Responsive from '@amcharts/amcharts5/themes/Responsive'
import * as am5percent from '@amcharts/amcharts5/percent'

export type FunnelProps = {
  FunnelData: { value: number; category: string }[]
  FunnelWidth?: number
}
const FunnelChart = (props: FunnelProps) => {
  const { FunnelData, FunnelWidth } = props
  useEffect(() => {
    const root = am5.Root.new('chartdiv')
    root.setThemes([am5themes_Animated.new(root), am5themes_Responsive.new(root)])

    const chart = root.container.children.push(
      am5percent.SlicedChart.new(root, {
        layout: root.verticalLayout,
      })
    )

    // Create series
    // https://www.amcharts.com/docs/v5/charts/percent-charts/sliced-chart/#Series
    const series = chart.series.push(
      am5percent.FunnelSeries.new(root, {
        alignLabels: true,
        orientation: 'vertical',
        valueField: 'value',
        categoryField: 'category',
        cursorOverStyle: 'pointer',
        width: FunnelWidth || am5.percent(100),
        centerX: am5.percent(50),
        x: am5.percent(50),
        bottomRatio: 1,

        // maxHeight: 1000,
      })
    )

    // series.links.template.setAll({
    //   height: 0,
    // })
    // Set data
    // https://www.amcharts.com/docs/v5/charts/percent-charts/sliced-chart/#Setting_data
    series.data.setAll(FunnelData)

    // Play initial series animation
    // https://www.amcharts.com/docs/v5/concepts/animations/#Animation_of_series
    series.appear()

    // Create legend
    // https://www.amcharts.com/docs/v5/charts/percent-charts/legend-percent-series/
    const legend = chart.children.push(
      am5.Legend.new(root, {
        centerX: am5.p50,
        x: am5.p50,
        marginTop: 15,
        marginBottom: 15,
      })
    )

    legend.data.setAll(series.dataItems)
    // legend.data.setAll(chart.series.values)

    // Make stuff animate on load
    // https://www.amcharts.com/docs/v5/concepts/animations/
    chart.appear(1000, 100)

    return () => {
      root.dispose()
    }
  }, [])
  return <div id="chartdiv" style={{ width: '100%', height: '500px' }}></div>
}

export default FunnelChart
