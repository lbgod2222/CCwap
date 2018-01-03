import Identicon from 'identicon.js'

function stringToHex (str) {
  var hex = ''
  for (var i = 0; i < str.length; i++) {
    hex += '' + str.charCodeAt(i).toString(16)
  }
  return hex
}
const toPhoto = {
  toAvatar(id) {
    return new Identicon(stringToHex(id)).toString()
  }
}
export default toPhoto