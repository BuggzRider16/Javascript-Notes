Array.prototype.myReduce = function (callback, acc) {
  let accumulator = acc
  for (let i = 0; i < this.length; i++) {
    if (accumulator !== undefined)
      accumulator = callback(accumulator, this[i], i, this)
      else
      accumulator = this[i]
  }
  return accumulator
}

const a = [1, 2, 3, 4, 5]

console.log(a.myReduce((acc, item) => acc + item, 0))