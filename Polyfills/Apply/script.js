
Function.prototype.myApply = function (refObj, ...args) {
  refObj.fnToCall = this
  refObj.fnToCall(...args)
}

const myFunction = function (company, state) {
  console.log(this.name, company, state)
}


const objA = {
  name: 'Buggz',
}

const applyedFunction = myFunction.myApply(objA, 'walmart')

applyedFunction('uttarakhand')