import React , {useState, useContext } from 'react'
import './DialogsList.css';
import DialogAvatar from './Images/icons8-male-user.png'
import AuthContext from '../../AuthContext'

function DialogsList(props){
		var { AuthUser, setAuthUser } = useContext(AuthContext)	
		return(
			<div className='DialogsList'>
				<div className='Dialog-item'><img src={DialogAvatar} className='Dialog-Avatar'/><b>Vasiliy Vovasov</b></div>
				<div className='Dialog-item'><img src={DialogAvatar} className='Dialog-Avatar'/><b>Vladimir Vosanov</b></div>
				<div className='Dialog-item'><img src={DialogAvatar} className='Dialog-Avatar'/><b>Stas Novladov</b></div>
			</div>
		)
	}

export default DialogsList;