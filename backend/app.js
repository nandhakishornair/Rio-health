const http = require("http");
var projects = require("./data-store");

const server = http.createServer((req, res) => {
  var url = req.url;
  const reg = /\/projects\/[0-9]+$/;
  if (req.url === "/") {
    // res.write(url)
    res.end();
  }
  if (/\/projects\/.*/.test(url) === true) {
    if (reg.test(url) === true) {
      let id = url.split("/")[2];
      let c = 0;
      console.log(id);
      for (let i = 0; i < projects.length; i++) {
        if (projects[i].id == id) {
          res.write(JSON.stringify(projects[i]));
          c++;
        }
      }
      if (c === 0) {
        res.write("no data found");
        res.statusCode = 404;
      } else {
        res.statusCode = 200;
      }

      res.end();
    } else {
      res.statusCode = 400;
      let mes = {
        message: "BAD REQUEST",
      };
      res.end(JSON.stringify(mes));
    }
  } else {
    res.statusCode = 404;
    res.end("404");
  }
});
server.on("connection", (socket) => {
  console.log("new connection");
});
server.listen(8000, () => {
  console.log("listening to port 8000");
});
