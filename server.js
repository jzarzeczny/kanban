const http = require("http");
const path = require("path");
const fs = require("fs");

const server = http.createServer((req, res) => {
   let filePath = path.join(
      __dirname,
      "client",
      req.url === "/" ? "index.html" : req.url
   );
   let extname = path.extname(filePath);
   let contentType = "text/html";
   console.log(extname);
   switch (extname) {
      case ".js":
         contentType = "text/javascript";
         break;
      case ".css":
         contentType = "text/css";
         break;
      case ".json":
         contentType = "application/json";
         break;
      case ".png":
         contentType = "image/png";
         break;
      case ".jpg":
         contentType = "image/jpg";
         break;
   }
   // Check if contentType is text/html but no .html file extension
   if (contentType == "text/html" && extname == "") filePath += ".html";

   fs.readFile(filePath, (err, content) => {
      if (err) {
         if (err.code == "ENOENT") {
            fs.readFile(
               path.join(__dirname, "client", "404.html"),
               (err, content) => {
                  res.writeHead(404, { "Content-Type": "text/html" });
                  res.end(content, "utf8");
               }
            );
         } else {
            res.writeHead(500);
            res.end(`Server Error: ${err.code}`);
         }
      } else {
         //   Success
         res.writeHead(200, { "Content-Type": contentType });
         res.end(content, "utf8");
      }
   });
});

const PORT = (process.env.PORT = 5001);

server.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
