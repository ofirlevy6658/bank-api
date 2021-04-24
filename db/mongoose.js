const mongoose = require("mongoose");

const uri = process.env.MONGODB_URI;
console.log(uri);
mongoose.connect(
	"mongodb+srv://dbBank:6105935z@cluster0.u2wgr.mongodb.net/bank-manager-api?retryWrites=true&w=majority",
	{
		useNewUrlParser: true,
		useCreateIndex: true,
	}
);

// heroku config:set MONGODB_URI=mongodb+srv://dbBank:6105935z@cluster0.u2wgr.mongodb.net/bank-manager-api?retryWrites=true&w=majority
