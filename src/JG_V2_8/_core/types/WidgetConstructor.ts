import WidgetBase from '../classes/widget/WidgetBase'

export type WidgetConstructor<T> = {
  new (routePath: string, config: T): WidgetBase<T>
}
