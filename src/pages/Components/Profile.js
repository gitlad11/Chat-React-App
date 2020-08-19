import React, { useState, useContext } from 'react';
import './Profile.css';
import { Redirect } from 'react-router-dom'
import AuthContext from '../../AuthContext'
import ProfileIcon from './Images/icons8-male-user.png';
import UpdateIcon from './Images/icons8-редактировать.png';
import CloseIcon from './Images/icons8-close.png';

function Profile(props){
	var [open, setOpen] = useState(false)
	var { AuthUser, setAuthUser } = useContext(AuthContext)

	const setOn = () => setOpen(true);
	const setOff = () => setOpen(false);

	const logout = () => {
		setAuthUser({
			token : undefined,
			AuthUser : undefined,

		})
		localStorage.setItem("auth-token", "")
	}
	if(!AuthUser){
		return(
			<Redirect to='login/'/>
			)
	}
	return(
		<div className='Profile'>
			<div className='Profile-Image'><img src={ProfileIcon}/></div>
			<div className='Profile-Update'>
			<div className='Profile-Name'><h5>{AuthUser.username}</h5><p className=''>{AuthUser.email}</p></div>
			<button onClick={setOn}  className='btn update-button'><img src={UpdateIcon}/></button>
			<form className={open === true ? "Update-form-Active" : "Update-form"}>
				<input placeholder='Изменить Имя' className='name-input'/>
				<input placeholder='Изменить Эл.почту' className='email-input'/>
				<div className='buttons d-flex'>
				<button height='30' width='50' className='btn btn-success'>готово</button>
				<button onClick={setOff} className='btn close-button'><img height='30' width='30' src={CloseIcon}/></button>
				</div>
			</form>
			</div>
		</div>
		)
}
export default Profile;