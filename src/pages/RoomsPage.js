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
	}
	render(){
		return(
			<div className='RoomsPage'>
			<div className='Page'>
				<Header/>
				<UsersInfo/>
				<Sidebar/>
				<NewFeature/>
			</div>
				<Footer/>	
			</div>
		)
	}
}
export default RoomsPage;