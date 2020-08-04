import React , {useState} from 'react'
import './DialogsList.css';
import DialogAvatar from './Images/icons8-male-user.png'
function DialogsList(props){	
		return(
			<div className='DialogsList'>
				<div className='Dialog-item'><img src={DialogAvatar} className='Dialog-Avatar'/><b>Vasiliy Vovasov</b></div>
				<div className='Dialog-item'><img src={DialogAvatar} className='Dialog-Avatar'/><b>Vladimir Vosanov</b></div>
				<div className='Dialog-item'><img src={DialogAvatar} className='Dialog-Avatar'/><b>Stas Novladov</b></div>
			</div>
		)
	}

export default DialogsList;