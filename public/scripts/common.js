function $(id){ return document.getElementById(id) }

function getNetwork(net){ return net=='pubnet'?'Mainnet':'Testnet' }

function setMessage(text, warn=false){
  if(warn){ text = `<warn>${text}</warn>` }
  $('mesasge').innerHTML = text
}

function setCookie(name, value, days) {
  console.log('SetCookie', name, value, days)
  var expires = ''
  if (days) {
    var date = new Date()
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000))
    expires = '; expires=' + date.toUTCString()
  }
  let path = '; path=/'
  //document.cookie = `${name}=${value}${expires}${path}`
  document.cookie = name + '=' + (value || '') + expires + path
}

function getCookie(name) {
  let value = null
  var nameEQ = name + "="
  var ca = document.cookie.split(';')
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i]
    while (c.charAt(0) == ' ') { c = c.substring(1, c.length); }
    if (c.indexOf(nameEQ) == 0) { value = c.substring(nameEQ.length, c.length); break; }
  }
  console.log('GetCookie', name, value)
  return value
}

function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(function() {
    console.log('Copying to clipboard was successful!')
  }, function(err) {
    console.error('Could not copy to clipboard:', err)
  })
}

// END