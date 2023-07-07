import {mount, shallow} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {interventionsMock} from "shared/__mocks__"
import {Label, Paper, ReadonlyActionField, Text} from "shared/components"
import {InterventionEmailLink, InterventionEmailLinkProps} from "../intervention-email-link"

const defaultProps: InterventionEmailLinkProps = {
  intervention: interventionsMock[0],
  navigate: jest.fn()
}

const getComponent = (props?: Partial<InterventionEmailLinkProps>) => (
  <InterventionEmailLink {...{...defaultProps, ...props}} />
)

describe("intervention-email-link", () => {
  it("renders correctly", () => {
    const component = getComponent()
    const tree = create(component).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it("has correct structure", () => {
    const component = getComponent()
    const tree = shallow(component)

    expect(tree.find(Label)).toHaveLength(1)
    expect(tree.find(Paper)).toHaveLength(1)
    expect(tree.find(Text)).toHaveLength(1)
    expect(tree.find(ReadonlyActionField)).toHaveLength(1)
  })

  it("does trigger navigate", async () => {
    const handleNavigate = jest.fn()

    const component = shallow(
      getComponent({
        navigate: handleNavigate
      })
    )

    component.find(ReadonlyActionField).simulate("click")
    expect(handleNavigate).toHaveBeenCalledTimes(1)
  })
  it("does render correct action field label", async () => {
    const component = mount(getComponent())

    expect(component.find(Text).at(1).prop("children")).toContain(
      "max.mustermann@mail.de interventions__interventions_detail_email_delay"
    )
  })
})
