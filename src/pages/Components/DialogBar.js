import React from 'react';
import './DialogsList.css';
import UserAvatar from './Images/icons8-male-user.png';

function DialogBar(props){
	return ( 
		<div className='DialogBar'>
			<div className='DialogBar-Avatar'><img src={UserAvatar}/></div>
		</div>
	)
}
export default DialogBar;
