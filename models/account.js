const mongoose = require("mongoose");

const Account = mongoose.model("accounts", {
	cash: {
		type: Number,
		required: true,
		default: 0,
	},
	credit: {
		type: Number,
		required: true,
		default: 0,
	},
	ownerId: {
		type: String,
		required: true,
		unique: true,
	},
});
module.exports = Account;
