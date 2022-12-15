'use strict';

// Data
const account1 = {
  owner: 'Salman Ansari',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111
}

const account2 = {
  owner: 'Umar Shaikh',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222
}

const account3 = {
  owner: 'Albar Khan',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333
}

const account4 = {
  owner: 'Baqar Syed',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444
}

const accounts = [account1, account2, account3, account4]

// 1. Total Bank Deposits
const allDeposits = accounts
  .flatMap(acc => acc.movements)
  .filter(deposit => deposit > 0)
  .reduce((acc, mov) => acc + mov, 0)
console.log('Total Deposits in Bank: ', allDeposits)

// 2. How many deposits in the Bank with atleast 1000
const numDeposits = accounts
  .flatMap(acc => acc.movements)
  .filter(deposits => deposits >= 1000).length
console.log('Total Numbers of Deposits are: ', numDeposits)

const noDeposits = accounts
  .flatMap(acc => acc.movements)
  .reduce((count, mov) => {
    if (mov >= 1000) {
      return (count = ++count)
    } else {
      return count
    }
  }, 0)
console.log('Total No. of Deposits in the Bank are: ', noDeposits)

// 3. Create new Object which contains SUM of DEPOSITS and SUM of WITHDRAWAL

const { deposits, withdrawals } = accounts
  .flatMap(acc => acc.movements)
  .reduce(
    (acc, mov, i, arr) => {
      // METHOD 1
      // if (mov > 0) {
      //     acc.deposits += mov;
      // } else {
      //     acc.withdrawals += mov;
      // }
      // return acc;

      // Method 2
      // mov > 0 ? acc.deposits += mov : acc.withdrawals += mov;
      // return acc;

      // Method 3
      acc[mov > 0 ? 'deposits' : 'withdrawals'] += mov
      return acc
    },
    { deposits: 0, withdrawals: 0 }
  )

console.log(deposits)
console.log(withdrawals)

// Create an Array
const [dep, wit] = accounts
  .flatMap(acc => acc.movements)
  .reduce(
    (acc, mov, i, arr) => {
      mov > 0 ? (acc[0] += mov) : (acc[1] += mov)
      return acc
    },
    [0, 0]
  )
console.log(dep, wit)

// Create a Function for TITLE CASE String
// ex: this is a nice Title -> This Is a Nice Title

const titleCase = function (title) {
  const capitalize = str => str[0].toUpperCase() + str.slice(1);

  const exception = ['and', 'a', 'an', 'the', 'but', 'or', 'on', 'in', 'with']
  const titleCase = title
    .toLowerCase()
    .split(' ')
    .map(word =>exception.includes(word) ? word : capitalize(word))
    .join(' ')
//   return titleCase;
    return capitalize(titleCase);
}
console.log(titleCase('this is a nice Title'));
console.log(titleCase('this is a LONG title but not too long'));
console.log(titleCase('and here is another title with an EXAMPLE'));
