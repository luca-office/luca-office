import {mount} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {interventionsMock} from "shared/__mocks__"
import {Card, CardContent, CardHeader, Heading, Icon, ReadonlyActionField, Text} from "shared/components"
import {ErpType, InterventionGroupType, InterventionHeaderGroupType} from "shared/enums"
import {scenarioQuestionnairesMock, scenariosMock} from "shared/graphql/__mocks__"
import {Option} from "shared/utils"
import {ShallowWrapper} from "sharedTests/utils/shallow-wrapper"
import {initialAppState} from "../../../../../redux/state/app-state"
import {
  InterventionGroupEntityBase,
  InterventionGroupEntityDetailView,
  InterventionGroupEntityDetailViewProps
} from "../intervention-group-entity-detail-view"
import {InterventionsTable} from "../interventions-table/interventions-table"

const defaultProps: InterventionGroupEntityDetailViewProps = {
  handleDeleteAllInterventionsFromGroupEntity: jest.fn(),
  interventionGroupEntity: Option.none(),
  interventionGroupType: Option.of<InterventionGroupType>(InterventionGroupType.File),
  interventionHeaderGroupType: InterventionHeaderGroupType.AllGroups,
  interventions: interventionsMock,
  isDeleteInterventionsFromGroupLoading: false,
  isReadOnly: false,
  navigate: jest.fn(),
  onDeleteEntityClick: jest.fn(),
  onDeleteErpRowClick: jest.fn(),
  scenarioId: scenariosMock[0].id,
  scenarioQuestionnaires: scenarioQuestionnairesMock,
  scenarioMaxDurationInSeconds: 600,
  isCreateNotesInterventionModalVisible: false,
  toggleIsCreateNotesInterventionModalVisible: jest.fn()
}

const getComponent = (props?: Partial<InterventionGroupEntityDetailViewProps>) => (
  <ShallowWrapper initialAppState={initialAppState}>
    <InterventionGroupEntityDetailView {...{...defaultProps, ...props}} />
  </ShallowWrapper>
)

describe("intervention-group-entity-detail-view", () => {
  it("renders correctly", () => {
    const component = <ShallowWrapper initialAppState={initialAppState}>{getComponent()}</ShallowWrapper>
    const tree = create(component).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it("has correct structure with no group entity", () => {
    const component = getComponent()
    const tree = mount(component)

    expect(tree.find(Card)).toHaveLength(1)
    expect(tree.find(CardHeader)).toHaveLength(1)
    expect(tree.find(Heading)).toHaveLength(2)
    expect(tree.find(Icon)).toHaveLength(1)
    expect(tree.find(CardContent)).toHaveLength(1)
    expect(tree.find(InterventionsTable)).toHaveLength(0)
    expect(tree.find(ReadonlyActionField)).toHaveLength(0)
    expect(tree.find(Text)).toHaveLength(2)
  })
  it("has correct structure with group entity", () => {
    const component = getComponent({
      interventionGroupEntity: Option.of<InterventionGroupEntityBase>({
        title: "file.png",
        id: "adb4f417-1f8a-4e63-81e5-a8ccf9ef3c93"
      })
    })
    const tree = mount(component)

    expect(tree.find(Card)).toHaveLength(1)
    expect(tree.find(CardHeader)).toHaveLength(1)
    expect(tree.find(Heading)).toHaveLength(4)
    expect(tree.find(Icon)).toHaveLength(3)
    expect(tree.find(CardContent)).toHaveLength(1)
    expect(tree.find(InterventionsTable)).toHaveLength(1)
    expect(tree.find(ReadonlyActionField)).toHaveLength(1)
    expect(tree.find(Text)).toHaveLength(1)
  })
  it("has correct structure without group type and group entity", () => {
    const component = getComponent({
      interventionGroupType: Option.none()
    })
    const tree = mount(component)

    expect(tree.find(Card)).toHaveLength(1)
    expect(tree.find(CardHeader)).toHaveLength(1)
    expect(tree.find(Heading)).toHaveLength(1)
    expect(tree.find(Icon)).toHaveLength(0)
    expect(tree.find(CardContent)).toHaveLength(1)
    expect(tree.find(InterventionsTable)).toHaveLength(0)
    expect(tree.find(ReadonlyActionField)).toHaveLength(0)
    expect(tree.find(Text)).toHaveLength(2)
  })
  it("renders correct action field label - erp row", () => {
    const component = getComponent({
      interventionGroupType: Option.none(),
      interventionGroupEntity: Option.of({id: "8b7e8c38-0795-4fc4-998e-03b2fc67cdce", title: "Test"}),
      erpConfig: {
        erpType: ErpType.Component,
        rowId: Option.of(25)
      }
    })
    const tree = mount(component)

    expect(tree.find(ReadonlyActionField)).toHaveLength(1)
    expect(tree.find(ReadonlyActionField).prop("buttonLabel")).toContain("common_to_masculinum erp_dataset__general")
  })
  it("renders correct action field label - notes intervention", () => {
    const component = getComponent({
      interventionGroupType: Option.of<InterventionGroupType>(InterventionGroupType.Notes),
      interventionGroupEntity: Option.of({id: "8b7e8c38-0795-4fc4-998e-03b2fc67cdce", title: "Test"}),
      erpConfig: undefined
    })
    const tree = mount(component)

    expect(tree.find(ReadonlyActionField)).toHaveLength(1)
    expect(tree.find(ReadonlyActionField).prop("buttonLabel")).toBeUndefined()
  })
})
