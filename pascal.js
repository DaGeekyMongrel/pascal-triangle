const fs = require("fs");
const { performance } = require("perf_hooks");
const { Transform } = require("stream");
const PascalsTriangle = require("./pascals-triangle");

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

const triangleStream = PascalsTriangle.createStream(args?.rows);

const formatStream = new Transform({
  transform: (data, encoding, callback) => {
    callback(null, JSON.parse(data).join(" ") + "\n");
  },
});

const startTime = performance.now();
triangleStream
  .pipe(formatStream)
  .pipe(outStream)
  .on("finish", () => {
    console.log(`Finished in ${performance.now() - startTime} ms`);
  });
