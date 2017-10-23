var links = []
var some = []

function getListItem(data) {
  return `
      <div class="row selected">
        <div class="col-sm-4">
          <div class="text">${data.text}</div>
        </div>
        <div class="col-sm-8">
          <a href="${data.href}" class="href">${data.href}</>
        </div>
      </div>`
}

function clearList() {
  var list = document.getElementById('LinkList')
  list.innerHTML = ''
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
    li.addEventListener('click', (e) => {
      var row = li.getElementsByClassName('row')[0]
      row.classList.toggle('selected')
    })
  })
}

function copyToClipboard() {
  var selection = window.getSelection()
  var prevRange = selection.rangeCount ? selection.getRangeAt(0).cloneRange() : null
  var tmp = document.createElement("div")
  var linkList = document.getElementById('LinkList')
  var all = linkList.querySelectorAll(".selected .href")
  for (var i = 0; i < all.length; i++) {
    var clone = all[i].cloneNode(true);
    tmp.appendChild(clone)
    tmp.appendChild(document.createElement("div"));
  }
  document.body.appendChild(tmp);
  var copyFrom = document.createRange();
  copyFrom.selectNodeContents(tmp)
  selection.removeAllRanges()
  selection.addRange(copyFrom)
  document.execCommand("copy")
  document.body.removeChild(tmp)
  selection.removeAllRanges()
  prevRange && selection.addRange(prevRange);
}

function listenButtonClick() {
  var button = document.getElementById('btn-copy')
  button.addEventListener('click', (e) => {
    copyToClipboard()
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
  listenButtonClick()
}
main()