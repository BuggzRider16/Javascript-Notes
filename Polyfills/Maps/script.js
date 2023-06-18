Array.prototype.myMap = function (callback) {
  const result = []
  for (let i = 0; i < this.length; i++) {
    result.push(callback(this[i], i, this))
  }
  return result
}

const a = [1, 2, 3, 4, 5, 6]

console.log(a.myMap((item, index) => item + index))