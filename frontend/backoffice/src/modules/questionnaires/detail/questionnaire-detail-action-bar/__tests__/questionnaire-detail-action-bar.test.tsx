import {shallow} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {Button, CardFooterItem} from "shared/components"
import {questionnairesMock} from "shared/graphql/__mocks__"
import {formatDateFromString, Option} from "shared/utils"
import {fakeTranslate} from "sharedTests/utils/translate-mock"
import {QuestionnaireDetailActionBar, QuestionnaireDetailActionBarProps} from "../questionnaire-detail-action-bar"

const previewSpy = jest.fn()
const questionnaire = questionnairesMock[0]
const defaultProps: QuestionnaireDetailActionBarProps = {
  t: fakeTranslate,
  openPreview: previewSpy,
  questionnaire: Option.of(questionnaire)
}
const getComponent = (props?: Partial<QuestionnaireDetailActionBarProps>) => (
  <QuestionnaireDetailActionBar {...defaultProps} {...props} />
)

describe("questionnaire-detail-action-bar", () => {
  it("renders correctly", () => {
    const component = create(getComponent())
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("has correct structure", () => {
    const tree = shallow(getComponent())

    expect(tree.find(CardFooterItem)).toHaveLength(2)
    expect(tree.find(CardFooterItem).first().html()).toContain(formatDateFromString(questionnaire.createdAt))
    expect(tree.find(CardFooterItem).last().html()).toContain(questionnaire.author.firstName)
    expect(tree.find(CardFooterItem).last().html()).toContain(questionnaire.author.lastName)
    expect(tree.find(Button)).toHaveLength(1)
  })
  it("executes actions correctly", () => {
    const tree = shallow(getComponent())

    tree.find(Button).simulate("click")
    expect(previewSpy).toHaveBeenCalled()
  })
})
