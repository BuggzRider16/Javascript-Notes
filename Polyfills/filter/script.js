Array.prototype.myfilter = function (callback) {
  const result = []
  for (let i = 0; i < this.length; i++) {
    if (callback(this[i], i, this))
      result.push(this[i])
  }
  return result
}

const a = [1, 2, 3, 4, 5, 6]

console.log(a.myfilter((item, index) => item > 5))