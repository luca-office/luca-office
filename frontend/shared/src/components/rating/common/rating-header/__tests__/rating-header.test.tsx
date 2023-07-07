import {shallow} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {projectModulesMockWithQuestionnaire} from "../../../../../graphql/__mocks__"
import {Option} from "../../../../../utils"
import {DetailViewHeader} from "../../../../detail-view-header/detail-view-header"
import {CustomSelect} from "../../../../select/custom-select"
import {RatingHeader, RatingHeaderProps} from "../rating-header"

const defaultProps: RatingHeaderProps = {
  projectModules: projectModulesMockWithQuestionnaire,
  navigationButtonConfig: {onClick: jest.fn, labelKey: "unit__days_plural"},
  onSelectModule: jest.fn(),
  projectTitle: "test title",
  selectedModuleId: Option.of(projectModulesMockWithQuestionnaire[1].id)
}

const getComponent = (props?: Partial<RatingHeaderProps>) => <RatingHeader {...defaultProps} {...props} />

describe("rating-header", () => {
  it("renders correctly", () => {
    const component = create(getComponent())

    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  it("has correct structure", () => {
    const component = shallow(getComponent())
    expect(component.find(DetailViewHeader)).toHaveLength(1)
    expect(component.find(DetailViewHeader).prop("navigationButtonConfig")).toEqual(defaultProps.navigationButtonConfig)

    const select = component.find(DetailViewHeader).dive().find(CustomSelect)
    expect(select).toHaveLength(1)
    expect(select.prop("optionList")).toHaveLength(defaultProps.projectModules.length)
    expect(select.prop("value")).toEqual(defaultProps.selectedModuleId.getOrElse(""))
  })
})
