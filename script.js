var words = [];
var all = [];

function go() {

var walkDOM = function (node, func) {
    func(node);
    node = node.firstChild;
    while(node) {
        walkDOM(node, func);
        node = node.nextSibling;
    }

};

walkDOM(document.body, function (node) {
    
    if (node.nodeName === '#text') {
        var text = node.textContent;
        
        text = text.replace(/[^A-Za-z]/g, ' ');
        
        text = text.split(' ');
        
        if (text.length) {

            for (var i = 0, length = text.length; i < length; i += 1) {
                var matched = false,
                    word = text[i];
                
                for (var j = 0, numberOfWords = words.length; j < numberOfWords; j += 1) {
                    if (words[j][0] === word) {
                        matched = true;
                        words[j][1] += 1;
                    }
                }
                
                if (!matched) {
                    words.push([word, 1]);
                }
                        
            }
        }
    }
});

var displayWordList = function (words) {
    for (var i = 0, length = words.length; i < length; i += 1) {
        console.log(words[i][0], words[i][1]);

        // i think its counting white spaces as a word
        if (words[i][1] < 100)
            all = all + (words[i][0]) + " - " + (words[i][1]) + "<br>";
    }
};

displayWordList(words);
document.getElementById("box").innerHTML = all;
}