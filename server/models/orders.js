const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const Schema = mongoose.Schema;
const dbb = mongoose.connection.useDb('jobs');

//TODO: Come back and add more specific requirements

const orderSchema = new Schema({
  Orderid: {
    type: Schema.Types.ObjectId,
    required: false
  },
  Customerid:{
    type: String,
    ref: "Customerid"
  },
  employeeid: {
    type: String,
    required: false
  },
  invoiceno: {
    type: String,
    required: false
  },
  orderdate: {
    type: String,
    required: false
  },
  deliverydate: {
    type: String,
    required: false
  },
  info: {
    type: String,
    required: false
  },
  deliveryname: {
    type: String,
    required: false
  },
  deliveryadress1: {
    type: String,
    required: false
  },
  deliveryadress2: {
    type: String,
    required: false
  },
  shippingmethodid: {
    type: String,
    required: false
  },
  employeeid: {
    type: String,
    required: false
  }
})
orderSchema.plugin(mongoosePaginate);

const Orders = dbb.model('orders', orderSchema);

const Customerid = dbb.model('Customerid', Schema({
  customerid: { type: String, ref: `customerid`},
  title: String,
  name: { type: String }
}));


module.exports = {Orders, Customerid};
