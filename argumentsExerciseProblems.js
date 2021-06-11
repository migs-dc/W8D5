// PHASE ONE

// sum using arguments

// function sum () {
//   let result = 0;
//   for (let i = 0; i < arguments.length; i++) {
//     result += arguments[i];
//   }
//   return result;
// }

// sum using ...

function sum (...args) {
  let result = 0;
  for (let i = 0; i < args.length; i++) {
    result += args[i];
  }
  return result;
}

// sum(1, 2, 3, 4) === 10;
// sum(1, 2, 3, 4, 5) === 15;

// PHASE TWO

// myBind method using arguments
// Function.prototype.myBind = function (context) {
//   const that = this;
//   let args = Array.from(arguments);
//   // or let args = [...arguments];
//   args = args.slice(1);
//   return function () {
//     return that.apply(context, args.concat(Array.from(arguments)));
//   }
// }

//using ... rest operator
Function.prototype.myBind = function (context, ...args) {
  const that = this;
  return function (...innerArgs) {
    return that.apply(context, args.concat(innerArgs));
  }
}

class Cat {
  constructor(name) {
    this.name = name;
  }

  says(sound, person) {
    console.log(`${this.name} says ${sound} to ${person}!`);
    return true;
  }
}

class Dog {
  constructor(name) {
    this.name = name;
  }
}

const markov = new Cat("Markov");
const pavlov = new Dog("Pavlov");

// markov.says("meow", "Ned");
// Markov says meow to Ned!
// true

// bind time args are "meow" and "Kush", no call time args
// markov.says.myBind(pavlov, "meow", "Kush")();
// Pavlov says meow to Kush!
// true

// no bind time args (other than context), call time args are "meow" and "a tree"
// markov.says.myBind(pavlov)("meow", "a tree");
// Pavlov says meow to a tree!
// true

// bind time arg is "meow", call time arg is "Markov"
// markov.says.myBind(pavlov, "meow")("Markov");
// Pavlov says meow to Markov!
// true

// no bind time args (other than context), call time args are "meow" and "me"
const notMarkovSays = markov.says.myBind(pavlov);
// notMarkovSays("meow", "me");
// Pavlov says meow to me!
// true

// PHASE THREE

// curriedSum function
function curriedSum(numArgs) {
  const numbers = [];

  return function _curriedSum(num) {
    numbers.push(num);
    if (numbers.length === numArgs) {
      return numbers.reduce((a, b) => a + b, 0)
    }
    return _curriedSum;
  }
}

const total = curriedSum(4);
// console.log(total(5)(30)(20)(1));


// PHASE FOUR

// curry function with apply
// Function.prototype.curry = function(numArgs) {
//   const args = [];
//   const that = this;

//   return function _curriedFunc(arg) {
//     args.push(arg);
//     if (args.length < numArgs) {
//       return _curriedFunc;
//     }
//     return that.apply(this, args);
//   }
// }

// curry function with ... rest operator
Function.prototype.curry = function (numArgs) {
  const args = [];
  const that = this;

  return function _curriedFunc(arg) {
    args.push(arg);
    if (args.length < numArgs) {
      return _curriedFunc;
    }
    return that(...args);
  }
}

// function sum() {
//   let total = 0;
//   for (let i = 0; i < arguments.length; i++) {
//     total += arguments[i];
//   }
//   return total;
// };

// const sumCurry = sum.curry(3);