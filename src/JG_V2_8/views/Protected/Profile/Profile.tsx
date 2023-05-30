import createView from 'jg-view'
import { UserInfoWidget } from '@jg/widgets'

/* export default  createView((setup:any)=> {
    return function(routePath?: string, config?: object){
        return setup(UserInfoWidget,routePath, config)
    }

}) */

export default createView(
  (setup: any) => (routePath?: string, config?: object) => setup(UserInfoWidget, routePath, config)
)

/* export default function(routePath?: string, config?: object){
    console.log('view', view(routePath,config))
    return new UserInfoWidget(routePath, config);
} */
