import React, { useContext, useEffect, useState } from 'react'
import AuthContext from '../../AuthContext'
import Axios from 'axios'
import './PeopleList.css';

export default function PeopleMenu(){
	const { AuthUser , setAuthUser } = useContext(AuthContext)
	const [ users , setUsers ] = useState()
		Axios.get('http://localhost:3001/users')
		.then((response) => {
			setUsers(response.data)
		})
		.catch((error) => {
			console.log("error in fetching data")
		})
	console.log(users)
	return (
		<div className='PeopleMenu'>
			<div className='PeopleBar'>
				<button className='btn People-search-btn'>Поиск</button>
				<input placeholder='поиск людей'/>
			</div>
			<div className='PeopleList'>
			{users.map( users => 
				<div className='People-Item'>
					<div className='People-Avatar'><img/></div>
					<div className='People-Info'>
						<h6>{users.user_name}</h6>
						<p>{users.email}</p>
						<p>{users.age}</p>
					</div>
				</div>
			)}
			</div>
		</div>
	)
}
