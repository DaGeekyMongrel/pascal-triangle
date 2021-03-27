const fs = require("fs");
const { performance } = require("perf_hooks");
const { Transform, pipeline } = require("stream");
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
  writableObjectMode: true,
  transform: (data, encoding, callback) => {
    callback(null, data.join(" ") + "\n");
  },
});

const startTime = performance.now();

pipeline(triangleStream, formatStream, outStream, (err) => {
  if (err) {
    console.error(err);
  } else {
    const elapsedTime = performance.now() - startTime;
    console.warn(`Finished in ${elapsedTime.toFixed(3)}ms`);
  }
});
