import React from "react";
import cl from "./FileList.module.scss";
import { useSelector } from "react-redux";
import File from "./file/File";

const FileList = () => {
	const files = useSelector((state) => state.files.files);
	const fileView = useSelector((state) => state.files.view);

	if (files.length === 0) {
		return <div className={cl.NotFound}>Файлы не найдены</div>;
	}

	if (fileView === "plate") {
		return (
			<div className={cl.FilePlate}>
				{files.map((file) => (
					<File key={file._id} file={file} />
				))}
			</div>
		);
	}

	if (fileView === "list") {
		return (
			<div className={cl.FileList}>
				<div className={cl.Header}>
					<div className={cl.Header__name}>Название</div>
					<div className={cl.Header__date}>Дата</div>
					<div className={cl.Header__size}>Размер</div>
				</div>
				{files.map((file) => (
					<File key={file._id} file={file} />
				))}
			</div>
		);
	}
};

export default FileList;
