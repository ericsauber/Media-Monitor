Okay, the code inside of this folder retrieves the URLs of links on the reddit homepage

How we can automate the process is taking an input string (for the preferred webpage) and using the fields on that page
Downsides is that the fields that the URLS are retrieved from can be under different categories


Comments apply to the lines directly below them


Running the code -

Going to the directory that "Scraping.js" is


Troubleshooting Section - 

Error: request is not a valid.... yada yada
Basically, you don't have the correct libraries installed into that directory (Each directory needs this installed)
Fix: Go to the directory (in terminal / CMD) that holds "Scraping.js" and then type "nmd install request cheerio"

Error: Unable to run
To run, you may need node.js installed, which allows you to independently run scripts
Fix - 
1.) go to "nodejs.org" and install the suitable version (recommended 64-bit for myself)
2.) Go to the directory that holds "Scraping.js" (in terminal / CMD) and type "node Scraping.js"
