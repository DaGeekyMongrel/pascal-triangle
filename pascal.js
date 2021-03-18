const fs = require("fs");
const { Readable } = require("stream");

const filename = "./pascals-triangle.txt";
const fileStream = fs.createWriteStream(filename);

async function* generatePascalsTriangle(rows) {
  const ptriangle = [];

  for (let row = 0; row < rows; row++) {
    ptriangle[row] = [1];
    ptriangle[row][row] = 1;
    for (let col = 1; col < row; col++) {
      ptriangle[row][col] =
        ptriangle[row - 1][col - 1] + ptriangle[row - 1][col];
    }
    yield ptriangle[row].join(" ") + "\n";
  }
}

const triangleStream = Readable.from(generatePascalsTriangle(10));

triangleStream.on("data", function (chunk) {
  fileStream.write(chunk + "\n");
});
