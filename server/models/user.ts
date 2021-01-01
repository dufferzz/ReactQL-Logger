import mongoose from "mongoose";
const Schema = mongoose.Schema;

const bcrypt = require("bcrypt");
//TODO: Come back and add more specific requirements

// This is mostly redundant. DFZ JobLogger uses this - to be replaced eventually? Auth0? or self host oauth server?
// public log in is un-necessary.

const UserSchema = new Schema({
	username: {
		type: String,
		unique: true,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	role: {
		type: String,
		required: true,
	},
	firebaseToken: {
		type: String,
		required: false,
	},
	email: {
		type: String,
		required: false,
	},
	fullname: {
		type: String,
		required: false,
	},
	tasks: {
		type: Array,
		required: false,
	},
	lastLogin: {
		type: Date,
		required: false,
	},
});

UserSchema.pre("save", function (next) {
	const user: any = this;
	console.log(user);
	if (this.isModified("password") || this.isNew) {
		bcrypt.genSalt(10, function (err, salt) {
			// Generate hash, 10 rounds
			if (err) {
				console.log("genSalt Erro");
				return next(err);
			}
			console.log(salt);
			bcrypt.hash(user.password, salt, null, function (err, hash) {
				if (err) {
					console.log("genSalt Erro");
					return next(err);
				}
				user.password = hash;
				console.log(hash);
				next();
			});
		});
	} else {
		console.log("/?/?////???");
		return next();
	}
});

UserSchema.methods.comparePassword = function (passw, cb) {
	bcrypt.compare(passw, this.password, function (err, isMatch) {
		if (err) {
			return cb(err);
		}
		cb(null, isMatch);
	});
};

const users = mongoose.connection.useDb("test");

const Users = users.model("User", UserSchema);

export default Users;
