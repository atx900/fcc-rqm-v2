var jsonpData = []                                                            // stores JSON-format generated quote, CORS workaround
var quoteMessage = ''                                                         // stores random quote
var quoteAuthor = ''                                                          // stores random quote author

document.getElementById('getQuote').addEventListener('click', getQuote)
document.getElementById('tweetQuote').addEventListener('click', tweetQuote)

getQuote()                                                                    // generate random quote on page load or reload

function getQuote () {                                                        // generate random quote
  var script = document.createElement('script')
  script.src = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=jsonp&jsonp=displayData'
  document.getElementsByTagName('head')[0].appendChild(script)
}

function displayData (response) {                                             // called from the 'script' variable, CORS workaround
  jsonpData.push(response)
  quoteMessage = response.quoteText                                           // get quote message from JSON data
  quoteAuthor = response.quoteAuthor                                          // get quote author from JSON data

  document.getElementById('quote-message').innerHTML = quoteMessage

  if (quoteAuthor) {
    document.getElementById('quote-author').innerHTML = 'By: ' + quoteAuthor
  } else {
    quoteAuthor = 'Unknown'
    document.getElementById('quote-author').innerHTML = 'By: ' + quoteAuthor
  }
}

function tweetQuote () {                                                      // access Twitter API & paste quote message & author
  window.open('https://twitter.com/intent/tweet?text=' + encodeURIComponent(quoteMessage) + '  -- ' + encodeURIComponent(quoteAuthor))
}
