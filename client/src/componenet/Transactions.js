import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import api from "../API/api";

const Transactions = () => {
	const [userData, setUserData] = useState([]);
	const [userBankAccount, setUserBankAccount] = useState([]);
	const [userLog, setUserLog] = useState([]);
	const [amount, setAmount] = useState(0);
	const params = useParams();
	const depositRef = useRef(null);
	const witdrawRef = useRef(null);
	const creditRef = useRef(null);
	useEffect(() => {
		const fetchData = async () => {
			const userData = await api.get(`user/${params.id}`);
			setUserData(userData.data[0]);
			setUserBankAccount(userData.data[1]);
			setUserLog(userData.data[2].log);
		};
		fetchData();
	}, [amount, params.id]);

	const depositHandle = async () => {
		try {
			await api.put(`/deposit/${params.id}`, {
				amount: amount,
			});
		} catch (e) {
			console.log(e);
		}
		depositRef.current.value = "";

		setAmount(0);
	};
	const witdrawHandle = async () => {
		try {
			await api.put(`/withdraw/${params.id}`, {
				amount: amount,
			});
		} catch (e) {
			console.log(e);
		}
		witdrawRef.current.value = "";
		setAmount(0);
	};
	const creditHandle = async () => {
		try {
			await api.put(`/credit/${params.id}`, {
				amount: amount,
			});
		} catch (e) {
			console.log(e);
		}
		creditRef.current.value = "";
		setAmount(0);
	};
	const renderLog = userLog.map((log, index) => {
		return <p key={index}>{log}</p>;
	});

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
				onChange={(e) => setAmount(e.target.value)}
				ref={depositRef}
			/>
			<button onClick={depositHandle}>Deposit</button>
			<input
				type="number"
				min="0"
				onChange={(e) => setAmount(e.target.value)}
				ref={witdrawRef}
			/>
			<button onClick={witdrawHandle}>Witdraw</button>
			<input
				type="number"
				min="0"
				onChange={(e) => setAmount(e.target.value)}
				ref={creditRef}
			/>
			<button onClick={creditHandle}>add credit</button>
			<div>{renderLog}</div>
		</>
	);
};

export default Transactions;
