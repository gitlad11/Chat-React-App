import React, {useEffect , useState} from 'react'
import './Login.css'
import {Link} from 'react-router-dom'
import Axios from "axios"
import AuthContext from '../../AuthContext'

class Login extends React.Component{
	constructor(props){
		super(props)
		this.state = {username : [], password : [], hidden: true}
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
		const data = this.state
		
		fetch('/login', {
			method : "POST",
			headers : {
				"Content-type": "application/json" 
			},
			body : JSON.stringify(data)
		})
		.then(response => response.json())
		.then(result => console.log(result))
		.catch(error => console.log(error))
	}	
	render(){
		return(
			<div className='login-form'>
				<form   method='post'>
				<h3>Вход</h3>
				<input onSubmit={this.ClearInput} onChange={this.nameChange} className='form-field field' placeholder='Имя пользователя'/>
				<input onSubmit={this.ClearInput} type={this.state.hidden ? "password" : "text"} onChange={this.passwordChange} className='form-field field' placeholder='Пароль'/>
				<label><input type='checkbox' onClick={this.toggleShow} />показать Пароль</label>
				<button onClick={this.onSubmit} className='btn btn-primary'  type='primary'>Войти</button>
				<p>еще нет профиль? <Link to='/registration'> Зарегистрироваться</Link></p>
			</form>
			</div>
		)
	}
}
//function PasswordButton(){
	//const [show, setShow] = useState(false)
	//const showToggle = useEffect(() =>{
		//if(show == true){
			//setShow(false)
		//} else {
			//setShow(true)
		//}
	//}, [show, setShow])

	//return (
		//<div className='Passwordbtn'>
			//<label><input type='checkbox' onClick={showToggle} />показать Пароль</label>
		//</div>
	//)
//}
export default Login;