const User = require('./user');
const db = require('./db.json');

let femi = new User('femi ajayi', 'femi@gmail.com', 9845, 'admin');


describe("Testing the functionalities of a user", () => {

  test('Check to see that User constructor function is defined', () => {

    let john = new User('John Doe', 'joe@gmail.com', 4321, 'user');
    expect(john).toBeDefined();
  });

  test("Check for the instance of the User Constructor", () => {
    let newUser = new User("John Doe", "joe@gmail.com", 1111, "user");
    expect(newUser).toEqual({name: 'John Doe', email: 'joe@gmail.com', password: 1111, status: 'user' });
  });

  test('Check to see that a user has been created', () => {
  let newUser = new User("John Doe", "joe@gmail.com", 4321, "user");
  expect(newUser.createUser()).toBe('Your user account has been successfully created');

});

  test('Return an error message if neither user nor admin status is used', () => {
    let newUser = new User("John Doe", "joe@gmail.com", 4321, "chairman");
    expect(newUser.createUser()).toBe('You cannot create an account with status inputed');

  });

  test("read user by ID", () =>{
    let seun = new User('Seun Jay', 'seunjay@gmail.com', 1234, 'admin');
    expect(seun.readSingleUser(1)).toEqual({id: 1, name: 'Seun Jay', email: 'seunjay@gmail.com', password: 1234, status: 'admin'})
  });

  test("Should return an error message when reading a user with an ivalid ID", () =>{
  let femi = new User('femi ajayi', 'femi@gmail.com', 9845, 'admin');
  let jamesUser = femi.createUser();
  expect(femi.readSingleUser(5)).toBe('ID not valid');
  });

  test("search user by name", () =>{
    let seun = new User('Seun Jay', 'seunjay@gmail.com', 1234, 'admin');
    expect(seun.searchUser('Seun Jay')).toEqual({id: 1, name: 'Seun Jay', email: 'seunjay@gmail.com', password: 1234, status: 'admin'})
  });

  test("Should return false if the name is not a registered name", () =>{
    let seun = new User('Seun Jay', 'seunjay@gmail.com', 1234, 'admin');
    expect(seun.searchUser('Seun')).toBe(false);
  });

  test("To update user details", () =>{
    let seun = new User('Seun Jay', 'seunjay@gmail.com', 1234, 'admin');
    expect(seun.updateUserDetails(1, {id: 1, name: 'Seun Jay', email: 'seunjay@gmail.com', password: 1234, status: 'admin'})).toBe('Your account has been successfully updated')
  });

})







