function setCookie(key: string, value: string, expiry: number) {
  const date = new Date()
  date.setTime(date.getTime() + expiry * 24 * 60 * 60 * 1000)
  const expires = 'expires=' + date.toUTCString()
  document.cookie = key + '=' + value + ';' + expires + ';path=/'
}

function getCookie(key: string) {
  const name = key + '='
  const spli = document.cookie.split(';')
  for (let j = 0; j < spli.length; j++) {
    let char = spli[j]
    while (char.charAt(0) == ' ') {
      char = char.substring(1)
    }
    if (char.indexOf(name) == 0) {
      return char.substring(name.length, char.length)
    }
  }
  return ''
}

export { setCookie, getCookie }
