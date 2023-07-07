import {shallow} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {AppHeader, Heading, Text} from "shared/components"
import {getDateValueMock} from "sharedTests/utils/date-mock"
import {ShallowWrapper} from "sharedTests/utils/shallow-wrapper"
import {initialAppState} from "../../../../redux/state/app-state"
import {ProjectEnd} from "../project-end"

describe("ProjectEnd", () => {
  const _Date = Date
  beforeEach(() => {
    const mockDate = getDateValueMock(1970, 1, 1)
    Date = mockDate
  })
  afterEach(() => {
    Date = _Date
  })
  it("renders correctly", () => {
    const component = create(
      <ShallowWrapper initialAppState={initialAppState(null)}>{<ProjectEnd token="fsdskdjf" />}</ShallowWrapper>
    )
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  it("has correct structure", () => {
    const component = shallow(<ProjectEnd token="fsdskdjf" />, {wrappingComponent: ShallowWrapper})
    expect(component.find(AppHeader)).toHaveLength(1)
    expect(component.find(".desktop-final-content")).toHaveLength(1)
    expect(component.find(Heading)).toHaveLength(2)
    expect(component.find(Text)).toHaveLength(2)
  })
})
