import { ComponentMeta, ComponentStory } from '@storybook/react'
import { JSXElementConstructor } from 'react'

type createStoryBookItemArgInternal = {
  title: string
  section: string
  component: React.ComponentType<any>
}
type createStoryBookItemArg = {
  title: string
  section: string
}
const createStoryBookItem = <T extends keyof JSX.IntrinsicElements | JSXElementConstructor<any>>({
  title,
  section,
  component,
}: createStoryBookItemArgInternal) => {
  return {
    title: `${section}/${title}`,
    component: component,
  } as ComponentMeta<T>
}

const create = (component: React.ComponentType<any>, { title, section }: createStoryBookItemArg) => {
  return createStoryBookItem<typeof component>({ title, section, component })
}

const createTpl = <T extends keyof JSX.IntrinsicElements | JSXElementConstructor<any>>(fn: ComponentStory<T>) => {
  return fn
}

export { create as createSBItem, createTpl as createSBTpl }
