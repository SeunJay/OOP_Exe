const fs = require('fs');
const db = require('./db.json');




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
      let database = JSON.stringify(db);
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
      let database = JSON.stringify(db);
      fs.writeFileSync('db.json', database, 'utf8');
      console.log('Your Admin account has been successfully created');
      return 'Your user account has been successfully created';
    } else if(this.status !== "user" && this.status !== "admin"){
      return 'You cannot create an account with status inputed';
    }
  },

  // readSingleUser: function(id){
  //   if(typeof id === 'number' && this.status === 'user'){
  //     //console.log(db.users);
  //     for(i = 0; i < db.users.length; i++){
  //       if(id === db.users[i].id){
  //         return db.users[i];
  //       } else {
  //         console.log('ID not valid');
  //       }
  //     }
  //   } else if(typeof id === 'number' && this.status === 'admin'){

  //     for(i = 0; i < db.admins.length; i++){
  //       if(id === db.admins[i].id){
  //         return db.admins[i];
  //       } else if(id !== db.admins[i].id || this.name ===db.admins[i].name){
  //         console.log('ID not valid');
  //         return 'ID not valid'
  //       }
  //     }
  //   }
  // },

  // updateUserDetails: function(id, obj){
  //   if(this.status === 'user'){
  //     let userToUpdate = this.readSingleUser(id, this.status);
  //     console.log(userToUpdate);

  //     let updateUserDetails = obj;

  //     for(i = 0; i < db.users.length; i++){
  //       if(db.users[i].id === userToUpdate.id){
  //         db.users[i] = updateUserDetails;
  //       }
  //     }

  //     let database = JSON.stringify(db);
  //     fs.writeFileSync('db.json', database, 'utf8');

  //   } else if(this.status === 'admin'){
  //     let userToUpdate = this.readSingleUser(id, this.status);
  //     console.log(userToUpdate);

  //     let updateUserDetails = obj;

  //     for(i = 0; i < db.admins.length; i++){
  //       if(db.admins[i].id = userToUpdate.id){
  //         db.admins[i] = updateUserDetails;
  //       }
  //     }

  //     let database = JSON.stringify(db);
  //     fs.writeFileSync('db.json', database, 'utf8');
  //   }
  // },

  // searchUser: function(name){
  //   if(typeof name === 'string' && this.status === 'user'){
  //     for(i = 0; i < db.users.length; i++){
  //       if(name === db.users[i].name){
  //         return db.users[i];
  //       } else {
  //         return false
  //       }
  //     }
  //   } else if(typeof name === 'string' && this.status === 'admin'){

  //     for(i = 0; i < db.admins.length; i++){
  //       if(name === db.admins[i].name){
  //         return db.admins[i];
  //       } else {
  //         return false;
  //       }
  //     }
  //   }
  // }

  
}

// let seun = new User('Seun Jay', 'seunjay@gmail.com', 1234, 'admin');
//let john = new User('John Doe', 'joe@gmail.com', 4321, 'user');
// let james = new User('James Buck', 'james@gmail.com', 9871, 'user');
//let ayo = new Admin('Aprof', 'aprof@gmail.com', 5555, 'admin');

//console.log(ayo.deleteAUSer(2));

//console.log(seun.createUser());
//console.log(john.createUser());

//console.log(james.createUser())

//console.log(john.searchUser('John Doe', 'user'));

//console.log(seun.searchUser('Seun me', 'admin'));

// console.log(seun.readSingleUser(1, 'user'));





// console.log(seun.updateUserDetails(1, {id: 1, name: "tobis", email: "sa@yahoo.com", password: 7799, status: 'admin'}));
// console.log(User.prototype);

// function Admin(name, email, password, status){
//   User.call(this, name, email, password, status)
// }


// Admin.prototype = Object.create(User.prototype);
// Admin.prototype.constructor = Admin;


// Admin.prototype.readAllUsers = function(status){
//   this.status = status;
//   if(this.status ==='admin'){
//     return db.users;
//   }
// };

// Admin.prototype.deleteAUser = function(userID){

//   if(typeof userID === 'number'){
//     for(i = 0; i < db.users.length; i++){
//       if(userID === db.users[i].id){
//          db.users.splice((db.users[i].id - 1), 1);

//          let database = JSON.stringify(db);
//          fs.writeFileSync('db.json', database, 'utf8');
//       }
//     }
//   } else return 'Invalid input';
// };

// Admin.prototype.deleteAllUsers = function(){
//   if(db.users.length){
//      db.users.length = 0;
//   }
//   let database = JSON.stringify(db);
//   fs.writeFileSync('db.json', database, 'utf8');
// }


//  let ayo = new Admin('Aprof', 'aprof@gmail.com', 5555, 'admin');
//  console.log(Admin.prototype);
//console.log(ayo.createUser());



module.exports = User;


