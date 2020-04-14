const request = require('request');
const fs = require('fs');

let url = process.argv[2];

request(url, (error, response, body) => {
  if (error) {
    console.log("Error:", error)
    return
  }
  
  // console.log(response)
  // Print the response status code if a response was received
  // check response event exists
  if (response.statusCode !== 200) {
    const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
    callback(Error(msg), null);
    return;
  }
  // fs.open -> error checking. ; open file before you write it; callback = fs.writefil 
  fs.open('/.index.html', 'wx', (err, fd) => {
    if (err) {
      console.error(error)
      return
    }
    // console.log(fd)
  });
  fs.writeFile('./index.html', body, 'utf8', err => {
    if (err) {
      console.error(error)
      return
    }
  });

  console.log(`Downloaded and saved to ${body.length} bytes`)
});