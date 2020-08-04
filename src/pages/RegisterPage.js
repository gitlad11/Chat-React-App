import React from 'react';
import Header from './Components/Header'
import Registration from './Components/Registration'
import Sidebar from './Components/Sidebar'
import UsersInfo from './Components/UsersInfo'
import Footer from './Components/Footer'
import 'bootstrap/dist/css/bootstrap.min.css';
import './Backgrounds.css';

class RegisterPage extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			AuthUser : {name : 'Ivan', email : 'efimovi420@gmail.com', friends : []}, 
			isOnline : false,
			notification : false,
			}
	}
	render(){
		return(
			<div className='LoginPage'>
			<div className='Page'>
				<Header AuthUser={this.state.AuthUser}/>
				<UsersInfo friends={this.state.AuthUser.friends} name='Ivan' lastname='Space' isOnline={this.state.isOnline}/>
				<Registration/>
				<Sidebar notification={this.state.notification}/>
			</div>
				<Footer/>
			</div>
		)
	}
}
export default RegisterPage;
