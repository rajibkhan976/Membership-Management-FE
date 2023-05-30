import Lorem from '@jg/utils/Lorem'
import createView from 'jg-view'
import { createWidget } from 'jg-widget'
import PageComponent from './PageComponent'

const widget = createWidget((context) => {
  const { routePath, config, resolveRoutePath } = context

  const { title } = config as { title: string }
  return {
    // path:routePath,
    element: <PageComponent title={title} />,
    children: [
      {
        path: resolveRoutePath('contact'),
        element: (
          <>
            Contact <Lorem />{' '}
          </>
        ),
      },
    ],
  }
})

export default createView(({ routePath, config, initWidget }) => initWidget(widget, routePath, config))
