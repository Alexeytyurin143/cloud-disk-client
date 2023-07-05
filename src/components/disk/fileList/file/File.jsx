import React from "react";
import cl from "./File.module.scss";
import dirIcon from "../../../../assets/dir.svg";
import fileIcon from "../../../../assets/file.svg";
import downloadIcon from "../../../../assets/download.svg";
import deleteIcon from "../../../../assets/delete.svg";
import { useDispatch, useSelector } from "react-redux";
import { pushToStack, setCurrentDir } from "../../../../reducers/fileReducer";
import { deleteFile, downloadFile } from "../../../../actions/file";
import sizeFormat from "../../../../utils/sizeFormat";

const File = ({ file }) => {
	const dispatch = useDispatch();
	const currentDir = useSelector((state) => state.files.currentDir);
	const fileView = useSelector((state) => state.files.view);

	function openDirHandler(file) {
		if (file.type === "dir") {
			dispatch(pushToStack(currentDir));
			dispatch(setCurrentDir(file._id));
		}
	}

	function downloadClickHandler(e) {
		e.stopPropagation();
		downloadFile(file);
	}

	function deleteClickHandler(e) {
		e.stopPropagation();
		dispatch(deleteFile(file));
	}

	if (fileView === "list") {
		return (
			<div className={cl.File} onClick={() => openDirHandler(file)}>
				<img
					src={file.type === "dir" ? dirIcon : fileIcon}
					alt="file type icon"
					className={cl.fileIcon}
				/>
				<div className={cl.Name}>{file.name}</div>
				<div className={cl.Date}>{file.date.slice(0, 10)}</div>
				<div className={cl.Size}>
					{file.type !== "dir" ? sizeFormat(file.size) : <div />}
				</div>
				{file.type !== "dir" ? (
					<button onClick={(e) => downloadClickHandler(e)} className={cl.Btn}>
						<img src={downloadIcon} alt="download icon" />
					</button>
				) : (
					<div />
				)}
				<button onClick={(e) => deleteClickHandler(e)} className={cl.Btn}>
					<img src={deleteIcon} alt="delete icon" />
				</button>
			</div>
		);
	}
	if (fileView === "plate") {
		return (
			<div
				title={file.name}
				className={cl.FilePlate}
				onClick={() => openDirHandler(file)}
			>
				<img
					src={file.type === "dir" ? dirIcon : fileIcon}
					alt="file type icon"
					className={cl.FilePlateIcon}
				/>
				<div className={cl.PlateName}>{file.name}</div>
				<div className={cl.PlateBtns}>
					{file.type !== "dir" ? (
						<button onClick={(e) => downloadClickHandler(e)} className={cl.Btn}>
							<img src={downloadIcon} alt="download icon" />
						</button>
					) : (
						<div />
					)}
					<button onClick={(e) => deleteClickHandler(e)} className={cl.Btn}>
						<img src={deleteIcon} alt="delete icon" />
					</button>
				</div>
			</div>
		);
	}
};

export default File;
