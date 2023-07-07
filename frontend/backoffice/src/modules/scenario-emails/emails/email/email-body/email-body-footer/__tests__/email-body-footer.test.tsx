import {act} from "@testing-library/react"
import {shallow} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {emailOpeningInterventionsMock} from "shared/__mocks__"
import {Card, CustomSelect, OverviewCard, SettingsFooterCard} from "shared/components"
import {scenarioQuestionnairesMock, scenariosMock} from "shared/graphql/__mocks__"
import {Option} from "shared/utils"
import wait from "waait"
import {InterventionSettingsCard} from "../../../../../../../components/intervention-setting-card/intervention-setting-card"
import {emailsMock} from "../../../../hooks/__mocks__/emails.mock"
import * as useEmailUpdateHook from "../../../hooks/use-email-update"
import {UseEmailUpdateHook} from "../../../hooks/use-email-update"
import {EmailBodyFooter, EmailBodyFooterProps} from "../email-body-footer"
import * as useEmailBodyFooterHook from "../hooks/use-email-body-footer"
import {UseEmailBodyFooterHook} from "../hooks/use-email-body-footer"

const email = emailsMock[0]

const defaultProps: EmailBodyFooterProps = {
  scenario: Option.of(scenariosMock[0]),
  isIntroductionEmail: false,
  associatedIntervention: Option.none(),
  email,
  navigateToIntervention: jest.fn(),
  disabled: false,
  onCreateInterventionClick: jest.fn(),
  emailOpeningInterventions: emailOpeningInterventionsMock
}

const hookValuesDefault: UseEmailBodyFooterHook = {
  relevanceOptions: [
    {
      value: "1",
      label: "A"
    },
    {
      value: "2",
      label: "B"
    },
    {
      value: "3",
      label: "C"
    }
  ],
  scenarioQuestionnaires: scenarioQuestionnairesMock
}

const emailUpdateHookValuesDefault: UseEmailUpdateHook = {
  updateEmail: jest.fn(() => Promise.resolve(Option.of(email))),
  updateEmailLoading: false
}

const stateSpy = jest.spyOn(useEmailBodyFooterHook, "useEmailBodyFooter")
const emailUpdateStateSpy = jest.spyOn(useEmailUpdateHook, "useEmailUpdate")

describe("email-body-footer", () => {
  it("renders correctly", async () => {
    stateSpy.mockReturnValue(hookValuesDefault)
    emailUpdateStateSpy.mockReturnValue(emailUpdateHookValuesDefault)
    const component = create(<EmailBodyFooter {...defaultProps} />)
    await act(() => wait(0))
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("has correct structure", async () => {
    stateSpy.mockReturnValue(hookValuesDefault)
    emailUpdateStateSpy.mockReturnValue(emailUpdateHookValuesDefault)
    const tree = shallow(<EmailBodyFooter {...defaultProps} />)

    await act(() => wait(0))

    const footerCards = tree.find(SettingsFooterCard)
    expect(footerCards).toHaveLength(1)

    const relevanceCard = footerCards.at(0).dive()
    const relevanceCardOverviewCard = relevanceCard.find(OverviewCard)
    expect(relevanceCardOverviewCard).toHaveLength(1)
    const relevanceCardContent = relevanceCardOverviewCard.dive().find(Card)
    expect(relevanceCardContent).toHaveLength(1)
    expect(relevanceCardContent.dive().find(CustomSelect)).toHaveLength(1)

    const interventionCard = tree.find(InterventionSettingsCard)
    expect(interventionCard).toHaveLength(1)
  })
})
