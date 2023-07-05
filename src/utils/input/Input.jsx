import React from "react";
import cl from "./Input.module.scss";

const Input = (props) => {
	return (
		<input
			className={cl.Input}
			onChange={props.onChange}
			value={props.value}
			type={props.type}
			placeholder={props.placeholder}
		/>
	);
};

export default Input;
