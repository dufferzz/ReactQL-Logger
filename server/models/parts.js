const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const Schema = mongoose.Schema;
//TODO: Come back and add more specific requirements

const partsSchema = new Schema({
  dateAdded: {
    type: String,
    required: false
  },
  modified: {
    type: Date,
     default: Date.now,
     required: false
  },
  stockCount: {
    type: String,
    required: false
  },
  partName: {
    type: String,
    required: false,
  },
  thumbnail: {
    type: String,
    default: '/images/na.png',
    required: true,
  },
  stock: {
    type: String,
    default: '000',
    required: true,
  },
  location:{
    type: String,
    required: false
  },
  SKU: {
    type: String,
    required: false
  },
  partNumber:{
    type: Array, // Array to be able to use part packages/combos
    required: true,
  },
  price: {
    type: String,
    default: '0',
    required: true,
  },
  Location: {
    type: String,
    required: false
  },
  addedBy: {
    type: String,
    required: false
  },
  showOnWebStore: {
    type: Boolean,
    default: false,
    required: false
  },
  manufacturer: {
    type: String,
    required: false
  },
  supplier: {
    type: String,
    required: false
  }

});

partsSchema.plugin(mongoosePaginate);


const parts = mongoose.connection.useDb('jobs');


const Parts = parts.model('Part',  partsSchema);


module.exports = Parts;