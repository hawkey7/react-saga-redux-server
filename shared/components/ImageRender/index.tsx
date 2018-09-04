import React, { Component } from 'react'
import Spinner from 'resources/icons/Spinner'
import style from './style.less'

interface Props {
  src: string
  title?: string
  alt?: string
}

interface State {
  loading?: boolean
  error?: boolean
}

export default class Loading extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      loading: true,
      error: false
    }
    this.onImgLoadHandle = this.onImgLoadHandle.bind(this)
    this.onImgErrorHandle = this.onImgErrorHandle.bind(this)
  }

  onImgErrorHandle() {
    this.setState({
      loading: false,
      error: true
    })
  }

  onImgLoadHandle() {
    this.setState({
      loading: false
    })
  }

  render () {
    const { src, title, alt } = this.props
    const { loading, error } = this.state
    return (
      <div className={style.img}>
        {src && loading && <Spinner color="rgba(82, 237, 161, 1)" />}
        <img style={{ display: (loading || error || !src) ? 'none' : 'block' }} src={src} title={title || ''} alt={alt || ''} onError={this.onImgErrorHandle} onLoad={this.onImgLoadHandle} />
        {(!src || error) && this.props.children}
      </div>
    )
  }
}
