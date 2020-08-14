import React, {useEffect} from 'react';
import DialogsPage from './pages/DialogsPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage'
import RoomsPage from './pages/RoomsPage'
import ProfilePage from './pages/ProfilePage'
import AuthContext from './AuthContext'
import Axios from 'axios'


import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Switch, Route } from 'react-router-dom';

class App extends React.Component{
	constructor(props){
		super(props)
		this.state = { AuthUser : undefined , token : undefined}
	}

	componentWillMount(){
		const checkLoggedIn = async () =>{
			var token = localStorage.getItem("auth-token")
			if (token === null){
				localStorage.setItem("auth-token", "");
				token = ""
			}
			const TokenValid = await Axios.post(
				"/tokenValid", null, { headers : {"x-auth-token" : token}}
				);
			if (TokenValid.data){
				var GetUser = await Axios.get("/users", {headers : {"x-auth-token" : token}})
			}		
			this.setState({ AuthUser : GetUser.data, token : token })
		}
		checkLoggedIn();
		}
	//useEffect(() =>{
		//const checkLoggedIn = async () =>{
			//var token = localStorage.getItem("auth-token")
			//if (token === null){
				//localStorage.setItem("auth-token", "");
				//token = ""
			//}
			//const TokenValid = await Axios.post(
				//"/tokenValid", null, { headers : {"x-auth-token" : token}}
				//);
			//if (tokenValid.data){
				//var GetUser = await Axios.get("/users", {headers : {"x-auth-token" : token}})
			//}
			//const setUser = this.setState()
			//setUser({ AuthUser : GetUser.data, token : token })
		//}
		//checkLoggedIn();
	//}, [])
	render(){
		var setAuthUser = this.setState()
		var AuthUser = this.state.AuthUser
		return (
			<div className='App'>
			<AuthContext.Provider value={{ AuthUser, setAuthUser }}>
				<Switch>
					<Route exact path='/' component={DialogsPage}/>
					<Route exact path='/login' component={LoginPage}/>
					<Route exact path='/registration' component={RegisterPage}/>
					<Route path='/rooms' component={RoomsPage}/>
					<Route path='/profile' component={ProfilePage}/>
				</Switch>
			</AuthContext.Provider>	
			</div>
		)
	}
}
export default App;
