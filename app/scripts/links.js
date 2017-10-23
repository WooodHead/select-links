var links = []
var some = []

function clearList() {
  var list = document.getElementById('LinkList')
  list.innerHTML = ''
}

function getListItem(data) {
  return `<a href="${data.href}">
      <div class="row">
        <div class="col-sm-4">
          <div class="text">${data.text}</div>
        </div>
        <div class="col-sm-8">
          <div class="href">${data.href}</div>
        </div>
      </div>
  </a>`
}

function listenInputChange() {
  var input = document.getElementById('filter')
  input.addEventListener('keyup', (e) => {
    clearList()
    var val = input.value
    if (val === '') {
      addToList(links)
    } else {
      some = links.filter((item) => {
        return item.href.indexOf(val) !== -1 || item.text.indexOf(val) !== -1
      })
      addToList(some)
    }
    console.log('input.value', input.value)
  })
}

function addToList(some) {
  var list = document.getElementById('LinkList')
  some.forEach((item, index) => {
    var li = document.createElement('li')
    var html = getListItem(item)

    li.innerHTML = html
    list.appendChild(li)
  })

}

function init() {
  chrome.tabs.query({
    active: true
  }, function(tabs) {
    chrome.runtime.getBackgroundPage(function(bg) {
      var data = bg.tabData[tabs[0].id];
      console.log('data', data)
      links = data.links
      addToList(links)
    })
  })
}




function main() {
  init()
  listenInputChange()
  listenButton()
}

main()