const express = require("express");
const router = new express.Router();
const utils = require("../utils");

router.post("/api/user", async (req, res) => {
	try {
		await utils.addUser(req.body);
		res.status(201).send("User added");
	} catch (e) {
		res.status(400).send({ error: e.message });
	}
});

router.put("/api/deposit/:id", async (req, res) => {
	try {
		await utils.deposit(req.params.id, req.body);
		res.status(201).send("user cash update");
	} catch (e) {
		res.status(400).send({ error: e.message });
	}
});

router.put("/api/credit/:id", async (req, res) => {
	try {
		await utils.updateCredit(req.params.id, req.body);
		res.status(201).send("user credit update");
	} catch (e) {
		res.status(400).send({ error: e.message });
	}
});

router.put("/api/withdraw/:id", async (req, res) => {
	try {
		await utils.withdraw(req.params.id, req.body);
		res.status(201).send("withdraw succeed");
	} catch (e) {
		res.status(400).send({ error: e.message });
	}
});

router.put("/api/transferMoney/:id", async (req, res) => {
	try {
		await utils.transferMoney(req.params.id, req.body);
		res.status(201).send("transfer money succeed");
	} catch (e) {
		res.status(400).send({ error: e.message });
	}
});

router.get("/api/user/:id", async (req, res) => {
	try {
		res.status(200).send(await utils.getUser(req.params.id));
	} catch (e) {
		res.status(400).send({ error: e.message });
	}
});

router.get("/api/users", async (req, res) => {
	try {
		res.status(200).send(await utils.getUsers());
	} catch (e) {
		res.status(400).send({ error: e.message });
	}
});

module.exports = router;
