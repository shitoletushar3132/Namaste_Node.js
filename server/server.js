const http = require("http");

const server = http.createServer(function (req, res) {
  res.end("hello");
});

server.listen(3000);
