import React from 'react'
import { withRouter } from 'next/router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import StorageAction from 'controller/Redux/actions/storageActions'
import PackageList from '../PackageList'
import './style.scss'
import PageReduxAction from 'controller/Redux/actions/pageActions'

class HomeScreen extends React.PureComponent {
  static async getInitialProps ({ query }) {
    return { query }
  }
  async componentDidMount () {
    const { setHeader } = this.props
    this.setDefaultLanguage()
    setHeader && setHeader({ height: 70 })
  }

  setDefaultLanguage = () => {
    const { setLocale, router } = this.props
    const lang = router.pathname ? router.pathname.replace('/', '') : ''
    if (['ja', 'cn', 'en', 'vi'].includes(lang)) {
      setLocale && setLocale(lang)
    }
  }

  render () {
    return (
      <PackageList
        tokenConfirm={this.props.query ? this.props.query.tokenConfirm : undefined}
        token={this.props.query ? this.props.query.token : undefined}
      />
    )
  }
}

const mapStateToProps = (state) => ({
  locale: state.locale
})

const mapDispatchToProps = (dispatch) => {
  return {
    setLocale: bindActionCreators(StorageAction.setLocale, dispatch),
    setHeader: bindActionCreators(PageReduxAction.setHeader, dispatch)
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeScreen))
