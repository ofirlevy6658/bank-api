const mongoose = require("mongoose");

const Account = mongoose.model("Client", {
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
	},
});
module.exports = Account;
