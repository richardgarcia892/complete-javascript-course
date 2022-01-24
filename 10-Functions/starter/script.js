'use strict';

const greet = greeting => {
  return name => {
    console.log(`${greeting} ${name}`);
  };
};
// En una linea
// const greet = greeting => name => console.log(`${greeting} ${name}`);

const greetingHey = greet('hey');
greetingHey('Fulano');
greetingHey('sutano');

greet('qlq')('perrito');
