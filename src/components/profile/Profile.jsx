import React from "react";
import cl from "./Profile.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { deleteAvatar, uploadAvatar } from "../../actions/user";
import avatarPlaceholder from "../../assets/avatar-placeholder.svg";
import { API_URL } from "../../config";

const Profile = () => {
	const dispatch = useDispatch();
	const currentUser = useSelector((state) => state.user.currentUser);

	const avatar = currentUser.avatar
		? `${API_URL + currentUser.avatar}`
		: avatarPlaceholder;

	function avatarChangeHandler(e) {
		const file = e.target.files[0];
		dispatch(uploadAvatar(file));
	}

	return (
		<div className={cl.Profile}>
			<img src={avatar} alt="avatar" className={cl.Avatar} />

			<button className={cl.Btn} onClick={() => dispatch(deleteAvatar())}>
				Удалить аватар
			</button>
			<div className={cl.Upload}>
				<label htmlFor="UploadAvatar" className={cl.InputLabel}>
					Загрузить аватар
				</label>
				<input
					type="file"
					id="UploadAvatar"
					className={cl.Upload__Avatar}
					accept="image/*"
					onChange={(e) => avatarChangeHandler(e)}
				/>
			</div>
		</div>
	);
};

export default Profile;
