//sum(1,2,3,4) -> sum(1)(2)(3)(4)

function curry(func) {
  return function curriedFunc(...args) {
    if (args.length >= func.length) {
      return func(...args)
    } else {
      return function (...nextArgs) {
        return curriedFunc(...nextArgs, ...args)
      }
    }
  }

}

function sum(a, b, c, d) {
  return a + b + c + d
}
const totalCurry = curry(sum)
console.log(totalCurry(1)(2)(3)(4))