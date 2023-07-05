import React, { useEffect, useState } from "react";
import Select from "react-select";
import cl from "./Disk.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { getFiles, uploadFile } from "../../actions/file";
import FileList from "./fileList/FileList";
import Popup from "./Popup";
import {
	popFromStack,
	setCurrentDir,
	setFileView,
	setPopupDisplay,
} from "../../reducers/fileReducer";
import Uploader from "../uploader/Uploader";

const Disk = () => {
	const options = [
		{ value: "name", label: "По имени" },
		{ value: "type", label: "По типу" },
		{ value: "date", label: "По дате" },
	];
	const dispatch = useDispatch();
	const currentDir = useSelector((state) => state.files.currentDir);
	const loader = useSelector((state) => state.app.loader);
	const dirStack = useSelector((state) => state.files.dirStack);
	const [dragEnter, setDragEnter] = useState(false);
	const [sort, setSort] = useState(null);

	useEffect(() => {
		dispatch(getFiles(currentDir, sort));
	}, [currentDir, sort]);

	function showPopupHandler() {
		dispatch(setPopupDisplay("flex"));
	}

	function backClickHandler() {
		const backDirId = dirStack.at(-1);
		dispatch(popFromStack());
		dispatch(setCurrentDir(backDirId));
	}

	function fileUploadHandler(event) {
		const files = [...event.target.files];
		files.forEach((file) => dispatch(uploadFile(file, currentDir)));
	}

	function dragEnterHandler(event) {
		event.preventDefault();
		event.stopPropagation();
		setDragEnter(true);
	}

	function dragLeaveHandler(event) {
		event.preventDefault();
		event.stopPropagation();
		setDragEnter(false);
	}

	function dropHandler(event) {
		event.preventDefault();
		event.stopPropagation();
		let files = [...event.dataTransfer.files];
		files.forEach((file) => dispatch(uploadFile(file, currentDir)));
		setDragEnter(false);
	}

	if (loader) {
		return (
			<div className={cl.Loader}>
				<div className={cl.ldsDualRing}></div>
			</div>
		);
	}

	return !dragEnter ? (
		<div
			className={cl.DragHandle}
			onDragEnter={dragEnterHandler}
			onDragLeave={dragLeaveHandler}
			onDragOver={dragEnterHandler}
		>
			<div className="Container">
				<div className={cl.Disk}>
					<div className={cl.Btns}>
						<button className={cl.Btn__back} onClick={() => backClickHandler()}>
							Назад
						</button>
						<button
							className={cl.Btn__create}
							onClick={() => showPopupHandler()}
						>
							Создать папку
						</button>
						<div className="Upload">
							<label htmlFor="Upload__input" className={cl.Upload__label}>
								Загрузить файл
							</label>
							<input
								type="file"
								id="Upload__input"
								className={cl.Upload__input}
								multiple={true}
								onChange={(event) => fileUploadHandler(event)}
							/>
						</div>
						<Select
							value={sort}
							onChange={(e) => {
								const index = options.findIndex(
									(options) => options.value === e.value
								);
								setSort(options[index]);
							}}
							isSearchable={false}
							options={options}
							placeholder="Сортировка"
							className={cl.Select}
							theme={(theme) => ({
								...theme,
								colors: {
									...theme.colors,
									primary25: "#56688526",
									primary: "#566885",
									neutral80: "#566885",
								},
							})}
						/>
						<button
							className={cl.PlateView}
							onClick={() => dispatch(setFileView("plate"))}
						/>
						<button
							className={cl.ListView}
							onClick={() => dispatch(setFileView("list"))}
						/>
					</div>
					<FileList />
				</div>
				<Popup />
				<Uploader />
			</div>
		</div>
	) : (
		<div
			className={cl.DropArea}
			onDrop={dropHandler}
			onDragEnter={dragEnterHandler}
			onDragLeave={dragLeaveHandler}
			onDragOver={dragEnterHandler}
		>
			+
		</div>
	);
};

export default Disk;
