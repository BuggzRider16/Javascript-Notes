Promise.runAll = function (promises) {
    let result = new Array(promises.length);
    let totalPromisesResolved = 0;

    return new Promise((resolve, reject) => {
        promises.forEach((promise, index) => {
            promise
                .then((val) => {
                    result[index] = val;
                    totalPromisesResolved++;
                    if (totalPromisesResolved == promises.length)
                        resolve(result);
                }).catch((err) => {
                    reject(err);
                });
        });
    });
};