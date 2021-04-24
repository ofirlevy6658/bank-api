const mongoose = require("mongoose");

mongoose.connect(
	"mongodb+srv://dbBank:6105935z@cluster0.u2wgr.mongodb.net/bank-manager-api?retryWrites=true&w=majority",
	{
		useNewUrlParser: true,
		useCreateIndex: true,
	}
);
