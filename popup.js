document.addEventListener('DOMContentLoaded', function() {

    //TODO: get all the explanation requests from the server
    var items = [1, 2, 3];

    var ul = document.querySelector('ul');
    for (var idx in items) {
        var item = items[idx];
        ul.innerHTML += '<li>' + item + '</li>';
    }
});