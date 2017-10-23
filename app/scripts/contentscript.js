// Enable chromereload by uncommenting this line: import 'chromereload/devonly'

console.log(`'Allo 'Allo! Content script`)

// $('*').mouseenter((e) => {   $(e.target).addClass('test') }).mouseleave((e)
// => {   $(e.target).removeClass('test') })

var selected = null
var selectedClass = 'test-selected'

function clearSelected() {
  var ele = document.getElementsByClassName(selectedClass)
  if (ele.length > 0) {
    document.getElementsByClassName(selectedClass)[0] && document
      .getElementsByClassName(selectedClass)[0]
      .classList
      .remove(selectedClass)
  }
}

function selectParent() {
  console.log('selectParent')
  console.log('selected', selected)
  if (selected && selected.parentNode) {
    selected = selected.parentNode
    selected
      .classList
      .add(selectedClass)
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

document
  .querySelectorAll('*')
  .forEach((item) => {
    item.addEventListener('mouseenter', (e) => {
      e
        .target
        .classList
        .add('test')
    })
    item.addEventListener('mouseleave', (e) => {
      e
        .target
        .classList
        .remove('test')
    })

    item.addEventListener('click', (e) => {
      clearSelected()
      selected = e.target
      selected.classList && selected
        .classList
        .add(selectedClass)
      // e.stopPropagation() e.preventDefault() return false
    })

  })

document.addEventListener('keyup', (e) => {
  console.log('e', e)

  if (e.key === "=") {
    clearSelected()
    selectParent()
  }
  if (e.key === "Enter" || e.key === "-") {
    var links = getLinks(selected)
    console.log('links', links)
    chrome.runtime.sendMessage(links)
  }

})

var overlay = document.createElement('div')
overlay.className = 'overlay'
// document.body.appendChild(overlay)
console.log('22')