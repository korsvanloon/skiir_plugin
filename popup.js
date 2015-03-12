/**
 * Created by maartensteinfort on 12-03-15.
 */

function getBgColors (tab) {
    // But for now, let's just make sure what we have so
    // far is working as expected.
    alert('The browser action was clicked! Yay!');
}

// When the browser action is clicked, call the
// getBgColors function.
chrome.pageAction.onClicked.addListener(getBgColors);