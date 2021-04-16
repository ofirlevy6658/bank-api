const {
	addUser,
	deposit,
	updateCredit,
	withdraw,
	validationMoney,
	transferMoney,
	getUser,
	getUsers,
} = require("./utils");

const express = require("express");
const app = express();

app.use(express.json());

// app.get("/api/user", (req, res) => {
// 	try {
// 		res.status(200).json(getMovies());
// 	} catch (e) {
// 		res.status(400).send({ error: e.message });
// 	}
// });

app.post("/api/user", (req, res) => {
	console.log(req.body);
	try {
		addUser({ cash: 515, dsadas: 3, dasdas: 1 });
		res.status(201).send("User added");
	} catch (e) {
		res.status(400).send({ error: e.message });
	}
});

app.put("/api/deposit/:id", (req, res) => {
	try {
		validationMoney(req.body);
		deposit(req.params.id, req.body);
		res.status(201).send("user cash update");
	} catch (e) {
		res.status(400).send({ error: e.message });
	}
});

app.put("/api/credit/:id", (req, res) => {
	try {
		validationMoney(req.body);
		updateCredit(req.params.id, req.body);
		res.status(201).send("user credit update");
	} catch (e) {
		res.status(400).send({ error: e.message });
	}
});

app.put("/api/withdraw/:id", (req, res) => {
	try {
		validationMoney(req.body);
		withdraw(req.params.id, req.body);
		res.status(201).send("withdraw succeed");
	} catch (e) {
		res.status(400).send({ error: e.message });
	}
});

app.put("/api/transferMoney/:id", (req, res) => {
	console.log("test");
	try {
		validationMoney(req.body);
		transferMoney(req.params.id, req.body);
		res.status(201).send("transfer money succeed");
	} catch (e) {
		res.status(400).send({ error: e.message });
	}
});
app.get("/api/user/:id", (req, res) => {
	try {
		const userInfo = getUser(req.params.id);
		res.status(200).send(userInfo);
	} catch (e) {
		res.status(400).send({ error: e.message });
	}
});

app.get("/api/users", (req, res) => {
	try {
		res.status(200).send(getUsers());
	} catch (e) {
		res.status(400).send({ error: e.message });
	}
});

const PORT = 3000;
app.listen(PORT, () => {
	console.log("listening on port 3000");
});
