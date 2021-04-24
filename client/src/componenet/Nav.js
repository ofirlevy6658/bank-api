import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";

const Nav = () => {
	return (
		<>
			<ul className="nav-bar">
				<li>
					<NavLink activeClassName="selected" to="/">
						Home
					</NavLink>
					<NavLink activeClassName="selected" to="/create">
						create
					</NavLink>
				</li>
			</ul>
		</>
	);
};

export default Nav;
