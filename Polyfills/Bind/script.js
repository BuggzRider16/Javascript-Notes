
Function.prototype.myBind = function (refObj, ...args) {
  const fn = this
  return function (...args2) {
    fn.apply(refObj, [...args, ...args2])
  }
}

Function.prototype.myBindWithoutApply = function (refObj, ...args) {
  refObj.fnToCall = this
  return function (...args2) {
    refObj.fnToCall(...args, ...args2)
  }
}

const myFunction = function (company, state) {
  console.log(this.name, company, state)
}


const objA = {
  name: 'Buggz',
}

const bindedFunction = myFunction.myBind(objA, 'walmart')

bindedFunction('uttarakhand')