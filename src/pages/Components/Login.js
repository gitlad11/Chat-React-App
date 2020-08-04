import React from 'react'
import './Login.css'
import {Link} from 'react-router-dom'

class Login extends React.Component{
	constructor(props){
		super(props)
		this.state = {email : [], password : []}
		this.state = {hidden : true}
		 this.emailChange = this.emailChange.bind(this)
		 this.passwordChange = this.passwordChange.bind(this)
		 this.onSubmit = this.onSubmit.bind(this)
		 this.toggleShow = this.toggleShow.bind(this)
		 this.ClearInput = this.ClearInput.bind(this)
	}
	emailChange(event){
		this.setState({email : event.target.value})
	}
	passwordChange(event){
		this.setState({password : event.target.value})
	}
	ClearInput(event){
		event.target.value = '';
		return true;
	}
	onSubmit(event){
		const data = this.state
		
		fetch('/api/signup', {
			method : "POST",
			headers : {
				'Content-type': 'application/json' 
			},
			body : JSON.stringify(data)
		})
		.then((result) => result.json())
		.then((info) => {console.log(info);})
	}
	toggleShow() {
    this.setState({ hidden: !this.state.hidden });
  	}
	render(){
		return(
			<div className='login-form'>
				<form   method='post'>
				<h3>Вход</h3>
				<input onSubmit={this.ClearInput} onChange={this.emailChange} className='form-field field' type='email' placeholder='Эл. адрес'/>
				<input onSubmit={this.ClearInput} type={this.state.hidden ? "password" : "text"} onChange={this.passwordChange} className='form-field field' placeholder='Пароль'/>
				<label><input type='checkbox' onClick={this.toggleShow} />показать Пароль</label><br/>
				<button onClick={this.onSubmit} className='btn btn-primary'  type='primary'>Войти</button>
				<p>еще нет профиль? <Link to='/registration'> Зарегистрироваться</Link></p>
			</form>
			</div>
		)
	}
}
export default Login;