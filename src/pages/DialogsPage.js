import React from 'react';
import Header from './Components/Header'
import DialogsMenu from './Components/DialogsMenu'
import Sidebar from './Components/Sidebar'
import UsersInfo from './Components/UsersInfo'
import Footer from './Components/Footer'
import 'bootstrap/dist/css/bootstrap.min.css';
import './Backgrounds.css';

class DialogsPage extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			AuthUser : {username : '', email : '', friends : [], dialogs: []}, 
			isOnline : false,
			notification : false,
			}
	}
	render(){
		return(
			<div className='Dialogs-Page'>
			<div className='Page'>
				<Header AuthUser={this.state.AuthUser}/>
				<UsersInfo friends={this.state.AuthUser.friends} name='Ivan' lastname='Space' isOnline={this.state.isOnline}/>
				<Sidebar notification={this.state.notification}/>
				<DialogsMenu/>
			</div>	
				<Footer/>	
			</div>
		)
	}
}
export default DialogsPage;
