import mongoose from "mongoose";
const Schema = mongoose.Schema;
const AutoIncrement = require("mongoose-sequence")(mongoose);

//TODO: Come back and add more specific requirements

const storeOrdersSchema = new Schema({
	orderID: {
		//1 ,2 ,3 ,4 ,5
		type: String,
		required: false,
	},
	customerID: {
		//cus_3453534
		type: String,
		required: false,
	},
	paymentID: {
		//pi_3523grvddfbfd
		type: String,
		required: false,
	},
	checkoutID: {
		//cs_test_3523grvddfbfd
		type: String,
		required: false,
	},
	eventID: {
		//evt_4543u5bi35bu345iub
		type: String,
		required: false,
	},
	invoiceID: {
		//in_5345435345435
		type: String,
		required: false,
	},
	customerName: {
		// Sam Duff | DFZ Service
		type: String,
		required: false,
	},
	customerEmail: {
		//dufferz@dufferz.net
		type: String,
		required: false,
	},
	customerPhone: {
		//+4796880514
		type: String,
		required: false,
	},
	deliveryInfo: {
		//{line1: line2: city: postcode:}
		type: Object,
		required: false,
	},
	shippingID: {
		//ship_1/specDelivery/RegDelivery | CashCol | N/A
		type: String,
		required: false,
	},
	items: {
		//Array of items from stripe
		type: Array,
		required: false,
	},
	orderTotalPrice: {
		//4234234
		type: Number,
		required: false,
	},
	paymentAmountRecieved: {
		//4234234
		type: Number,
		required: false,
	},
	additionalNotes: {
		//Additional Notes on order, delays, etc.
		type: String,
		required: false,
	},
	orderStatus: {
		//confirmed/processing/awaiting/shipped/refunded/dispute
		type: String,
		required: false,
	},
	deliveryStatus: {
		//Not Scheduled/scheduled/Completed/issue
		type: String,
		required: false,
	},
	delivered: {
		//boolean
		type: Boolean,
		required: true,
		default: false,
	},
	paymentType: {
		//stripe/paypal/cash/none/refund
		type: String,
		required: false,
	},
	refunded: {
		//boolean
		type: Boolean,
		default: false,
		required: true,
	},
	lastModified: {
		//unixtime last modified
		type: String,
		required: false,
	},
	dateCreated: {
		//unixtime date created
		type: Date,
		required: true,
	},
	riskScore: {
		//stripe provided risk info
		type: String,
		required: true,
	},
	riskLevel: {
		//stripe provided risk info
		type: String,
		required: true,
	},
});
storeOrdersSchema.plugin(AutoIncrement, { inc_field: "order_ID" });

const storeOrders = mongoose.connection.useDb("diaproff");

const StoreOrders = storeOrders.model("storeOrders", storeOrdersSchema);

export default StoreOrders;
