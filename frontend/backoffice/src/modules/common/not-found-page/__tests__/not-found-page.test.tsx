import {create} from "react-test-renderer"
import {Route} from "../../../../routes"
import {NotFoundPage, NotFoundPageProps} from "../not-found-page"

const defaultProps: NotFoundPageProps = {
  homeRoute: Route.Scenarios
}

const getComponent = (props?: Partial<NotFoundPageProps>) => <NotFoundPage {...{...defaultProps, ...props}} />

describe("not-found-page", () => {
  it("renders correctly", () => {
    const component = getComponent()
    const tree = create(component).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
