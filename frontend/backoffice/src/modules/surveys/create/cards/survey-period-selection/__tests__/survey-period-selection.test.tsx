import {mount} from "enzyme"
import * as React from "react"
import {Controller} from "react-hook-form"
import {create} from "react-test-renderer"
import {
  Card,
  CardContent,
  CardHeader,
  DateRangePicker,
  Heading,
  Icon,
  Paper,
  RadioButton,
  Text
} from "shared/components"
import {mockedFormMethods} from "sharedTests/utils/form-methods-mock"
import {SurveyPeriodSelection, SurveyPeriodSelectionProps} from "../survey-period-selection"

const defaultProps: SurveyPeriodSelectionProps = {
  formMethods: mockedFormMethods
}

const getComponent = (props?: Partial<SurveyPeriodSelectionProps>) => (
  <SurveyPeriodSelection {...{...defaultProps, ...props}} />
)

describe("survey-period-selection", () => {
  it("renders correctly", () => {
    const component = getComponent()
    const tree = create(component).toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("has correct structure", () => {
    const component = getComponent()
    const tree = mount(component)

    expect(tree.find(Heading)).toHaveLength(6)
    expect(tree.find(Text)).toHaveLength(5)
    expect(tree.find(Controller)).toHaveLength(3)
    expect(tree.find(Card)).toHaveLength(2)
    expect(tree.find(CardHeader)).toHaveLength(2)
    expect(tree.find(CardContent)).toHaveLength(2)
    expect(tree.find(Icon)).toHaveLength(1)
    expect(tree.find(RadioButton)).toHaveLength(4)
    expect(tree.find(DateRangePicker)).toHaveLength(1)
    expect(tree.find(Paper)).toHaveLength(2)
  })
})
