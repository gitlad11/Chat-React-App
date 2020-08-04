import React from 'react';
import './Backgrounds.css'
import Footer from './Components/Footer'
import Sidebar from './Components/Sidebar'
import Header from './Components/Header'
import Profile from './Components/Profile'

export default class ProfilePage extends React.Component{
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
			<div className='ProfilePage'>
				<div className='Page'>
					<Header AuthUser={this.state.AuthUser}/>
					<Sidebar notification={this.state.notification}/>
					<Profile/>
				</div>
				<Footer/>
			</div>
		)
	}
}
