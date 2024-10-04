//sum(1)(2)(3)(4)

function sum(arg1){
  return function(arg2){
    if(arg2)
      return sum(arg1 + arg2)
    return arg1
  }
}

console.log(sum(1)(2)(3)(4)())