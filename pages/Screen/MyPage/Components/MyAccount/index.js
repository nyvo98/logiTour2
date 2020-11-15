import React from 'react'
import { connect } from 'react-redux'

import './style.scss'
import MyModal from 'pages/Components/MyModal'
import DeleteAccPopup from './Components/DeleteAccPopup'
import ChangePwPopup from './Components/ChangePwPopup'

import { arrCountry } from 'common/constants'

class MyAccount extends React.Component {
  constructor (props) {
    super(props)
    this.myModal = React.createRef()
  }
  onShowDeleteAccPopup = () => {
    this.myModal.current.openModal(<DeleteAccPopup closeModal={this.myModal.current.closeModal} />, 563)
  }
  onShowChangePwPopup = () => {
    this.myModal.current.openModal(<ChangePwPopup closeModal={this.myModal.current.closeModal} />, 563)
  }

  renderNationName = (nationCode) => {
    const nationName = arrCountry.filter(x => x[1] === nationCode)

    return nationName.length > 0 ? nationName[0][0] : null
  }

  render () {
    const { user } = this.props
    const { messages } = this.props.locale

    return (
      <div className='my-account-container MT100 PT50'>
        <h2 className='heading heading--main PB50'>{messages.myAccount}</h2>
        <div className='field-set'>
          <div className='field-set__title'>{messages.generalInfo}</div>
          <div className='field-set__content'>
            <ul>
              <li>
                <span className='gray'>{messages.email}</span>
                {user.email}
              </li>
              <li>
                <span className='gray'>{messages.firstName}</span>
                {user.firstName}
              </li>
              <li>
                <span className='gray'>{messages.lastName}</span>
                {user.lastName}
              </li>
              <li>
                <span className='gray'>{messages.nation}</span>
                {this.renderNationName(user ? user.nation : '')}
              </li>
            </ul>
          </div>
        </div>
        <div className='field-set field-set--hover'>
          <div className='field-set__title'>{messages.password}</div>
          <div className='field-set__content' onClick={this.onShowChangePwPopup}>
            {messages.changePassword}
            <div style={{ float: 'right' }}>
              <i className='icon icon--more icon--16' />
            </div>
          </div>
        </div>
        <div className='field-set field-set--hover field-set--disable'>
          <div className='field-set__title'>{messages.account}</div>
          <div className='field-set__content' onClick={this.onShowDeleteAccPopup}>
            {messages.deleteAcc}
            <div style={{ float: 'right' }}>
              <i className='icon icon--more icon--16' />
            </div>
          </div>
        </div>
        <MyModal ref={this.myModal} />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  locale: state.locale,
  user: state.userRedux
})

export default connect(mapStateToProps)(MyAccount)
