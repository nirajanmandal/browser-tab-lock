let password = "test123"; // Stores tab IDs and their associated passwords

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  // console.log("message", message);
  if (message.action === "lockTab") {
    const tabId = message.tabId;
    // Additional logic to reset the password or state as needed
    chrome.tabs.sendMessage(tabId, { action: "lockTab" });
  }

  if (message.action === "openTab") {
    chrome.tabs.create(
      { url: message.url, active: false, pinned: true },
      (tab) => {
        chrome.tabs.sendMessage(tab.id, { action: "setTabId", tabId: tab.id });
      }
    );
  } else if (message.action === "validatePassword") {
    // const storedPassword = chrome.storage.local.get("password")
    //   ? chrome.storage.local.get("password")
    //   : "";
    // console.log("storedPassword", storedPassword);
    if (message.password === password) {
      chrome.tabs.sendMessage(message.tabId, {
        action: "showContent",
        tabId: message.tabId,
      });
      sendResponse({ valid: true });
    } else {
      sendResponse({ valid: false });
    }
  }
});
