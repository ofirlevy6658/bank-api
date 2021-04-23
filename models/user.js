const mongoose = require("mongoose");
const validator = require("validator");

const User = mongoose.model("Clients", {
	name: {
		type: String,
		required: true,
		minlength: 3,
		maxlength: 13,
	},

	mobile: {
		type: String,
		required: true,
		unique: true,
		validate(value) {
			if (!validator.isMobilePhone(value, "he-IL")) {
				throw new Error("Invalid phone number");
			}
		},
	},
	email: {
		type: String,
		unique: true,
		validate(value) {
			if (!validator.isEmail(value)) {
				throw new Error("Invalid email.");
			}
		},
	},
});
module.exports = User;
