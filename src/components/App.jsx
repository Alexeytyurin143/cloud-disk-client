import React, { useEffect } from "react";
import "../utils/default.scss";
import "../utils/normalize.scss";
import Navbar from "./navbar/Navbar";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Registartion from "./authorization/Registartion";
import Login from "./authorization/Login";
// import Main from "./main/Main";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../actions/user";
import Disk from "./disk/Disk";
import Profile from "./profile/Profile";

function App() {
	const isAuth = useSelector((state) => state.user.isAuth);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(auth());
	}, [auth]);

	return (
		<BrowserRouter>
			<div className="App">
				<Navbar />
				{!isAuth ? (
					<Routes>
						<Route path="/registration" Component={Registartion} />
						<Route path="/login" Component={Login} />
						<Route path="*" element={<Navigate to="/login" />} />
					</Routes>
				) : (
					<Routes>
						<Route path="/" Component={Disk} />
						<Route path="/profile" Component={Profile} />
						<Route path="*" element={<Navigate to="/" />} />
					</Routes>
				)}
			</div>
		</BrowserRouter>
	);
}

export default App;
