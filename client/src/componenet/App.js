import React, { useEffect, useState } from "react";
import axios from "axios";
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";

import Nav from "./Nav";
import Transactions from "./Transactions";
import User from "./User";
import "./app.css";

const App = () => {
	const [clients, setClients] = useState([]);
	useEffect(() => {
		const fetchData = async () => {
			const usersData = await axios.get("http://localhost:4000/api/users");
			setClients(usersData.data);
		};
		fetchData();
	}, []);

	const renderClients = clients.map((client) => {
		return (
			<div key={client._id} className="client">
				<span>{client.name}</span>
				<span>{client.mobile}</span>
				<span>{client.email}</span>
				<Link to={`account/${client._id}`}>
					<button>Transactions</button>
				</Link>
			</div>
		);
	});

	return (
		<>
			<BrowserRouter>
				<Nav />
				<Switch>
					<Route exact path="/">
						<h1>Bank Clients</h1>
						<div className="clients">{renderClients}</div>
					</Route>
					<Route exact path="/account/:id" component={Transactions} />
					<Route exact path="/create" component={User} />
				</Switch>
			</BrowserRouter>
		</>
	);
};

export default App;
