import React from 'react'
import './Footer.css'
import ReactImage from './Images/ReactLogo192.png'
import BootstrapImage from './Images/BootstrapLogo.png'
import Icons8Image from './Images/Icons8-Logo.jpg'

function Footer(){
	return(
		<div className='Footer container-fluid'>			
				<a href='https://reactjs.org/'>
					<div className='Footer-item React'><img src={ReactImage}/></div>
				</a>
				<a href='https://bootstrap-4.ru/'>
					<div className='Footer-item Bootstrap'><img src={BootstrapImage}/></div>
				</a>
				<a href='https://icons8.com/'>
					<div className='Footer-item Icons8'><img src={Icons8Image}/></div>
				</a>							
		</div>
		)
}
export default Footer;