import React, {useEffect , useState, useContext } from 'react'
import { useHistory } from "react-router-dom"
import AuthContext from '../../AuthContext'
import './Login.css'
import {Link} from 'react-router-dom'

import ProfileIcon from './Images/icons8-male-user.png';


class Login extends React.Component{
	constructor(props){
		super(props)
		this.state = {username : [], password : [], hidden: true,success: false, result: []}
		 this.nameChange = this.nameChange.bind(this)
		 this.passwordChange = this.passwordChange.bind(this)
		 this.onSubmit = this.onSubmit.bind(this)
		 this.ClearInput = this.ClearInput.bind(this)
		 this.toggleShow = this.toggleShow.bind(this)
		
	}
	nameChange(event){
		this.setState({username : event.target.value})
	}
	
	passwordChange(event){
		this.setState({password : event.target.value})
	}
	ClearInput(event){
		event.target.value = '';
	}
	toggleShow() {
    this.setState({ hidden: !this.state.hidden });
  	}
	onSubmit(event){
		event.preventDefault()
		delete this.state.hidden
		delete this.state.result
		delete this.state.success

		const login = this.state
		fetch('http://localhost:3001/login', {
			method : "POST",
			headers : {
				"Content-type": "application/json" 
			},
			body : JSON.stringify(login)
		})
		.then(response => response.json())
		.then(response => alert(response.message))
		.then(response => this.setState({success : response.sucess, result : response.user}))
		.then(response => localStorage.setItem("auth-token", response.token);		
		.catch(error => console.log(error.message))
	}

	//export default function Login(){
		//var [username, setUsername] = useState()
		//var [password, setPassword] = useState()
		//var [error, setError] = useState()

		//var { setAuthUser } = useContext(AuthContext)
		//var history = useHistory()

		//const [show, setShow] = useState(false)
		//const showToggle = useEffect(() =>{
		//if(show == true){
			//setShow(false)
		//} else {
			//setShow(true)
		//}
		//}, [show, setShow])

		//const submit = (event) =>{
			//event.preventDefault()
			//try {
				//var data = { username , password }
				//fetch('http://localhost:3001/login', {
					//method : "POST",
					//headers : {
						//"Content-type" : "application/json"
					//},
					//body : JSON.stringify(data)
				//})
				//.then(response => response.json())
				//.then(result => setAuthUser({
					//token : result.data.token,
					//AuthUser : result.data.user
				//}))
			//} catch (error){
				//setError(error.response.data.message)
			//}
		//}
		render(){
		if(this.state.success == true){
			return(
				<div className='login-card'>
					<h4>Вы вошли как</h4>
					<div className='User-Avatar'><img src={ProfileIcon}/></div>
					<p className='User-name'>{this.state.result.user_name}</p>
					<p className='User-email'>{this.state.result.email}</p>
				</div>
			)
		}
		return(
			<div className='login-form'>
				<form method='post'>
				<h3>Вход</h3>
				<input onChange = {this.nameChange} className='form-field field' placeholder='Имя пользователя'/>
				<input type={this.state.hidden ? "password" : 'text'} onChange={this.passwordChange} className='form-field field' placeholder='Пароль'/>
				<label><input type='checkbox' onClick={this.toggleShow} />показать Пароль</label>
				<button onClick={this.onSubmit} className='btn btn-primary'  type='primary'>Войти</button>
				<p>еще нет профиль? <Link to='/registration'> Зарегистрироваться</Link></p>
				</form>
			</div>
		)
	}
}
export default Login;