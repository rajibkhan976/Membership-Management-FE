import { SignIn } from '@jg/_core/Authorization'
import axios from 'axios'

const login = (username, password, callback) => {
  var config = {
    method: 'post',
    url: `http://localhost:60248/Account/SecureWebLogIn?userName=${username}&password=${password}&rememberMe=true&returnUrl`,
  }

  axios(config)
    .then(function (response) {
      console.log(response)
      const { data } = response
      if (data.type === 0) {
        SignIn(data.user.LoginId)
        callback({ success: true, user: data.user })
      } else if (data.type === 1) {
        //callback({ success: false, type: 1 })
      }
    })
    .catch(function (error) {
      callback({ success: false, type: 3 })
    })
}
export default login
