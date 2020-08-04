import React from 'react';
import {Link} from 'react-router-dom';
import './UsersInfo.css';
import UserAvatar from './Images/icons8-male-user.png';
import NotFound from './Images/NoFound.png';

export default class UsersInfo extends React.Component{
	constructor(props){
		super(props)

	}
	render(){
		if(this.props.friends.length == 0){
			return(
				<div className='UsersInfo'>
					<div className='NoUsers'>
						<img className='NoUsers-Image' src={NotFound} />
						<h6>У вас еще нет друзей :(</h6>
					</div>
					<div className='friends-details'><button className='btn btn-secondary'>Больше</button><button className='btn btn-primary'>Добавить</button></div>
				</div>
			)
		}

		return(
			<div className='UsersInfo'>
				{this.props.friends.map(friends =>	
				<div className='friend-card'>
					<div className='friend-avatar'><img src={UserAvatar}/></div>
					<p className='friend-name'>{friends.name} {friends.lastname}</p>
					<div className='online-icon online'></div>
				</div>
				)}
				<div className='friends-details'><button className='btn btn-secondary'>Больше</button><button className='btn btn-primary'>Добавить</button></div>							
			</div>
		)
	}
}

//Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a>