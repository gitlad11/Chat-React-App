import React from 'react';
import {Link} from 'react-router-dom';
import './Hamburger.css';

function Hamburger(props){
	return(

			<nav role="navigation">
  		<div id="menuToggle">
  
    			<input type="checkbox" />

    			<span></span>
    			<span></span>
    			<span></span>

    			<ul id="menu">
      		<Link className='Link' to=''><li>Home</li></Link>
      		<Link className='Link' to=''><li>Notifications</li></Link>
  				</ul>
  			</div>
		</nav>
	)
}
export default Hamburger;