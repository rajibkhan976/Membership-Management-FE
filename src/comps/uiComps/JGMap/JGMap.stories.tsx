import { ComponentStory, ComponentMeta } from '@storybook/react'
import { data } from 'azure-maps-control'
import JGMap from './JGMap'

const points = Array.from({ length: 100 }).map(() => {
  const randomLongitude = Math.floor(Math.random() * (-80 - -120) + -120)
  const randomLatitude = Math.floor(Math.random() * (30 - 65) + 65)
  return {
    id: '',
    coordinate: new data.Position(randomLongitude, randomLatitude),
    color: Math.random() > 0.5 ? 'red' : 'blue',
  }
})
// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Basic/JGMap',
  component: JGMap,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  // argTypes: { onClick: { action: 'clicked' } },
  // parameters: { actions: { argTypesRegex: '^on.*' } },
} as ComponentMeta<typeof JGMap>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof JGMap> = (args) => <JGMap {...args} />

export const Map = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Map.args = {
  center: [-100, 45],
  zoom: 2,
  filterMarkersInRadius: false,
  boundingCircleRadius: 999999,
  boundingCircleCenter: [-100, 50],
  markers: points,
}

// function onMarkerClicked(e: any) {
//   console.log(e);
// }
