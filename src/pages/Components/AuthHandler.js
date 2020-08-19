import {React, useEffect, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import AuthContext from '../../AuthContext'

export default function (props){
	const history = useHistory();
	const { setAuthUser } = useContext(AuthContext)
	fetch('/login', {
			method : "POST",
			headers : {
				"Content-type": "application/json" 
			},
			body : JSON.stringify(props.login)
		})
		.then(response => response.json())
		.then(response => console.log(response))
		.then(response => setAuthUser({ 
			token : response.data.token,
			AuthUser : response.data.user 
		}))
		
		.catch(error => console.log(error))
		return (
			<div></div>
		)
}