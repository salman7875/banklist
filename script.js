'use strict'

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
// const account1 = {
//   owner: 'Salman Ansari',
//   movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
//   interestRate: 1.2, // %
//   pin: 1111
// }

// const account2 = {
//   owner: 'Umar Shaikh',
//   movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
//   interestRate: 1.5,
//   pin: 2222
// }

// const account3 = {
//   owner: 'Albar Khan',
//   movements: [200, -200, 340, -300, -20, 50, 400, -460],
//   interestRate: 0.7,
//   pin: 3333
// }

// const account4 = {
//   owner: 'Baqar Syed',
//   movements: [430, 1000, 700, 50, 90],
//   interestRate: 1,
//   pin: 4444
// }
// const accounts = [account1, account2, account3, account4]
// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-07-26T17:01:17.194Z',
    '2020-07-28T23:36:17.929Z',
    '2020-08-01T10:51:36.790Z'
  ],
  currency: 'EUR',
  locale: 'pt-PT' // de-DE
}

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z'
  ],
  currency: 'USD',
  locale: 'en-US'
}

const accounts = [account1, account2]


// Elements
const labelWelcome = document.querySelector('.welcome')
const labelDate = document.querySelector('.date')
const labelBalance = document.querySelector('.balance__value')
const labelSumIn = document.querySelector('.summary__value--in')
const labelSumOut = document.querySelector('.summary__value--out')
const labelSumInterest = document.querySelector('.summary__value--interest')
const labelTimer = document.querySelector('.timer')

const containerApp = document.querySelector('.app')
const containerMovements = document.querySelector('.movements')

const btnLogin = document.querySelector('.login__btn')
const btnTransfer = document.querySelector('.form__btn--transfer')
const btnLoan = document.querySelector('.form__btn--loan')
const btnClose = document.querySelector('.form__btn--close')
const btnSort = document.querySelector('.btn--sort')

const inputLoginUsername = document.querySelector('.login__input--user')
const inputLoginPin = document.querySelector('.login__input--pin')
const inputTransferTo = document.querySelector('.form__input--to')
const inputTransferAmount = document.querySelector('.form__input--amount')
const inputLoanAmount = document.querySelector('.form__input--loan-amount')
const inputCloseUsername = document.querySelector('.form__input--user')
const inputClosePin = document.querySelector('.form__input--pin')

// Calculating OVERALL Bank Balance
 
// const totalBalance1 = accounts
//   .map(acc => acc.movements)
//   .flat()
//   .reduce((acc, mov) => acc + mov, 0);
// console.log(totalBalance1);

const totalBalance = accounts
  .flatMap(acc => acc.movements)
  .reduce((acc, mov) => acc + mov, 0);
console.log(totalBalance);

//  PLAY
const updateUI = function(account) {
  // Display MOVEMENTS
  displayUI(account.movements)
  // Display CALCULATED BALANCE
  calcDisplayBalance(account)
  // Display SUMMARY
  calcDisplaySummary(account);
}

// Displaying UI
const displayUI = function(movements, sort = false) {
  // Removing DEMO Data
  containerMovements.innerHTML = ''

  // SORTING
  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  movs.forEach((mov, i, arr) => {
    const checkType = mov > 0 ? 'deposit' : 'withdrawal'
    const html = `
    <div class="movements__row">
    <div class="movements__type movements__type--${checkType}">${i +
      1} ${checkType}</div>
    <div class="movements__value">${mov}€</div>
    </div>
    `
    containerMovements.insertAdjacentHTML('afterbegin', html)
  })
}

// Generating USERNAME
const createUsername = function(accounts) {
  accounts.forEach(acc => {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(word => word[0])
      .join('')
  })
}
createUsername(accounts);

// CALCULATING BALANCE
const calcDisplayBalance = function(account) {
  account.balance = account.movements.reduce((acc, mov, i, arr) => {
    return acc + mov;
  }, 0);
  // account.balance = balance;
  labelBalance.textContent = `${account.balance}€`;
}

// CALCULATING FOOTER
const calcDisplaySummary = function(account) {
  // DEPOSITS
  const deposits = account.movements
    .filter((dep, i) => dep > 0)
    .reduce((acc, cur) => acc + cur, 0)

  labelSumIn.textContent = `${deposits}€`;

  // WITHDRAWAL
  const withdrawal = account.movements
    .filter((wit, i) => wit < 0)
    .reduce((acc, cur) => acc + cur, 0);
  
  labelSumOut.textContent = `${Math.abs(withdrawal)}€`;

  // INTEREST
  const interest = account.movements
    .filter((dep, i) => dep > 0)
    .map((cur, i, arr) => (cur * account.interestRate) / 100)
    .filter((cur, i) => cur >= 1)
    .reduce((acc, cur) => acc + cur, 0);

  labelSumInterest.textContent = `${interest}€`;
}

// SORTING
let sorted = false;
btnSort.addEventListener('click', function(e) {
  e.preventDefault();

  displayUI(currentAccount.movements, !sorted);
  // flipping sorted variable
  sorted = !sorted;
})

// LOGIN
let currentAccount;

btnLogin.addEventListener('click', function(e) {
  e.preventDefault();

  currentAccount = accounts.find(acc => acc.username === inputLoginUsername.value.trim());
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Display UI and welcome MESSAGE
    containerApp.style.opacity = 100;
    labelWelcome.textContent = `Welcome back, ${currentAccount.owner.split(' ')[0]}`;
    updateUI(currentAccount);
  } else {
    console.log('404: Not Found');
    labelWelcome.textContent = '404: User not Found';
    containerApp.style.opacity = 0;
  }

  // Clearing Input Field
  inputLoginUsername.value = inputLoginPin.value = '';
  inputLoginPin.blur();
})

// Transfer MONEY
btnTransfer.addEventListener('click', function(e) {
  e.preventDefault();

  const amount = Number(inputTransferAmount.value);
  const recieverAccount = accounts.find(acc => acc.username === inputTransferTo.value);

  // CLEARING INPUT
  inputTransferTo.value = inputTransferAmount.value = '';
  inputTransferAmount.blur();

  if (amount > 0 && amount <= currentAccount.balance && recieverAccount?.username !== currentAccount.username) {
    // DOING TRANSFER
    currentAccount.movements.push(-amount);
    recieverAccount.movements.push(amount);

    // UPDATE UI
    updateUI(currentAccount);
  }
})

// LOAN
btnLoan.addEventListener('click', function(e) {
  e.preventDefault();

  const amount = Number(inputLoanAmount.value);
  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount / 10)) {
    // Add movement
    currentAccount.movements.push(amount);
    // Update UI
    updateUI(currentAccount);
  } else {
    console.log('You are not Eligible for LOAN');
  }

  // Clearing INPUT FIELD
  inputLoanAmount.value = '';
  inputLoanAmount.blur(); 
});

// DELETE ACCOUNT
btnClose.addEventListener('click', function(e) {
  e.preventDefault();

  
  if (currentAccount.username === inputCloseUsername.value && currentAccount.pin === Number(inputClosePin.value)) {
    const index = accounts.findIndex(acc => acc.username === currentAccount.username);
    accounts.splice(index, 1);
    console.log(index);
    // Hidding UI
    containerApp.style.opacity = 0;
    labelWelcome.textContent = 'Account Deleted';
  } else {
    labelWelcome.textContent = '404: User Not Found'
    console.log('User Not Found');
  }
  
  // clearing FIELDS
  inputCloseUsername.value = inputClosePin.value = '';
  inputClosePin.blur();
});