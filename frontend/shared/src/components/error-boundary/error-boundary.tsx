import * as React from "react"
import {HeadingLevel} from "../../enums"
import {Children} from "../../styles"
import {WithLucaTranslation, withLucaTranslation} from "../../translations/luca-translation"
import {Heading, Text} from ".."

interface Props extends WithLucaTranslation, Children {
  readonly text?: string
}

interface State {
  readonly error?: Error
  readonly errorInfo?: React.ErrorInfo
}

/**
 * React 16 error boundary helps to catch errors on component level
 * Wrap your component with this and it will prevent errors from crashing the page
 */
class ErrorBoundaryComponent extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = {
      error: undefined
    }
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    // Display fallback UI
    this.setState({error, errorInfo: info})
    console.error(error, info)
  }

  render() {
    const {error, errorInfo} = this.state
    const printStack = process?.env?.NODE_ENV === "develop" || process?.env?.NODE_ENV === "test"
    // remove user dependant machine path
    const stackTrace = errorInfo?.componentStack.replace(/\(.*\/((backoffice|shared|player)\/src)/g, "($1")

    if (error) {
      return (
        <React.Fragment>
          <Heading level={HeadingLevel.h3}>{this.props.text || this.props.t("error_general")}</Heading>
          {printStack && (
            <Text>
              {error.message}
              <br />
              Component Stack (React):{stackTrace}
            </Text>
          )}
        </React.Fragment>
      )
    }

    return this.props.children
  }
}

export const ErrorBoundary = withLucaTranslation()(ErrorBoundaryComponent)
