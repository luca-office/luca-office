import * as React from "react"
import {create} from "react-test-renderer"
import {QuestionnaireIntroduction} from "../questionnaire-introduction"

describe("Questionnaire Introduction", () => {
  it("renders correctly", () => {
    const component = <QuestionnaireIntroduction title={"Test"} description={"Test Description"} />

    const tree = create(component).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
