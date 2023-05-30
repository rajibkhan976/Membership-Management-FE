import { useEffect } from 'react'
import * as am5 from '@amcharts/amcharts5'
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated'
import am5themes_Responsive from '@amcharts/amcharts5/themes/Responsive'
import * as am5venn from '@amcharts/amcharts5/venn'

export type VenDiagramProps = {
  VenDiagramData: { name: string; value: number; sets?: string[] }[]
}

const VenDiagram = (props: VenDiagramProps) => {
  const { VenDiagramData } = props
  useEffect(() => {
    const root = am5.Root.new('chartdiv')
    root.setThemes([am5themes_Animated.new(root), am5themes_Responsive.new(root)])

    // Create wrapper container
    const container = root.container.children.push(
      am5.Container.new(root, {
        width: am5.p100,
        height: am5.p100,
        layout: root.verticalLayout,
      })
    )

    // Create venn series
    const chart = container.children.push(
      am5venn.Venn.new(root, {
        categoryField: 'name',
        valueField: 'value',
        intersectionsField: 'sets',
        paddingTop: 40,
        paddingBottom: 40,
        paddingLeft: 40,
        paddingRight: 40,
      })
    )

    // Set data
    chart.data.setAll(VenDiagramData)

    // Set tooltip content
    chart.slices.template.set('tooltipText', '{category}: {value}')

    // Set up hover appearance
    chart.hoverGraphics.setAll({
      strokeDasharray: [3, 3],
      stroke: am5.color(0xffffff),
      strokeWidth: 2,
    })

    chart.appear(3500)

    // Add legend
    const legend = container.children.push(
      am5.Legend.new(root, {
        centerX: am5.p50,
        x: am5.p50,
      })
    )
    legend.data.setAll(chart.dataItems)

    return () => root.dispose()
  }, [])
  return <div id="chartdiv" style={{ width: '100%', height: '500px' }}></div>
}

export default VenDiagram
