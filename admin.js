const db = require('./db');
const User = require('./user')
let Order = require('./Order');

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
    } 
    
  }
};

Admin.prototype.deleteAUser = function(userID){
  
  if(typeof userID === 'number'){
    for(i = 0; i < db.users.length; i++){
      if(userID === db.users[i].id){
         db.users.splice((db.users[i].id - 1), 1);
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
        return `Invalid Order ID`;
      }
    }
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
  
      
      console.log(`Your order has successfully been updated`)
      return `Your order has successfully been updated`;
    }
  } else return `Order ID should be a number`;
  
}

Admin.prototype.deleteOneOrder = function(orderID){
  let response = "";
  if(typeof orderID === 'number'){
    if(db.orders.length > 0){
      for(let i in db.orders){
        if(orderID === db.orders[i].id){
          db.orders.splice(i, 1);
          
          console.log('You have successfully deleted this order');
          return 'You have successfully deleted this order'
        } 
      }
    }
    // else {
    //  response = `There are currently no orders`;
    // }
  
  } else return 'Invalid Input'

  
  //console.log(response);
}

Admin.prototype.deleteAllOrders = function(){
    if(db.orders.length > 0){
      db.orders.length = 0;
    }
    return db.orders;
  }


  let john = new User('John Doe', 'john@gmail.com', 1234, 'user');
//console.log(john.createUser())
//console.log(john.makeOrder(1, 'chicken', 'turkey'));
//console.log(john.readSingleUser(1));

let seun = new Admin('Seun Jay', 'seunjay@gmail.com', 1234, 'admin')
//console.log(seun.createUser())
//console.log(seun.updateOrderDetails(1, {id: 1, timeOfOrder: "1 : 25: 03", dateOfOrder: "26: 3: 2019", products: "Bags", }));
//console.log(seun.deleteAllOrders());
//console.log(seun.deleteAUser(1));

//console.log(john.updateUserDetails(1, {id: 1, name: 'John Jay', email: 'doe@gmail.com', password: 1235, status: 'user'}))

let james = new User('James Smith', 'james@gmail.com', 1222, 'user');
//console.log(james.createUser())
//console.log(james.makeOrder(2, 'skirts', 'shoes'));

let olumide = new Admin('Olumide Ajulo', 'olumide@gmail.com', 2233, 'admin');
console.log(olumide.createUser())

console.log(olumide.readAllUsers())

console.log(olumide.deleteAUser(1))
console.log(olumide.deleteAllUsers())

console.log(olumide.readAllOrders());
console.log(olumide.readSingleOrder(1))
console.log(olumide.deleteOneOrder(1));
console.log(olumide.deleteAllOrders())


module.exports = Admin;