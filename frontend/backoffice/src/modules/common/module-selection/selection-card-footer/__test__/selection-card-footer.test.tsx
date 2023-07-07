// importing from direct file because of issues of babel loader and spyOn
import {act} from "@testing-library/react"
import {shallow} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {CardFooter, CardFooterItem, Tooltip} from "shared/components"
import {sampleCompaniesMock} from "shared/graphql/__mocks__"
import {SampleCompany} from "shared/models"
import wait from "waait"
import {EditingStatusIndicator} from "../../../../../components"
import {SelectionCardFooter, SelectionCardProps} from "../selection-card-footer"

const defaultProps: SelectionCardProps<SampleCompany> = {
  author: "Max Mustermann",
  createdAt: new Date(10, 10, 1990).toISOString(),
  deselectEntity: jest.fn(),
  entity: sampleCompaniesMock[0],
  isAssigned: false,
  isDisabled: false,
  isSelected: false,
  onClick: jest.fn(),
  selectEntity: jest.fn(),
  hideButton: false,
  customFooterItem: <div className="custom-footer">hello</div>,
  editingStatusConfig: {
    isFinalized: true,
    isPublished: true
  }
}

const getComponent = (props?: Partial<SelectionCardProps<SampleCompany>>) => (
  <SelectionCardFooter {...{...defaultProps, ...props}} />
)

describe("selection-card-footer", () => {
  it("renders correctly", async () => {
    const component = create(getComponent())
    await act(() => wait(0))
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  it("has correct structure", async () => {
    const component = shallow(getComponent())

    expect(component.find(CardFooter)).toHaveLength(1)
    expect(component.find(CardFooterItem)).toHaveLength(2)
    expect(component.find(Tooltip)).toHaveLength(1)
    expect(component.find(".custom-footer")).toHaveLength(1)
    expect(component.find(EditingStatusIndicator)).toHaveLength(1)
  })

  it("shows correct tooltip - selected", async () => {
    const component = shallow(getComponent({isSelected: true}))

    expect(component.find(Tooltip).prop("title")).toBe("placeholder__remove_from_selection")
  })
  it("shows correct tooltip - disabled", async () => {
    const component = shallow(getComponent({isDisabled: true}))

    expect(component.find(Tooltip).prop("title")).toBe("placeholder__disabled_cause_of_single_selection")
  })
  it("shows correct tooltip - assigned", async () => {
    const component = shallow(getComponent({isAssigned: true}))

    expect(component.find(Tooltip).prop("title")).toBe("placeholder__already_assigned")
  })
})
