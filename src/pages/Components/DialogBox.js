import React from 'react'
import './DialogBox.css'

function DialogBox(){
	return(
			<div className='Dialog-Box'>
				<div className='Dialog'>
					<div class="isme messages">
    					<div class="message">
      						сдесь будут сообщения от меня.хочу сделать фунцию что бы менять цвет сообщения
     					</div>
     						<p>11.22.2020</p>
     					<div class="message">
      						сдесь будут сообщения от меня.хочу сделать фунцию что бы менять цвет сообщения
     					</div>
     					</div>
     					 <div class="notme messages">
    						<div class="message ">
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