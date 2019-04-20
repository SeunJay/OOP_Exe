const fs = require('fs');
const db = require('./db.json');
let User = require('./user');
//console.log(User.prototype);

function Admin(name, email, password, status){
  User.call(this, name, email, password, status)
}


Admin.prototype = Object.create(User.prototype);
Admin.prototype.constructor = Admin;


Admin.prototype.readAllUsers = function(status){
  this.status = status;
  if(this.status ==='admin'){
    return db.users;
  }
};

Admin.prototype.deleteAUser = function(userID){

  if(typeof userID === 'number'){
    for(i = 0; i < db.users.length; i++){
      if(userID === db.users[i].id){
         db.users.splice((db.users[i].id - 1), 1);

         let database = JSON.stringify(db);
         fs.writeFileSync('db.json', database, 'utf8');
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
}


 let ayo = new Admin('Aprof', 'aprof@gmail.com', 5555, 'admin');
//  console.log(Admin.prototype);
console.log(ayo.createUser());



module.exports = Admin;


