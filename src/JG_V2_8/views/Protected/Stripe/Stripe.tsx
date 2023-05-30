import { StripeCustomConnectWidget } from '@jg/widgets'

export default function (routePath?: string, config?: object) {
  return new StripeCustomConnectWidget(routePath, config)
}
