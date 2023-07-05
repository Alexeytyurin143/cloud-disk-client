import React, { useState } from "react";
import { useDispatch } from "react-redux";
import cl from "./Authorization.module.scss";
import Input from "../../utils/input/Input";
import { login } from "../../actions/user";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const dispatch = useDispatch();

	return (
		<form
			className={cl.Authorization}
			onSubmit={(e) => {
				dispatch(login(email, password));
				e.preventDefault();
			}}
		>
			<div className={cl.Header}>Вход</div>
			<div className={cl.Input}>
				<Input
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					type="text"
					placeholder="Введите email..."
				/>
			</div>
			<div className={cl.Input}>
				<Input
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					type="password"
					placeholder="Введите пароль..."
				/>
			</div>
			<button type="submit" className={cl.Button}>
				Войти
			</button>
		</form>
	);
};

export default Login;
