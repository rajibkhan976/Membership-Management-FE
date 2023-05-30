import { useEffect } from 'react'
import * as am5 from '@amcharts/amcharts5'
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated'
import am5themes_Responsive from '@amcharts/amcharts5/themes/Responsive'
import * as am5xy from '@amcharts/amcharts5/xy'
import { useRecepientCountActivity } from '@jg/widgets/EmailAndCom/store/EmailReportStore'

type SmoothLineChartProps = {
  Data:
    | {
        Date: number
        DeliveryCount?: number
        OpenCount?: number
        ClickCount?: number
        BouncedCount?: number
      }[]
    | null
  hide?: boolean
  Tooltipdata: {
    toolTipName: string
    chartName: 'DeliveryCount' | 'OpenCount' | 'ClickCount' | 'BouncedCount'
  }[]
  color?: any
}
const SmoothLineChart = (props: SmoothLineChartProps) => {
  const { Data, Tooltipdata, color, hide } = props

  useEffect(() => {
    const root = am5.Root.new('chartdiv1')
    root._logo?.dispose()
    root.setThemes([am5themes_Animated.new(root), am5themes_Responsive.new(root)])

    const chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panY: false,
        wheelX: 'panX',
        wheelY: 'zoomX',
        layout: root.verticalLayout,
        maxTooltipDistance: 0,
      })
    )
    chart.set(
      'scrollbarX',
      am5.Scrollbar.new(root, {
        orientation: 'horizontal',
      })
    )

    chart.set(
      'scrollbarY',
      am5.Scrollbar.new(root, {
        orientation: 'vertical',
      })
    )

    // Create Y-axis
    const yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        extraTooltipPrecision: 1,
        renderer: am5xy.AxisRendererY.new(root, {}),
      })
    )

    // Create X-Axis
    const xAxis = chart.xAxes.push(
      am5xy.DateAxis.new(root, {
        baseInterval: { timeUnit: 'hour', count: 1 },
        renderer: am5xy.AxisRendererX.new(root, {
          minGridDistance: 150,
        }),
        startLocation: 0,
        endLocation: 1,
      })
    )

    // xAxis.get('renderer').labels.template.setAll({
    //   fill: root.interfaceColors.get('alternativeText'),
    // })

    // Create series
    function createSeries(name: string, field: string) {
      const series = chart.series.push(
        am5xy.SmoothedXLineSeries.new(root, {
          name: name,
          xAxis: xAxis,
          yAxis: yAxis,
          valueYField: field,
          valueXField: 'Date',
          tooltip: am5.Tooltip.new(root, {}),
          tension: 0.5,
        })
      )
      series.strokes.template.setAll({
        strokeWidth: 2,
        shadowBlur: 10,
        shadowOffsetX: 10,
        shadowOffsetY: 10,
        shadowOpacity: 0.5,
      })

      series.bullets.push(function () {
        return am5.Bullet.new(root, {
          sprite: am5.Circle.new(root, {
            radius: 5,
            fill: series.get('fill'),
            shadowColor: am5.color(0x000000),
            shadowBlur: 10,
            shadowOffsetX: 10,
            shadowOffsetY: 10,
            shadowOpacity: 0.3,
          }),
        })
      })

      const tooltip = series.set('tooltip', am5.Tooltip.new(root, {}))
      tooltip.label.set('text', '{valueY}')

      const colorArray = []
      for (let index = 0; index < color.length; index++) {
        colorArray.push(am5.color(color[index]))
      }

      chart.get('colors')?.set('colors', colorArray)

      series.get('tooltip')?.label.set('text', '[bold]{name}[/]\n{valueX.formatDate()}: {valueY}')
      series.data.setAll(Data ? Data : [])
    }

    Tooltipdata.map((chartData) => createSeries?.(chartData.toolTipName, chartData.chartName))

    // Add cursor

    chart.set(
      'cursor',
      am5xy.XYCursor.new(root, {
        behavior: 'zoomXY',
        xAxis: xAxis,
      })
    )

    xAxis.set(
      'tooltip',
      am5.Tooltip.new(root, {
        themeTags: ['axis'],
      })
    )

    yAxis.set(
      'tooltip',
      am5.Tooltip.new(root, {
        themeTags: ['axis'],
      })
    )

    return () => {
      root.dispose()
    }
  }, [Data])
  return (
    <div>
      {hide === true ? (
        <div id="chartdiv1">Sorry no data found</div>
      ) : (
        <div id="chartdiv1" style={{ width: '100%', height: '500px', cursor: 'pointer' }}></div>
      )}
    </div>
  )
}

export default SmoothLineChart
