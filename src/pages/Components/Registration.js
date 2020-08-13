import React, {useState} from 'react';
import './Login.css'
import {Link} from 'react-router-dom';

class Registration extends React.Component{
	constructor(props){
		super(props);
		this.state = {username:'',age:'',password:'', hidden:true}

		this.nameChange = this.nameChange.bind(this)
		this.passwordChange = this.passwordChange.bind(this)
		this.emailChange = this.emailChange.bind(this)
		this.ageChange = this.ageChange.bind(this)
		this.onSubmit = this.onSubmit.bind(this)
		 this.toggleShow = this.toggleShow.bind(this);
	}
	nameChange(event){
		this.setState({username: event.target.value})
	}
	passwordChange(event){
		this.setState({password: event.target.value})
	}
	ageChange(event){
		this.setState({age:event.target.value})
	}
	emailChange(event){
		this.setState({email : event.target.value})
	}
	toggleShow() {
    this.setState({ hidden: !this.state.hidden });
  	}
	onSubmit(event){
		delete this.state.hidden
		const data = this.state
		event.preventDefault();
		fetch('/signup',{
			method: "POST",
			headers: {
				"Content-type" : "application/json"
			},
			body: JSON.stringify(data)
		})
		//.then((result) => result.json())
		.then(response => response.json())
		.then(result => console.log(result))
		.catch(error => console.log(error))
	}
	render(){
		return (
		<div className='login-form'>
			<form  onSubmit={this.onSubmit} method='post'>
				<h3>Регистрация</h3>
				<input className='form-field field' onChange={this.nameChange} placeholder='Имя'/>
				<input className='form-field field' onChange={this.emailChange } type='email' placeholder='Эл. адрес'/>
				<input type={this.state.hidden ? "password" : "text"} className='form-field field' onChange={this.passwordChange} placeholder='Пароль'/>
				<label><input type='checkbox' onClick={this.toggleShow} />показать Пароль</label>
				<input type='number' className='form-field field number-field' onChange={this.ageChange} placeholder='Возраст'/>
				<button onClick={this.onSubmit} className='btn btn-success'  type='primary'>отправить</button>
				<p>уже есть профиль?<Link to='/login'> Войти</Link></p>
			</form>
		</div>
		)
	}
}
export default Registration;