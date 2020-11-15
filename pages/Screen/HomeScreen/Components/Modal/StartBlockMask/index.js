import React from 'react'
import MyButton from 'pages/Components/MyButton'
import './style.scss'
const StartBlockMask = (props) => {
  return (
    <div className='modal-start-block-mask-container'>
      <p className='text text-title text-bold'>SMART BLOCK MARK</p>
      <p className='text text-content'>As the first step, please Log in or register an account using MetaMask or HB Wallet.</p>
      <MyButton />
    </div>
  )
}

export default StartBlockMask
