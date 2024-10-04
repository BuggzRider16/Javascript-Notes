function memoize(func) {
  const memory = {}
  return function (...args) {
    const casheString = JSON.stringify(args)
    if (!memory[casheString]) {
      memory[casheString] = func.apply(context || this, args)
    }
    return memory[casheString]
  }
}