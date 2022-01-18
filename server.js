let http = require("http");
let fs = require("fs");

let server = http.createServer();
server.on("request", (request, response) => {
  fs.readFile("indebx.html", (err, data) => {
    if (err) {
      response.writeHead(404);
      response.end("Page inhexistant beloved");
    } else {
      response.writeHead(200, {
        "Content-Type": "text/html; charset=utf-8",
      });
      response.end(data);
    }
  });
});
server.listen(8080);

//Short Forme
// http
//   .createServer((request, response) => {
//     response.writeHead(200, {
//       "Content-Type": "text/html; charset=utf-8",
//     });
//     response.end("JSONStringify(personne)");
//   })
//   .listen(8080);
