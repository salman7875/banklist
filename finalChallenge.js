'use strict'

const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] }
]

// 1.
dogs.forEach(cur => {
  cur.recommendedFood = Math.floor(cur.weight ** 0.75 * 28)
})
console.log(dogs)

// 2.
const dogSarah = dogs.find(owner => {
  return owner.owners.includes('Sarah')
})
console.log(
  `Sarah's dog is eating Too ${
    dogSarah.curFood > dogSarah.recommendedFood ? 'Much' : 'Little'
  }`
)

// 3.
// Method 1
/*
const ownersEatTooMuch = [];
const ownersEatTooLittle = [];
dogs.forEach(own => {
    own.curFood > own.recommendedFood ? ownersEatTooMuch.push(own.owners) :ownersEatTooLittle.push(own.owners)
})
console.log(ownersEatTooLMuch.flat());
console.log(ownersEatTooLittle.flat());
*/

// Method 2
const ownersEatTooMuch = dogs
  .filter(dog => dog.curFood > dog.recommendedFood)
  .flatMap(dog => dog.owners)
const ownersEatTooLittle = dogs
  .filter(dog => dog.curFood < dog.recommendedFood)
  .flatMap(dog => dog.owners)

console.log(ownersEatTooMuch);
console.log(ownersEatTooLittle);

// 4.
console.log(`${ownersEatTooMuch.join(' and ')} dog eat too much.`);
console.log(`${ownersEatTooLittle.join(' and ')} dog eat too little.`);

// 5.
console.log(dogs.some(dog => dog.curFood === dog.recommendedFood));

// 6.
const checkEatingOkay = dog => dog.curFood > (dog.recommendedFood * 0.90) && dog.curFood < (dog.recommendedFood * 1.10);
console.log(dogs.some(checkEatingOkay));

// 7.
const dogOkay = dogs.filter(checkEatingOkay)
console.log(dogOkay);

// 8.
const dogsSorted = dogs.slice().sort((a, b) => a.recommendedFood - b.recommendedFood)
console.log(dogsSorted)
