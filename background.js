//function checkForValidUrl(tabId, changeInfo, tab) {
//    console.log(tab.url);
//    // If  'example.com' is the hostname for the tabs url.
//    var a = document.createElement ('a');
//    a.href = tab.url;
//    if (a.hostname == "bloomberg.com") {
//        // ... show the page action.
//        chrome.browserAction.show(tabId);
//    }
//}

// Listen for any changes to the URL of any tab.
//chrome.tabs.onUpdated.addListener(checkForValidUrl);
////For highlighted tab as well
//chrome.tabs.onHighlighted.addListener(checkForValidUrl);

chrome.runtime.onInstalled.addListener(function() {
    // Replace all rules ...
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
        // With a new rule ...
        chrome.declarativeContent.onPageChanged.addRules([
            {
                // That fires when a page's URL contains a 'g' ...
                conditions: [
                    new chrome.declarativeContent.PageStateMatcher({
                        pageUrl: { hostEquals: 'www.bloomberg.com' }
                    })
                ],
                // And shows the extension's page action.
                actions: [ new chrome.declarativeContent.ShowPageAction() ]
            }
        ]);
    });
});
