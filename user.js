
const db = require('./db');
let Order = require('./Order');



function User(name, email, password, status){
  this.name = name;
  this.email = email;
  this.password = password;
  this.status = status;
  
};


User.prototype = {
  constructor: User,

  createUser: function(){
    let id = 0;
    let response = "";
    if(this.status === "user"){
      if(db.users.length){
        id = db.users[db.users.length - 1].id + 1
      } else {
        id = 1
      }
      db.users.push({id: id, name: this.name, email: this.email, password: this.password, status: this.status});
      console.log(db.users)
      response = 'Your user account has been successfully created';

    } else if(this.status === "admin"){
      if(db.admins.length){
        id = db.admins[db.admins.length - 1].id + 1
      } else {
        id = 1
      }

      db.admins.push({id: id, name: this.name, email: this.email, password: this.password, status: this.status});
      console.log(db.admins);

      response = 'Your Admin account has been successfully created';

    } else if(this.status !== "user" && this.status !== "admin"){
      response = 'You cannot create an account with status inputed';
    }
    console.log(response);
    return response;
  },

  readSingleUser: function(id){
    
    if(typeof id === 'number' && this.status === 'user'){
      for(i = 0; i < db.users.length; i++){
        if(id === db.users[i].id){
          console.log('This is the user')
          return db.users[i];
        } 
      }
    } else if(typeof id === 'number' && this.status === 'admin'){

      for(i = 0; i < db.admins.length; i++){
        if(id === db.admins[i].id){
          return db.admins[i];
        } else if(id !== db.admins[i].id || this.name ===db.admins[i].name){
          console.log('ID not valid');
          return 'ID not valid'
        }
      }
    }
  },

  updateUserDetails: function(id, obj){
    if(this.status === 'user'){
      let userToUpdate = this.readSingleUser(id, this.status);
      console.log(userToUpdate);

      let updateUserDetails = obj;

      for(i = 0; i < db.users.length; i++){
        if(db.users[i].id === userToUpdate.id){
          db.users[i] = updateUserDetails;
        }
      }
      return 'Your account has been successfully updated';

    } else if(this.status === 'admin'){
      let userToUpdate = this.readSingleUser(id, this.status);
      for(i = 0; i < db.admins.length; i++){
        if(db.admins[i].id = userToUpdate.id){
          db.admins[i] = obj;
        }
      }

     
      return 'Your account has been successfully updated';
    }
  },

  searchUser: function(name){
    if(typeof name === 'string' && this.status === 'user'){
      for(i = 0; i < db.users.length; i++){
        if(name === db.users[i].name){
          console.log('Here is the user you searched for!')
          return db.users[i];
        } else {
          return false
        }
      }
    } else if(typeof name === 'string' && this.status === 'admin'){

      for(i = 0; i < db.admins.length; i++){
        if(name === db.admins[i].name){
          return db.admins[i];
        } else {
          return false;
        }
      }
    }
  },
  
  makeOrder : function(id, ...products) {
    this.id = id;
    this.products = products;

    let response = "";

    for(let i in db.users) {
        if (db.users[i].id === this.id) {
            let newOrder = new Order();
            let OrderForm = newOrder.constructor.createOrder();
            OrderForm.products = this.products;
            OrderForm.userid = this.userid;
            db.orders.push(OrderForm);
            response = "Your order has been successfully made!.";
            break;
        }
        
    }
    console.log(response);
    return response;
  }
}






module.exports = User;


let john = new User('John Doe', 'john@gmail.com', 1234, 'user');
console.log(john.createUser())

console.log(john.readSingleUser(1));

console.log(john.updateUserDetails(1, {id: 1, name: 'John Buck', email: 'john@gmail.com', password: 1234, status: 'user'}))

console.log(john.searchUser('John Buck'));

console.log(john.makeOrder(1, ['chicken', 'turkey']))