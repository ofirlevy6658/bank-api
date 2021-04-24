const express = require("express");
const userRouter = require("./routers/user");
const path = require("path");
const cors = require("cors");
require("./db/mongoose");

const app = express();
app.use(cors());

const publicDir = path.join(__dirname, "client/build");
app.use(express.static(publicDir));

app.use(express.json());
app.use(userRouter);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
	console.log(`listening on port ${PORT}`);
});
