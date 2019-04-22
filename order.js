const fs = require('fs');
const db = require('./db.json');
let User = require('./user');

function Order(){
 
}

Order.createOrder = function(id){
  let date = new Date();
    this.id = id;
    this.products = products;
    this.timeOfOrder = `${date.getHours()} : ${date.getMinutes()} : ${date.getSeconds()}`;
    this.dateOfOrder = `${date.getDate()} : ${date.getMonth()} : ${date.getFullYear()}`;

    if(dbData.orders.length === 0) {
      this.id = 1
    }
    else {
      this.id = (dbData.orders[dbData.orders.length - 1].id) + 1
    }

    let orderObject = {
      id: this.id,
      timeOfOrder: this.timeOfOrder,
      dateOfOrder: this.dateOfOrder,
      products: this.products
    }

    return orderObject

}