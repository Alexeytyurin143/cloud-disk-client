import React, { useState } from "react";
import cl from "./Authorization.module.scss";
import Input from "../../utils/input/Input";
import { registration } from "../../actions/user";
import { useNavigate } from "react-router-dom";

const Registartion = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	return (
		<form
			className={cl.Authorization}
			onSubmit={(e) => {
				registration(email, password);
				e.preventDefault();
			}}
		>
			<div className={cl.Header}>Регистрация</div>
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
			<button className={cl.Button}>Зарегистироваться</button>
		</form>
	);
};

export default Registartion;
