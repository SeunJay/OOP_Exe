const User = require('./user');
const Admin = require('./admin');
const db = require('./db');
const order = require('./order');

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
  let newUser = new User("John Doe", "john@gmail.com", 1234, "user");
  expect(newUser.createUser()).toBe('Your user account has been successfully created');

});

test('Check to see that a user has been created', () => {
  let newUser = new User("John Doe", "john@gmail.com", 1234, "user");
  expect(newUser.createUser()).toBe('Your user account has been successfully created');

});


  test('Return an error message if neither user nor admin status is used', () => {
    let newUser = new User("John Doe", "john@gmail.com", 4321, "chairman");
    expect(newUser.createUser()).toBe('You cannot create an account with status inputed');

  });

  test("read user by ID", () =>{
    let john = new User('John Doe', 'john@gmail.com', 1234, 'user');
    expect(john.readSingleUser(1)).toEqual({id: 1, name: 'John Doe', email: 'john@gmail.com', password: 1234, status: 'user'})
  });



  test("Should return an error message when reading a user with an invalid ID", () =>{
  let femi = new User('femi ajayi', 'femi@gmail.com', 9845, 'admin');
  let jamesUser = femi.createUser();
  expect(femi.readSingleUser(5)).toBe('ID not valid');
  });

  test("search user by name", () =>{
    let john = new User('John Doe', 'john@gmail.com', 1234, 'user');
    expect(john.searchUser('John Doe')).toEqual({id: 1, name: 'John Doe', email: 'john@gmail.com', password: 1234, status: 'user'})
  });

  

  test("should return false if the name is not a registered name by user", () =>{
    let john = new User('John Doe', 'john@gmail.com', 1234, 'user');
    expect(john.searchUser('James')).toBe(false)
  });

  test("Should return false if the name is not a registered name by admin", () =>{
    let seun = new User('Seun Jay', 'seunjay@gmail.com', 1234, 'admin');
    expect(seun.searchUser('Seun')).toBe(false);
  });

  test("To update user details by user", () =>{
    let john = new User('John Doe', 'john@gmail.com', 1234, 'user');
    expect(john.updateUserDetails(1, {id: 1, name: 'John Buck', email: 'joe@gmail.com', password: 1234, status: 'user'})).toBe('Your account has been successfully updated')
  });

  test("To update user details by admin", () =>{
    let seun = new User('Seun Jay', 'seunjay@gmail.com', 1234, 'admin');
    expect(seun.updateUserDetails(1, {id: 1, name: 'Seun Jay', email: 'seunjay@gmail.com', password: 1234, status: 'admin'})).toBe('Your account has been successfully updated')
  });

});

describe('Testing the functionalities of an admin', () => {

  test('Check to see that User constructor function is defined', () => {

    let olumide = new Admin('Olumide Ajulo', 'olumide@gmail.com', 2233, 'admin');
    expect(olumide).toBeDefined();
  });

  test("Check for the instance of the Admin Constructor", () => {
    let olumide = new Admin('Olumide Ajulo', 'olumide@gmail.com', 2233, 'admin');
    expect(olumide).toEqual({name: 'Olumide Ajulo', email: 'olumide@gmail.com', password: 2233, status: 'admin' });
  });

  test('Check to see that an admin has been created', () => {
    let olumide = new Admin('Olumide Ajulo', 'olumide@gmail.com', 2233, 'admin');
    expect(olumide.createUser()).toBe('Your Admin account has been successfully created');
  
  });

  test('Check to see that an admin can read all users', () => {
    let olumide = new Admin('Olumide Ajulo', 'olumide@gmail.com', 2233, 'admin');
    expect(olumide.readAllUsers()).toBe('These are the available users');
  
  });

  // test("search user by name", () =>{
  //   let olumide = new Admin('Olumide Ajulo', 'olumide@gmail.com', 2233, 'admin');
  //   expect(olumide.searchUser('Olumide Ajulo')).toEqual({id: 1, name: 'Olumide Ajulo', email: 'olumide@gmail.com', password: 2233, status: 'admin'})
  // });
  


})

describe('Testing user and admin order functionalities', () =>{

  test('Check to see that a user can make an order', () =>{
    let john = new User('John Doe', 'john@gmail.com', 1234, 'user');
    //console.log(james.makeOrder(2, ['chicken', 'turkey']));
    expect(john.makeOrder(1, ['chicken', 'turkey'])).toBe("Your order has been successfully made!.");
  });

  test('Check to see that a user can make an order', () =>{
    let john = new User('John Doe', 'john@gmail.com', 1234, 'user');
    //console.log(james.makeOrder(2, ['chicken', 'turkey']));
    expect(john.makeOrder(1, ['chicken', 'turkey'])).toBe("Your order has been successfully made!.");
  });

  test('check to see that an admin can read all orders', () =>{
    let ayo = new Admin('Aprof', 'aprof@gmail.com', 5555, 'admin');
    expect(ayo.readAllOrders()).toBe(`These are the available orders`)
  })
  
  test('check to see that an admin can read an order', () =>{
    let ayo = new Admin('Aprof', 'aprof@gmail.com', 5555, 'admin');
    expect(ayo.readSingleOrder(1)).toBe(`Here is your order`)
  });

  test('should return error message when an ivalid order ID is passed in', () =>{
    let ayo = new Admin('Aprof', 'aprof@gmail.com', 5555, 'admin');
    expect(ayo.readSingleOrder(3)).toBe(`Invalid Order ID`)
  });


  test('check to see that an admin can update order details', () =>{
    let ayo = new Admin('Aprof', 'aprof@gmail.com', 5555, 'admin');
    expect(ayo.updateOrderDetails(1, {id: 1, timeOfOrder: "1 : 25: 03", dateOfOrder: "26: 3: 2019", products: "Bags", })).toBe(`Your order has successfully been updated`);
  });

  test('should return an error if orderID is not a number', () =>{
    let ayo = new Admin('Aprof', 'aprof@gmail.com', 5555, 'admin');
    expect(ayo.updateOrderDetails({}, {id: 1, timeOfOrder: "1 : 25: 03", dateOfOrder: "26: 3: 2019", products: "Bags", })).toBe(`Order ID should be a number`);
  })

  test('return an error when the parameter passed in is not a number', () =>{
    let ayo = new Admin('Aprof', 'aprof@gmail.com', 5555, 'admin');
    expect(ayo.readSingleOrder({})).toBe(`Invalid Input`)
  });

 
  
  test('Return an error message when a user tries to delete all users', () => {
    let john = new Admin('John Doe', 'joe@gmail.com', 4321, 'user');
    expect(john.deleteAllUsers()).toBe('You are not eligible to carry out this operation');
  });


  test('Should return an error when something other than a number is passed in as parameter in the deleteAUser method', () => {
    let olumide = new Admin('Olumide Ajulo', 'olumide@gmail.com', 2233, 'admin');
    expect(olumide.deleteAUser('3')).toBe('Invalid input');
  
  });

  test('Check to see that an admin can delete a user', () => {
    let olumide = new Admin('Olumide Ajulo', 'olumide@gmail.com', 2233, 'admin');
    expect(olumide.deleteAUser(1)).toBe('User has been successfully deleted');
  
  });

  test('Check to see that admin can delete all users', () => {
    let olumide = new Admin('Olumide Ajulo', 'olumide@gmail.com', 2233, 'admin');
    expect(olumide.deleteAllUsers()).toBe('All users have been successfully deleted');
  
  });


  test('check to see that an admin can delete one order', () =>{
    let ayo = new Admin('Aprof', 'aprof@gmail.com', 5555, 'admin');
    expect(ayo.deleteOneOrder(1)).toBe('You have successfully deleted this order')
  });

  // test('check to see that an admin can delete one order', () =>{
  //   let ayo = new Admin('Aprof', 'aprof@gmail.com', 5555, 'admin');
  //   expect(ayo.deleteOneOrder(2)).toBe(`Invalid Order ID`)
  // });


  

  test('check to see that an admin can delete one order', () =>{
    let ayo = new Admin('Aprof', 'aprof@gmail.com', 5555, 'admin');
    expect(ayo.deleteOneOrder('3')).toBe("Invalid Input")
  });

  test('check to see that an admin can delete all orders', () =>{
    let ayo = new Admin('Aprof', 'aprof@gmail.com', 5555, 'admin');
    let result = ayo.deleteAllOrders();
    expect(result).toEqual(db.orders)
  });
  
})







