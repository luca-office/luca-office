import {MockedProvider} from "@apollo/client/testing"
import {shallow} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {interventionsMock} from "shared/__mocks__"
import {DetailViewHeader, LoadingIndicator} from "shared/components"
import {InterventionGroupType, InterventionHeaderGroupType} from "shared/enums"
import {scenarioQuestionnairesMock, scenariosMock} from "shared/graphql/__mocks__"
import {Option} from "shared/utils"
import {InterventionDetailViewContainer} from "../../detail/intervention/intervention-detail-view-container"
import {InterventionGroupEntityDetailViewContainer} from "../../detail/intervention-group-entity/intervention-group-entity-detail-view-container"
import {InterventionsGroupTypesTableOfContentsContainer} from "../group-type-table-of-contents/group-type-table-of-contents-container"
import {
  InterventionsGroupTypeOverview,
  InterventionsGroupTypeOverviewPropsProps
} from "../interventions-group-type-overview"

const defaultProps: InterventionsGroupTypeOverviewPropsProps = {
  groupEntityId: Option.of("f579a3cc-b9fc-435b-9868-3be84109460a"),
  groupType: Option.of<InterventionGroupType>(InterventionGroupType.File),
  headerGroupType: InterventionHeaderGroupType.AllGroups,
  interventionInDetailView: Option.none(),
  interventions: interventionsMock,
  isLoading: false,
  isReadOnly: false,
  navigateToScenario: jest.fn(),
  scenarioId: scenariosMock[0].id,
  scenarioQuestionnaires: scenarioQuestionnairesMock,
  scenarioMaxDurationInSeconds: 30
}

const getComponent = (props?: Partial<InterventionsGroupTypeOverviewPropsProps>) => (
  <InterventionsGroupTypeOverview {...{...defaultProps, ...props}} />
)

describe("intervention-group-type-overview", () => {
  it("renders correctly", () => {
    const component = <MockedProvider>{getComponent()}</MockedProvider>
    const tree = create(component).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it("has correct structure", () => {
    const component = getComponent()
    const tree = shallow(component)

    expect(tree.find(DetailViewHeader)).toHaveLength(1)
    expect(tree.find(InterventionsGroupTypesTableOfContentsContainer)).toHaveLength(1)
    expect(tree.find(LoadingIndicator)).toHaveLength(0)
    expect(tree.find(InterventionGroupEntityDetailViewContainer)).toHaveLength(1)
    expect(tree.find(InterventionDetailViewContainer)).toHaveLength(0)
  })

  it("has correct structure with intervention in detail view", () => {
    const component = getComponent({interventionInDetailView: Option.of(interventionsMock[0])})
    const tree = shallow(component)

    expect(tree.find(DetailViewHeader)).toHaveLength(1)
    expect(tree.find(InterventionsGroupTypesTableOfContentsContainer)).toHaveLength(1)
    expect(tree.find(LoadingIndicator)).toHaveLength(0)
    expect(tree.find(InterventionGroupEntityDetailViewContainer)).toHaveLength(0)
    expect(tree.find(InterventionDetailViewContainer)).toHaveLength(1)
  })
  it("has correct structure with intervention in detail view and loading", () => {
    const component = getComponent({interventionInDetailView: Option.of(interventionsMock[0]), isLoading: true})
    const tree = shallow(component)

    expect(tree.find(DetailViewHeader)).toHaveLength(1)
    expect(tree.find(InterventionsGroupTypesTableOfContentsContainer)).toHaveLength(1)
    expect(tree.find(LoadingIndicator)).toHaveLength(1)
    expect(tree.find(InterventionGroupEntityDetailViewContainer)).toHaveLength(0)
    expect(tree.find(InterventionDetailViewContainer)).toHaveLength(0)
  })
})
