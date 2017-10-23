// Enable chromereload by uncommenting this line: import 'chromereload/devonly'

console.log(`'Allo 'Allo! Content script`)

var selected = null
var selectedClass = 'test-selected'
var overClass = 'test'
var onOff = 'off'
var stack = []

function clearSelected() {
  var ele = document.getElementsByClassName(selectedClass)
  if (ele.length > 0) {
    document.getElementsByClassName(selectedClass)[0] &&
      document.getElementsByClassName(selectedClass)[0].classList.remove(selectedClass)
  }
}

function clearOver() {
  $('.' + overClass).removeClass(overClass)
}

function selectParent() {
  console.log('selectParent')
  console.log('selected', selected)
  if (selected && selected.parentNode && selected.parentNode.classList && selected.parentNode.tagName !== 'HTML') {
    stack.push(selected)

    selected = selected.parentNode
    selected.classList.add(selectedClass)
  }
}

function goBack() {
  if (stack.length > 0) {
    clearSelected()
    selected = stack.pop()
    selected.classList.add(selectedClass)
  }
}

function getLinks(ele) {
  var elements = ele.querySelectorAll("a:link:not([href^=javascript])")
  var links = new Array(elements.length)

  for (var i = 0; i < elements.length; i++) {
    console.log('elements[i].text', elements[i].text)
    links[i] = {
      hash: elements[i].hash.trim(),
      host: elements[i].host.trim(),
      hostname: elements[i].hostname.trim(),
      href: elements[i].href.trim(),
      pathname: elements[i].pathname.trim(),
      search: elements[i].search.trim(),
      text: elements[i].text.trim()
    }
  }
  return links
}

function onMouseEnter(e) {
  e.target.classList.add(overClass)
}

function onMouseLeave(e) {
  e.target.classList.remove(overClass)
}

function onKeyUp(e) {
  if (e.key === "=") {
    clearSelected()
    selectParent()
  }
  if (e.key === "-") {
    goBack()
  }
  if (e.key === "Enter") {
    var links = getLinks(selected)
    var msg = {
      name: 'newtab',
      links: links
    }
    console.log('msg', msg)
    chrome.runtime.sendMessage(msg)
  }
  if (e.key === "Escape") {
    chrome.runtime.sendMessage({
      name: "stop"
    })
  }
}

function onMouseClick(e) {
  clearSelected()
  stack = []
  selected = e.target
  selected.classList && selected.classList.add(selectedClass)
  e.preventDefault()
  return false
}

function addAllListener() {
  console.log('addAllListener')
  document.querySelectorAll('*').forEach((item) => {
    item.addEventListener('mouseenter', onMouseEnter)
    item.addEventListener('mouseleave', onMouseLeave)
    item.addEventListener('click', onMouseClick)
  })
  document.addEventListener('keyup', onKeyUp)
}

function removeAllListener() {
  clearSelected()
  clearOver()
  selected = null

  document.querySelectorAll('*').forEach((item) => {
    item.removeEventListener('mouseenter', onMouseEnter)
    item.removeEventListener('mouseleave', onMouseLeave)
    item.removeEventListener('click', onMouseClick)
  })
  document.removeEventListener('keyup', onKeyUp)
}

function addMessageListener() {
  chrome.runtime.onMessage.addListener(function(msg, sender, sendRes) {
    if (msg.name === "start") {
      console.log('start')
      addAllListener()
      onOff = 'on'
    }
    if (msg.name === "stop") {
      console.log('stop')
      removeAllListener()
      onOff = 'off'
    }
    if (msg.name === 'status') {
      console.log('status')
      sendRes(onOff)
    }
  })
}

function main() {
  addMessageListener()
}

// var overlay = document.createElement('div')
// overlay.className = 'overlay'
// // document.body.appendChild(overlay)
// console.log('22')
$(document).ready(function() {
  main()
})