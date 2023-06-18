function Subject() {
    this.observers = [];
  }
  
  Subject.prototype = {
    subscribe: function (fn) {
      this.observers.push(fn);
    },
    unSubscribe: function (fn) {
      this.observers = this.observers.filter(fnc => fn !== fnc);
    },
    fire: function () {
      this.observers.forEach(fn => fn.call());
    },
  };
  
  const subject = new Subject();
  
  const observer1 = () => {
    console.log('Observer1 fired');
  };
  
  const observer2 = () => {
    console.log('Observer2 fired');
  };
  
  subject.subscribe(observer1);
  subject.subscribe(observer2);
  
  subject.fire();
  