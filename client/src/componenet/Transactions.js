import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const Transactions = () => {
	const [userData, setUserData] = useState([]);
	const [userBankAccount, setUserBankAccount] = useState([]);
	const [userLog, setUserLog] = useState([]);
	const [deposit, setDeposit] = useState(0);
	const params = useParams();
	useEffect(() => {
		const fetchData = async () => {
			const userData = await axios.get(
				`http://localhost:4000/api/user/${params.id}`
			);
			setUserData(userData.data[0]);
			setUserBankAccount(userData.data[1]);
			setUserLog(userData.data[2]);
		};
		fetchData();
	}, []);
	const depositHandle = async () => {
		const e = await axios.put(
			`http://localhost:4000/api/deposit/${params.id}`,
			{
				amount: deposit,
			}
		);
		console.log(userBankAccount.cash);
	};

	return (
		<>
			<h1>Hello {userData.name}</h1>
			<div className="user-data">
				<h3>
					{userData.name} {userData.mobile} {userData.email}
				</h3>
				<h4>
					cash:{userBankAccount.cash}$ credit:{userBankAccount.credit}$
				</h4>
			</div>
			<input
				type="number"
				min="0"
				onChange={(e) => setDeposit(e.target.value)}
			/>
			<button onClick={depositHandle}>Deposit</button>
			<input
				type="number"
				min="0"
				onChange={(e) => setDeposit(e.target.value)}
			/>
			<button>Witdraw</button>
		</>
	);
};

export default Transactions;
