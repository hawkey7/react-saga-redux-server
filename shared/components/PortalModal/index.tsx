import React from 'react'
import { createPortal } from 'react-dom'

export default class PortalModal extends React.Component<any, any> {
  modalRoot: any
  modalEl: any
  constructor (props: any) {
    super(props)
    this.state = {
      modalEl: null
    }
  }

  componentWillMount() {
    this.modalRoot = document.getElementById('modal-root')
    this.modalEl = document.createElement('div')
    this.setState({
      modalEl: this.modalEl
    })
  }

  componentDidMount() {
    if (this.modalRoot) {
      this.modalRoot.appendChild(this.modalEl)
    }
  }

  componentWillUnmount() {
    if (this.modalRoot) {
      this.modalRoot.removeChild(this.modalEl)
    }
  }

  render() {
    if (document) {
      return createPortal(
        this.props.children,
        this.modalEl
      )
    }
    return null
  }
}
