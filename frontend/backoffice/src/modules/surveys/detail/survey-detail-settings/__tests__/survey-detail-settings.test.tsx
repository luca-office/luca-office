import {shallow} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {Button, Card, CardContent, LabelledCard} from "shared/components"
import {surveysMock} from "shared/graphql/__mocks__"
import {fakeTranslate} from "sharedTests/utils/translate-mock"
import {InformationEntry} from "../../../../../components"
import {SurveyDetailSettings, SurveyDetailSettingsProps} from "../survey-detail-settings"

const navSpy = jest.fn()
const defaultProps: SurveyDetailSettingsProps = {
  survey: surveysMock[0],
  t: fakeTranslate,
  isEditable: true,
  navigateToSurveyUpdate: navSpy
}

const useComponent = (props?: Partial<SurveyDetailSettingsProps>) => (
  <SurveyDetailSettings {...defaultProps} {...props} />
)

describe("survey-detail-settings", () => {
  it("renders correctly", () => {
    const component = create(useComponent())

    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("renders correctly not editable", () => {
    const component = create(useComponent({isEditable: false}))

    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("has correct structure", () => {
    const component = shallow(useComponent())

    expect(component.find(Card)).toHaveLength(1)
    expect(component.find(LabelledCard)).toHaveLength(1)
    expect(component.find(CardContent)).toHaveLength(1)
    expect(component.find(Button)).toHaveLength(1)
    expect(component.find(InformationEntry)).toHaveLength(2)
  })
  it("has opens survey update", () => {
    const component = shallow(useComponent())

    component.find(Button).simulate("click")
    expect(navSpy).toHaveBeenCalled()
  })
})
