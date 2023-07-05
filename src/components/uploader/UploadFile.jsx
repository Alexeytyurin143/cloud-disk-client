import React from "react";
import { useDispatch } from "react-redux";
import { removeUploadFile } from "../../reducers/uploadReducer";
import cl from "./Uploader.module.scss";

const UploadFile = ({ file }) => {
	const dispatch = useDispatch();

	return (
		<div className={cl.UploadFile}>
			<div className={cl.UploadFile__header}>
				<div className={cl.UploadFile__name}>{file.name}</div>
				<button
					className={cl.Close}
					onClick={() => dispatch(removeUploadFile(file.id))}
				>
					&times;
				</button>
			</div>
			<div className={cl.UploadFile__progressBar}>
				<div
					className={cl.UploadFile__uploadBar}
					style={{ width: file.progress + "%" }}
				></div>
				<div className={cl.UploadFile__percent}>{file.progress}%</div>
			</div>
		</div>
	);
};

export default UploadFile;
