import React, { useState } from 'react';
import './Profile.css';
import ProfileIcon from './Images/icons8-male-user.png';
import UpdateIcon from './Images/icons8-редактировать.png';
import CloseIcon from './Images/icons8-close.png';

function Profile(props){
	var [open, setOpen] = useState(false)

	const setOn = () => setOpen(true);
	const setOff = () => setOpen(false);

	return(
		<div className='Profile'>
			<div className='Profile-Image'><img src={ProfileIcon}/></div>
			<div className='Profile-Update'>
			<div className='Profile-Name'><h5>Name Lastname</h5><p className=''>Email420@gmail.com</p></div>
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