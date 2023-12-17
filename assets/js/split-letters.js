// Barba Load Wrapper
barba.hooks.beforeEnter(() => {

    // Copyright start
    // © Code by T.RICKS, https://www.tricksdesign.com/
    // You have the license to use this code in your projects but not redistribute it to others
    // Tutorial: https://www.youtube.com/watch?v=xiAqTu4l3-g&ab_channel=TimothyRicks

    // Find all text with .tricks class and break each letter into a span
    var tricksWord = document.getElementsByClassName("tricks");
    for (var i = 0; i < tricksWord.length; i++) {

        var wordWrap = tricksWord.item(i);
        wordWrap.innerHTML = wordWrap.innerHTML.replace(/(^|<\/?[^>]+>|\s+)([^\s<]+)/g, '$1<span class="tricksword-wrapper"><span class="tricksword">$2</span></span>');

    }

    // Copyright end


});