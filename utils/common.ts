// Client side utils

// Quickly get an element by id
export function $(id:string){
  return document.getElementById(id)
}

// Quickly assign text to any html element or enable/disable if val is bool
export function $$(id:string, val:string, off?:boolean|undefined){
  document.getElementById(id).innerHTML = val || '&nbsp;'
  if(typeof(off)!='undefined'){
    if(off){
      document.getElementById(id).setAttribute('disabled', 'true')
    } else {
      document.getElementById(id).removeAttribute('disabled')
    }
  }
}

// Quickly set message element to inform user of events and states
export function setMessage(text:string='', warn:boolean|undefined=false){
  if(warn){
    text = `<warn>${text}</warn>`
  }
  document.getElementById('message').innerHTML = text
}

export function getNetwork(net:string){
  return net=='pubnet'?'Mainnet':'Testnet'
}

export function setCookie(name, value='', days=0) {
  var expires = ''
  if(days) {
    var date = new Date()
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000))
    expires = '; expires=' + date.toUTCString()
  }
  let path = '; path=/'
  //document.cookie = `${name}=${value}${expires}${path}`
  document.cookie = name + '=' + (value || '') + expires + '; path=/'
}

export function getCookie(name) {
  let value = null
  var nameEQ = name + "="
  var ca = document.cookie.split(';')
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i]
    while (c.charAt(0) == ' ') { c = c.substring(1, c.length) }
    if (c.indexOf(nameEQ) == 0) { value = c.substring(nameEQ.length, c.length); break }
  }
  return value
}

export function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(function() {
    console.log('Copying to clipboard was successful!')
  }, function(err) {
    console.error('Could not copy to clipboard:', err)
  })
}

