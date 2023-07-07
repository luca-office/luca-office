import {mount} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {erpRowOpeningInterventionsMock, interventionsMock} from "shared/__mocks__"
import {TableOfContentsContainer, TableOfContentsEntry, Text} from "shared/components"
import {InterventionHeaderGroupType} from "shared/enums"
import {scenarioQuestionnairesMock, scenariosMock} from "shared/graphql/__mocks__"
import {Intervention} from "shared/models"
import {Option} from "shared/utils"
import {GroupTypeToCProps, InterventionsGroupTypeTableOfContents} from "../group-type-table-of-contents"
import {render, screen} from "@testing-library/react"

const groupedInterventionsMock: {[index: string]: Intervention[]} = {
  "eb6eb76f-fe77-4f2d-8962-76a73768b0e8": [interventionsMock[0]],
  "55bd9e5d-0dfa-4c47-9ea8-c241bcdb8816": [interventionsMock[1], interventionsMock[2]]
}
const defaultProps: GroupTypeToCProps = {
  filteredAndGroupedInterventions: groupedInterventionsMock,
  erpOpeningInterventions: erpRowOpeningInterventionsMock,
  scenarioQuestionnaires: scenarioQuestionnairesMock,
  handleSelectNode: jest.fn(),
  scenarioId: scenariosMock[0].id,
  selectedNodeId: Option.none(),
  isLoading: false,
  navigateToHeaderGroupType: jest.fn(),
  selectedHeaderGroupType: InterventionHeaderGroupType.AllGroups,
  notesContentInterventions: [],
  spreadsheetCellContentInterventions: []
}

const getComponent = (props?: Partial<GroupTypeToCProps>) => (
  <InterventionsGroupTypeTableOfContents {...{...defaultProps, ...props}} />
)

describe("intervention-group-type-table-of-contents", () => {
  it("renders correctly", () => {
    const component = getComponent()
    const tree = create(component).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it("has correct structure", () => {
    const component = getComponent()
    const tree = mount(component)
    render(component)

    expect(tree.find(TableOfContentsContainer)).toHaveLength(1)
    expect(tree.find(TableOfContentsEntry)).toHaveLength(4)
    expect(screen.queryAllByTestId("custom-intervention-node")).toHaveLength(4)
  })

  it("has correct structure expanded", () => {
    const component = getComponent({selectedNodeId: Option.of("55bd9e5d-0dfa-4c47-9ea8-c241bcdb8816")})
    const tree = mount(component)
    render(component)

    expect(tree.find(TableOfContentsContainer)).toHaveLength(1)
    expect(tree.find(TableOfContentsEntry)).toHaveLength(6)
    expect(screen.queryAllByTestId("custom-intervention-node")).toHaveLength(6)
  })
  it("shows correct title count", () => {
    const component = getComponent()
    const tree = mount(component)

    expect(tree.find(TableOfContentsContainer)).toHaveLength(1)
    expect(tree.find(TableOfContentsEntry)).toHaveLength(4)
    expect(tree.find(Text).at(0).prop("children")).toBe("test-file.png")
    expect(tree.find(Text).at(1).prop("children")).toBe("(1)")
    expect(tree.find(Text).at(2).prop("children")).toBe("test-file2.png")
    expect(tree.find(Text).at(3).prop("children")).toBe("(2)")
  })
})
