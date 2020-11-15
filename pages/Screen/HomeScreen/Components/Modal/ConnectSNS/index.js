import React from 'react'
import MyButton from 'pages/Components/MyButton'
import './style.scss'
const ConnectSNS = (props) => {
  return (
    <div className='modal-connect-sns-container'>
      <p className='text text-title text-bold'>CONNECT SNS</p>
      <p className='text text-content'>Since you are a creator, please connect to your Instagram account</p>
      <MyButton
        title='Connect'
        onClick={null}
      />
    </div>
  )
}

export default ConnectSNS
