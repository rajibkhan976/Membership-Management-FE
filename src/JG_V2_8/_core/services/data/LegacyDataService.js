//import jQuery from 'jquery'
import axios from 'axios'
import _ from 'lodash'
import CryptoJS from 'crypto-js'
import { getCookie } from '../cookies'
import { IsBlended } from '@jg/_core/Authorization'

const ServiceUrlBase = (IsBlended() ? '## no need ##' : 'http://localhost:60248/') + 'WidgetService.mvc/'
const CommandUrl = 'ExecuteWidgetCommandAlt'

const scriptTagRegEx = new RegExp('<\\s*script\\s*\\S*>', 'i') // i;
const serviceRegistry = {}
const evalJson = function (s, enc) {
  if (_.isBoolean(s) || _.isObject(s) || _.isArray(s)) return s
  if (enc) {
    s = CryptoJS.enc.Utf8.stringify(CryptoJS.enc.Base64.parse(s))
    s = s.substring(9)
  }
  //let json = `'o = ${s || 'null'};'`
  let json = '' + (s || "'null'") + ';'
  json = json.replace(/"\\?\/Date\((-?[\d]+).*?\)\\?\/"/gi, 'new Date($1)')
  // json = json.replace(/"\\?\/Date\((\d+,\d+,\d+)\)\\?\/"/gi, "new Date($1)");
  json = json.replace(/"(Date\(\d+,\d+,\d+\))"/gi, 'new $1')
  // json = json.replace(/\\?\"(Date\(\d+,\d+,\d+\))\\?\"/, "new $1");
  const o = eval(json)
  return o
}
const prepareArgs = function (parameters) {
  const params = []
  if (parameters === null || parameters === undefined) return params
  for (const j in parameters) {
    params[params.length] = parameters[j]
  }
  return params
}
const createCommands = function (commands, parameters) {
  let id = 1
  const wcommands = []
  for (let i = 0; i < commands.length; i++) {
    const service_method = commands[i].split('/')
    wcommands.push({
      Id: id++,
      Service: service_method[0],
      Method: service_method[1],
      Arguments: parameters && parameters.length > 0 ? prepareArgs(parameters[i]) : [],
    })
  }
  return wcommands
}
const callAjax2 = function (url, data, onsuccess, onerror) {
  //  console.log('callAjax2', url, data, onsuccess, onerror)
  const isAsync = !!onsuccess
  /*  var res = jQuery.ajax({
            type: "POST",
            url: url,
            data: data,
            //dataType: 'text',
            async: isAsync,
            beforeSend: function (xhr) {
                xhr.setRequestHeader("content-type", "application/json");
            },
            success: function (s, url) {

                if (!isAsync)
                    return;
                if (!onsuccess) return;

                if (typeof onsuccess == "function")
                    onsuccess(evalJson(s, url.indexOf('GetServiceInfos') != -1));
                else {
                    onsuccess.fn.call(onsuccess.scope, evalJson(s, url.indexOf('GetServiceInfos') != -1));
                }

            },
            error: function (jqXHR, textStatus, errorThrown) {
                if (!onerror) return;
                if (typeof onerror == "function")
                    onerror.apply(null, [textStatus, errorThrown]);
                else {
                    onerror.fn.apply(onerror.scope || null, [textStatus, errorThrown]);
                }
            }
        }); */

  if (isAsync) return

  // return evalJson(res.responseText,url.indexOf('GetServiceInfos')!=-1);
}
const callAjax = function (url, data, onsuccess, onerror) {
  // const isAsync = !!onsuccess

  const config = {
    method: 'post',
    url: url,
    headers: {
      'content-type': 'application/json',
    },
    data: data.commands,
    transformRequest: [
      function (data, headers) {
        if (!IsBlended()) {
          let authLoginid
          const loginIdCookie = getCookie('username')
          if (loginIdCookie !== null) authLoginid = loginIdCookie
          headers['x-react-header'] = authLoginid
        }
        return 'commands=' + encodeURIComponent(data)
      },
    ],
  }
  axios(config)
    .then(function (response) {
      const result = evalJson(JSON.stringify(response.data), false)
      if (typeof onsuccess === 'function') onsuccess(result)
      else {
        onsuccess.fn.call(onsuccess.scope, result)
      }
    })
    .catch(function ({ code, message }) {
      if (typeof onerror === 'function') onerror.apply(null, [message, code])
      else {
        onerror.fn.apply(onerror.scope || null, [message, code])
      }
    })
  /*const res = jQuery.ajax({
    type: 'POST',
    url,
    data,
    dataType: 'text',
    async: isAsync,
    beforeSend(xhr) {
      xhr.setRequestHeader('content-type', 'application/json')
      xhr.setRequestHeader('x-react-header', authLoginid)
    },
    success(s) {
      if (!isAsync) return
      if (!onsuccess) return
      if (typeof onsuccess === 'function') onsuccess(evalJson(s, false))
      else {
        onsuccess.fn.call(onsuccess.scope, evalJson(s, false))
      }
    },
    error(jqXHR, textStatus, errorThrown) {
      if (!onerror) return
      if (typeof onerror === 'function') onerror.apply(null, [textStatus, errorThrown])
      else {
        onerror.fn.apply(onerror.scope || null, [textStatus, errorThrown])
      }
    },
  })

  if (isAsync) return
  return evalJson(res.responseText, false)*/
}
const formatDate = function (date) {
  return date.toISOString().split('T')[0]
}
// az.ajax = callAjax;
// az.ajax2 = callAjax2;
//  az.evalJson = evalJson;
const encrptJs = function (str) {
  const key = CryptoJS.enc.Utf8.parse('8eda7ac99a6cb78b')
  const iv = CryptoJS.enc.Utf8.parse('9efb63d3f958418d')
  const encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(str), key, {
    keySize: 128 / 8,
    iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  }).toString()
  return encrypted
  // return CryptoJS.AES.encrypt(str, "test").toString();
}
const executeCommand = function (commands, onsuccess, onerror) {
  const toJsonOld = Date.prototype.toJSON
  Date.prototype.toJSON = function () {
    return formatDate(this)
  }
  const str = JSON.stringify(commands)
  // console.log('str', str)
  if (scriptTagRegEx.test(str)) {
    // console.log('str', str)
    alert('Invalid Data,Command failed')
    return
  }

  const strCmds = encrptJs(str)
  // console.log('strCmd', strCmds)

  Date.prototype.toJSON = toJsonOld

  return callAjax(ServiceUrlBase + CommandUrl, { commands: str }, onsuccess, onerror)
}

const _call = function (coms, parameters, callbackConfig, errorCallbackConfig) {
  const commands = createCommands(coms, parameters)
  if (!commands) return
  executeCommand(
    commands,
    (result) => {
      const cmdResult = []
      for (var i = 0; i < commands.length; i++) {
        const rs = _.find(result, (item) => item.Command.Id == commands[i].Id)
        if (rs.IsSuccess) cmdResult[cmdResult.length] = rs.Result
        else {
          cmdResult[cmdResult.length] = { error: { message: rs.ErrorMessage } }
        }
      }

      if (_.isFunction(callbackConfig)) {
        callbackConfig.apply(null, cmdResult)
      } else callbackConfig.fn.apply(callbackConfig.scope, cmdResult)
    },
    (er) => {
      if (errorCallbackConfig) {
        if (_.isFunction(errorCallbackConfig)) {
          errorCallbackConfig.apply(null, [er])
        } else errorCallbackConfig.fn.apply(errorCallbackConfig.scope, [er])
      } else {
        // alert(er.message);
        console.log(er.message)
      }
    }
  )
}

const call = IsBlended() ? window.parent.az.Service.call : _call

export default call
