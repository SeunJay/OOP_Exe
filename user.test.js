const { User, Admin } = require('./user');
const db = require('./db.json');


test('Check to see that User constructor function is defined', () => {

  let john = new User('John Doe', 'joe@gmail.com', 4321, 'user');
  expect(john).toBeDefined();
});

// test('Check to see that name and email are both strings', () => {

//   let seun = new User(23, 34, '1234', 'admin');
//   expect(seun).toBe('Invalid Input');
// });

// test('Check to see that User constructor function is defined', () => {

//   let seun = new User('Seun Jay', 'seunjay@gmail.com', 1234, 'admin');
//   expect(seun.name).toBe('Seun Jay');
// });
