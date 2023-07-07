import {shallow} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {EmailListEntry} from "../email-list-entry"

const requiredProps = {
  isSelected: false,
  isRead: false,
  eMailAddress: "dummy.mail@mail.de",
  subject: "dummy subject",
  subLabel: "10:21",
  onClick: jest.fn()
}

describe("email-list-entry", () => {
  it("renders correctly with required props", () => {
    const listEntry = <EmailListEntry {...requiredProps} />
    const tree = create(listEntry).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it("renders correctly with required props (selected)", () => {
    const listEntry = <EmailListEntry {...requiredProps} isSelected={true} />
    const tree = create(listEntry).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it("calls onClick function correctly", () => {
    const onClick = jest.fn()

    const listEntry = <EmailListEntry {...requiredProps} onClick={onClick} />
    const tree = shallow(listEntry)
    tree.simulate("click")
    expect(onClick).toBeCalledTimes(1)
  })
})
