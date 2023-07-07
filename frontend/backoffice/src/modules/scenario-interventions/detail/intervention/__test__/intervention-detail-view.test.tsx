import {mount, shallow} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {interventionsMock} from "shared/__mocks__"
import {Card, CardHeader, Column, Columns, Heading, OrlyButtonContainer, Text} from "shared/components"
import {TriggerCondition} from "../../trigger-condition/trigger-condition"
import {InterventionDetailView, InterventionDetailViewProps} from "../intervention-detail-view"
import {InterventionEmailLink} from "../intervention-email-link/intervention-email-link"

const defaultProps: InterventionDetailViewProps = {
  handleUpdateOfInterventionsWithTimeoffset: jest.fn(),
  handleUpdateRuntimeSurveyAnswerSelectionIntervention: jest.fn(),
  handleDeleteIntervention: jest.fn(),
  intervention: interventionsMock[0],
  isEditTimeModalVisible: false,
  isReadOnly: false,
  navigate: jest.fn(),
  toggleIsEditTimeModalVisible: jest.fn()
}

const getComponent = (props?: Partial<InterventionDetailViewProps>) => (
  <InterventionDetailView {...{...defaultProps, ...props}} />
)

describe("intervention-detail-view", () => {
  it("renders correctly", () => {
    const component = getComponent()
    const tree = create(component).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it("has correct structure", () => {
    const component = getComponent()
    const tree = shallow(component)

    expect(tree.find(Card)).toHaveLength(1)
    expect(tree.find(CardHeader)).toHaveLength(1)
    expect(tree.find(Heading)).toHaveLength(1)
    expect(tree.find(OrlyButtonContainer)).toHaveLength(1)
    expect(tree.find(Columns)).toHaveLength(1)
    expect(tree.find(Column)).toHaveLength(2)
    expect(tree.find(TriggerCondition)).toHaveLength(1)
    expect(tree.find(InterventionEmailLink)).toHaveLength(1)
  })

  it("does render correct action field label for update time", async () => {
    const component = mount(getComponent({intervention: {...interventionsMock[0]}}))

    expect(component.find(Text).at(0).prop("children")).toContain("+ 10 unit__minutes_short")
  })
})
