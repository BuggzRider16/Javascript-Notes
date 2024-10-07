class MyPromise {

  #resolveValued
  #rejectedValue
  #thenCallback
  #catchCallback
  #isCalled


  constructor(executor) {
    executor(this.#resolve.bind(this), this.#reject.bind(this))
    this.isResolved=false
    this.resolvedValue=null
    this.status={ '<pending>': null }
  }

  #resolve(val) {
    this.isResolved = true
    this.resolvedValue = val
    this.status = { '<fulfilled>': val }
    if (!this.#isCalled && typeof this.#thenCallback === 'function') {
      this.#thenCallback(val)
      this.#isCalled = true
    }
    this.#resolveValued = val
  }

  #reject(val) {
    if (!this.#isCalled && typeof this.#catchCallback === 'function') {
      this.#catchCallback(val)
      this.#isCalled = true
    }
    this.#rejectedValue = val
  }

  then(callback) {
    if (!this.#isCalled && this.#resolveValued) {
      callback(this.#resolveValued)
      this.#isCalled = true
    }
    this.#thenCallback = callback
    return this
  }

  catch(callback) {
    if (!this.#isCalled && this.#rejectedValue) {
      callback(this.#rejectedValue)
      this.#isCalled = true
    }
    this.#catchCallback = callback
    return this
  }

}

const lottery = new MyPromise((resolve, reject) => {
  setTimeout(function () {
    if (true) {
      resolve('You WIN 💰');
    } else {
      reject(new Error('You lost your money 💩'));
    }
  }, 5000);
})
console.log(lottery)
lottery
  .then(res => {console.log(lottery); console.log("response", res); return new MyPromise((resolve, reject) => {
    setTimeout(function () {
      if (true) {
        resolve('You WIN 💰');
      } else {
        reject(new Error('You lost your money 💩'));
      }
    }, 5000);
  })})
  .then(res => {console.log(lottery); console.log("response2", res); return JSON.stringify(res)})
  .catch(err => console.log(err))