import { JustGoSubscriptionWidget } from '@jg/widgets'

export default function (routePath?: string, config?: object) {
  return new JustGoSubscriptionWidget(routePath, config)
}
