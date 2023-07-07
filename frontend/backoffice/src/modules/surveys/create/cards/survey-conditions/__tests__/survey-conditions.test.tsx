import {mount} from "enzyme"
import * as React from "react"
import {Controller} from "react-hook-form"
import {create} from "react-test-renderer"
import {Card, CardContent, CardHeader, Icon, Label, RadioButton, Text} from "shared/components"
import {mockedFormMethods} from "sharedTests/utils/form-methods-mock"
import {SurveyConditions, SurveyConditionsProps} from "../survey-conditions"

const defaultProps: SurveyConditionsProps = {
  formMethods: mockedFormMethods
}

const getComponent = (props?: Partial<SurveyConditionsProps>) => <SurveyConditions {...{...defaultProps, ...props}} />

describe("survey-conditions", () => {
  it("renders correctly", () => {
    const component = getComponent()
    const tree = create(component).toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("has correct structure", () => {
    const component = getComponent()
    const tree = mount(component)

    expect(tree.find(Label)).toHaveLength(1)
    expect(tree.find(Controller)).toHaveLength(1)
    expect(tree.find(Card)).toHaveLength(2)
    expect(tree.find(CardHeader)).toHaveLength(2)
    expect(tree.find(CardContent)).toHaveLength(2)
    expect(tree.find(RadioButton)).toHaveLength(2)
    expect(tree.find(Text)).toHaveLength(2)
    expect(tree.find(Icon)).toHaveLength(1)
  })
})
