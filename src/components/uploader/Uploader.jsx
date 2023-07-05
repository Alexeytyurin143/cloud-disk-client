import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideUploader, removeUploadFile } from "../../reducers/uploadReducer";
import cl from "./Uploader.module.scss";
import UploadFile from "./UploadFile";

const Uploader = () => {
	const files = useSelector((state) => state.upload.files);
	const isVisible = useSelector((state) => state.upload.isVisible);
	const dispatch = useDispatch();

	return (
		isVisible && (
			<div className={cl.Uploader}>
				<div className={cl.Header}>
					<div className={cl.Header__title}>Загрузки</div>
					<button
						className={cl.Close}
						onClick={() => {
							dispatch(hideUploader());
							files.map((file) => dispatch(removeUploadFile(file.id)));
						}}
					>
						&times;
					</button>
				</div>
				{files
					.map((file) => <UploadFile key={file.id} file={file} />)
					.reverse()}
				;
			</div>
		)
	);
};

export default Uploader;
