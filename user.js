const fs = require('fs');
const db = require('./db.json');
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
    let id;
    if(this.status === "user"){
      if(db.users.length){
        id = db.users[db.users.length - 1].id + 1
      } else {
        id = 1
      }
      db.users.push({id: id, name: this.name, email: this.email, password: this.password, status: this.status});
      let database = JSON.stringify(db, null, 2);
      fs.writeFileSync('db.json', database, 'utf8');
      console.log('Your user account has been successfully created');
      return 'Your user account has been successfully created';

    } else if(this.status === "admin"){
      if(db.admins.length){
        id = db.admins[db.admins.length - 1].id + 1
      } else {
        id = 1
      }
      db.admins.push({id: id, name: this.name, email: this.email, password: this.password, status: this.status});
      let database = JSON.stringify(db, null, 2);
      fs.writeFileSync('db.json', database, 'utf8');
      console.log('Your Admin account has been successfully created');
      return 'Your admin account has been successfully created';

    } else if(this.status !== "user" && this.status !== "admin"){
      return 'You cannot create an account with status inputed';
    }
  },

  readSingleUser: function(id){
    if(typeof id === 'number' && this.status === 'user'){
      //console.log(db.users);
      for(i = 0; i < db.users.length; i++){
        if(id === db.users[i].id){
          return db.users[i];
        } else {
          console.log('ID not valid');
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

      let database = JSON.stringify(db, null, 2);
      fs.writeFileSync('db.json', database, 'utf8');
      return 'Your account has been successfully updated';

    } else if(this.status === 'admin'){
      let userToUpdate = this.readSingleUser(id, this.status);
      console.log(userToUpdate);

      let updateUserDetails = obj;

      for(i = 0; i < db.admins.length; i++){
        if(db.admins[i].id = userToUpdate.id){
          db.admins[i] = updateUserDetails;
        }
      }

      let database = JSON.stringify(db, null, 2);
      fs.writeFileSync('db.json', database, 'utf8');
      return 'Your account has been successfully updated';
    }
  },

  searchUser: function(name){
    if(typeof name === 'string' && this.status === 'user'){
      for(i = 0; i < db.users.length; i++){
        if(name === db.users[i].name){
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
            fs.writeFileSync('db.json', JSON.stringify(db, null, 2));
            response = "Your order has been successfully made!.";
            break;
        }
        else {
            response = "There is no user registered with this ID";
        }
    }
    console.log(response);
    return response;
  }
}

//let seun = new User('Seun Jay', 'seunjay@gmail.com', 1234, 'admin');
//let john = new User('John Doe', 'joe@gmail.com', 4321, 'user');
//let james = new User('James Buck', 'james@gmail.com', 9871, 'user');
//let ayo = new Admin('Aprof', 'aprof@gmail.com', 5555, 'admin');

//console.log(john.makeOrder(1, 'chicken', 'turkey'));
//console.log(john.makeOrder(1, 'adiddas', 'nike'));
//console.log(john.makeOrder(1, 'coca-cola', 'pepsi'));


//console.log(ayo.createUser());

//console.log(seun.createUser());
//console.log(john.createUser());

//console.log(james.createUser())

//console.log(john.searchUser('John Doe', 'user'));

//console.log(seun.searchUser('Seun me', 'admin'));

// console.log(seun.readSingleUser(1, 'user'));

//console.log(james.makeOrder(1, ['chicken', 'turkey']));





// console.log(seun.updateUserDetails(1, {id: 1, name: "tobis", email: "sa@yahoo.com", password: 7799, status: 'admin'}));
// console.log(User.prototype);

function Admin(name, email, password, status){
  User.call(this, name, email, password, status)
}


Admin.prototype = Object.create(User.prototype);
Admin.prototype.constructor = Admin;


Admin.prototype.readAllUsers = function(){
  //Athis.status = status;
  if(this.status ==='admin'){
    if(db.users.length > 0){
      console.log(db.users);
      return 'These are the available users';
    } else if(db.users.length === 0){
      return 'No user available';
    }
    
  }
};

Admin.prototype.deleteAUser = function(userID){

  if(typeof userID === 'number'){
    for(i = 0; i < db.users.length; i++){
      if(userID === db.users[i].id){
         db.users.splice((db.users[i].id - 1), 1);

         let database = JSON.stringify(db);
         fs.writeFileSync('db.json', database, 'utf8');
         return 'User has been successfully deleted'
      }
    }
  } else return 'Invalid input';
};

Admin.prototype.deleteAllUsers = function(){
  if(db.users.length){
     db.users.length = 0;
  }
  let database = JSON.stringify(db);
  fs.writeFileSync('db.json', database, 'utf8');

  return 'All users have been successfully deleted'
}

Admin.prototype.readAllOrders = function(){
  if(this.status === 'admin'){
    if(db.orders.length > 0){
      console.log(db.orders);
      return `These are the available orders`;
    } else if(db.orders.length === 0){
      return `There are no orders available`;
    }
  }
}

Admin.prototype.readSingleOrder = function(orderID){
  this.orderid = orderID
  let result = [];
  let response = "";
  if(typeof orderID !== 'number') return `Invalid Input`;
  if(db.orders.length > 0){
    for(let i in db.orders){
      if(this.orderid === db.orders[i].id){
        result.push(db.orders[i]);
        response = `Here is your order`
        break;
      } else {
        response =`Invalid Order ID`;
      }
    }
  }
  else {
    response = `There are currently no orders`;
  }
  console.log(response);
  return response;
}

Admin.prototype.deleteOneOrder = function(orderID){
  let response = "";
  if(db.orders.length > 0){
    for(let i in db.orders){
      if(orderID === db.orders[i].id){
        db.orders.splice(i, 1);
        let database = JSON.stringify(db, null, 2);
        fs.writeFileSync('db.json', database, 'utf8');
        console.log('You have successfully deleted this order');
        break;
      } else {
        response = `Invalid Order ID`;
      }
    }
  }
  else {
   response = `There are currently no orders`;
  }

  console.log(response);
}

Admin.prototype.deleteAllOrders = function(){
    if(db.orders.length > 0){
      db.orders.length = 0;

      let database = JSON.stringify(db, null, 2);
      fs.writeFileSync('db.json', database, 'utf8');
      console.log('You have succesfully deleted orders');
      return 'You have succesfully deleted orders';
    }
    else {
      return `There are currently no orders`;
     }
  }

Admin.prototype.updateOrderDetails = function(orderID, obj){
  let objectToUpdateOrderDetails = obj;
  if(db.orders.length > 0){
    for(let i in db.orders){
      if(orderID === db.orders[i].id){
        db.orders[i] = objectToUpdateOrderDetails;
      }
    }

    let database = JSON.stringify(db, null, 2);
    fs.writeFileSync('db.json', database, 'utf8');
    return `Your order has been updated`;
  }
  else {
    return `There are currently no orders`;
   }
}


let ayo = new Admin('Aprof', 'aprof@gmail.com', 5555, 'admin');
//  console.log(Admin.prototype);
//console.log(ayo.createUser());

console.log(ayo.readSingleOrder(5));

//console.log(ayo.updateOrderDetails(1, {id: 1, timeOfOrder: "8 : 25: 03", dateOfOrder: "25: 3: 2019", products: "skirts"}))

 //let james = new User('Jame Buck', 'james@gmail.com', 9871, 'user');

//console.log(james.createUser())
//console.log(james.makeOrder(1, "garri", "fried fish"));


module.exports = {User, Admin};


