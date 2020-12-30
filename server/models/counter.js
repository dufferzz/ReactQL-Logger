const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const Schema = mongoose.Schema;

const counterSchema = new Schema({

  _id:{
    type: Number,
    required: true,
  },

  seqValue: {
    type: String,
    required: true
  },

});
counterSchema.plugin(AutoIncrement, {inc_field: '_id'});

const counters = mongoose.connection.useDb('jobs');

const Counters = counters.model('counter', counterSchema);

module.exports = Counters;
