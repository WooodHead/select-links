var links = []


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
      var some = links.filter((item) => {
        return item.href.indexOf(val) !== -1
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
    var a = document.createElement('a')
    a.href = item.href

    if (item.text.trim() !== '') {
      var text = document.createElement('p')
      text.className = 'title'
      text.textContent = item.text
      a.appendChild(text)
    }

    var href = document.createElement('p')
    href.textContent = item.href
    href.className = 'href'

    a.appendChild(href)
    li.appendChild(a)
    list.appendChild(li)
  })

}


function main() {
  chrome.tabs.query({
    active: true
  }, function (tabs) {
    chrome.runtime.getBackgroundPage(function (bg) {
      var data = bg.tabData[tabs[0].id];
      console.log('data', data)
      links = data.links
      addToList(links)
    })
  })

  listenInputChange()
}

main()
