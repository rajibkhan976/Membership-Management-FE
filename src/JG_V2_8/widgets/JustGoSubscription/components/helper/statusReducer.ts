type Action = {
  type: string
  payload: string
}

export const initState = (value: string) => {
  return { actionStatus: value }
}

const statusReducer = (state: any, action: Action) => {
  switch (action.type) {
    case 'initiated':
      return { actionStatus: action.payload }

    case 'confirmed':
      return { actionStatus: action.payload }

    case 'canceled':
      return { actionStatus: action.payload }

    case 'pending':
      return { actionStatus: action.payload }

    case 'successful':
      return { actionStatus: action.payload }

    case 'failed':
      return { actionStatus: action.payload }

    default:
      state
  }
}

export default statusReducer
