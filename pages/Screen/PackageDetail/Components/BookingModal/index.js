import React from 'react'
import { connect } from 'react-redux'
import {
  Row,
  Col,
  Form,
  Input,
  Radio,
  Select,
  Checkbox,
  Collapse,
  Button
} from 'antd'
import Resizer from 'react-image-file-resizer'

import MyButton from 'pages/Components/MyButton'
import { formatNumberBro, showNotification, getLength } from 'common/function'
import { arrCountry } from 'common/constants'
import './style.scss'
import BaseAPI from 'controller/API/BaseAPI'

const validateMessages = {
  required: 'This field is required!',
  types: {
    email: 'Not a validate email!'
  }
}

const room = [
  'single',
  'double',
  'tripple',
  'quad'
]

class BookingModal extends React.PureComponent {
  constructor (props) {
    super(props)

    const { userRedux } = props
    let nationName, nationCodeName
    let nationCode = []
    if (userRedux) {
      if (getLength(userRedux.nation) > 0) {
        const findNation = arrCountry.find(item => item[1] === userRedux.nation)
        nationName = findNation ? findNation[0] : undefined
        nationCodeName = findNation ? findNation[2] : undefined

        nationCode = arrCountry.filter(c => c[1] === userRedux.nation)
        nationCode = nationCode[0][nationCode[0].length - 1]
      }
    }

    this.state = {
      nationName,
      nationCodeName,
      nationCode,
      code: undefined,
      nation: undefined,
      isDisabled: true,
      file: null,
      isLoading: false
    }

    this.fileRef = React.createRef()
    this.form = React.createRef()
  }

  onInputChange = e => {
    const { name, value, type, checked } = e.target
    const { form } = this.state

    if (type === 'checkbox') {
      return this.setState({ form: { ...form, [name]: checked } })
    }

    this.setState({ form: { ...form, [name]: value } })
  };

  onSelectChange = (value, name) => {
    const { form } = this.state

    this.setState({ form: { ...form, [name]: value } })
  };

  onFileInputChange = () => {
    this.setState({ file: this.fileRef.current.files[0] })
  };

  onChangeCountry = value => {
    const nationCode = arrCountry.filter(c => c[1] === value)

    this.setState({
      code: undefined,
      nationCode: nationCode[0][nationCode[0].length - 1],
      nation: value
    })
  };

  onChangeCode = code => {
    this.setState({ code })
  };

  handleFormError = () => {
    const field = this.form.current.getFieldsError()

    const checked = this.form.current.getFieldValue('agreement')

    console.log('checked', checked)

    const errs = field.map(x => x.errors).flat()

    const isDisabled = checked ? errs.length > 0 : true

    this.setState({ isDisabled })
  }

  renderCountry = () => {
    const { messages } = this.props.locale
    const { nation } = this.state
    return (
      <Select
        placeholder={messages.selectYourNation || ''}
        size='large'
        defaultValue={this.state.nationName}
        onSelect={this.onChangeCountry}
        suffixIcon={
          <div style={{ transform: 'translate(-50%,-25%)' }}>
            <i className='icon icon--accord-arrow icon--12' />
          </div>
        }
        value={undefined}
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
        value={undefined}
        defaultValue={this.state.nationCodeName}
        suffixIcon={
          <div style={{ transform: 'translate(-50%,-25%)' }}>
            <i className='icon icon--accord-arrow icon--12' />
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

  handleSubmitButton = () => {
    this.form.current.submit()
  }

  handleFormSubmit = async (values) => {
    // Upload first
    const file = this.fileRef.current.files
    const { tour } = this.props
    const { handlePayment } = this.props

    this.setState({ isLoading: true })

    if (file.length > 0) {
      const resizeImage = () => {
        return new Promise(async (resolve, reject) => {
          Resizer.imageFileResizer(
            file[0],
            1024,
            768,
            'PNG',
            70,
            0,
            (uri) => {
              resolve(uri)
            },
            'base64'
          )
        })
      }

      const f = await resizeImage()

      values.passportFile = await BaseAPI.postData('/upload', {
        base64: f
      })
    }

    try {
      values.nation = values.nationName
      values.nationCode = values.codeNation

      delete values.nationName
      delete values.codeNation

      const response = await BaseAPI.postData('tour/payment', { bookingInfo: values, tourId: tour.id })

      handlePayment({ ...tour, ...response, isPayment: false })()
    } catch (e) {
      showNotification('Error', 'Oops! There is something wrong.', 'error')
    }

    this.setState({ isLoading: false })
  }

  render () {
    const { file, isLoading, isDisabled } = this.state
    const { duration, price, title } = this.props.tour
    const { messages } = this.props.locale

    let initialValues
    if (this.props.userRedux) {
      const { firstName, lastName, email, residentNum, phone, address, nation, nationCode, sex } = this.props.userRedux || {}
      initialValues = {
        firstName,
        lastName,
        email,
        sex,
        residentNum,
        phone,
        address,
        nationName: nation || undefined,
        codeNation: nationCode || undefined
      }
    }

    return (
      <div className='booking-modal-container'>
        <h2 className='heading heading--main text text-center MB40'>
          {messages.makeYourHoliday || ''}
        </h2>
        <Form ref={this.form} validateMessages={validateMessages} initialValues={initialValues} onFinish={this.handleFormSubmit}
          onFieldsChange={this.handleFormError}>
          <Row gutter={8} className='MB40'>
            <Col xs={24} lg={12}>
              <h3 className='heading heading--20 dark'>
                {title} : {duration.normal}{' '}
                {duration.normal > 1 ? messages.days || '' : messages.day || ''}
              </h3>
            </Col>
            <Col xs={24} lg={12} className='text text-right'>
              <div className='heading heading--25 dark'>{`$ ${formatNumberBro(
                price
              )}`}</div>
            </Col>
          </Row>
          <h4 className='dark-gray MB16'>{messages.basicInformation || ''}</h4>
          <Row gutter={8}>
            <Col xs={24} lg={12}>
              <Form.Item name='firstName' rules={[{ required: true }]}>
                <Input
                  name='firstName'
                  placeholder={messages.firstName + ' *' || ''}
                />
              </Form.Item>
            </Col>
            <Col xs={24} lg={12}>
              <Form.Item name='lastName' rules={[{ required: true }]}>
                <Input
                  name='lastName'
                  placeholder={messages.lastName + ' *' || ''}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={8}>
            <Col xs={24} lg={12}>
              <Form.Item name='sex' rules={[{ required: true }]}>
                <Radio.Group
                  className='flex'
                >
                  <Radio value style={{ flex: '1' }} className='dark-gray'>
                    {messages.male || ''}
                  </Radio>
                  <Radio value={false} style={{ flex: '1' }} className='dark-gray'>
                    {messages.female || ''}
                  </Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
            <Col xs={24} lg={12}>
              <Form.Item
                name='email'
                rules={[{ required: true, type: 'email' }]}
              >
                <Input
                  placeholder={`${messages.enterEmail} *`}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={8}>
            <Col xs={24} lg={12}>
              <Form.Item name='nationName' rules={[{ required: true }]}>{this.renderCountry()}</Form.Item>
            </Col>
            <Col xs={24} lg={12}>
              <Form.Item name='residentNum' rules={[
                ({ getFieldValue }) => ({
                  validator (rule, value) {
                    const type = getFieldValue('nation') === 'kr' ? 'Resident Register' : 'Passport'
                    if (value) {
                      return Promise.resolve()
                    }
                    const messErr = type + ' Number is required' || ''
                    return Promise.reject(
                      messErr
                    )
                  }
                })
              ]}>
                <Input
                  placeholder={`${this.state.nation === 'kr' ? 'Resident' : 'Passport'} registration number*`}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={8}>
            <Col xs={24} lg={12}>
              <Form.Item name='codeNation'>{this.renderNationCode()}</Form.Item>
            </Col>
            <Col xs={24} lg={12}>
              <Form.Item name='phone' rules={[{ required: true }]}>
                <Input
                  placeholder={messages.inputPhone + ' *' || ''}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={8}>
            <Col xs={24} lg={12}>
              <h4 className='dark-gray MB16'>{messages.address || ''}</h4>
              <Form.Item name='address'>
                <Input
                  placeholder={messages.inputAddress || ''}
                />
              </Form.Item>
            </Col>
            <Col xs={24} lg={12}>
              <Form.Item>
                <h4 className='dark-gray MB16'>
                  {messages.passportCopy || ''}
                </h4>
                <div>
                  <label className='uploadField' htmlFor='passport'>
                    <div className='uploadField__file'>
                      {file ? (
                        file.name
                      ) : (
                        <span className='gray'>
                          {messages.noFileSelected || ''}
                        </span>
                      )}
                    </div>
                    <Button
                      type='primary'
                      htmlType='button'
                      icon={<i className='icon icon--clip icon--16 icon--light' />}
                    />
                    <input
                      ref={this.fileRef}
                      onChange={this.onFileInputChange}
                      type='file'
                      id='passport'
                      name='passport'
                    />
                  </label>
                </div>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={8}>
            <Col xs={24} lg={8}>
              <h4 className='dark-gray MB16'>{messages.chooseARoom || ''}</h4>
              <Form.Item name='room'>

                <Select
                  suffixIcon={
                    <div style={{ transform: 'translate(-50%,-25%)' }}>
                      <i className='icon icon--accord-arrow icon--12' />
                    </div>
                  }
                  size='large'
                  onChange={value => this.onSelectChange(value, 'room')}
                  placeholder={messages.pleaseSelect || ''}
                >
                  {room.map((r, index) => {
                    return <Select.Option key={index} value={r}>{r}</Select.Option>
                  })}

                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} lg={16}>
              <h4 className='dark-gray MB16'>{messages.disease || ''}</h4>
              <Form.Item name='disease'>
                <Input
                  name='disease'
                  placeholder={messages.inputDisease || ''}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Collapse
                defaultActiveKey={['1']}
                bordered={false}
                style={{ backgroundColor: '#ffffff' }}
                expandIconPosition='right'
              >
                <Collapse.Panel
                  header={`Precautions for Reservation`}
                  key='1'
                  className='precaution-custom-panel'
                >
                  <div className='scrollable-block'>
                    10% Deposit of the total price should be made within 3
                    business days from the date of booking confirmation. <br />
                    - If the cost per person is $300 or lower, full payment must
                    be made within 3 business days from the date of booking
                    confirmation. <br />
                    - If the departure date is within 30 days of reservation, a
                    full payment must be made at the time of booking
                    confirmation. <br />- Full Payment due 30 working days prior
                    to departure. Failure to make final payment on time may
                    result in automatic cancellation of reservation and loss of
                    deposit.
                  </div>
                </Collapse.Panel>
              </Collapse>
              {/* <Divider /> */}
            </Col>
          </Row>
          <Row className='MT24'>
            <Col
              xs={24}
              lg={{
                span: 12,
                offset: 6
              }}
            >
              <Form.Item name='agreement' className='text text-center' rules={[{ required: true, message: messages.youMustAgreeWithOurPrecausion }]} valuePropName='checked'>
                <Checkbox>
                  {messages.agreeWithTheAbove || ''}
                </Checkbox>
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col
              xs={24}
              lg={{
                span: 12,
                offset: 6
              }}
            >
              <Form.Item>
                <MyButton
                  onClick={this.handleSubmitButton}
                  isLoading={isLoading}
                  isDisabled={isDisabled}
                  title={
                    <>
                      <i className='icon icon--envelop icon--34 icon--light icon--inline MR10' />
                      {messages.book || ''}
                    </>
                  }
                  isFullWidth
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  locale: state.locale,
  userRedux: state.userRedux
})

export default connect(mapStateToProps)(BookingModal)
