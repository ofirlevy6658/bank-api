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
			await Account.findOneAndUpdate(
				{ ownerId: senderID },
				{
					$inc: {
						cash: -amount,
					},
				}
			);
			await Account.findOneAndUpdate(
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

async function getUsers() {
	try {
		return await User.find({});
	} catch (e) {
		throw new Error(e);
	}
}

function validationMoney(amount) {
	if (!amount) throw new Error("parameter amount not provided");
	if (amount < 1) throw new Error("parameter must be positive");
}

module.exports = {
	addUser,
	deposit,
	updateCredit,
	withdraw,
	transferMoney,
	getUsers,
};
