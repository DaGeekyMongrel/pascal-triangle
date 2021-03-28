const { Readable } = require("stream");

class PascalsTriangleStream extends Readable {
  constructor(numberOfRows = 10, options = { objectMode: true }) {
    super(options);
    this.rowCount = 0;
    this.numberOfRows = numberOfRows;
  }

  _read() {
    if (this.rowCount >= this.numberOfRows) {
      this.push(null);
      return;
    }
    const row = [1];
    for (let i = 1; i <= this.rowCount; i++)
      row[i] = binomialCoeff(this.rowCount, i);
    this.push(row);
    this.rowCount++;
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

module.exports = PascalsTriangleStream;
