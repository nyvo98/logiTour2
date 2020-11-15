import React from 'react'
import './style.scss'
const ConfirmationRequest = (props) => {
  return (
    <div className='modal-confirmation-request-container'>
      <p className='text text-title text-bold'>CONFIRMATION REQUEST</p>
      <div className='text text-content'>
        <p>We sent a confirmation email to your email address below:</p>
        <p className='text text-content text-color-2'>nam19960211@yopmail.com</p>
        <p className='text text-content text-underline cursor pointer'>Resend email.</p>
        <p className='text text-content text-color-3'>You can resend maximum 5 times only</p>
        <p className='text text-content text-underline cursor pointer'>Change Email</p>
      </div>
    </div>
  )
}

export default ConfirmationRequest
