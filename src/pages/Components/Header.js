import React from 'react'
import './Header.css';
import {Link} from 'react-router-dom';

import UserAvatar from './Images/icons8-male-user.png';
import UserSettings from './Images/icons8-редактировать.png';

function Header(props){
	if(props.AuthUser.username == 0){
		return (
		<div className='container-fluid header nav nav-navbar'>
				<div className='Logo'><h5>LogoType</h5></div>
			<div className='btn-group nav-buttons'>
				<Link to='/login' className='link'><button className='btn btn-dark'>Сообщения</button></Link>
				<Link to='/rooms' className='link'><button className='btn btn-dark'>Комнаты</button></Link>
			</div>
			<Link to='/login'>
				<div className='User-card d-flex'>
				<div className='User-name'>
					<h6>Вы не авторизованы</h6>
				</div>		
				</div>
			</Link>
		</div>
			)
	}
	return(
		<div className='container-fluid header nav nav-navbar'>
		<div className='Logo'><h5>LogoType</h5></div>
			
				<div className='btn-group nav-buttons'>
				<Link to='/' className='link'><button className='btn btn-dark'>Сообщения</button></Link>
				<Link to='/rooms' className='link'><button className='btn btn-dark'>Комнаты</button></Link>
				</div>
			<Link to='/profile'><div className='User-card d-flex'>
				<div className='User-avatar'><img src={UserAvatar} className='User-image'/><div className=' User-settings' ><img src={UserSettings}/></div></div>
				<div className='User-name'><p>{props.AuthUser.username}</p><p className='text-muted'>{props.AuthUser.email}</p></div>
			</div>
			</Link>
		</div>
		)
}

export default Header;