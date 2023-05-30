import { useEffect } from 'react'
import * as am5 from '@amcharts/amcharts5'
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated'
import am5themes_Responsive from '@amcharts/amcharts5/themes/Responsive'
import * as am5xy from '@amcharts/amcharts5/xy'

export type BarChartProps = {
  Bardata: { propertyName: string; value: number }[]
  unitValue?: string
  ChartName?: string
  BarChartWidth?: number
}
const BarChart = (props: BarChartProps) => {
  const { Bardata, unitValue, ChartName, BarChartWidth } = props
  useEffect(() => {
    const root = am5.Root.new('chartdiv')
    root.setThemes([am5themes_Animated.new(root), am5themes_Responsive.new(root)])

    const chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: false,
        panY: false,
        wheelX: 'none',
        wheelY: 'none',
        width: BarChartWidth || am5.percent(100),
        centerX: am5.percent(50),
        x: am5.percent(50),
        centerY: am5.percent(50),
        y: am5.percent(50),
      })
    )

    // Create axes
    // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
    const yRenderer = am5xy.AxisRendererY.new(root, { minGridDistance: 30 })
    yRenderer.grid.template.set('location', 1)

    const yAxis = chart.yAxes.push(
      am5xy.CategoryAxis.new(root, {
        maxDeviation: 0,
        categoryField: 'propertyName',
        renderer: yRenderer,
      })
    )

    const xAxis = chart.xAxes.push(
      am5xy.ValueAxis.new(root, {
        maxDeviation: 0,
        min: 0,
        renderer: am5xy.AxisRendererX.new(root, {
          visible: true,
          strokeOpacity: 0.1,
        }),
      })
    )

    // Create series
    // https://www.amcharts.com/docs/v5/charts/xy-chart/series/

    const series = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        name: ChartName,
        xAxis: xAxis,
        yAxis: yAxis,
        valueXField: 'value',
        sequencedInterpolation: true,
        categoryYField: 'propertyName',
      })
    )

    const columnTemplate = series.columns.template
    columnTemplate.setAll({
      draggable: true,
      cursorOverStyle: 'pointer',
      tooltipText: '{value}' + ' ' + unitValue,
      cornerRadiusBR: 10,
      cornerRadiusTR: 10,
      strokeOpacity: 0,
    })

    columnTemplate.adapters.add('fill', (fill, target) => {
      return chart.get('colors')?.getIndex(series.columns.indexOf(target))
    })

    columnTemplate.adapters.add('stroke', (stroke, target) => {
      return chart.get('colors')?.getIndex(series.columns.indexOf(target))
    })

    columnTemplate.events.on('dragstop', () => {
      sortCategoryAxis()
    })

    // Get series item by category
    function getSeriesItem(category: any) {
      for (let i = 0; i < series.dataItems.length; i++) {
        const dataItem = series.dataItems[i]
        if (dataItem.get('categoryY') == category) {
          return dataItem
        }
      }
    }

    // Axis sorting
    function sortCategoryAxis() {
      // Sort by value
      series.dataItems.sort(function (x: any, y: any) {
        return y.get('graphics').y() - x.get('graphics').y()
      })

      const easing = am5.ease.out(am5.ease.cubic)

      // Go through each axis item
      am5.array.each(yAxis.dataItems, function (dataItem) {
        // get corresponding series item
        const seriesDataItem = getSeriesItem(dataItem.get('category'))

        if (seriesDataItem) {
          // get index of series data item
          const index = series.dataItems.indexOf(seriesDataItem)

          const column: any = seriesDataItem.get('graphics')

          // position after sorting
          const fy = yRenderer.positionToCoordinate(yAxis.indexToPosition(index)) - column.height() / 2

          // set index to be the same as series data item index
          if (index != dataItem.get('index')) {
            dataItem.set('index', index)

            // current position
            const x = column.x()
            const y = column.y()

            column.set('dy', -(fy - y))
            column.set('dx', x)

            column.animate({
              key: 'dy',
              to: 0,
              duration: 600,
              easing: easing,
            })
            column.animate({
              key: 'dx',
              to: 0,
              duration: 600,
              easing: easing,
            })
          } else {
            column.animate({
              key: 'y',
              to: fy,
              duration: 600,
              easing: easing,
            })
            column.animate({
              key: 'x',
              to: 0,
              duration: 600,
              easing: easing,
            })
          }
        }
      })

      // Sort axis items by index.
      // This changes the order instantly, but as dx and dy is set and animated,
      // they keep in the same places and then animate to true positions.
      yAxis.dataItems.sort(function (x: any, y: any) {
        return x.get('index') - y.get('index')
      })
    }

    // Set data
    const data = Bardata

    yAxis.data.setAll(data)
    series.data.setAll(data)

    // Add legend

    // Make stuff animate on load
    // https://www.amcharts.com/docs/v5/concepts/animations/
    // Add legend
    const legend = chart.children.push(
      am5.Legend.new(root, {
        nameField: 'name',
        centerX: am5.percent(50),
        x: am5.percent(50),
        centerY: am5.percent(50),
        y: 490,
      })
    )

    legend.data.setAll(chart.series.values)
    series.appear(1000)
    chart.appear(1000, 100)

    return () => root.dispose()
  }, [])
  return <div id="chartdiv" style={{ width: '100%', height: '500px' }}></div>
}

export default BarChart
