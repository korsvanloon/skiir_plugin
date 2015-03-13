chrome.runtime.onMessage.addListener(function(req, sender, sendResponse) {

    // handle text selection requests
    if(req.details) {
        var data = req.details;

        data.parentElement = getSelectionParentElement();

        console.dir(data.parentElement);

        var button = '<a class="skiir-help">'+data.selectionText+'</a>';


        data.parentElement.innerHTML = data.parentElement.innerHTML.replace(data.selectionText, button);
        console.log(data.parentElement.innerHTML);

        //TODO: send data to the server
        //console.log(data);
   }
});

//document.body.innerHTML = document.body.innerHTML.replace();

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