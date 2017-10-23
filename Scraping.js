var request = require('request');
var cheerio = require('cheerio');
var http = require('http');
var fs = require('fs');
var express = require('express');

var rawStory = "", all = "", text2 = "", keyWords = "";
var sortedWords, URL;
var words, words2;

app = express();

server = require('http').createServer(app);
io = require('socket.io').listen(server);

// sends html file to load on local host 
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

// includes pictures for html file and other things like css file 
app.use(express.static(__dirname + '/public'));


server.listen(3000);
console.log('Server is running..');



    // socket.io - everything is running inside this 
    io.sockets.on('connection', function (socket) {

        socket.on('send message', function (data) {

            analyzeArticle(data, 0);

        });

        socket.on('send message2', function (data) {

            analyzeArticle(data, 1);

        });
    });         // end of socket.io 

function analyzeArticle(data, x) {
    // whats getting sent from client is saved as URL
    URL = data;
    words = [];
    words2 = [];

    // Specifies the request to have two fields, a string that is used for the Web page to scrape, and a function, specified below
    request(URL, function (err, resp, body) {
        
        // If retrieved successfully
        if (!err && resp.statusCode == 200) {

            //This uses jQuery format, just loads th4e body of the HTML into this variable
            var $ = cheerio.load(body);
            var resObj = {};

            //Find everything with a p tag
            $('p').each(function (index, title) {

                // Grab the main story of the article
                rawStory = $(title).text();
                rawStory = rawStory.replace(/[^A-Za-z'-']/g, ' ');
                rawStory = rawStory.split(' ');

                //Get how many of each word that there is
                if (x === 0) {
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
    
                            // Excludes words we don't want and words less than 3 chars long.
                            // Is there a neater way for us to do this??
                            if (!matched && word.toLowerCase() !== 'this' &&
                                word.toLowerCase() !== 'will' &&
                                word.toLowerCase() !== 'most' &&
                                word.toLowerCase() !== 'also' &&
                                word.toLowerCase() !== ' ' &&
                                word.toLowerCase() !== 'the' &&
                                word.toLowerCase() !== 'for' &&
                                word.toLowerCase() !== 'and' &&
                                word.toLowerCase() !== 'too' &&
                                word.toLowerCase() !== 'into' &&
                                word.toLowerCase() !== 'that' &&
                                word.toLowerCase() !== 'has' &&
                                word.toLowerCase() !== 'been' &&
                                word.toLowerCase() !== 'said' &&
                                word.toLowerCase() !== 'its' &&
                                word.toLowerCase() !== 'was' &&
                                word.toLowerCase() !== 'they' &&
                                word.toLowerCase() !== 'had' &&
                                word.toLowerCase() !== 'his' &&
                                word.toLowerCase() !== 'but' &&
                                word.toLowerCase() !== 'one' &&
                                word.toLowerCase() !== 'from' &&
                                word.toLowerCase() !== 'were' &&
                                word.toLowerCase() !== 'with' &&
                                word.toLowerCase() !== 'you' &&
                                word.toLowerCase() !== 'over' &&
                                word.toLowerCase() !== 'her' &&
                                word.toLowerCase() !== 'their' &&
                                word.toLowerCase() !== 'she' &&
                                word.toLowerCase() !== 'not' &&
                                word.toLowerCase() !== 'who' &&
                                word.toLowerCase() !== 'are' &&
                                word.toLowerCase() !== 'about' &&
                                word.toLowerCase() !== 'any' &&
                                word.toLowerCase() !== 'there' &&
                                word.toLowerCase() !== 'have' &&
                                word.toLowerCase() !== 'may' &&
                                word.toLowerCase() !== 'can' &&
                                word.toLowerCase() !== 'some' &&
                                word.toLowerCase() !== 'more' &&
                                word.toLowerCase() !== 'what' &&
                                word.toLowerCase() !== 'than' &&
                                word.toLowerCase() !== 'such' &&
                                word.toLowerCase() !== 'which' &&
                                word.length >= 3)
                                words.push([word.toLowerCase(), 1]);
                        }
                    }
    
                //Sort and get top 10 words
                words.sort(compareSecondColumn);
                //words = words.slice(0, 10);

                } else {

                    if (rawStory.length) {
                        for (var i = 0, length = rawStory.length; i < length; i += 1) {
                            var matched = false,
                                word = rawStory[i];
    
                            for (var j = 0, numberOfWords = words2.length; j < numberOfWords; j += 1) {
                                if (words2[j][0].toLowerCase() === word.toLowerCase()) {
                                    matched = true;
                                    words2[j][1] += 1;
                                }
                            }
    
                            // Excludes words we don't want and words less than 3 chars long.
                            // Is there a neater way for us to do this??
                            if (!matched && word.toLowerCase() !== 'this' &&
                                word.toLowerCase() !== 'will' &&
                                word.toLowerCase() !== 'most' &&
                                word.toLowerCase() !== 'also' &&
                                word.toLowerCase() !== ' ' &&
                                word.toLowerCase() !== 'the' &&
                                word.toLowerCase() !== 'for' &&
                                word.toLowerCase() !== 'and' &&
                                word.toLowerCase() !== 'too' &&
                                word.toLowerCase() !== 'into' &&
                                word.toLowerCase() !== 'that' &&
                                word.toLowerCase() !== 'has' &&
                                word.toLowerCase() !== 'been' &&
                                word.toLowerCase() !== 'said' &&
                                word.toLowerCase() !== 'its' &&
                                word.toLowerCase() !== 'was' &&
                                word.toLowerCase() !== 'they' &&
                                word.toLowerCase() !== 'had' &&
                                word.toLowerCase() !== 'his' &&
                                word.toLowerCase() !== 'but' &&
                                word.toLowerCase() !== 'one' &&
                                word.toLowerCase() !== 'from' &&
                                word.toLowerCase() !== 'were' &&
                                word.toLowerCase() !== 'with' &&
                                word.toLowerCase() !== 'you' &&
                                word.toLowerCase() !== 'over' &&
                                word.toLowerCase() !== 'her' &&
                                word.toLowerCase() !== 'their' &&
                                word.toLowerCase() !== 'she' &&
                                word.toLowerCase() !== 'not' &&
                                word.toLowerCase() !== 'who' &&
                                word.toLowerCase() !== 'are' &&
                                word.toLowerCase() !== 'about' &&
                                word.toLowerCase() !== 'any' &&
                                word.toLowerCase() !== 'there' &&
                                word.toLowerCase() !== 'have' &&
                                word.toLowerCase() !== 'may' &&
                                word.toLowerCase() !== 'can' &&
                                word.toLowerCase() !== 'some' &&
                                word.toLowerCase() !== 'more' &&
                                word.toLowerCase() !== 'what' &&
                                word.toLowerCase() !== 'than' &&
                                word.toLowerCase() !== 'such' &&
                                word.toLowerCase() !== 'which' &&
                                word.length >= 3)
                                words2.push([word.toLowerCase(), 1]);
                        }
                    }
    
                //Sort and get top 10 words
                words2.sort(compareSecondColumn);
                //words2 = words2.slice(0, 10);

                }
            });

            if(x !== 0) {
                var simCount = 0;
                var tot1 = 0;
                var tot2 = 0;
                var overallTot;
                var percMatch;

                var shortest;

                ///console.log("Before  = "+words.length+","+words2.length);

                if(words.length <= words2.length && words.length !== 0) shortest = words.length;
                else shortest = words2.length;


                ///console.log("Shortest  = " + shortest+","+words.length+","+words2.length);

                // Finds total amount of words in top 10 for second URL
                for (var i = 0; i < shortest; i++) {
                    tot1 += words[i][1];
                }

                // Finds total amount of words in top 10 for second URL
                for (var i = 0; i < shortest; i++) {
                    tot2 += words2[i][1];
                }

                // Total amount of words between the two stories (In top 10)
                overallTot = tot1 + tot2;

                // Sums up total number of matching words in Top 10 for each
                for (var i = 0; i < shortest; i++) {
                    for (var j = 0; j < shortest; j++) {
                        if (words[i][0].toLowerCase() === words2[j][0]) {
                            simCount += words[i][1] + words2[j][1];
                        }
                    }
                }

                // Calculated percentage match. Sent directly to the HTML afterwards
                percMatch = simCount / overallTot * 100;

                //Data double checking
                ///console.log("The similarity rating is:" + simCount + "\nThe Totals in 1,2, both order: " + tot1 + ", " + tot2 + ", " + overallTot);
                ///console.log("Percentage match is: " + percMatch);
            }

            //Find certain things (title, keywords, etc) in the metadata
            resObj = {};
            $title = $('head title').text(),
                $desc = $('meta[name="description"]').attr('content'),
                $kwd = $('meta[name="keywords"]').attr('content'),
                $ogTitle = $('meta[property="og:title"]').attr('content'),
                $ogkeywords = $('meta[property="og:keywords"]').attr('content');

            if ($title) 
                resObj.title = $title;

            if ($desc)
                resObj.description = $desc;
            
            if ($kwd) 
                resObj.keywords = $kwd;

            //if ($ogTitle && $ogTitle.length) 
              //  resObj.ogTitle = $ogTitle;

            //if ($ogkeywords && $ogkeywords.length) 
                //resObj.ogkeywords = $ogkeywords;
            
            console.log(resObj);

            //io.sockets.emit('new message', resObj.title + "<br>");
            

            if (x === 0) {

                io.sockets.emit('new message', words);

            } else {

                io.sockets.emit('new message2', words2);

                ///Socket for the percentage match, send to the HTML
                io.sockets.emit('stats',percMatch);
            }
        }
    });
}


function compareSecondColumn(b, a) {

    if (a[1] === b[1])
        return 0;
    else
        return (a[1] < b[1]) ? -1 : 1;
}
