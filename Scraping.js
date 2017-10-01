// These are the variable declarations that are used to scrape the page specified
var request = require('request');
var cheerio = require('cheerio');
var rawStory = "";
var all = "";
var text2 = "";
var sortedWords;
var words = [];
var keyWords = "";

var http = require('http');
var fs = require('fs');

//This specifies the request to have two fields, a string that is used for the Web page to scrape, and a function, specified below
request('https://www.theguardian.com/environment/2017/sep/28/monsanto-banned-from-european-parliament',function(err,resp,body){
    //Basically specified "If retrieved successfully..."
if(!err && resp.statusCode == 200){
    
    //This uses jQuery format, just loads th4e body of the HTML into this variable
    var $ = cheerio.load(body);
    var resObj = {};

    //Find everything with a p tag
    $('p').each(function(index, title){

        // Grab the main story of the article
        rawStory = $(title).text();
        rawStory = rawStory.replace(/[^A-Za-z]/g, ' ');
        rawStory = rawStory.split(' ');

        //Get how many of each word that there is
        if (rawStory.length) {
            for (var i = 0, length = rawStory.length; i < length; i += 1) {
                var matched = false,
                    word = rawStory[i];

                for (var j = 0, numberOfWords = words.length; j < numberOfWords; j += 1) {
                    if (words[j][0].toLowerCase() === word.toLowerCase()) {
                        matched = true;
                        words[j][1] += 1;
                    }
                }

                //Excludes words we don't want and words less than 3 chars long.
                if (!matched && word.toLowerCase() !== 'this' 
                             && word.toLowerCase() !== 'will' 
                             && word.toLowerCase() !== 'most' 
                             && word.toLowerCase() !== 'also'
                             && word.toLowerCase() !== ' '
                             && word.toLowerCase() !== 'the'
                             && word.toLowerCase() !== 'for'
                             && word.toLowerCase() !== 'and'
                             && word.toLowerCase() !== 'too'
                             && word.toLowerCase() !== 'into'
                             && word.toLowerCase() !== 'that'
                             && word.toLowerCase() !== 'has'
                             && word.toLowerCase() !== 'been'
                             && word.toLowerCase() !== 'said'
                             && word.toLowerCase() !== 'its'
                             && word.length >= 3) 
                    words.push([word.toLowerCase(), 1]);
                }
    
                
            }
        });

            //Sort and get top 10 words
                words.sort(compareSecondColumn);
                words = words.slice(0, 10);
                //console.log(words);
    
        //Find certain things (title, keywords, etc) in the metadata
        resObj = {};
        $title = $('head title').text(),
        $desc = $('meta[name="description"]').attr('content'),
        $kwd = $('meta[name="keywords"]').attr('content'),
        $ogTitle = $('meta[property="og:title"]').attr('content'),
        $ogkeywords = $('meta[property="og:keywords"]').attr('content');
    
        if ($title) {
            resObj.title = $title;
        }
    
        if ($desc) {
            resObj.description = $desc;
        }
    
        if ($kwd) {
            resObj.keywords = $kwd;
        }
    
        if ($ogTitle && $ogTitle.length){
            resObj.ogTitle = $ogTitle;
        }
    
        if ($ogkeywords && $ogkeywords.length){
            resObj.ogkeywords = $ogkeywords;
        }
    
        console.log(resObj);
    }
});


function compareSecondColumn(b, a) {
    
    if (a[1] === b[1])
        return 0;
    else
        return (a[1] < b[1]) ? -1 : 1;
}

var server = http.createServer(function(req, res) {

    console.log('request was made: ' + req.url);
    res.writeHead(200, {'Content-Type': 'application/json'});
   
   
    res.end(JSON.stringify(words));


});

server.listen(3000, '127.0.0.1');
console.log('Server now running..');

