import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPopupDisplay } from "../../reducers/fileReducer";
import { createDir } from "../../actions/file";
import cl from "./Popup.module.scss";

const Popup = () => {
	const [dirName, setDirName] = useState("");
	const popupDisplay = useSelector((state) => state.files.popupDisplay);
	const currentDir = useSelector((state) => state.files.currentDir);
	const dispatch = useDispatch();

	function createHandler(e) {
		dispatch(createDir(currentDir, dirName));
		dispatch(setPopupDisplay("none"));
		setDirName("");
		e.preventDefault();
	}

	return (
		<div
			className={cl.Popup}
			style={{ display: popupDisplay }}
			onClick={() => dispatch(setPopupDisplay("none"))}
		>
			<form
				className={cl.Content}
				onClick={(event) => event.stopPropagation()}
				onSubmit={(e) => createHandler(e)}
			>
				<div className={cl.Header}>
					<div className={cl.Title}>Создать новую папку</div>
					<button
						type="button"
						className={cl.Close_btn}
						onClick={() => {
							dispatch(setPopupDisplay("none"));
						}}
					>
						&times;
					</button>
				</div>
				<input
					name="dirName"
					className={cl.DirName}
					type="text"
					placeholder="Введите название папки..."
					value={dirName}
					onChange={(e) => setDirName(e.target.value)}
				/>
				<button type="submit" className={cl.Create_btn}>
					Создать
				</button>
			</form>
		</div>
	);
};

export default Popup;
