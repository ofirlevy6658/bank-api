const express = require("express");
const userRouter = require("./routers/user");
const cors = require("cors");
require("./db/mongoose");

const app = express();
app.use(cors());

app.use(express.json());
app.use(userRouter);

const PORT = 4000;
app.listen(PORT, () => {
	console.log(`listening on port ${PORT}`);
});
