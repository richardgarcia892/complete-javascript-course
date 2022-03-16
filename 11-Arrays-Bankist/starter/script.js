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

const displayMovements = function (movements, sort = false) {
  // Generate the HTML associate to each balance
  containerMovements.innerHTML = '';

  const sortedMovements = sort
    ? movements.slice().sort((a, b) => a - b)
    : movements;
  sortedMovements.forEach(function (quantity, index) {
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
  labelBalance.textContent = `${account.balance}`;
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
const updateUI = function (account) {
  displayMovements(account.movements);
  calcDisplayBalance(account);
  calcDisplaySummary(account);
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
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // ? check if currentAccount exist, if not, stop execution of the statement.
    inputLoginUsername.value = inputLoginPin.value = ''; // Cleanup login and pin fields
    inputLoginPin.blur();
    const wellcomeMsg = `Wellcome back ${currentAccount.owner.split(' ')[0]}!`; // Show Wellcome Message
    labelWelcome.textContent = wellcomeMsg;
    containerApp.style.opacity = 100; // Display the app
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (event) {
  event.preventDefault();
  const transferAmount = Number(inputTransferAmount.value);
  let receiverAccount = accounts.find(
    account => account.username === inputTransferTo.value
  );
  inputTransferAmount.value = '';
  inputTransferTo.value = '';
  if (
    transferAmount > 0 &&
    currentAccount.balance > transferAmount &&
    receiverAccount &&
    receiverAccount.username !== currentAccount.username
  ) {
    currentAccount.movements.push(-transferAmount);
    receiverAccount.movements.push(transferAmount);
    updateUI(currentAccount);
  }
});

btnLoan.addEventListener('click', function (event) {
  event.preventDefault();
  const amount = Number(inputLoanAmount.value);
  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    // add movement
    currentAccount.movements.push(amount);
    updateUI(currentAccount);
  }
});

let sorted = false;
btnSort.addEventListener('click', function (event) {
  event.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});

btnClose.addEventListener('click', function (event) {
  event.preventDefault();
  if (
    currentAccount.username === inputCloseUsername.value &&
    currentAccount.pin === Number(inputClosePin.value)
  ) {
    const index = accounts.findIndex(
      account => account.username === currentAccount.username
    );
  }
  accounts.splice(index, 1); // Delete Account
  containerApp.style.opacity = 0; // Hide UI
  inputClosePin = inputCloseUsername === '';
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////

// LECTURES
const lectures = function () {
  const currencies = new Map([
    ['USD', 'United States dollar'],
    ['EUR', 'Euro'],
    ['GBP', 'Pound sterling'],
  ]);
  const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

  // CodingChallenge01
  const CodingChallenge01 = function () {
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

  // Maps
  const lessonMaps = function () {
    const originalArray = [1, -2, 3, -4, -5, -6, -7, 8, 9, 10];
    const modifiedArray = originalArray.map(element => element * 100);
    const movementsDescription = modifiedArray.map(
      (mov, i) =>
        `Movement ${i + 1}: You ${
          mov > 0 ? 'deposited' : 'withdrew'
        } ${Math.abs(mov)}`
    );
    console.log({ originalArray, modifiedArray, movementsDescription });
  };
  // lessonMaps();

  // Filter
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

  // Reducer
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
  const CodingChallenge02 = function () {
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
  // CodingChallenge02()

  // Coding Challenge #3
  const CodingChallenge03 = function () {
    /* 
  Rewrite the 'calcAverageHumanAge' function from the previous challenge, but this time as an arrow function, and using chaining!
  
  TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
  TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]
  
  GOOD LUCK 😀
  */
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

  const someAndEvery = function () {
    const movements = [100, 200, 2000, 3000, 0, -100, -200, -1000, -3300];
    console.log(movements);

    // INCLUDES check for equalliyty
    console.log(movements.includes(200));

    // SOME Check for condition (only one true condition return true)
    console.log(movements.some(mov => mov > 0));
    console.log(movements.some(mov => mov > 5000));
    console.log(movements.some(mov => mov < -1000));

    // EVERY Check for condition only if every condition meets return true
    console.log(movements.every(mov => mov > 0));
    console.log(movements.every(mov => mov > -7000));

    // SEPARATE CALLBACK
    // La condicion del metodo se puede escribir en una variable o constante, para asi reusarla mas facilmente
    // mejor permite mejor mantenibilidad ya que es acorde a DRY
    const greatherThanZero = mov => mov > 0;
    console.log(movements.some(greatherThanZero));
    console.log(movements.every(greatherThanZero));
    console.log(movements.filter(greatherThanZero));
  };
  // someAndEvery();

  // fat and mapFlat
  const flatAndflatMap = function () {
    const arr = [[1, 2, 3, 4], [4, 5, 6], 7, 8, 9];
    console.log(arr.flat());
    const arrDeep = [[[1], 2, [3, 4, 5]], [[6, 7, 8], 9, 0], 10];
    console.log(arrDeep.flat());
    console.log(arrDeep.flat(5));

    // flat
    const overalBalance = accounts
      .map(acc => acc.movements)
      .flat()
      .reduce((acc, mov) => acc + mov, 0);
    console.log(overalBalance);

    // flatMap
    const overalBalance2 = accounts
      .flatMap(acc => acc.movements)
      .reduce((acc, mov) => acc + mov, 0);
    console.log(overalBalance2);
  };
  // flatAndflatMap();

  // Sorting Arrays
  const sortingArray = function () {
    // Strings
    const owners = ['Jonas', 'Zach', 'Adam', 'Martha'];
    console.log(owners.sort());
    console.log(owners);

    // Numbers
    console.log(movements);

    // return < 0, A, B (keep order)
    // return > 0, B, A (switch order)

    // Ascending
    // movements.sort((a, b) => {
    //   if (a > b) return 1;
    //   if (a < b) return -1;
    // });
    movements.sort((a, b) => a - b);
    console.log(movements);

    // Descending
    // movements.sort((a, b) => {
    //   if (a > b) return -1;
    //   if (a < b) return 1;
    // });
    movements.sort((a, b) => b - a);
    console.log(movements);
  };
  // sortingArray();

  const createAndFillArray = function () {
    const y = Array.from({ length: 7 }, () => 1);
    console.log(y);

    const z = Array.from({ length: 7 }, (_, i) => i + 1);
    console.log(z);

    labelBalance.addEventListener('click', function () {
      const movementsUI = Array.from(
        document.querySelectorAll('.movements__value'),
        el => Number(el.textContent.replace('€', ''))
      );
      console.log(movementsUI);

      const movementsUI2 = [...document.querySelectorAll('.movements__value')];
    });
  };
  // createAndFillArray()

  const arrayMethodsPractice = function () {
    // 1.
    const bankDepositSum = accounts
      .flatMap(acc => acc.movements)
      .filter(mov => mov > 0)
      .reduce((sum, cur) => sum + cur, 0);

    console.log(bankDepositSum);

    // 2.
    // const numDeposits1000 = accounts
    //   .flatMap(acc => acc.movements)
    //   .filter(mov => mov >= 1000).length;

    const numDeposits1000 = accounts
      .flatMap(acc => acc.movements)
      .reduce((count, cur) => (cur >= 1000 ? ++count : count), 0);

    console.log(numDeposits1000);

    // Prefixed ++ oeprator
    let a = 10;
    console.log(++a);
    console.log(a);

    // 3.
    const { deposits, withdrawals } = accounts
      .flatMap(acc => acc.movements)
      .reduce(
        (sums, cur) => {
          // cur > 0 ? (sums.deposits += cur) : (sums.withdrawals += cur);
          sums[cur > 0 ? 'deposits' : 'withdrawals'] += cur;
          return sums;
        },
        { deposits: 0, withdrawals: 0 }
      );

    console.log(deposits, withdrawals);

    // 4.
    // this is a nice title -> This Is a Nice Title
    const convertTitleCase = function (title) {
      const capitzalize = str => str[0].toUpperCase() + str.slice(1);

      const exceptions = [
        'a',
        'an',
        'and',
        'the',
        'but',
        'or',
        'on',
        'in',
        'with',
      ];

      const titleCase = title
        .toLowerCase()
        .split(' ')
        .map(word => (exceptions.includes(word) ? word : capitzalize(word)))
        .join(' ');

      return capitzalize(titleCase);
    };

    console.log(convertTitleCase('this is a nice title'));
    console.log(convertTitleCase('this is a LONG title but not too long'));
    console.log(convertTitleCase('and here is another title with an EXAMPLE'));
  };
  // arrayMethodsPractice();

  // Coding Challenge #4
  const CodingChallenge04 = function () {
    /* 
  Julia and Kate are still studying dogs, and this time they are studying if dogs are eating too much or too little.
  Eating too much means the dog's current food portion is larger than the recommended portion, and eating too little is the opposite.
  Eating an okay amount means the dog's current food portion is within a range 10% above and 10% below the recommended portion (see hint).

  1. Loop over the array containing dog objects, and for each dog, calculate the recommended food portion and add it to the object as a new property.
    Do NOT create a new array, simply loop over the array. Forumla: recommendedFood = weight ** 0.75 * 28. (The result is in grams of food, and the weight needs to be in kg)
  2. Find Sarah's dog and log to the console whether it's eating too much or too little. HINT: Some dogs have multiple owners, 
    so you first need to find Sarah in the owners array, and so this one is a bit tricky (on purpose) 🤓
  3. Create an array containing all owners of dogs who eat too much ('ownersEatTooMuch') and an array with all owners of dogs who eat too little ('ownersEatTooLittle').
  4. Log a string to the console for each array created in 3., like this: "Matilda and Alice and Bob's dogs eat too much!" and "Sarah and John and Michael's dogs eat too little!"
  5. Log to the console whether there is any dog eating EXACTLY the amount of food that is recommended (just true or false)
  6. Log to the console whether there is any dog eating an OKAY amount of food (just true or false)
  7. Create an array containing the dogs that are eating an OKAY amount of food (try to reuse the condition used in 6.)
  8. Create a shallow copy of the dogs array and sort it by recommended food portion in an ascending order (keep in mind that the portions are inside the array's objects)

  HINT 1: Use many different tools to solve these challenges, you can use the summary lecture to choose between them 😉
  HINT 2: Being within a range 10% above and below the recommended portion means: current > (recommended * 0.90) && current < (recommended * 1.10). Basically, the current portion should be between 90% and 110% of the recommended portion.

  TEST DATA:

  GOOD LUCK 😀
  */
    const dogs = [
      { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
      { weight: 8, curFood: 200, owners: ['Matilda'] },
      { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
      { weight: 32, curFood: 340, owners: ['Michael'] },
    ];
    const eatingOk = dog =>
      dog.curFood > dog.recFood * 0.9 && dog.curFood < dog.recFood * 1.1;

    // 1
    const calculateRecommendedFoodPortion = function (dogs) {
      dogs.forEach(
        dog => (dog.recommendedFood = Math.trunc(dog.weight ** 0.75 * 28))
      );
      console.log(dogs);
    };
    calculateRecommendedFoodPortion(dogs);

    // 2
    const sarahDog = function (dogs) {
      const sarahDog = dogs.find(dog => dog.owners.includes('Sarah'));
      console.log(
        sarahDog,
        sarahDog.curFood > sarahDog.recommendedFood,
        sarahDog.curFood < sarahDog.recommendedFood
      );
    };
    sarahDog(dogs);

    // 3
    const dogOwner = function (dogs) {
      const ownersEatTooMuch = dogs
        .filter(dog => dog.curFood > dog.recommendedFood)
        .flatMap(dog => dog.owners);
      const ownersEatTooLittle = dogs
        .filter(dog => dog.curFood < dog.recommendedFood)
        .flatMap(dog => dog.owners);
      console.log(ownersEatTooLittle, ownersEatTooMuch);
      // 4
      console.log(`${ownersEatTooMuch.join(' and ')}'s dogs eat too much!`);
      console.log(`${ownersEatTooLittle.join(' and ')}'s dogs eat too little!`);
    };
    dogOwner(dogs);

    // 5
    dogs.forEach(dog => console.log(dog.curFood === dog.recommendedFood));

    //6
    dogs.forEach(dog => console.log(eatingOk(dog)));

    // 7
    const dogsEatingOk = dogs.filter(dog => eatingOk(dog));
    console.log({ dogsEatingOk });

    // 8
    const orderByRecommended = [...dogs].sort(
      (a, b) => a.recommendedFood - b.recommendedFood
    );
    console.log({ orderByRecommended });
  };
  // CodingChallenge04();
};
// lectures();
