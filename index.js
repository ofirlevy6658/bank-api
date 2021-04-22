const express = require("express");
const app = express();
const userRouter = require("./routers/user");
require("./db/mongoose");
app.use(express.json());
app.use(userRouter);

const PORT = 3000;
app.listen(PORT, () => {
	console.log("listening on port 3000");
});
