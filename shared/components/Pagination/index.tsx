/* eslint-disable react/no-array-index-key */

import React, { Component } from 'react'
import classNames from 'classnames'
import ArrowLeftIcon from 'resources/icons/ArrowLeftIcon'
import style from './style.css'

interface Props {
  totalElements: any
  size: any
  pageNumber: number
  onChange: any
}

class Pagination extends Component<Props, any> {
  state = {
    pageNumber: this.props.pageNumber || 1
  }

  componentWillReceiveProps(nextProps: any) {
    if (this.props.pageNumber !== nextProps.pageNumber) {
      this.setState({ pageNumber: nextProps.pageNumber + 1 })
    }
  }

  setPage(page: any) {
    this.setState({ pageNumber: page })
    if (this.props.onChange) this.props.onChange(page - 1, this.props.size)
  }

  renderPageItems(pageNum: any) {
    if (pageNum <= 10) {
      return (
        <ul className={style.pageItems}>
          <li
            className={classNames({
              [style.pageItem]: true,
              [style.disabled]: this.state.pageNumber === 1
            })}
          >
            <a
              className={style.pageLink}
              onClick={this.state.pageNumber > 1 ? this.setPage.bind(this, this.state.pageNumber - 1) : null}
            >
              <ArrowLeftIcon />
            </a>
          </li>
          {Array(pageNum).fill(1).map((_: any, index: any) =>
            <li
              key={index}
              className={classNames({
                [style.pageItem]: true,
                [style.active]: this.state.pageNumber === index + 1
              })}
            >
              <a
                className={style.pageLink}
                onClick={this.state.pageNumber !== index + 1 ? this.setPage.bind(this, index + 1) : null}
              >
                {index + 1}
              </a>
            </li>
          )}
          <li
            className={classNames({
              [style.pageItem]: true,
              [style.disabled]: this.state.pageNumber === pageNum
            })}
          >
            <a
              className={style.pageLink}
              onClick={this.state.pageNumber < pageNum ? this.setPage.bind(this, this.state.pageNumber + 1) : null}
            >
              <ArrowLeftIcon />
            </a>
          </li>
        </ul>
      )
    } else if (this.state.pageNumber < 6) {
      return (
        <ul className={style.pageItems}>
          <li
            className={classNames({
              [style.pageItem]: true,
              [style.disabled]: this.state.pageNumber === 1
            })}
          >
            <a
              className={style.pageLink}
              onClick={this.state.pageNumber > 1 ? this.setPage.bind(this, this.state.pageNumber - 1) : null}
            >
              <ArrowLeftIcon />
            </a>
          </li>
          {Array(5).fill(1).map((_, index) =>
            <li
              key={index}
              className={classNames({
                [style.pageItem]: true,
                [style.active]: this.state.pageNumber === index + 1
              })}
            >
              <a
                className={style.pageLink}
                onClick={this.state.pageNumber !== index + 1 ? this.setPage.bind(this, index + 1) : null}
              >
                {index + 1}
              </a>
            </li>
           )}
          <li className={style.pageItem}>
            <a className={style.pageLink} onClick={this.setPage.bind(this, 6)}>...</a>
          </li>
          <li className={style.pageItem}>
            <a className={style.pageLink} onClick={this.setPage.bind(this, pageNum)}>
              {pageNum}
            </a>
          </li>
          <li
            className={classNames({
              [style.pageItem]: true,
              [style.disabled]: this.state.pageNumber === pageNum
            })}
          >
            <a
              className={style.pageLink}
              onClick={this.state.pageNumber < pageNum ? this.setPage.bind(this, this.state.pageNumber + 1) : null}
            >
              <ArrowLeftIcon />
            </a>
          </li>
        </ul>
      )
    } else if (pageNum - this.state.pageNumber < 5) {
      return (
        <ul className={style.pageItems}>
          <li
            className={classNames({
              [style.pageItem]: true,
              [style.disabled]: this.state.pageNumber === 1
            })}
          >
            <a
              className={style.pageLink}
              onClick={this.state.pageNumber > 1 ? this.setPage.bind(this, this.state.pageNumber - 1) : null}
            >
              <ArrowLeftIcon />
            </a>
          </li>
          <li className={style.pageItem}>
            <a className={style.pageLink} onClick={this.setPage.bind(this, 1)}>1</a>
          </li>
          <li className={style.pageItem}>
            <a className={style.pageLink} onClick={this.setPage.bind(this, pageNum - 5)}>...</a>
          </li>
          {Array(5).fill(1).map((_, index) =>
            <li
              key={index}
              className={classNames({
                [style.pageItem]: true,
                [style.active]: this.state.pageNumber === (pageNum + index) - 4
              })}
            >
              <a
                className={style.pageLink}
                onClick={this.state.pageNumber !== (pageNum + index) - 4 ? this.setPage.bind(this, (pageNum + index) - 4) : null}
              >
                {(pageNum + index) - 4}
              </a>
            </li>
          )}
          <li
            className={classNames({
              [style.pageItem]: true,
              [style.disabled]: this.state.pageNumber === pageNum
            })}
          >
            <a
              className={style.pageLink}
              onClick={this.state.pageNumber < pageNum ? this.setPage.bind(this, this.state.pageNumber + 1) : null}
            >
              <ArrowLeftIcon />
            </a>
          </li>
        </ul>
      )
    }
    return (
      <ul className={style.pageItems}>
        <li
          className={classNames({
            [style.pageItem]: true,
            [style.disabled]: this.state.pageNumber === 1
          })}
        >
          <a
            className={style.pageLink}
            onClick={this.state.pageNumber > 1 ? this.setPage.bind(this, this.state.pageNumber - 1) : null}
          >
            <ArrowLeftIcon />
          </a>
        </li>
        <li className={style.pageItem}>
          <a className={style.pageLink} onClick={this.setPage.bind(this, 1)}>1</a>
        </li>
        <li className={style.pageItem}>
          <a
            className={style.pageLink}
            onClick={this.setPage.bind(this, this.state.pageNumber - 2)}
          >
            ...
          </a>
        </li>
        <li className={style.pageItem}>
          <a
            className={style.pageLink}
            onClick={this.setPage.bind(this, this.state.pageNumber - 1)}
          >
            {this.state.pageNumber - 1}
          </a>
        </li>
        <li
          className={classNames({
            [style.pageItem]: true,
            [style.active]: true
          })}
        >
          <a className={style.pageLink} onClick={this.setPage.bind(this, this.state.pageNumber)}>
            {this.state.pageNumber}
          </a>
        </li>
        <li className={style.pageItem}>
          <a
            className={style.pageLink}
            onClick={this.setPage.bind(this, this.state.pageNumber + 1)}
          >
            {this.state.pageNumber + 1}
          </a>
        </li>
        <li className={style.pageItem}>
          <a
            className={style.pageLink}
            onClick={this.setPage.bind(this, this.state.pageNumber + 2)}
          >
            ...
          </a>
        </li>
        <li className={style.pageItem}>
          <a className={style.pageLink} onClick={this.setPage.bind(this, pageNum)}>{pageNum}</a>
        </li>
        <li
          className={classNames({
            [style.pageItem]: true,
            [style.disabled]: this.state.pageNumber === pageNum
          })}
        >
          <a
            className={style.pageLink}
            onClick={this.state.pageNumber !== pageNum ? this.setPage.bind(this, this.state.pageNumber + 1) : ''}
          >
            <ArrowLeftIcon />
          </a>
        </li>
      </ul>
    )
  }

  render() {
    const { totalElements, size } = this.props
    const pageNum = Math.ceil(totalElements / size)

    if (!totalElements || pageNum <= 1) {
      return (<div />)
    }

    return (
      <div className={style.pagination}>
        {this.renderPageItems(pageNum)}
      </div>
    )
  }
}

export default Pagination
