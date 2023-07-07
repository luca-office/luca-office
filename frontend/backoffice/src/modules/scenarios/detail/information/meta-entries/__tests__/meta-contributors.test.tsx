import {shallow} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {ReadonlyActionField} from "shared/components"
import {MetaContributors} from "../meta-contributors"

describe("meta-contributors", () => {
  it("renders correctly", () => {
    const component = <MetaContributors onClick={jest.fn()} scenarioContributorsCount={0} />
    const tree = create(component).toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("has correct structure", () => {
    const component = shallow(<MetaContributors onClick={jest.fn()} scenarioContributorsCount={0} />)
    expect(component.find(ReadonlyActionField)).toHaveLength(1)
  })
})
