const expensiveFunction = (num) => {
  console.log("expensive function started")
  for (let i = 0; i <= num; i++) {
  }
  console.log("expensive function completed")
  return num
}

const memoize = function (func) {
  const memoizeMap = {}
  return function (...args) {
    let key = JSON.stringify(args)
    if (!memoizeMap[key]) {
      memoizeMap[key] = func.apply(this, args)
    }
    return memoizeMap[key]
  }
}

const memoizedFunction = memoize(expensiveFunction)

console.time("first time")
memoizedFunction(1000)
console.timeEnd("first time")



console.time("second time")
memoizedFunction(120)
console.timeEnd("second time")


console.time("third time")
memoizedFunction(1000)
console.timeEnd("third time")