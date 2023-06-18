

class MyPromise {
  #resolvedValue = null
  #rejectedValue = null
  #isResolved = false
  #onResolve = []
  #onReject = null
  #onFinally=null
  #isRejected = false
  #status = { '<pending>': null }
  #isCalled = false
  #isFinallyCalled = false

  constructor(fn) {
    fn(this.#resolve.bind(this), this.#reject.bind(this))
  }

  #resolve(resolveValue) {
    this.#isResolved = true
    this.#resolvedValue = resolveValue
    this.#status = { '<fulfilled>': resolveValue }
    if (typeof this.#onResolve === 'function' && !this.#isCalled) {
      this.#onResolve(resolveValue);
      this.#isCalled = true;
    }
  }

  #reject(rejectValue) {
    this.#isRejected = true
    this.#rejectedValue = rejectValue
    this.#status = { '<rejected>': rejectValue }
    if (typeof this.#onReject === 'function' && !this.#isCalled) {
      this.#onReject(rejectValue);
      this.#isCalled = true;
    }
  }

  then(resolvedFn) {
    this.#onResolve.unshift(resolvedFn)
    if (this.#isResolved && !this.#isCalled) {
      resolvedFn(this.#resolvedValue)
      this.#isCalled = true
    }
    return this
  }

  catch(failedFn) {
    this.#onReject = failedFn
    if (this.#isRejected && !this.#isCalled) {
      failedFn(this.#rejectedValue)
      this.#isCalled = true
    }
    return this
  }

  finally(finallyFn) {
    this.#onFinally = finallyFn
    if (this.#isCalled && !this.#isFinallyCalled) {
      finallyFn()
      this.#isFinallyCalled = true
    }
  }
}


const lottery = new MyPromise((resolve, reject) => {
  setTimeout(function () {
    if (Math.random() >= 0.5) {
      resolve('You WIN 💰');
    } else {
      reject(new Error('You lost your money 💩'));
    }
  }, 5000);
})

lottery
  .then(res => console.log(res))
  .catch(err => console.log(err))
  .finally(() => console.log('Ahhh... Finally'))