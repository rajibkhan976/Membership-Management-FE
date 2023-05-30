import { UserInfoWidget } from '@jg/widgets'

export default function (routePath?: string, config?: object) {
  return new UserInfoWidget(routePath, config)
}
