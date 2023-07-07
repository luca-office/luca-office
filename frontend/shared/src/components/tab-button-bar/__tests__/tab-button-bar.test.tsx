import {shallow} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {IconName} from "../../../enums"
import {TabButton} from "../tab-button"
import {TabButtonBar, TabButtonBarEntry} from "../tab-button-bar"

const defaultButtons: TabButtonBarEntry[] = [
  {label: "Eingang(3)", icon: IconName.EmailIncoming, onClick: jest.fn()},
  {label: "Ausgang(2)", icon: IconName.EmailOutgoing, onClick: jest.fn()},
  {label: "Entwürfe(1)", icon: IconName.EditBordered, onClick: jest.fn()},
  {label: "Papierkorb(12)", icon: IconName.Trash, onClick: jest.fn()}
]

describe("tab-button-bar", () => {
  it("renders correctly with required props", () => {
    const tabBar = <TabButtonBar buttons={defaultButtons} activeTabIndex={0} />
    const tree = create(tabBar).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it("calls onClick functions correctly", () => {
    const onClickIncoming = jest.fn()
    const onClickOutgoing = jest.fn()

    const buttons: TabButtonBarEntry[] = [
      {label: "Eingang(3)", icon: IconName.EmailIncoming, onClick: onClickIncoming},
      {label: "Ausgang(2)", icon: IconName.EmailOutgoing, onClick: onClickOutgoing}
    ]

    const tabBar = <TabButtonBar buttons={buttons} activeTabIndex={0} />
    const tree = shallow(tabBar)

    tree.find(TabButton).forEach(button => {
      button.props().onClick()
    })

    expect(onClickIncoming).toBeCalledTimes(1)
    expect(onClickOutgoing).toBeCalledTimes(1)
  })

  it("has the correct number of buttons", () => {
    const tabBar = <TabButtonBar buttons={defaultButtons} activeTabIndex={0} />
    const tree = shallow(tabBar)

    expect(tree.find(TabButton)).toHaveLength(defaultButtons.length)
  })
})
