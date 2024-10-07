class MyPromise {
  #resolveValued;
  #rejectedValue;
  #thenCallback;
  #catchCallback;
  #isCalled;

  constructor(executor) {
    this.isResolved = false;
    this.isRejected = false;
    this.status = { '<pending>': null };
    this.resolvedValue = null;
    this.rejectedValue = null;
    this.thenCallback = null;
    this.catchCallback = null;
    this.isCalled = false;

    executor(this.#resolve.bind(this), this.#reject.bind(this));
  }

  #resolve(val) {
    this.isResolved = true;
    this.status = { '<fulfilled>': val };
    this.resolvedValue = val;

    if (this.thenCallback) {
      this.thenCallback(val);
    }
  }

  #reject(val) {
    this.isRejected = true;
    this.status = { '<rejected>': val };
    this.rejectedValue = val;

    if (this.catchCallback) {
      this.catchCallback(val);
    }
  }

  then(callback) {
    return new MyPromise((resolve, reject) => {
      const handleThen = () => {
        if (this.isResolved) {
          try {
            const result = callback(this.resolvedValue);
            if (result instanceof MyPromise) {
              result.then(resolve).catch(reject);
            } else {
              resolve(result);
            }
          } catch (error) {
            reject(error);
          }
        } else if (this.isRejected) {
          reject(this.rejectedValue);
        } else {
          this.thenCallback = (val) => {
            try {
              const result = callback(val);
              if (result instanceof MyPromise) {
                result.then(resolve).catch(reject);
              } else {
                resolve(result);
              }
            } catch (error) {
              reject(error);
            }
          };
        }
      };
      handleThen();
    });
  }

  catch(callback) {
    return new MyPromise((resolve, reject) => {
      const handleCatch = () => {
        if (this.isRejected) {
          try {
            const result = callback(this.rejectedValue);
            if (result instanceof MyPromise) {
              result.then(resolve).catch(reject);
            } else {
              resolve(result);
            }
          } catch (error) {
            reject(error);
          }
        } else if (this.isResolved) {
          resolve(this.resolvedValue);
        } else {
          this.catchCallback = (val) => {
            try {
              const result = callback(val);
              if (result instanceof MyPromise) {
                result.then(resolve).catch(reject);
              } else {
                resolve(result);
              }
            } catch (error) {
              reject(error);
            }
          };
        }
      };
      handleCatch();
    });
  }
}
