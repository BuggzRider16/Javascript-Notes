const arrFlaterner = (array) => {
  const resultArray = []
  array.forEach(arr => {
    if (Array.isArray(arr)) {
      resultArray.push(...arrFlaterner(arr))
    } else {
      resultArray.push(arr)
    }
  })
  return resultArray
}

const flatPollyfill = (array, depth = 1) => {
  const resultArray = []
  array.forEach(arr => {
    if (Array.isArray(arr) && depth > 0) {
      resultArray.push(...arrFlaterner(arr, depth - 1))
    } else {
      resultArray.push(arr)
    }
  })
  return resultArray
}

const array = [
  [1, 2],
  [2, 3, 4],
  [5, 6, 7, [8, 5, [5, 8, 9, [4, 8]], 7]], 20
]

console.log(arrFlaterner(array))