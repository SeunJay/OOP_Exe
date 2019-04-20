const User = require('./user');
const db = require('./db.json');

let femi = new User('femi ajayi', 'femi@gmail.com', 9845, 'admin');




// test('Check to see that name and email are both strings', () => {

//   let seun = new User(23, 34, '1234', 'admin');
//   expect(seun).toBe('Invalid Input');
// });

// test('Check to see that User constructor function is defined', () => {

//   let seun = new User('Seun Jay', 'seunjay@gmail.com', 1234, 'admin');
//   expect(seun.name).toBe('Seun Jay');
// });


// test('Check to see that a user has been created', () => {
//   let newlyCreatedUser = [];
//   let newUser = new User("John Doe", "joe@gmail.com", 4321, "user");
//   //let obj = newUser.createUser();
//   expect(newUser.createUser()).toBe('Your user account has been successfully created');

// });

// test("should check if a  user can be checked with his name and status", () => {
//   let result = [];
//   let newUser = new User("John Doe", "joe@gmail.com", 4321, "user");
//   let search = newUser.createUser();
//   expect(newUser.searchUser("John Doe")).toEqual({ id: 1, name: 'John Doe', email: 'joe@gmail.com', password: 4321, status: 'user' });
//   //expect(result).toBeDefined();
// });

// test("read user by ID", () =>{
//   let femi = new User('femi ajayi', 'femi@gmail.com', 9845, 'admin');
//   let jamesUser = femi.createUser();
//   expect(femi.readSingleUser(3)).toEqual({id: 3, name: 'femi ajayi', email: 'femi@gmail.com', password: 9845, status: 'admin'})
// });

// test("read user by ID", () =>{
//   let femi = new User('femi ajayi', 'femi@gmail.com', 9845, 'admin');
//   let jamesUser = femi.createUser();
//   expect(femi.readSingleUser(5)).toBe('ID not valid');
// });

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
    let femi = new User('femi ajayi', 'femi@gmail.com', 9845, 'admin');
    let jamesUser = femi.createUser();
    expect(femi.readSingleUser(1)).toEqual({id: 1, name: 'femi ajayi', email: 'femi@gmail.com', password: 9845, status: 'admin'})
  });

  // test("read user by ID", () =>{
  // let femi = new User('femi ajayi', 'femi@gmail.com', 9845, 'admin');
  // let jamesUser = femi.createUser();
  // expect(femi.readSingleUser(5)).toBe('ID not valid');


})







// describe("To test if all normal user activities", () => {
//   test("Should check instance of user", () => {
//       let newUser = new Users("w", "w@gmail.com", "w", "user");
//       expect(newUser).toEqual({username: 'w', email: 'w@gmail.com', password: 'w', access: 'user' });
//   });
//   test("should check if an admin account can be successfully created", () => {
//       let newUser = new Users("whitehox", "white@gmail.com", "123", "admin");
//       let success = newUser.createUser();
//       expect(success).toBe("Your administrator account has been successfully created");
//   });
//   test("Should check if a user account can be successfully created", () => {
//       let newUser = new Users("whitehox", "white@gmail.com", "123", "user");
//       let success = newUser.createUser();
//       expect(success).toBe("Your user account has been successfully created");
//   });
//   test("Should return an error message if a wrong account type was used", () => {
//       let newUser = new Users("whitehox", "white@gmail.com", "123", "foreign");
//       let error = newUser.createUser();
//       expect(error).toBe("A user can not be created with this access level. Kindly use either admin or user");
//   });
//   test("should check if a  user can be checked with his ID", () => {
//       let result;
//       let search = Users.prototype.searchSingleUserById(3, "admin");
//       result = search;
//       console.log(result);
//       expect(result).toEqual([dbData.admin[0]]);
//       expect(result).toBeDefined();
//   });
//   // test("Should check if a user account was successfully updated", () => {
//   //     let response = Users.prototype.updateUser("michael", "11861538da", "michael", "oketegah@gmail.com", "11861538da", "user");
//   //     expect(response).toBe("Your user account has been successfully updated");
//   // });
//   test("should check if a user entered right username or password", () => {
//       let response = Users.prototype.updateUser("kolokolokolo", "11861538da", "whitehox", "oketegah@gmail.com", "11861538da", "user");
//       expect(response).toBe("Incorrect username or password");
//   });
//   test("should check if a admin entered right username or password", () => {
//       let response = Users.prototype.updateUser("kolokolokolo", "11861538da", "whitehox", "oketegah@gmail.com", "11861538da", "admin");
//       expect(response).toBe("Incorrect username or password");
//   });
// });
