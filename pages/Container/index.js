import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Layout } from 'antd'
import Header from './Header'
import Footer from './Footer'
import './style.scss'
import { withRouter } from 'next/router'
const { Content } = Layout

class BaseContainer extends PureComponent {
  render () {
    const { asPath } = this.props.router
    return (
      <Layout>
        <Header />
        <Layout className={`layout-container ${asPath.indexOf('my-page') >= 0 ? 'layout-container--blue' : ''}`}>
          <Content className='base-content'>
            <div className='base-container'>
              <div className='base-container'>{this.props.children}</div>
            </div>
          </Content>
        </Layout>
        <Footer />
      </Layout>
    )
  }
}

const mapStateToProps = (state) => ({
  locale: state.locale
})

export default connect(mapStateToProps)(withRouter(BaseContainer))
