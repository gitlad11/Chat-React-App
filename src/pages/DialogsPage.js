import React from 'react';
import Header from './Components/Header'
import DialogsMenu from './Components/DialogsMenu'
import Sidebar from './Components/Sidebar'
import UsersInfo from './Components/UsersInfo'
import Footer from './Components/Footer'
import 'bootstrap/dist/css/bootstrap.min.css';
import './Backgrounds.css';
import { Redirect } from 'react-router-dom'

class DialogsPage extends React.Component{
	constructor(props){
		super(props)
		
	}
	render(){
		return(
			<div className='Dialogs-Page'>
			<div className='Page'>
				<Header/>
				<UsersInfo/>
				<Sidebar/>
				<DialogsMenu/>
			</div>	
				<Footer/>	
			</div>
		)
	}
}
export default DialogsPage;
