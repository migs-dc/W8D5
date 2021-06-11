// Function.prototype.inherits = function (superClass) {
//   function Surrogate (){};
//   Surrogate.prototype = superClass.prototype;
//   this.prototype = new Surrogate();
//   this.prototype.constructor = this;
// }

Function.prototype.inherits = function (superClass) {
  this.prototype = Object.create(superClass.prototype);
  this.prototype.constructor = this;
}

class MovingObject { // class definition, javascript es6 syntax
  moves() {
    console.log("I am moving");
  }
}

function Ship () {}
Ship.inherits(MovingObject);

function Asteroid () {}
Asteroid.inherits(MovingObject);

Asteroid.prototype.burns = function (){ // original
  console.log("I am burning");
}

const ship = new Ship();
ship.moves();

// ship.burns(); //should throw a not a function error

// const obj = new MovingObject(); // not a function error
// obj.burns();

const asteroid = new Asteroid();
asteroid.burns();

