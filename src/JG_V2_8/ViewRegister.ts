import { IsBlended } from './_core/Authorization'
import AppStore from './store/store'

const { SetAppStartPath } = AppStore.getState()
const { RegisterAreas } = AppStore.getState()
const { RegisterViews } = AppStore.getState()
export default {
  run: () => {
    // eslint-disable-next-line no-prototype-builtins
    SetAppStartPath(IsBlended() ? '/Workbench/r' : '')
    RegisterAreas(['Protected', 'Public'])
    RegisterViews('Public', [
      {
        path: '/',
        name: 'Login',
        config: {},
      },
      {
        path: '/public/EventsAndBookingsPublic/',
        name: 'Events',
        config: { mode: 'events', isPublic: true },
      },
      {
        path: '/public/ShopPublic/',
        name: 'Events',
        title: 'Shops',
        config: { mode: 'shops', isPublic: true },
      },
    ])
    RegisterViews('Protected', [
      { path: '/', name: 'Home', config: { userName: 'Home new Mehedi' } },
      { path: '/DS/', name: 'DesignSystem', config: {} },
      {
        path: '/EventsAndBookings/',
        name: 'Events',
        title: 'Events & Courses',
        config: { mode: 'events' },
      },
      {
        path: '/Shop/',
        name: 'Events',
        title: 'Shops',
        config: { mode: 'shops' },
      },
      {
        path: '/EmailAndCom/',
        name: 'EmailAndCom',
        config: {},
      },
      {
        path: '/ReportAndDashboard/',
        name: 'ReportAndDashboard',
        config: {},
      },
      {
        path: '/Helps/',
        name: 'HelpsAndResources',
        config: {},
      },
      {
        path: '/HelpCentre/',
        name: 'HelpCentre',
        config: {},
      },
      {
        path: '/OnScreenHelp/',
        name: 'OnScreenHelp',
        config: { hideFooter: true },
      },
      {
        path: '/GenericReactPage/',
        name: 'GenericReactPage',
        config: { hideFooter: true },
      },
      {
        path: '/PaymentDashboard/',
        name: 'Stripe',
        config: { onScreenHelpPath: '/' },
      },
      {
        path: '/JustGoSubscription/',
        name: 'JustGoSubscription',
        config: { onScreenHelpPath: '/' },
      },
    ])
  },
}
