const loggerFunc = () => {
    console.count("Throttled Function");
}

const throttle = (fn, limit) => {
    let flag = true;
    return function () {
        let context = this;
        let args = arguments;
        if (flag) {
            fn.apply(context, args);
            flag = false;
            setTimeout(() => {
                flag = true;
            }, limit);
        }
    }
}

const betterFunction = throttle(loggerFunc, 1000);


const normalFunction = () => {
    console.count("Normal Function");
}


