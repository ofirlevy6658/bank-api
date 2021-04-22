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

router.put("/api/deposit/:id", (req, res) => {
	try {
		utils.deposit(req.params.id, req.body);
		res.status(201).send("user cash update");
	} catch (e) {
		res.status(400).send({ error: e.message });
	}
});

router.put("/api/credit/:id", (req, res) => {
	try {
		utils.updateCredit(req.params.id, req.body);
		res.status(201).send("user credit update");
	} catch (e) {
		res.status(400).send({ error: e.message });
	}
});

router.put("/api/withdraw/:id", (req, res) => {
	try {
		utils.withdraw(req.params.id, req.body);
		res.status(201).send("withdraw succeed");
	} catch (e) {
		res.status(400).send({ error: e.message });
	}
});

router.put("/api/transferMoney/:id", (req, res) => {
	try {
		utils.transferMoney(req.params.id, req.body);
		res.status(201).send("transfer money succeed");
	} catch (e) {
		res.status(400).send({ error: e.message });
	}
});
router.get("/api/user/:id", (req, res) => {
	try {
		const userInfo = utils.getUser(req.params.id);
		res.status(200).send(userInfo);
	} catch (e) {
		res.status(400).send({ error: e.message });
	}
});

router.get("/api/users", (req, res) => {
	try {
		res.status(200).send(utils.getUsers());
	} catch (e) {
		res.status(400).send({ error: e.message });
	}
});

router.get("/api/users/filter/amount", (req, res) => {
	try {
		const users = utils.filterByMoney(req.body);
		res.status(200).send(users);
	} catch (e) {
		res.status(400).send({ error: e.message });
	}
});
router.put("/api/deactivate/:id", (req, res) => {
	try {
		utils.deactivate(req.params.id);
		res.status(200).send("User has been disabled");
	} catch (e) {
		res.status(400).send({ error: e.message });
	}
});
router.put("/api/active/:id", (req, res) => {
	try {
		utils.active(req.params.id);
		res.status(200).send("User back to active");
	} catch (e) {
		res.status(400).send({ error: e.message });
	}
});
router.get("/api/activeUsers", (req, res) => {
	try {
		res.status(200).send(utils.getActiveUsers());
	} catch (e) {
		res.status(400).send({ error: e.message });
	}
});
module.exports = router;
