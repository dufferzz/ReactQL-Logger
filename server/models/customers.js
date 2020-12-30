const mongoose = require('mongoose'),
  Customer = require('./customers')
const Schema = mongoose.Schema;
//TODO: Come back and add more specific requirements

const customerSchema = new Schema({
  customerid: {
    type: String,
    required: false
  },
  customerno: {
    type: String,
    required: false
  },
  name: {
    type: String,
    required: false
  },
  billingadress: {
    type: String,
    required: false
  },
  mailingzip: {
    type: String,
    required: false
  },
  mailingcity: {
    type: String,
    required: false
  },
  visitingzip: {
    type: String,
    required: false
  },
  visitingcity: {
    type: String,
    required: false
  },
  telephone: {
    type: String,
    required: false
  },
  telefax: {
    type: String,
    required: false
  },
  email: {
    type: String,
    required: false
  },
  contact: {
    type: String,
    required: false
  },
  notes: {
    type: String,
    required: false
  },
  customergroupid: {
    type: String,
    required: false
  },
  contactoninvoice: {
    type: String,
    required: false
  },
  phone: {
    type: String,
    required: false
  },
  companyno: {
    type: String,
    required: false
  },
  mailingaddress2: {
    type: String,
    required: false
  },
  account: {
    type: String,
    required: false
  },
  email2: {
    type: String,
    required: false
  },
  picture: {
    type: String,
    required: false
  },
  birthdate: {
    type: String,
    required: false
  },
  gender: {
    type: String,
    required: false
  },
  languageid: {
    type: String,
    required: false
  },
  creditlimit: {
    type: String,
    required: false
  },
  info: {
    type: String,
    required: false
  },
  invoiceemail: {
    type: String,
    required: false
  },
  webshopid: {
    type: String,
    required: false
  },
});

module.exports = mongoose.model('customer', customerSchema, 'customers');
