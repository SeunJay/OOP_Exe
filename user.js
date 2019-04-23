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
      return 'Your Admin account has been successfully created';

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
  if(this.status === 'admin'){
    if(db.users.length){
      db.users.length = 0;
   }
   let database = JSON.stringify(db);
   fs.writeFileSync('db.json', database, 'utf8');
 
   return 'All users have been successfully deleted'
  } else {
    return 'You are not eligible to carry out this operation'
  }
  
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

Admin.prototype.updateOrderDetails = function(orderID, obj){
  let objectToUpdateOrderDetails = obj;
  if(typeof orderID === 'number'){
    if(db.orders.length > 0){
      for(let i in db.orders){
        if(orderID === db.orders[i].id){
          db.orders[i] = objectToUpdateOrderDetails;
        }
      }
  
      let database = JSON.stringify(db, null, 2);
      fs.writeFileSync('db.json', database, 'utf8');
      console.log(`Your order has successfully been updated`)
      return `Your order has successfully been updated`;
    }
    else return `There are currently no orders`;
  } else return `Order ID should be a number`;
  
}

Admin.prototype.deleteOneOrder = function(orderID){
  let response = "";
  if(typeof orderID === 'number'){
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
  
  } else return 'Invalid Input'

  
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



let john = new User('John Doe', 'john@gmail.com', 1234, 'user');
//console.log(john.makeOrder(1, 'chicken', 'turkey'));
//console.log(john.readSingleUser(1));

let seun = new Admin('Seun Jay', 'seunjay@gmail.com', 1234, 'admin')
//console.log(seun.updateOrderDetails(1, {id: 1, timeOfOrder: "1 : 25: 03", dateOfOrder: "26: 3: 2019", products: "Bags", }));
console.log(seun.deleteAllOrders());
//console.log(seun.deleteAllUsers());

//console.log(john.updateUserDetails(1, {id: 1, name: 'John Jay', email: 'doe@gmail.com', password: 1235, status: 'user'}))

let james = new User('James Smith', 'james@gmail.com', 1222, 'user')
//console.log(james.createUser());


module.exports = {User, Admin};


