import React from 'react'
import { Pagination } from 'antd'

class MyPagination extends React.PureComponent {
    renderPaginationItem = (current, type, originalElement) => {
      if (type === 'prev') {
        return (
          <a>
            <i className='icon icon--arrow-left' style={{ width: 6, height: 10 }} />
          </a>
        )
      }
      if (type === 'next') {
        return (
          <a>
            <i className='icon icon--arrow-right' style={{ width: 6, height: 10 }} />
          </a>
        )
      }
      return originalElement
    };
    render () {
      const { itemRender, ...rest } = this.props
      return (
        <Pagination
          {...rest}
          itemRender={this.renderPaginationItem}
        />
      )
    }
}

export default MyPagination
