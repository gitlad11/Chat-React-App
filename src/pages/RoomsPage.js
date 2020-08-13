import React from 'react'
import Header from './Components/Header'
import Sidebar from './Components/Sidebar'
import UsersInfo from './Components/UsersInfo'
import Footer from './Components/Footer'
import './Backgrounds.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NewFeature from './Components/NewFeature'

class RoomsPage extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			AuthUser : {username : 'Ivan', email : 'efimovi420@gmail.com', friends : []}, 
			isOnline : false,
			notification : false,
			}
	}
	render(){
		return(
			<div className='RoomsPage'>
			<div className='Page'>
				<Header AuthUser={this.state.AuthUser}/>
				<UsersInfo friends={this.state.AuthUser.friends} name='Ivan' lastname='Space' isOnline={this.state.isOnline}/>
				<Sidebar notification={this.state.notification}/>
				<NewFeature/>
			</div>
				<Footer/>	
			</div>
		)
	}
}
export default RoomsPage;