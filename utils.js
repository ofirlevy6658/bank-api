const fs = require("fs");
const User = require("./models/user");
const Account = require("./models/account");
const AccountLog = require("./models/transition");
const { findById, findByIdAndUpdate } = require("./models/user");

async function addUser({ name, mobile, email }) {
	if (!name || !mobile || !email)
		throw new Error("parameters name ,mobile and email must be provide");
	try {
		const user = new User({
			name,
			mobile,
			email,
		});
		await user.save();
		createBankAccount(user._id);
	} catch (e) {
		throw new Error(e);
	}
}

async function createBankAccount(ownerId) {
	try {
		const account = new Account({
			ownerId,
		});
		const logAccount = new AccountLog({
			ownerId,
			log: `open on account ${new Date().toLocaleString()}`,
		});
		await account.save();
		await logAccount.save();
	} catch (e) {
		throw new Error(e);
	}
}

async function deposit(id, { amount }) {
	validationMoney(amount);
	try {
		if (!(await User.findById(id))) throw new Error("User not found");
		await Account.findOneAndUpdate({ ownerId: id }, { $inc: { cash: amount } });
		await AccountLog.findOneAndUpdate(
			{ ownerId: id },
			{ $push: { log: `deposit ${amount}` } }
		);
	} catch (e) {
		throw new Error("User not found");
	}
}

async function updateCredit(id, { amount }) {
	validationMoney(amount);
	try {
		if (!(await User.findById(id))) throw new Error("User not found");
		await Account.findOneAndUpdate(
			{ ownerId: id },
			{ $inc: { credit: amount } }
		);
		await AccountLog.findOneAndUpdate(
			{ ownerId: id },
			{ $push: { log: `credit increase by ${amount}` } }
		);
	} catch (e) {
		throw new Error(e);
	}
}

async function withdraw(id, { amount }) {
	validationMoney(amount);
	try {
		if (!(await User.findById(id))) throw new Error("User not found");
		const account = await Account.findOne({ ownerId: id });
		if (account.cash - amount >= -account.credit) {
			await Account.findOneAndUpdate(
				{ ownerId: id },
				{ $inc: { cash: -amount } }
			);
		} else {
			throw new Error("Rejected not enough credit");
		}
	} catch (e) {
		throw new Error(e);
	}
}

async function transferMoney(senderID, { amount, reciverID }) {
	validationMoney(amount);
	try {
		const sender = await Account.findOne({ ownerId: senderID });
		amount = parseInt(amount);
		if (!(sender.cash + sender.credit >= amount))
			throw new Error("Rejected not enough credit");
		else {
			Account.findByIdAndUpdate(
				{ ownerId: senderID },
				{
					$inc: {
						cash: -amount,
					},
				}
			);
			Account.findByIdAndUpdate(
				{ ownerId: reciverID },
				{
					$inc: {
						cash: amount,
					},
				}
			);
		}
	} catch (e) {
		throw new Error(e);
	}
}

function getUser(id) {}

function filterByMoney({ amount }) {
	validationMoney(amount);
	const users = loadUsers();
	const filterUsers = users.filter((el) => el.cash >= amount);
	return filterUsers;
}
// function deactivate(id) {
// 	const users = loadUsers();
// 	const user = users.find((el) => el.id === id);
// 	if (!user) throw new Error("User not found");
// 	if (!user.isActive) throw new Error("User already deactivate");
// 	else user.isActive = false;
// 	saveUser(users);
// }

// function active(id) {
// 	const users = loadUsers();
// 	const user = users.find((el) => el.id === id);
// 	if (!user) throw new Error("User not found");
// 	if (user.isActive) throw new Error("User already active");
// 	else user.isActive = true;
// 	saveUser(users);
// }
// function getActiveUsers() {
// 	const users = loadUsers();
// 	const activeUsers = users.filter((el) => el.isActive);
// 	return activeUsers;
// }

function validationMoney(amount) {
	if (!amount) throw new Error("parameter amount not provided");
	if (amount < 1) throw new Error("parameter must be positive");
}
// function checkUser(user) {
// 	if (!user) throw new Error("User not found");
// 	if (!user.isActive) throw new Error("User is not active");
// }

// function saveUser(user) {
// 	fs.writeFileSync("./database/users.json", JSON.stringify(user));
// }

// function loadUsers() {
// 	try {
// 		const dataBuffer = fs.readFileSync("./database/users.json");
// 		const dataJSON = dataBuffer.toString();
// 		return JSON.parse(dataJSON);
// 	} catch (e) {
// 		return [];
// 	}
// }

module.exports = {
	addUser,
	deposit,
	updateCredit,
	withdraw,
	transferMoney,
	getUser,
	filterByMoney,
};
