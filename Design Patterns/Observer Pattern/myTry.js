class Subject {
    constructor() {
        this.observer = {}
    }
    subscribe(fn) {
        this.observer[fn.name] = fn
    }
    unsubscribe(key) {
        delete this.observer[key]
    }
    fire() {
        Object.entries(this.observer).forEach(key => {
            const fn = this.observer[key]
            if (typeof fn === "function") {
                fn()
            }
        })
    }
}

const subject = new Subject();

const observer1 = () => {
    console.log('Observer1 fired');
};

const observer2 = () => {
    console.log('Observer2 fired');
};

subject.subscribe(observer1, "observer1");
subject.subscribe(observer2, "observer2");

subject.fire();