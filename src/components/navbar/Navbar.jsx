import React, { useState } from "react";
import cl from "./Navbar.module.scss";
import Logo from "../../assets/navbar-logo.svg";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../reducers/userReducer";
import Input from "../../utils/input/Input";
import { getFiles, searchFiles } from "../../actions/file";
import { showLoader } from "../../reducers/appReducer";
import avatarPlaceholder from "../../assets/avatar-placeholder.svg";
import { API_URL } from "../../config";

const Navbar = () => {
	const isAuth = useSelector((state) => state.user.isAuth);
	const CurrentDir = useSelector((state) => state.files.CurrentDir);
	const currentUser = useSelector((state) => state.user.currentUser);
	const [search, setSearch] = useState("");
	const [searchTimeout, setSearchTimeout] = useState(false);
	const dispatch = useDispatch();
	const avatar = currentUser.avatar
		? `${API_URL + currentUser.avatar}`
		: avatarPlaceholder;

	function searchChangeHandler(e) {
		setSearch(e.target.value);
		if (searchTimeout !== false) {
			clearTimeout(searchTimeout);
		}
		dispatch(showLoader());
		if (e.target.value !== "") {
			setSearchTimeout(
				setTimeout(
					(value) => {
						dispatch(searchFiles(value));
					},
					500,
					e.target.value
				)
			);
		} else {
			dispatch(getFiles(CurrentDir));
		}
	}

	return (
		<div className={cl.Navbar}>
			<div className={cl.Container}>
				<NavLink to="/">
					<div className={cl.LogoWrapper}>
						<img src={Logo} alt="Logo" className={cl.Logo} />
						<div className={cl.Header}>REACT CLOUD</div>
					</div>
				</NavLink>
				{!isAuth && (
					<>
						<div className={cl.Login}>
							<NavLink to="/login">Вход</NavLink>
						</div>
						<div className={cl.Registration}>
							<NavLink to="/registration">Регистрация</NavLink>
						</div>
					</>
				)}
				{isAuth && (
					<>
						<div className={cl.SearchInput}>
							<Input
								placeholder="Поиск файлов..."
								onChange={(e) => searchChangeHandler(e)}
								value={search}
								type="text"
							/>
						</div>
						<div className={cl.Logout} onClick={() => dispatch(logout())}>
							Выход
						</div>
						<NavLink to="/profile">
							<img src={avatar} alt="avatar" className={cl.Avatar} />
						</NavLink>
					</>
				)}
			</div>
		</div>
	);
};

export default Navbar;
