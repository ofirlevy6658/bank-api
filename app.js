const {
	addUser,
	deposit,
	updateCredit,
	withdraw,
	validationMoney,
	transferMoney,
	getUser,
	getUsers,
	filterByMoney,
	deactivate,
	active,
	getActiveUsers,
} = require("./utils");

const express = require("express");
const app = express();

app.use(express.json());

app.post("/api/user", (req, res) => {
	console.log(req.body);
	try {
		addUser(req.body);
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

app.get("/api/users/filter/amount", (req, res) => {
	try {
		validationMoney(req.body);
		const users = filterByMoney(req.body);
		res.status(200).send(users);
	} catch (e) {
		res.status(400).send({ error: e.message });
	}
});
app.put("/api/deactivate/:id", (req, res) => {
	try {
		deactivate(req.params.id);
		res.status(200).send("User has been disabled");
	} catch (e) {
		res.status(400).send({ error: e.message });
	}
});
app.put("/api/active/:id", (req, res) => {
	try {
		active(req.params.id);
		res.status(200).send("User back to active");
	} catch (e) {
		res.status(400).send({ error: e.message });
	}
});
app.get("/api/activeUsers", (req, res) => {
	try {
		res.status(200).send(getActiveUsers());
	} catch (e) {
		res.status(400).send({ error: e.message });
	}
});

const PORT = 3000;
app.listen(PORT, () => {
	console.log("listening on port 3000");
});
