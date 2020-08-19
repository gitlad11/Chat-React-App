import React, { useState } from 'react';
import './Backgrounds.css'
import Footer from './Components/Footer'
import Sidebar from './Components/Sidebar'
import { Redirect } from 'react-router-dom'
import Header from './Components/Header'
import Profile from './Components/Profile'

export default class ProfilePage extends React.Component{
	constructor(props){
		super(props)
	}
	render(){
		return(
			<div className='ProfilePage'>
				<div className='Page'>
					<Header/>
					<Sidebar/>
					<Profile/>
				</div>
				<Footer/>
			</div>
		)
	}
}
