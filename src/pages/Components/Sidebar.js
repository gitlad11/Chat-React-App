import React, {useState} from 'react';
import MessageLogo from './Images/icons8-message.png';
import FriendsLogo from './Images/icons8-friends.png';
import './Sidebar.css'


function Sidebar(){
	const [popUp, setpopUp] = useState(false);

	return (
		<div className='sidebar'>
			<div className='sidebar-item'><div className='notification'></div><img className=' sidebar-icon' src={MessageLogo}/></div>
			<div className='sidebar-item'><img className=' sidebar-icon' src={FriendsLogo}/></div>
		</div>
	)
}
export default Sidebar;