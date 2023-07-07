import * as React from "react"
import {create} from "react-test-renderer"
import {scenariosMock} from "shared/graphql/__mocks__"
import {MetaEmail} from "../meta-email"

describe("meta-email", () => {
  it("renders correctly", () => {
    const component = <MetaEmail isEditable={false} scenario={scenariosMock[0]} />
    const tree = create(component).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
