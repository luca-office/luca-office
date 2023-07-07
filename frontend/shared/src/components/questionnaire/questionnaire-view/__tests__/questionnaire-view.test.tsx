import {shallow} from "enzyme"
import React from "react"
import {Provider} from "react-redux"
import {create} from "react-test-renderer"
import {fakeStore} from "../../../../../tests/redux/fake-store"
import {questionnaireMock} from "../../../../graphql/__mocks__"
import {initialSharedAppState} from "../../../../redux/state"
import {QuestionnaireIntroduction} from "../../questionnaire-introduction/questionnaire-introduction"
import {QuestionnaireQuestionComponent} from "../../questionnaire-question"
import {QuestionnaireView, QuestionnaireViewProps} from "../questionnaire-view"

const defaultProps: QuestionnaireViewProps = {
  questionnaire: questionnaireMock
}

const getComponent = (props?: Partial<QuestionnaireViewProps>) => <QuestionnaireView {...{...defaultProps, ...props}} />

describe("Questionnaire View", () => {
  it("renders correctly with default props", () => {
    const component = getComponent()
    const tree = create(<Provider store={fakeStore(initialSharedAppState)}>{component}</Provider>)

    expect(tree).toMatchSnapshot()
  })

  it("has correct structure", () => {
    const component = getComponent()
    const tree = shallow(component)

    expect(tree.find(QuestionnaireIntroduction)).toHaveLength(1)
    expect(tree.find(QuestionnaireQuestionComponent)).toHaveLength(questionnaireMock.questions.length)
  })
})
