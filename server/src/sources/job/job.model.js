const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const dbb = mongoose.connection.useDb("jobs");

const Schema = mongoose.Schema;
//TODO: Come back and add more specific requirements

const JobSchema = new Schema({
	firstname: {
		type: String,
		required: true,
	},
	lastname: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	city: {
		type: String,
		required: true,
	},
	district: {
		type: String,
		required: true,
	},
	postcode: {
		type: String,
		required: true,
	},
	date: {
		type: String,
		required: false,
	},
	todo: {
		type: String,
		required: false,
	},

	done: {
		type: String,
		required: false,
	},
	parts: {
		type: Array,
		required: false,
	},
	modified: {
		type: Date,
		//default: Date.now
	},
	created: {
		type: Date,
		required: false,
	},
	status: {
		type: String,
		required: false,
	},
	model: {
		type: String,
		required: false,
	},
	make: {
		type: String,
		required: false,
	},
	year: {
		type: String,
		required: false,
	},
	serial: {
		type: String,
		required: false,
	},
	images: {
		type: Array,
		required: false,
		// select: false
	},
	labourHours: {
		type: String,
		required: false,
	},
	assigned: {
		type: String,
		required: true,
	},
	jobNumber: {
		type: Number,
		required: false,
	},
});
// JobSchema.plugin(AutoIncrement, { inc_field: "jobNumber" });

JobSchema.plugin(mongoosePaginate);

const Job = dbb.model("Job", JobSchema);

module.exports = Job;
