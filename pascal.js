const fs = require("fs");
const { Readable } = require("stream");

const argRegex = /^--(?<name>\w+)=(?<val>\w+.?\w+)/;
const args = process.argv.slice(2).reduce((acc, curr) => {
  const currentArg = curr.match(argRegex)?.groups;
  if (currentArg) {
    acc[currentArg.name] = currentArg.val;
    return acc;
  }
}, {});

let outStream;
if (args?.file) {
  outStream = fs.createWriteStream(args.file);
} else {
  outStream = process.stdout;
}

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

const triangleStream = Readable.from(generatePascalsTriangle(args?.rows || 10));

triangleStream.on("data", function (chunk) {
  outStream.write(chunk + "\n");
});
