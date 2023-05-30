import WidgetBase from '../classes/widget/WidgetBase'
import { WidgetConstructor } from './WidgetConstructor'

export type InitWidgetFn = <T>(WidgetDfn: WidgetConstructor<T>, routePath: string, config: T) => WidgetBase<T>
