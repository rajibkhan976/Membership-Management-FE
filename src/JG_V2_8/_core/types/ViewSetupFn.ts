import { RouteObject } from 'react-router-dom'
import { ViewSetupContextArgs } from './ViewSetupContextArgs'

export type ViewSetupFn = (viewContext: ViewSetupContextArgs) => RouteObject
