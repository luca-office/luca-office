import {mount} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {Button, Table} from "shared/components"
import {IconName} from "shared/enums"
import {surveysMock} from "shared/graphql/__mocks__"
import {ListPlaceholder} from "../../list-placeholder/list-placeholder"
import {ProjectSurveysList, ProjectSurveysListProps} from "../project-surveys-list"

const moduleSpy = jest.fn()
const surveySpy = jest.fn()
const defaultProps: ProjectSurveysListProps = {
  surveyCreationDisabledMissingMeta: false,
  surveyCreationDisabledModuleCheckFailed: false,
  surveys: surveysMock,
  navigateToProjectModules: moduleSpy,
  navigateToSurveyCreation: surveySpy,
  navigateToSurvey: jest.fn(),
  deleteSurvey: jest.fn,
  isLoading: false,
  isTestSurvey: false
}

const getComponent = (props?: Partial<ProjectSurveysListProps>) => (
  <ProjectSurveysList {...{...defaultProps, ...props}} />
)

describe("project-surveys-list", () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  it("renders correctly", () => {
    const component = getComponent()
    const tree = create(component).toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("renders correct structure", () => {
    const component = getComponent()
    const tree = mount(component)

    expect(tree.find(Table)).toHaveLength(1)
    expect(tree.find(Button)).toHaveLength(surveysMock.length + 1)
  })
  describe("renders correct structure (no data)", () => {
    it("renders placeholder for surveys", () => {
      const component = getComponent({surveys: []})
      const tree = mount(component)

      expect(tree.find(Table)).toHaveLength(1)
      expect(tree.find(Table).find(".entity-row")).toHaveLength(0)
      expect(tree.find(Table).find(Button)).toHaveLength(2)
      expect(tree.find(Table).find(ListPlaceholder)).toHaveLength(1)
    })
    it("renders placeholder for test surveys", () => {
      const component = getComponent({surveys: [], isTestSurvey: true})
      const tree = mount(component)

      expect(tree.find(Table)).toHaveLength(1)
      expect(tree.find(Table).find(".entity-row")).toHaveLength(0)
      expect(tree.find(Table).find(Button)).toHaveLength(2)
      expect(tree.find(Table).find(ListPlaceholder)).toHaveLength(1)

      const placeholderBtn = tree.find(".placeholder-button").first()
      expect(placeholderBtn.prop("disabled")).toBe(false)
      expect(placeholderBtn.prop("icon")).toBe(IconName.Add)
    })
  })

  describe("renders buttons", () => {
    it("renders create button", () => {
      const component = getComponent()
      const tree = mount(component)

      expect(tree.find(Button).first().prop("disabled")).toBe(false)
    })
    it("renders create button for test surveys", () => {
      const component = getComponent({isTestSurvey: true})
      const tree = mount(component)

      expect(tree.find(Button).first().prop("disabled")).toBe(false)
    })
    it("renders disabled button", () => {
      const component = getComponent({surveys: [], surveyCreationDisabledMissingMeta: true})
      const tree = mount(component)

      expect(tree.find(Button).first().prop("disabled")).toBe(true)
      expect(tree.find(".placeholder-button").first().prop("disabled")).toBe(true)
    })
    it("renders disabled button for test surveys", () => {
      const component = getComponent({surveys: [], surveyCreationDisabledMissingMeta: true, isTestSurvey: true})
      const tree = mount(component)

      expect(tree.find(Button).first().prop("disabled")).toBe(true)
      expect(tree.find(".placeholder-button").first().prop("disabled")).toBe(true)
    })
    it("renders module button", () => {
      const component = getComponent({surveys: [], surveyCreationDisabledModuleCheckFailed: true, isTestSurvey: true})
      const tree = mount(component)

      expect(tree.find(Button).first().prop("disabled")).toBe(true)
      const placeholderBtn = tree.find(".placeholder-button").first()
      expect(placeholderBtn.prop("disabled")).toBe(false)
      expect(placeholderBtn.prop("icon")).toBe(IconName.ArrowRight)
    })
    it("renders module button for test surveys", () => {
      const component = getComponent({surveys: [], surveyCreationDisabledModuleCheckFailed: true})
      const tree = mount(component)

      expect(tree.find(Button).first().prop("disabled")).toBe(true)
      const placeholderBtn = tree.find(".placeholder-button").first()
      expect(placeholderBtn.prop("disabled")).toBe(false)
      expect(placeholderBtn.prop("icon")).toBe(IconName.ArrowRight)
    })
  })
})
