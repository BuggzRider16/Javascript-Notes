

function deepCopy(input) {
  if (typeof input !== "object") {
    return input
  }
  let result = Array.isArray(input) ? [] : {}
  for (key in input) {
    result[key] = deepCopy(input[key])
  }
  return result

}


const obj = {
  a: "hello",
  b: {
    c: "world",
    d: [1, 2, 3]
  },
  c: [5, 6, 7, [1, 2, 3]]
}