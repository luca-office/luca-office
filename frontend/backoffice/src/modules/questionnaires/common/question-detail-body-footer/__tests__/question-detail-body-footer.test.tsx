import {act} from "@testing-library/react"
import {shallow} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {Card, OverviewCard, ReadonlyActionField, SettingsFooterCard} from "shared/components"
import {questionnairesMock, scenarioQuestionnairesMock} from "shared/graphql/__mocks__"
import wait from "waait"
import * as questionDetailBodyFooterHook from "../hooks/use-question-detail-body-footer"
import {UseQuestionDetailBodyFooterHook} from "../hooks/use-question-detail-body-footer"
import {QuestionDetailBodyFooter, QuestionDetailBodyFooterProps} from "../question-detail-body-footer"

const hookValuesDefault: UseQuestionDetailBodyFooterHook = {
  activationDelaySeconds: 5,
  displayEventDelayModal: false,
  loading: false,
  onUpdateDelay: jest.fn(),
  setDisplayEventDelayModal: jest.fn(),
  maxScenarioDuration: 30,
  existingDurations: [5]
}

const defaultProps: QuestionDetailBodyFooterProps = {
  disabled: false,
  questionnaireId: questionnairesMock[0].id,
  scenarioId: scenarioQuestionnairesMock[0].scenarioId
}

const stateSpy = jest.spyOn(questionDetailBodyFooterHook, "useQuestionDetailBodyFooter")

describe("question-detail-body-footer", () => {
  it("renders correctly", async () => {
    stateSpy.mockReturnValue(hookValuesDefault)
    const component = create(<QuestionDetailBodyFooter {...defaultProps} />)
    await act(() => wait(0))
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("has correct structure", async () => {
    stateSpy.mockReturnValue(hookValuesDefault)
    const tree = shallow(<QuestionDetailBodyFooter {...defaultProps} />)

    await act(() => wait(0))

    const settingsFooterCard = tree.find(SettingsFooterCard)
    expect(settingsFooterCard).toHaveLength(1)

    const interventionCard = settingsFooterCard.dive()
    const interventionCardOverviewCard = interventionCard.find(OverviewCard)
    expect(interventionCardOverviewCard).toHaveLength(1)
    const interventionCardContent = interventionCardOverviewCard.dive().find(Card)
    expect(interventionCardContent).toHaveLength(1)
    expect(interventionCardContent.dive().find(ReadonlyActionField)).toHaveLength(1)
  })
})
