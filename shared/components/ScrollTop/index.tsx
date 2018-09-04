import React from 'react'

export default class ScrollTop extends React.Component<{}, {}> {

  componentDidMount() {
    window.scroll(0, 0)
  }

  render() {
    return this.props.children
  }
}
