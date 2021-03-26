const { Readable } = require("stream");

async function* generateSimple(rows) {
  const ptriangle = [];

  for (let row = 0; row < rows; row++) {
    ptriangle[row] = [1];
    ptriangle[row][row] = 1;
    for (let col = 1; col < row; col++) {
      ptriangle[row][col] =
        ptriangle[row - 1][col - 1] + ptriangle[row - 1][col];
    }
    yield ptriangle[row];
  }
}

async function* generate(numberOfRows) {
  for (let rowCount = 0; rowCount < numberOfRows; rowCount++) {
    const row = [1];
    for (let i = 1; i <= rowCount; i++) row[i] = binomialCoeff(rowCount, i);
    yield JSON.stringify(row);
  }
}

function binomialCoeff(n, k) {
  let res = 1;
  if (k > n - k) {
    k = n - k;
  }
  for (let i = 0; i < k; i++) {
    res *= n - i;
    res /= i + 1;
  }
  return res;
}

module.exports = {
  createStream: (rowCount = 10) => Readable.from(generate(rowCount)),
  generate,
  generateSimple,
};
