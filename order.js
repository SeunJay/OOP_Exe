const db = require('./db');
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


module.exports = Order;