'use strict';

const codingChallenge01 = function () {
  ///////////////////////////////////////
  // Coding Challenge #1

  /* 
1. Use a constructor function to implement a Car. A car has a make and a speed property. The speed property is the current speed of the car in km/h;
2. Implement an 'accelerate' method that will increase the car's speed by 10, and log the new speed to the console;
3. Implement a 'brake' method that will decrease the car's speed by 5, and log the new speed to the console;
4. Create 2 car objects and experiment with calling 'accelerate' and 'brake' multiple times on each of them.

DATA CAR 1: 'BMW' going at 120 km/h
DATA CAR 2: 'Mercedes' going at 95 km/h

GOOD LUCK 😀
*/

  const Car = function (make, speed) {
    this.make = make;
    this.speed = speed;
  };

  Car.prototype.accelerate = function () {
    this.speed += 10;
    console.log(`${this.make} going ${this.speed}km/h`);
  };

  Car.prototype.brake = function () {
    this.speed -= 5;
    console.log(`${this.make} going ${this.speed}km/h`);
  };

  const car1 = new Car('BMW', 120);
  const car2 = new Car('Mercedes', 95);

  car1.accelerate();
  car1.accelerate();
  car1.brake();

  car2.brake();
  car2.brake();
  car2.brake();
  car2.brake();
  car2.accelerate();
};

// codingChallenge01();

const codingChallenge02 = function () {
  ///////////////////////////////////////
  // Coding Challenge #2
  /* 
1. Re-create challenge 1, but this time using an ES6 class;
2. Add a getter called 'speedUS' which returns the current speed in mi/h (divide by 1.6);
3. Add a setter called 'speedUS' which sets the current speed in mi/h (but converts it to km/h before storing the value, by multiplying the input by 1.6);
4. Create a new car and experiment with the accelerate and brake methods, and with the getter and setter.

DATA CAR 1: 'Ford' going at 120 km/h

GOOD LUCK 😀
*/

  class Car {
    constructor(make, speed) {
      this._make = make;
      this._speed = speed;
    }
    get make() {
      return this._make;
    }
    set make(make) {
      this._make = make;
    }
    get speed() {
      return this._speed;
    }
    set speed(speed) {
      this._speed = speed;
    }
    get speedUS() {
      return this.speed / 1.6;
    }
    set speedUS(speed) {
      this.speed = speed * 1.6;
    }
    accelerate() {
      this.speed += 10;
      console.log(`${this.make} speed: ${this.speed}`);
    }
    break() {
      this.speed -= 10;
      console.log(`${this.make} speed: ${this.speed}`);
    }
  }

  const car1 = new Car('Ford', 120);
  car1.accelerate();
  car1.break();

  console.log(car1.speed);
  console.log(car1.speedUS);

  console.log((car1.speedUS = 100));
  console.log(car1.speedUS);
  console.log(car1.speed);
};
codingChallenge02();

const codingChallenge03 = function () {
  // Coding Challenge #4
  /* 
1. Re-create challenge #3, but this time using ES6 classes: create an 'EVCl' child class of the 'CarCl' class
2. Make the 'charge' property private;
3. Implement the ability to chain the 'accelerate' and 'chargeBattery' methods of this class, and also update the 'brake' method in the 'CarCl' class. They experiment with chining!

DATA CAR 1: 'Rivian' going at 120 km/h, with a charge of 23%

GOOD LUCK 😀
*/
};
