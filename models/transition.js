const mongoose = require("mongoose");

const AccountLog = mongoose.model("AccountLog", {
	log: {
		type: [],
		required: true,
	},
	ownerId: {
		type: String,
		required: true,
		unique: true,
	},
});
module.exports = AccountLog;
