import React, { useContext } from 'react'
import './DialogBox.css'
import { Redirect } from 'react-router-dom'
import AuthContext from '../../AuthContext'

function DialogBox(){
  var { AuthUser, setAuthUser } = useContext(AuthContext)

  if(!AuthUser){
    return (
      <Redirect to='login/'/>
      )
  }
	return(
			<div className='Dialog-Box'>
				<div className='Dialog'>
					<div className="isme messages">
    					<div className="message">
      						сдесь будут сообщения от меня.хочу сделать фунцию что бы менять цвет сообщения
     					</div>
     						<p>11.22.2020</p>
     					<div className="message">
      						сдесь будут сообщения от меня.хочу сделать фунцию что бы менять цвет сообщения
     					</div>
     					</div>
     					 <div className="notme messages">
    						<div className="message ">
     						 Hey!
   						 </div>
  						</div>
				</div>
				<div className='Dialog-Input'>
					<input placeholder='Нажмите что бы печатать'/>
					<button className='btn btn-success'>Отправить</button>
				</div>
			</div>
		)
}
export default DialogBox;