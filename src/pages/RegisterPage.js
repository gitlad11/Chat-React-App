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
		
	}
	render(){
		return(
			<div className='LoginPage'>
			<div className='Page'>
				<Header/>
				<UsersInfo/>
				<Registration/>
				<Sidebar/>
			</div>
				<Footer/>
			</div>
		)
	}
}
export default RegisterPage;
