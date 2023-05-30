import axios from 'axios'
import { getCookie } from '../cookies'
const argObject = [
  {
    Service: 'GDE',
    Method: 'FetchObjects',
    Arguments: [
      'Event',
      {
        Method: 'FeaturedEvents',
      },
    ],
  },
]

const data = JSON.stringify(argObject)
const AxiosTesting = () => {
  let authLoginid = ''
  const loginIdCookie = getCookie('username')
  if (loginIdCookie !== null) authLoginid = loginIdCookie
  const config = {
    method: 'post',
    dataType: 'text',
    url: 'http://localhost:60248/WidgetService.mvc/ExecuteWidgetCommandAlt',
    headers: { 'content-type': 'application/json' },
    data: data,
    transformRequest: [
      function (data: any, headers: any) {
        headers['x-react-header'] = authLoginid
        return 'commands=' + data
      },
    ],
  }
  axios(config)
    .then(function (response) {
      console.log(response.data)
    })
    .catch(function (error) {
      console.log(error)
    })
}
export default AxiosTesting
