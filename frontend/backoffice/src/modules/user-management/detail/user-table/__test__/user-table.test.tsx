import {shallow} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {TableContainer} from "shared/components"
import {userAccountsMock} from "shared/graphql/__mocks__"
import {UserTable} from "../user-table"

describe("user-table", () => {
  it("renders correctly", () => {
    const component = create(
      <UserTable onUserRowClicked={jest.fn()} users={userAccountsMock} ownId={userAccountsMock[0].id} />
    )

    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("has correct structure", () => {
    const component = shallow(
      <UserTable onUserRowClicked={jest.fn()} users={userAccountsMock} ownId={userAccountsMock[0].id} />
    )
    expect(component.find(TableContainer)).toHaveLength(1)
  })
})
