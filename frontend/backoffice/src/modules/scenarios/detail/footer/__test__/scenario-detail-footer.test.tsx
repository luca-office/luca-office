import {shallow} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {Button, CardFooterItem} from "shared/components"
import {userAccountMock} from "shared/graphql/__mocks__"
import {ScenarioDetailFooter} from "../scenario-detail-footer"

describe("scenario-detail-footer", () => {
  const createdAt = new Date(1, 1, 2020).toISOString()
  it("renders correctly", () => {
    const component = create(
      <ScenarioDetailFooter author={userAccountMock} createdAt={createdAt} openPreview={jest.fn()} />
    )

    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("has correct structure", () => {
    const component = shallow(
      <ScenarioDetailFooter author={userAccountMock} createdAt={createdAt} openPreview={jest.fn()} />
    )
    expect(component.find(CardFooterItem)).toHaveLength(2)
    expect(component.find(Button)).toHaveLength(1)
  })
})
