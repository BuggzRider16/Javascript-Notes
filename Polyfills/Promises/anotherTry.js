function MyPromise(executor) {
    let onResolve;
    let onReject;
    let isFulfilled = false;
    let isRejected = false;
    let isCalled = false;
    let value;
    let error;
  
    function resolve(val) {
        isFulfilled = true;
        value = val;
        if (typeof onResolve === 'function' && !isCalled) {
            onResolve(val);
            isCalled = true;
        }
    }
  
    function reject(err) {
        isRejected = true;
        error = err;
        if (typeof onReject === 'function' && !isCalled) {
            onReject(err);
            isCalled = true;
        }
    }
  
    MyPromise.prototype.then = function (thenHandler) {
        onResolve = thenHandler;
        if (!isCalled && isFulfilled) {
            onResolve(value);
            isCalled = true;
        } return this;
    }
  
    MyPromise.prototype.catch = function (catchHandler) {
        onReject = catchHandler;
        if (!isCalled && isRejected) {
            onReject(error);
            isCalled = true;
        }
        return this;
    }
  
    executor(resolve, reject);
  }
  
  let myPromise = new MyPromise((resolve,reject)=>{
    setTimeout(function () {
      if (Math.random() >= 0.5) {
        resolve('You WIN 💰');
      } else {
        reject(new Error('You lost your money 💩'));
      }
    }, 2000);
  }) 
  
  myPromise
  .then((val)=> console.log(val))
  .catch((err)=> console.log(err))
  
  
  
  
  
  