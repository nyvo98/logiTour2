import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  Row,
  Col,
  Radio,
  notification,
  Select,
  Form,
  Input
} from 'antd'
import { arrCountry } from 'common/constants'

import './styles.scss'
import BaseAPI from 'controller/API/BaseAPI'
import StorageActions from 'controller/Redux/actions/storageActions'
import { bindActionCreators } from 'redux'
import MyButton from 'pages/Components/MyButton'
import { getLength } from 'common/function'

class MyPageDetail extends Component {
  constructor (props) {
    super(props)
    const { user } = props
    let nationName, nationCodeName
    let nationCode = []

    if (getLength(user.nation) > 0) {
      const findNation = arrCountry.find(item => item[1] === user.nation)
      nationName = findNation ? findNation[0] : undefined
      nationCodeName = findNation ? findNation[2] : undefined

      nationCode = arrCountry.filter(c => c[1] === user.nation)
      nationCode = nationCode[0][nationCode[0].length - 1]
    }

    console.log(nationCode)

    this.state = {
      nationName,
      nationCodeName,
      nationCode,
      code: undefined,
      nation: user.nation,
      fail: false,
      isDisabled: false
    }

    this.form = React.createRef()
  }

  handleFormError = () => {
    const field = this.form.current.getFieldsError()
    const errs = field.map(x => x.errors).flat()

    this.setState({ isDisabled: errs.length > 0 })
  }

  onChangeCountry = value => {
    const nationCode = arrCountry.filter(c => c[1] === value)

    this.setState({
      code: nationCode[0][nationCode[0].length - 1][0],
      nationCode: nationCode[0][nationCode[0].length - 1],
      nation: value
    })
  };

  onChangeCode = code => {
    this.setState({ code })
  };

  handleSubmitForm = () => {
    this.form.current.submit()
  };

  onSubmit = async value => {
    const { user, setUserRedux, locale } = this.props
    const { messages } = locale

    try {
      value.nation = value.nationName
      value.nationCode = value.codeNation

      delete value.nationName
      delete value.codeNation

      const response = await BaseAPI.putData('user', { ...value, id: user.id })

      if (!response) throw messages.somethingWrong

      setUserRedux(response)

      notification.success({
        message: messages.success,
        description: messages.updateUserInfoOk,
        placement: 'bottomRight'
      })
    } catch (e) {
      notification.error({
        message: messages.error,
        description: messages.somethingWrong,
        placement: 'bottomRight'
      })
    }
  };

  renderCountry = () => {
    const { messages } = this.props.locale
    return (
      <Select
        placeholder={messages.selectYourNation || ''}
        size='large'
        loading
        defaultValue={this.state.nationName || undefined}
        onSelect={this.onChangeCountry}
        suffixIcon={
          <div style={{ transform: 'translate(-50%,-25%)' }}>
            <i className='icon icon--accord-arrow icon--127' />
          </div>
        }
      >
        {arrCountry.map(country => {
          return <Select.Option key={country[1]}>{country[0]}</Select.Option>
        })}
      </Select>
    )
  };

  renderNationCode = () => {
    const { messages } = this.props.locale
    const { nationCode, code } = this.state
    return (
      <Select
        placeholder={messages.nationCode || ''}
        size='large'
        onSelect={this.onChangeCode}
        defaultValue={code || undefined}
        suffixIcon={
          <div style={{ transform: 'translate(-50%,-25%)' }}>
            <i className='icon icon--accord-arrow icon--127' />
          </div>
        }
      >
        {Array.isArray(nationCode) ? (
          nationCode.map(code => {
            return <Select.Option key={code}>{code}</Select.Option>
          })
        ) : (
          <Select.Option key={nationCode}>{nationCode}</Select.Option>
        )}
      </Select>
    )
  };

  render () {
    const { user, locale } = this.props
    const { nation, isDisabled } = this.state
    const { messages } = locale

    const initialValue = {
      email: user.email || '',
      firstName: user.firstName,
      lastName: user.lastName,
      sex: user.sex,
      locale: user.locale,
      residentNum: user.residentNum,
      nationName: getLength(user.nation) > 0 ? user.nation : undefined,
      codeNation: getLength(user.nationCode) > 0 ? user.nationCode : undefined,
      phone: user.phone,
      address: user.address
    }

    return (
      <div className='my-page-detail MT50 PT50'>
        <Col className='column2' span={24}>
          <Form
            initialValues={initialValue}
            ref={this.form}
            onFinish={this.onSubmit}
            onFieldsChange={this.handleFormError}
          >
            <p className='column2_title'>{messages.myInformation}</p>
            <p>{messages.basicInformation}</p>
            <Row gutter={[8, 16]}>
              <Col span={24}>
                <Form.Item name='email' rules={[{ required: true }]}>
                  <Input
                    placeholder='sally.c@the14.com'
                    className='column2_input'
                    disabled
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name='firstName' rules={[{ required: true }]}>
                  <Input placeholder={messages.firstName} className='column2_input' />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name='lastName' rules={[{ required: true }]}>
                  <Input placeholder={messages.lastName} className='column2_input' />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item name='sex' rules={[{ required: true }]}>
                  <Radio.Group
                    style={{ display: 'flex', justifyContent: 'space-between' }}
                  >
                    <div style={{ flex: 1 }}>
                      <Radio value>{messages.male}</Radio>
                    </div>
                    <div style={{ flex: 1 }}>
                      <Radio value={false}>{messages.female}</Radio>
                    </div>
                  </Radio.Group>
                </Form.Item>
              </Col>
              <Col xs={24} lg={12}>
                <Form.Item name='nationName'>{this.renderCountry()}</Form.Item>
              </Col>
              <Col xs={24} lg={12}>
                <Form.Item
                  name='residentNum'
                  rules={[
                    ({ getFieldValue }) => ({
                      validator (rule, value) {
                        const type = getFieldValue('nation') === 'kr' ? messages.residentReg : messages.passport
                        if (value) {
                          return Promise.resolve()
                        }
                        const messErr = type + ' Number is required' || ''
                        return Promise.reject(
                          messErr
                        )
                      }
                    })
                  ]}
                >
                  <Input
                    placeholder={`${nation === 'kr' ? messages.resident : messages.passport} ${messages.registrationNumber}*`}
                    className='column2_input'
                  />
                </Form.Item>
              </Col>
              <Col xs={24} lg={12}>
                <Form.Item name='codeNation' rules={[{ required: true }]}>{this.renderNationCode()}</Form.Item>
              </Col>
              <Col xs={24} lg={12}>
                <Form.Item name='phone'>
                  <Input
                    placeholder={`${messages.enterPhoneProfile}*`}
                    className='column2_input'
                  />
                </Form.Item>
              </Col>
              <Col span={24}>{messages.address}</Col>
              <Col span={24}>
                <Form.Item name='address'>
                  <Input
                    placeholder={messages.inputAddress}
                    className='column2_input'
                  />
                </Form.Item>
              </Col>
              <Col span={24}>
                <div
                  style={{
                    width: '100%',
                    maxWidth: '32.9rem',
                    textAlign: 'center',
                    margin: '0 auto'
                  }}
                >
                  <MyButton
                    title='Save'
                    isDisabled={isDisabled}
                    isFullWidth
                    onClick={this.handleSubmitForm}
                  />
                </div>
              </Col>
            </Row>
          </Form>
        </Col>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  locale: state.locale,
  user: state.userRedux
})

const mapDispatchToProps = dispatch => ({
  setUserRedux: bindActionCreators(StorageActions.setUserRedux, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(MyPageDetail)
