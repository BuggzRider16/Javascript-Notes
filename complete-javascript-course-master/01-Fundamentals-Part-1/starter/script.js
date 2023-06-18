/*
-) This will also work but it will create a property on global object
*/

firstName = 'Buggz'
console.log(firstName)

/* ========= Operators =======
-) 2**3 is 2^3 or 2*2*2 
*/


/*========= Strings =======
-) 
*/

// Multiple line in normal strings
console.log('String with \n\
multiple\n\
lines')

// Multiple line in template strings
console.log(`Strings with 
multiple
lines`)


/*========= Type Conversion & Coercion ===========

/* === Type conversion ===
-) To convert number to string use String() or add "" to a number 
-) To convert string to number we can use
   1) Number()
   2) parseInt()
-) When we try to give a non-number string in these methods it gives NaN
-) typeOf Nan is number
*/
const inputYear = '1991'
console.log(Number(inputYear), inputYear)
console.log(Number(inputYear) + 18)

console.log(Number('Jonas'))
console.log(typeof NaN)

console.log(String(23), 23)

/* === Type coercion ===
-) It is the automatic convertion of one datatype to another.
-) for string it only works if + operator is used, if we use -, *, /, > ... it will perform the operation on the 
   numbers
*/
console.log('I am ' + 23 + ' years old')
console.log('23' - '10' - 3)
console.log('23' / '2')
console.log('23' > '18')

let n = '1' + 1 // '11'
n = n - 1 //10
console.log(n) //10

console.log('10' - '4' - '3' - 2 + '5') //15


/*=======Falsy values =============
-) null, 0 ,'', undefined,NAN
*/

/*
-) Converting new JS language to older JS language for prod is called transpiling and polyfill
*/

/*
-) function declaration is hoisted (can be used before declaration), but function expressions are not hoisted.
*/