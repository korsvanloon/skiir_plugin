chrome.runtime.onMessage.addListener(function(req, sender, sendResponse) {


    if(req.details) {
        var data = req.details;

        data.parentElement = getSelectionParentElement();
        console.log(data);

        // send data to the server
   }
});


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