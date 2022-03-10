'use strict';
/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const displayMovements = function (movements) {
  // Generate the HTML associate to each balance
  containerMovements.innerHTML = '';
  movements.forEach(function (quantity, index) {
    const number = index + 1;
    const type = quantity > 0 ? 'deposit' : 'withdrawal';
    const html = `
    <div class="movements__row">
      <div class="movements__type movements__type--${type}">${number} ${type}</div>
      <div class="movements__value">${quantity}</div>
    </div>
    `;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};
const createUsernames = function (accounts) {
  // Create username field
  accounts.forEach(account => {
    // El nombre de usuario es la union de la primera letra de los snombres y apellidos
    account.username = account.owner
      .toLocaleLowerCase() // LLeva todo a minusculas
      .split(' ') /// Separa en un arreglo donde cada elemento es una palabra
      .map(letter => letter[0]) // Regresa la primera letra de cada elemento del arreglo
      .join(''); // Une todo usando un separador nulo
  });
};
const calcDisplayBalance = function (account) {
  // Balance calculation, calculate the account total Balance
  account.balance = account.movements.reduce(
    (balance, movement) => balance + movement,
    0
  );
  labelBalance.textContent = `${balance}`;
};
const calcDisplaySummary = function (account) {
  // Summary Calculation, calculate the account summary of input / output / interests
  let { interestRate, movements } = account;
  const incomes = movements
    .filter(mov => mov > 0)
    .reduce((acc, curr) => acc + curr, 0);
  const outcomes = movements
    .filter(mov => mov > 0)
    .reduce((acc, curr) => acc - curr, 0);
  const interest = movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * interestRate) / 100)
    .filter(int => int >= 1)
    .reduce((total, deposit) => total + deposit, 0);
  labelSumIn.textContent = `${incomes}`;
  labelSumOut.textContent = `${Math.abs(outcomes)}`;
  labelSumInterest.textContent = `${interest}`;
};

createUsernames(accounts);

let currentAccount;
// Event Handlers
btnLogin.addEventListener('click', function (event) {
  // Prevent btnLogin from submittings (default behavior in form buttons)
  event.preventDefault();
  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // ? check if currentAccount exist, if not, stop execution of the statement.
    // Cleanup login and pin fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();
    // Show Wellcome Message
    const wellcomeMsg = `Wellcome back ${currentAccount.owner.split(' ')[0]}!`;
    labelWelcome.textContent = wellcomeMsg;
    containerApp.style.opacity = 100; // Display the app
    // Display and Calculate the user movements, balanace and summary
    displayMovements(currentAccount.movements);
    calcDisplayBalance(currentAccount.movements);
    calcDisplaySummary(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (event) {
  event.preventDefault();
  const amount = inputTransferAmount.value;
  let receiver = accounts.find(
    account => account.username === inputTransferTo.value
  );
  currentAccount.movement.push(amount);
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

///////////////////////////////////////
// Coding Challenge #1

/* 
Julia and Kate are doing a study on dogs. So each of them asked 5 dog owners about their dog's age, and stored the data into an array (one array for each). For now, they are just interested in knowing whether a dog is an adult or a puppy. A dog is an adult if it is at least 3 years old, and it's a puppy if it's less than 3 years old.

Create a function 'checkDogs', which accepts 2 arrays of dog's ages ('dogsJulia' and 'dogsKate'), and does the following things:

1. Julia found out that the owners of the FIRST and the LAST TWO dogs actually have cats, not dogs! So create a shallow copy of Julia's array, and remove the cat ages from that copied array (because it's a bad practice to mutate function parameters)
2. Create an array with both Julia's (corrected) and Kate's data
3. For each remaining dog, log to the console whether it's an adult ("Dog number 1 is an adult, and is 5 years old") or a puppy ("Dog number 2 is still a puppy 🐶")
4. Run the function for both test datasets

HINT: Use tools from all lectures in this section so far 😉

TEST DATA 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
TEST DATA 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]

GOOD LUCK 😀
*/

const CodingChallenge01 = function () {
  console.log('challenge one, Julia and Kate Dogs research');
  const checkDogs = function (dogsJulia, dogsKate) {
    console.log({ dogsJulia, dogsKate });
    // 1. remove Julia First and Last Two owners (as they own cats, not dogs) from shallow copy
    const dogsJuliaCorrected = [...dogsJulia];
    dogsJuliaCorrected.splice(0, 1);
    dogsJuliaCorrected.splice(-2, 2);
    console.log({ dogsJuliaCorrected });
    // 2. Merge Arrays
    const JuliaKateDogs = [...dogsJuliaCorrected, ...dogsKate];
    console.log({ JuliaKateDogs });
    // 3. Log if the dog is either a puppy or an adult
    JuliaKateDogs.forEach(function (age, index) {
      const number = index + 1;
      const string =
        age >= 3
          ? `Dog number ${number} is an adult, and is ${age} years old`
          : `Dog number ${number} is still a puppy 🐶`;
      console.log(string);
    });
  };
  console.log('First test Case');
  checkDogs([3, 5, 2, 12, 7], [4, 1, 15, 8, 3]);

  console.log('Second Test Case');
  checkDogs([9, 16, 6, 8, 3], [10, 5, 6, 1, 4]);
};

// CodingChallenge01();

/////////////////////////////////////////////////
// MAPS
///////////////////////////////////////

const lessonMaps = function () {
  const originalArray = [1, -2, 3, -4, -5, -6, -7, 8, 9, 10];
  const modifiedArray = originalArray.map(element => element * 100);
  const movementsDescription = modifiedArray.map(
    (mov, i) =>
      `Movement ${i + 1}: You ${mov > 0 ? 'deposited' : 'withdrew'} ${Math.abs(
        mov
      )}`
  );
  console.log({ originalArray, modifiedArray, movementsDescription });
};

// lessonMaps();

/////////////////////////////////////////////////
// Filter
///////////////////////////////////////

const lessonFilters = function () {
  const movements = [-1000, 2000, 3000, 400, -5, -200, 400, -700, 1000];
  const deposits = movements.filter(function (mov) {
    return mov > 0;
  });
  const withdrawals = movements.filter(function (mov) {
    return mov < 0;
  });
  const depositOneLine = movements.filter(value => value > 0);
  const withdrawalsOneLine = movements.filter(mov => mov < 0);
  console.log({
    movements,
    deposits,
    withdrawals,
    depositOneLine,
    withdrawalsOneLine,
  });
};

// lessonFilters();

/////////////////////////////////////////////////
// REDUCERS
///////////////////////////////////////

const reducersLesson = function () {
  const movements = [-1000, 2000, 3000, 400, -5, -200, 400, -700, 1000];
  const balance = movements.reduce(function (balance, current, index) {
    console.log(`interation ${index}: accumulated balance: ${balance}`);
    return balance + current;
  }, 0);
  const balanceOneLine = movements.reduce(
    (total, current) => total + current,
    0
  );
  console.log({ movements, balance, balanceOneLine });
};
// reducersLesson();

// Coding Challenge #2

/* 
Let's go back to Julia and Kate's study about dogs. This time, 
they want to convert dog ages to human ages and calculate the average age of the dogs in their study.

Create a function 'calcAverageHumanAge', which accepts an arrays of dog's ages ('ages'), 
and does the following things in order:

1. Calculate the dog age in human years using the following formula:6
  if the dog is <= 2 years old, humanAge = 2 * dogAge. If the dog is > 2 years old, humanAge = 16 + dogAge * 4.
2. Exclude all dogs that are less than 18 human years old 
  (which is the same as keeping dogs that are at least 18 years old)
3. Calculate the average human age of all adult dogs 
  (you should already know from other challenges how we calculate averages 😉)
4. Run the function for both test datasets

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

GOOD LUCK 😀
*/

const CodingChallenge02 = function () {
  const calcAverageHumanAge = function (ages) {
    const humanAges = ages.map(age => (age <= 2 ? 2 * age : 16 + age * 4));
    console.log({ humanAges });
    const adultDogs = humanAges.filter(age => age >= 18);
    console.log({ adultDogs });
    const totalAge = humanAges.reduce((prev, curr) => prev + curr, 0);
    console.log({ totalAge });
    const average = totalAge / adultDogs.length;
    console.log({ average });
  };

  calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
  calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);
};

// Coding Challenge #3

/* 
Rewrite the 'calcAverageHumanAge' function from the previous challenge, but this time as an arrow function, and using chaining!

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

GOOD LUCK 😀
*/
const CodingChallenge03 = function () {
  const calcAverageHumanAge = function (ages) {
    const adultDogs = ages
      .map(age => (age <= 2 ? 2 * age : 16 + age * 4))
      .filter(age => age >= 18);
    const average =
      adultDogs.reduce((prev, curr) => prev + curr, 0) / adultDogs.length;
    console.log({ adultDogs, average });
  };
  calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
  calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);
};

// CodingChallenge03();
