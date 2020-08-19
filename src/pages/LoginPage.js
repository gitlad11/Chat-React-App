import React from 'react';
import Header from './Components/Header'
import Login from './Components/Login'
import Sidebar from './Components/Sidebar'
import UsersInfo from './Components/UsersInfo'
import Footer from './Components/Footer'
import 'bootstrap/dist/css/bootstrap.min.css';
import './Backgrounds.css';

class LoginPage extends React.Component{
	constructor(props){
		super(props)
	}
	render(){
		return(
			<div className='LoginPage'>
			<div className='Page'>
				<Header/>
				<UsersInfo/>
				<Login/>
				<Sidebar/>
			</div>
				<Footer/>
			</div>
		)
	}
}
export default LoginPage;