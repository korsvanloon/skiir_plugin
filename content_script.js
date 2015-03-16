// Test Url:
// http://www.bloomberg.com/news/articles/2015-03-15/germans-tired-of-greek-demands-want-country-to-exit-euro

var testSet = [
    {
        original:'Mueller’s sentiment is shared by a majority of Germans. A poll published March 13 by public broadcaster ZDF found 52 percent of his countrymen no longer want Greece to remain in Europe’s common currency, up from 41 percent last month. The shift is due to a view held by 80 percent of Germans that Greece’s government “isn’t behaving seriously toward its European partners.” ',
        phrase:'Mueller’s sentiment'
    }

];


// START: document onReady
(function() {

    // haal de explanationRequests en explanations op
    var explanationRequests = testSet;

    // update de DOM met buttons en explanation components
    // TODO: Bug! only 1 request per paragraph!
    for(var idx in explanationRequests) {
        var explanationRequest = explanationRequests[idx];

        // search page for explanationRequest.original
        var paragraph = getParagraphOfText(explanationRequest.original);

        // replace with button
        addExplanationRequest(paragraph, explanationRequest.phrase);
    }

    document.querySelectorAll('.skiir-help').onclick = openDialog;

})();


function addExplanationRequest(paragraph, text) {
    var button = '<button class="skiir-help">'+text+'</button>';
    paragraph.innerHTML = paragraph.innerHTML.replace(text, button);
}


// Message handler (from background.js)
chrome.runtime.onMessage.addListener(function(req, sender, sendResponse) {

    // handle text selection requests
    if(req.details) {
        var data = req.details;

        data.parentElement = getSelectionParentElement();

        addExplanationRequest(data.parentElement, data.selectionText);

        //TODO: send data to the server and popup.js (through background.js?)
        //console.log(data);
   }
});

function openDialog(e) {
    e.preventDefault();
    var text = e.target;
    console.log(e);

    chrome.windows.create({'url': 'explanation_dialog.html', 'type': 'popup'}, function(window) {

    });
}

function getParagraphOfText(text) {
    var elements = document.querySelectorAll(".article-body p");

    for (var i = 0; i < elements.length; i++) {
        var el = elements[i];

        // TODO: BUG! deze check is niet netjes!!!
        if(el.textContent.split(' ')[0] == text.split(' ')[0]) {
            return el;
        }
    }
}

function getSelectionParentElement() {
    var parentEl = null, sel;
    if (window.getSelection) {
        sel = window.getSelection();
        if (sel.rangeCount) {
            parentEl = sel.getRangeAt(0).commonAncestorContainer;
            if (parentEl.nodeType != 1) {
                parentEl = parentEl.parentNode;
            }
        }
    } else if ( (sel = document.selection) && sel.type != "Control") {
        parentEl = sel.createRange().parentElement();
    }
    return parentEl;
}