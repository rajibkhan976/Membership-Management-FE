import { EventWidget } from '@jg/widgets'
import createView from 'jg-view'

export default createView(({ routePath, config, initWidget }) => initWidget(EventWidget, routePath, config))

/*
export  default createView(({routePath, config})=>{
  const events= new EventWidget('events', {})
  const schedule= new SchedulesWidget('schedule', {})
  const rootLayoutNavs= [
     { text: 'Events', to: routePath +  "/"+  events.routePath },
     {text: 'Schedule', to: routePath+ "/"+ schedule.routePath } ]

     return  new RouteWidget(routePath, config,[events,schedule], <RootLayout navItems={rootLayoutNavs} />);
}); */
