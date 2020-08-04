import React from 'react';
import './DialogsList.css';
import DialogsList from './DialogsList';
import DialogBar from './DialogBar'
import DialogBox from './DialogBox'
class DialogsMenu extends React.Component{
	render(){
		return(			
			<div className='DialogsMenu'>
			 	<DialogBar/>
			<div className='Dialog-Window'>	
				<DialogsList/>
				<DialogBox/>
			</div>
			</div>

		)
	}
}
export default DialogsMenu;