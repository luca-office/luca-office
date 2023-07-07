import {mount} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {Button, Table} from "shared/components"
import {projectModulesMockWithQuestionnaire} from "shared/graphql/__mocks__"
import {ListPlaceholder} from "../../list-placeholder/list-placeholder"
import {ProjectModulesList, ProjectModulesListProps} from "../project-modules-list"

const defaultProps: ProjectModulesListProps = {
  showCreateProjectModuleModal: jest.fn(),
  moduleActionsDisabled: false,
  showSortProjectModuleModal: jest.fn,
  deleteModule: jest.fn,
  projectModules: projectModulesMockWithQuestionnaire,
  sortingDisabled: false
}

const getComponent = (props?: Partial<ProjectModulesListProps>) => (
  <ProjectModulesList {...{...defaultProps, ...props}} />
)

describe("project-modules-list", () => {
  it("renders correctly", () => {
    const component = getComponent()
    const tree = create(component).toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("renders correct structure", () => {
    const component = getComponent()
    const tree = mount(component)

    expect(tree.find(Table)).toHaveLength(1)
    expect(tree.find(Button)).toHaveLength(projectModulesMockWithQuestionnaire.length + 2)
  })
  it("renders correct structure (no data)", () => {
    const component = getComponent({projectModules: []})
    const tree = mount(component)

    expect(tree.find(Table)).toHaveLength(1)
    expect(tree.find(ListPlaceholder)).toHaveLength(1)
    expect(tree.find(Button)).toHaveLength(3)
  })
  it("renders disabled sort button", () => {
    const component = getComponent({sortingDisabled: true})
    const tree = mount(component)

    expect(tree.find(Table)).toHaveLength(1)
    expect(tree.find(Button)).toHaveLength(projectModulesMockWithQuestionnaire.length + 2)
    expect(tree.find(Button).first().prop("disabled")).toBe(true)
  })
  it("renders disabled actions", () => {
    const component = getComponent({moduleActionsDisabled: true})
    const tree = mount(component)

    expect(tree.find(Table)).toHaveLength(1)
    expect(tree.find(Button)).toHaveLength(projectModulesMockWithQuestionnaire.length + 2)
    expect(tree.find(Button).first().prop("disabled")).toBe(false)
    expect(tree.find(Button).at(1).prop("disabled")).toBe(true)
    expect(tree.find(Button).at(2).prop("disabled")).toBe(true)
    expect(tree.find(Button).at(3).prop("disabled")).toBe(true)
  })
})
