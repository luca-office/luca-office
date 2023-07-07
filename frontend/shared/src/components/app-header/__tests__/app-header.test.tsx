import {create} from "react-test-renderer"
import {AppHeader} from "../app-header"

describe("app-header", () => {
  it("renders correctly without user", () => {
    const component = create(<AppHeader maxModuleTimeInSeconds={0} title="title" />)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
