const db = require('./order');
const User = require('./user');
const Admin = require('./admin');
const Order = require('./order');

let john = new User('John Doe', 'john@gmail.com', 1234, 'user');
console.log(john.createUser())

console.log(john.readSingleUser(1));

console.log(john.updateUserDetails(1, {id: 1, name: 'John Buck', email: 'john@gmail.com', password: 1234, status: 'user'}))

console.log(john.searchUser('John Buck'));

console.log(john.makeOrder(1, ['chicken', 'turkey']))



let olumide = new Admin('Olumide Ajulo', 'olumide@gmail.com', 2233, 'admin');
console.log(olumide.createUser())

console.log(olumide.readAllUsers())

console.log(olumide.deleteAUser(1))
console.log(olumide.deleteAllUsers())

console.log(olumide.readAllOrders());
console.log(olumide.readSingleOrder(1))
console.log(olumide.deleteOneOrder(1));
console.log(olumide.deleteAllOrders())