const basePath = __dirname;
const http = require('http');
const fs = require('fs');
const path = require('path');
const cors_proxy = require('cors-anywhere').createServer({
  originWhitelist: [], // Allow all origins
  requireHeader: [],
  removeHeaders: ['cookie', 'cookie2']
});

// Listen on a specific port via the PORT environment variable
const port = process.env.PORT || 8080;

http.createServer(function(req, res) {
  let filename = path.join(basePath + '/build', req.url);

  try {
    if (fs.statSync(filename).isDirectory()) filename += '/index.html';

    var stream = fs.createReadStream(filename);
    stream.on('error', function() {
      res.writeHead(404);
      res.end();
    });
    stream.pipe(res);
  } catch (e) {
    // Non file and directory goes to proxy request
    req.url = req.url.replace('/proxy/', '/');
    cors_proxy.emit('request', req, res);
  }
}).listen(port);


