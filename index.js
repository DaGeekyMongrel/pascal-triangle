const http = require("http");

const triangleStream = PascalsTriangle.createStream(args?.rows);

triangleStream.on("data", function (chunk) {
  outStream.write(chunk.join(" ") + "\n");
});
