// Random Quote Machine v2
// Implemented in Vanilla JavaScrtip with CORS (Cross-Origin Resource Sharing) workaround
// Workaround from Ignat Ospadov (source: https://medium.com/@iospadov/when-cors-got-your-json-down-61de617aa7db)

document.getElementById('getQuote').addEventListener('click', getQuote)
document.getElementById('tweetQuote').addEventListener('click', tweetQuote)

var jsonpData = []
var author = ''
var quote = ''

function getQuote () {
  var script = document.createElement('script')
  script.src = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=jsonp&jsonp=displayData'
  document.getElementsByTagName('head')[0].appendChild(script)
}

function displayData (response) {                                     // called from the last line of the script.src (line 14)
  jsonpData.push(response)
  quote = response.quoteText
  author = response.quoteAuthor

  document.getElementById('quote').innerHTML = quote

  if (author) {
    document.getElementById('author').innerHTML = 'By: ' + author
  } else {
    author = 'Unknown'
    document.getElementById('author').innerHTML = 'By: ' + author
  }
}

function tweetQuote () {
  if (quote === '') {
    quote = 'Oops! You did not click the "Get Quote" button...'
    document.getElementById('quote').innerHTML = quote
  } else {
    window.open('https://twitter.com/intent/tweet?text=' + encodeURIComponent(quote) + '  -- ' + encodeURIComponent(author))
  }
}
