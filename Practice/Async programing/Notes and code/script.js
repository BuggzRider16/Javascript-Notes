'use strict';

const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(() => {
      console.log(
        `Waiting done for ${seconds} seconds printed inside wait promise`
      );
      resolve(`Waiting done for ${seconds} seconds`);
    }, seconds * 1000);
  });
};

/*================= Asynchronous JS ================
-) 
*/

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

/*======= Our First AJAX Call: XMLHttpRequest===========
-) First we create new XMLHttpRequest object and on its .open() to call the URL
-) To send the request we use .send().
-) To recieve the response we add event listner to the request object.
*/

// const getCountryData = function (country) {
//     const request = new XMLHttpRequest();
//     request.open('GET', `https://restcountries.eu/rest/v2/name/${country}`);
//     request.send();

//     request.addEventListener('load', function () {
//         const [data] = JSON.parse(this.responseText);
//         console.log(data);

//         const html = `
//   <article class="country">
//     <img class="country__img" src="${data.flag}" />
//     <div class="country__data">
//       <h3 class="country__name">${data.name}</h3>
//       <h4 class="country__region">${data.region}</h4>
//       <p class="country__row"><span>👫</span>${(
//                 +data.population / 1000000
//             ).toFixed(1)} people</p>
//       <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
//       <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
//     </div>
//   </article>
//   `;
//         countriesContainer.insertAdjacentHTML('beforeend', html);
//         countriesContainer.style.opacity = 1;
//     });
// };

// getCountryData('portugal');
// getCountryData('usa');
// getCountryData('germany');

/*============ Issues with callbacks ==================
-) When our code grows horizontally due to callbacks instead of growing vertically, then it is called callback hell.
-) It biggest drawback of callback hell is inversion of control. It means giving control of a part of code to another. 
   For eg. if parent function code has a bug the whole tree will fail, like callbacks called twice or not called at all.
*/

/*
const getCountryAndNeighbour = function (country) {
  // AJAX call country 1
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.eu/rest/v2/name/${country}`);
  request.send();

  request.addEventListener('load', function () {
    const [data] = JSON.parse(this.responseText);
    console.log(data);

    // Render country 1
    renderCountry(data);

    // Get neighbour country (2)
    const [neighbour] = data.borders;

    if (!neighbour) return;

    // AJAX call country 2
    const request2 = new XMLHttpRequest();
    request2.open('GET', `https://restcountries.eu/rest/v2/alpha/${neighbour}`);
    request2.send();

    request2.addEventListener('load', function () {
      const data2 = JSON.parse(this.responseText);
      console.log(data2);

      renderCountry(data2, 'neighbour');
    });
  });
};

// getCountryAndNeighbour('portugal');
getCountryAndNeighbour('usa');

setTimeout(() => {
  console.log('1 second passed');
  setTimeout(() => {
    console.log('2 seconds passed');
    setTimeout(() => { 
      console.log('3 second passed');
      setTimeout(() => {
        console.log('4 second passed');
      }, 1000);
    }, 1000);
  }, 1000);
}, 1000);

*/
/* =========== Promises =====================
  -) A Promise is an object representing the eventual completion or failure of an asynchronous operation.
  -) Essentially, a promise is a returned object to which you attach callbacks, instead of passing callbacks into a function.
  -) A promise has a 'then' property which is executed when a promise is completed/rejected, which receives two functions as
     callback, first one runs if the promise is successful, second runs when the promise is failed.
  -) Data returned by promise is not mutable.
  -) A promise has 3 states: 
     1) pending
     2) fulfilled (success)
     3) rejected (error)
  -) Unlike old-fashioned passed-in callbacks, a promise comes with some guarantees:
     -) Callbacks added with then() will never be invoked before the completion of the current run of the JavaScript event loop.
     -) These callbacks will be invoked even if they were added after the success or failure of the asynchronous operation that the promise represents.
     -) Multiple callbacks may be added by calling then() several times. They will be invoked one after another, in the order in which they were inserted.
  -) We can attach then() and catch() in two ways -> 
     -) If .then() is attached before .catch(), then .catch() can also handle errors in then block
     -) if .catch() is attached before .then(), then it can handle the error from the promise not from .then() and allow the .then() handler to still get 
        called which will expect input from catch return. 
  -) Finally
      -) We have finally which always runs if the promise is completed or rejected.The finally block doesn’t receive any value, 
         and anything returned from finally is not considered in the then block.
      -) We have a finally (same as then and catch). 
      -) It will run at the end of chain always( no matter if the promise is resolved or rejected).
      -) Finally works on the value returned by catch.
  -) Microtask Queue
      -).then of a promise is in MicroTask queue and other asynchronous tasks like setTimeout() are in callback queue
      -) Microtask have more priority than callback queue.
      -) So if we have a promise and timmer taking same time to complete, promise will be executed first 
         (irrespective of the timmers time, which may delay the timer).
  -) Promise based output questions -> https://codeburst.io/javascript-interview-questions-promises-1ab2fb7f0467
*/
// Consuming Promises
// const getCountryData = function (country) {
//   fetch(`https://restcountries.eu/rest/v2/name/${country}`)
//     .then(function (response) {
//       console.log(response);
//       return response.json();
//     })
//     .then(function (data) {
//       console.log(data);
//       renderCountry(data[0]);
//     });
// };

// Chaining Promises
// Handling Rejected Promises
// const getCountryData = function (country) {
//   // Country 1
//   fetch(`https://restcountries.eu/rest/v2/name/${country}`)
//     .then(response => {
//       console.log(response);

//       if (!response.ok)
//         throw new Error(`Country not found (${response.status})`);

//       return response.json();
//     })
//     .then(data => {
//       renderCountry(data[0]);
//       // const neighbour = data[0].borders[0];
//       const neighbour = 'dfsdfdef';

//       if (!neighbour) return;

//       // Country 2
//       return fetch(`https://restcountries.eu/rest/v2/alpha/${neighbour}`);
//     })
//     .then(response => {
//       if (!response.ok)
//         throw new Error(`Country not found (${response.status})`);

//       return response.json();
//     })
//     .then(data => renderCountry(data, 'neighbour'))
//     .catch(err => {
//       console.error(`${err} 💥💥💥`);
//       renderError(`Something went wrong 💥💥 ${err.message}. Try again!`);
//     })
//     .finally(() => {
//       countriesContainer.style.opacity = 1;
//     });
// };

// Throwing Errors Manually
// const getCountryData = function (country) {
//   // Country 1
//   getJSON(
//     `https://restcountries.eu/rest/v2/name/${country}`,
//     'Country not found'
//   )
//     .then(data => {
//       renderCountry(data[0]);
//       const neighbour = data[0].borders[0];

//       if (!neighbour) throw new Error('No neighbour found!');

//       // Country 2
//       return getJSON(
//         `https://restcountries.eu/rest/v2/alpha/${neighbour}`,
//         'Country not found'
//       );
//     })

//     .then(data => renderCountry(data, 'neighbour'))
//     .catch(err => {
//       console.error(`${err} 💥💥💥`);
//       renderError(`Something went wrong 💥💥 ${err.message}. Try again!`);
//     })
//     .finally(() => {
//       countriesContainer.style.opacity = 1;
//     });
// };

// btn.addEventListener('click', function () {
//   getCountryData('portugal');
// });

// getCountryData('australia');

/*=============== Promise static funtions ==================
-) Promise.all
   -) It takes an iterable of promises and resolves only when all of the promises are either fullfilled or any of them is rejected.
   -) Promise.all() is rejected instantaneously if any of the promises passed to it fails, and it will return the error of that rejected promise.
   -) In case of success it returns an array of resolved data, but in case of failure of any one promise, it will return error.
*/

const result = Promise.all([wait(1), wait(3), wait(5)]);
result.then(item => console.log(item));
/*
-) Promise.allSettled()
   -) It is same as that of Promise.all(), but in case of single promise failure it will wait for all the remaining promises to get settled.
   -) It will return an array of success/error object of respective fullfilled/rejected promises.
*/

/*
-) Promise.race()
   -) It returns the value of first settled promise. Settled promise can be fulfilled or rejected.
*/

/*
-) Promise.any()
   -) It returns the fulfilled value. 
   -) If all the promises fail it will give an agregate error. So in catch we need to extract the error array from error.errors key.
*/

/*=============== The Event Loop ==================
-) A tick is the dequeuing of an event from the "event loop queue" and the execution of said event.
-) Process tick -> Every time the event loop takes a full trip, we call it a tick.
-) If your statement is asynchronous: setTimeout, ajax(), promise, or click event, then that
   code gets forwarded to Event table, this table is responsible for moving your asynchronous code to
   callback/event queue after specified time.
-) Generally all the callback of an event are stored in a callback queue / task queue and are
   executed on first come first serve basis, but the promises are stored in a microtask queue / Job Queue which
   has priority over callback queue , so if there are many promises in the microtask queue it
   may cause the callback queue to starve.
-) Promises and Mutation observer goes to the microtask queue.
*/

// console.log('Test start');
// setTimeout(() => console.log('0 sec timer'), 0);
// Promise.resolve('Resolved promise 1').then(res => console.log(res)); //this is a promise that will reslove immediatly

// Promise.resolve('Resolved promise 2').then(res => {
//   for (let i = 0; i < 1000000000; i++) {}
//   console.log(res);
// });

// console.log('Test end');

/*================ Building a Simple Promise ====================*/

const lotteryPromise = new Promise(function (resolve, reject) {
  console.log('Lotter draw is happening 🔮');
  setTimeout(function () {
    if (Math.random() >= 0.5) {
      resolve('You WIN 💰');
    } else {
      reject(new Error('You lost your money 💩'));
    }
  }, 2000);
});

lotteryPromise.then(res => console.log(res)).catch(err => console.error(err));

// Promisifying setTimeout (Promisifying means converting a callback based execution into a promise based function)
const waitEg = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(() => {
      console.log(
        `Waiting done for ${seconds} seconds printed inside wait promise`
      );
      resolve(`Waiting done for ${seconds} seconds`);
    }, seconds * 1000);
  });
};

wait(1)
  .then(() => {
    console.log('1 second passed');
    return wait(1);
  })
  .then(() => {
    console.log('2 second passed');
    return wait(1);
  })
  .then(() => {
    console.log('3 second passed');
    return wait(1);
  })
  .then(() => console.log('4 second passed'));

// setTimeout(() => {
//   console.log('1 second passed');
//   setTimeout(() => {
//     console.log('2 seconds passed');
//     setTimeout(() => {
//       console.log('3 second passed');
//       setTimeout(() => {
//         console.log('4 second passed');
//       }, 1000);
//     }, 1000);
//   }, 1000);
// }, 1000);

Promise.resolve('abc').then(x => console.log(x));
Promise.reject(new Error('Problem!')).catch(x => console.error(x));

///////////////////////////////////////
// Promisifying the Geolocation API
const getPosition = function () {
  return new Promise(function (resolve, reject) {
    // navigator.geolocation.getCurrentPosition(
    //   position => resolve(position),
    //   err => reject(err)
    // );
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};
// getPosition().then(pos => console.log(pos));

const whereAmI = function () {
  getPosition()
    .then(pos => {
      const { latitude: lat, longitude: lng } = pos.coords;

      return fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
    })
    .then(res => {
      if (!res.ok) throw new Error(`Problem with geocoding ${res.status}`);
      return res.json();
    })
    .then(data => {
      console.log(data);
      console.log(`You are in ${data.city}, ${data.country}`);

      return fetch(`https://restcountries.eu/rest/v2/name/${data.country}`);
    })
    .then(res => {
      if (!res.ok) throw new Error(`Country not found (${res.status})`);

      return res.json();
    })
    .then(data => renderCountry(data[0]))
    .catch(err => console.error(`${err.message} 💥`));
};

btn.addEventListener('click', whereAmI);

/*================= Async and Await ==================
 -) Async/Await provides a cleaner way to use Promises
 -) A function defined async means that the function will get paused when the async task is running in background, but the
    overvall execution will continue
 -) We use await before the async funtion to show that this function should wait for the promise to return a value.
 -) Async funtion always return a promise.

 -) Await makes the function wait till the promise is settled.Whenever an async function encounters await with a promise
    it removes the function from the call stack and waits for the promise to get settled.
*/

async function getData(){
  return "hello"
}

getData().then(res => console.log(res)) //hello

/*
 -) Execution of async/await flow
    -) Considering the below example, first "Hello world" will be printed then once the function encounters the first await it
       will suspend the function execution till p1 is settled
*/

const p1 = new Promise((resolve,reject)=>setTimeout(resolve("P1 completed"),1000))
const p2 = new Promise((resolve,reject)=>setTimeout(resolve("P2 completed"),2000))

const handlePromise1 = async() => {
  console.log("Hello world")

  const res1 = await p1
  console.log("p1 result")
  console.log(res1)

  const res2 = await p2
  console.log("p2 result")
  console.log(res2)
}
handlePromise1()