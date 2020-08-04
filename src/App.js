import React from 'react';
import DialogsPage from './pages/DialogsPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage'
import RoomsPage from './pages/RoomsPage'
import ProfilePage from './pages/ProfilePage'

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Switch, Route } from 'react-router-dom';

class App extends React.Component{
	constructor(props){
		super(props)
	}
	componentWillMount(){
		fetch('/api/users')
		.then(result => this.setState({users: result}))
		.catch(error => console.log(error));
		}

	render(){
		return (
			<div className='App'>
				<Switch>
					<Route exact path='/' component={DialogsPage}/>
					<Route exact path='/login' component={LoginPage}/>
					<Route exact path='/registration' component={RegisterPage}/>
					<Route path='/rooms' component={RoomsPage}/>
					<Route path='/profile' component={ProfilePage}/>
				</Switch>
			</div>
		)
	}
}
export default App;
