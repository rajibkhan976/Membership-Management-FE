import React, { Component } from 'react'
import { Four04Page } from '@jg/common/comps'

type ErrorBoundaryProps = {
  children: React.ReactElement
}

type ErrorBoundaryState = {
  hasError: boolean
  error: any
  errorInfo: any
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false, error: null, errorInfo: null }
  }

  static getDerivedStateFromError(error: any) {
    return { hasError: true, error: error }
  }

  componentDidCatch(error: any, errorInfo: any) {
    this.setState({
      hasError: true,
      error: error,
      errorInfo: errorInfo,
    })
  }

  render() {
    const { hasError } = this.state
    const { children } = this.props

    return hasError ? <Four04Page /> : children
  }
}

export default ErrorBoundary
