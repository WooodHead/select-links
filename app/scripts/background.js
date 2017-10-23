// Enable chromereload by uncommenting this line:
import 'chromereload/devonly'

chrome.runtime.onInstalled.addListener((details) => {
  console.log('previousVersion', details.previousVersion)
})

chrome.browserAction.onClicked.addListener(function(e) {
  chrome.browserAction.getBadgeText({}, function(t) {
    if (t === '') {
      chrome.browserAction.setBadgeText({
        text: `ON`
      })

      chrome.tabs.executeScript(e.id, {
        file: "scripts/start.js"
      })

    } else {
      chrome.browserAction.setBadgeText({
        text: ``
      })
    }
  })
})

// chrome.browserAction.setBadgeText({
//   text: `'ON`
// })

var tabData = {}
window.tabData = tabData
chrome.runtime.onMessage.addListener(function(links, sender, res) {
  console.log('links', links)
  var tab = sender.tab;
  chrome.tabs.create({
    url: chrome.extension.getURL("pages/links.html")
  }, function(newTab) {
    console.log('newTab', newTab)
    tabData[newTab.id] = {
      source: tab.url,
      links: links
    }
  })
})
console.log(`'Allo 'Allo! Event Page for Browser Action`)