const fs = require('fs');
const db = require('./db.json');
let User = require('./user');

function Order(){
 
}

Order.createOrder = function(id){
  let date = new Date();
    this.id = id;
    this.timeOfOrder = `${date.getHours()} : ${date.getMinutes()} : ${date.getSeconds()}`;
    this.dateOfOrder = `${date.getDate()} : ${date.getMonth()} : ${date.getFullYear()}`;

    if(db.orders.length === 0) {
      this.id = 1
    }
    else {
      this.id = (db.orders[db.orders.length - 1].id) + 1
    }

    let orderObject = {
      id: this.id,
      timeOfOrder: this.timeOfOrder,
      dateOfOrder: this.dateOfOrder
    }

    return orderObject

}

Order.functions = {
  readAllOrders: function(){
    console.log(db.orders);
    return db.orders
  },

  readSingleOrder: function(orderid){
    this.orderid = orderid;
    if(db.orders.length > 0){
      for(let i in db.orders){
        if(this.orderid === db.orders[i].id){
          return db.orders[i]
        }
      }
    } else {
      console.log("There are no orders available");
      return "There are no available orders";
    }
  },
  deleteSingleOrder: function(id, status) {
    this.id = id;
    this.status = status;

    if(this.status === "admin") {
        for(let i in db.orders) {
            if(dbData.orders[i].id === this.id) {
                dbData.orders.splice(i, 1);
                fs.writeFileSync('db.json', JSON.stringify(dbData, null, 2));
                return "The order has been deleted";
            }
        }
    }

  },

  deleteAllOrders : function(status){
    this.status = status;
    if(access === "admin") {
        db.orders.length = 0;
        fs.writeFileSync('db.json', JSON.stringify(dbData, null, 2));
    }
    else {
        console.log("Only admin is allowed to delete orders");
        return "Only admin is allowed to delete orders";
    }
  }

}

module.exports = Order;