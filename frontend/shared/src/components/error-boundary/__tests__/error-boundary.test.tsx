import * as React from "react"
import {create} from "react-test-renderer"
import {ErrorBoundary} from "../error-boundary"

describe("Error Boundary Component", () => {
  beforeAll(() => {
    console.error = () => null // do not want any logs here
  })
  it("handles component fail", () => {
    const component = (
      <ErrorBoundary>
        <TestComponent hasError={true} />
      </ErrorBoundary>
    )
    const tree = create(component).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it("handles component success silently", () => {
    const component = (
      <ErrorBoundary>
        <TestComponent hasError={false} />
      </ErrorBoundary>
    )
    const tree = create(component).toJSON()
    expect(tree).toMatchSnapshot()
  })
})

interface Props {
  readonly hasError: boolean
}
class TestComponent extends React.PureComponent<Props> {
  render() {
    if (this.props.hasError) {
      throw new Error("I crashed!")
    }

    return <div>{"My test component"}</div>
  }
}
