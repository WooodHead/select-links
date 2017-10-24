// Enable chromereload by uncommenting this line:
import 'chromereload/devonly'

var tabData = {}
window.tabData = tabData

function sendToTab(msg, cb) {
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, msg, cb);
  });
}

function stop() {
  chrome.browserAction.setBadgeText({
    text: ``
  })
  sendToTab({
    name: "stop"
  })
}

function start() {
  chrome.browserAction.setBadgeText({
    text: `ON`
  })
  sendToTab({
    name: "start"
  })
}

function addStartStopListener() {
  // chrome.runtime.onInstalled.addListener((details) => {
  //   console.log('previousVersion', details.previousVersion)
  // })
  chrome.browserAction.onClicked.addListener(function(e) {
    chrome.browserAction.getBadgeText({}, function(t) {
      if (t === '') {
        start()
      } else {
        stop()
      }
    })
  })
}

function addNewTabListener() {
  chrome.runtime.onMessage.addListener(function(msg, sender, cb) {
    if (msg.name === "newtab") {
      var links = msg.links
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
    }
    if (msg.name === "stop") {
      stop()
    }
  })
}

function updateBadget() {
  sendToTab({ name: "status" }, function(res) {
    if (res === 'on') {
      chrome.browserAction.setBadgeText({
        text: `ON`
      })
    } else {
      chrome.browserAction.setBadgeText({
        text: ``
      })
    }
  })
}

function addTabListener() {
  chrome.tabs.onActivated.addListener(function(changeInfo) {
    updateBadget()
    // chrome.browserAction.setBadgeText({ text: newText, tabId: tab.id });
  })
  chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    if (tab.active) {
      updateBadget()
    }
  })

}

function main() {
  addStartStopListener()
  addNewTabListener()
  addTabListener()
}

main()