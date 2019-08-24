function resetForm($form) {
    $form.find('input:text, input:password, input:file, select, textarea').val('');
    $form.find('input:radio, input:checkbox').removeAttr('checked').removeAttr('selected');

    var $quantidadePessoas = $("#entry_1004913611");
    $quantidadePessoas.hide();
    $quantidadePessoas.removeAttr("required");
}

function shuffle(array) {
    var currentIndex = array.length,
            temporaryValue,
            randomIndex;

    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

jQuery.fn.shuffle = function () {
    var j;
    for (var i = 0; i < this.length; i++) {
        j = Math.floor(Math.random() * this.length);
        $(this[i]).before($(this[j]));
    }
    return this;
};

function async(url, callback) {
    var d = document, t = 'script',
        o = d.createElement(t),
        s = d.getElementsByTagName(t)[0];
    o.src = url;
    if (callback) { s.addEventListener('load', function (e) { callback(null, e); }, false); }
    s.parentNode.appendChild(o, s);
}
