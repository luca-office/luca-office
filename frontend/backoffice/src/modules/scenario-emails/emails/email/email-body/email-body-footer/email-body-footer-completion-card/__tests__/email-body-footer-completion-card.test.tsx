import {act} from "@testing-library/react-hooks"
import {shallow} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {OverviewCard, Text} from "shared/components"
import {scenariosMock} from "shared/graphql/__mocks__"
import {UseUpdateScenarioHook} from "shared/graphql/hooks"
import * as useUpdateScenarioHook from "shared/graphql/hooks/mutations/scenario/use-update-scenario"
import {Option} from "shared/utils"
import wait from "waait"
import {EmailBodyMetaEntry} from "../../../../../../../../components"
import {EmailBodyFooterCompletionCard, EmailBodyFooterCompletionCardProps} from "../email-body-footer-completion-card"

const scenario = scenariosMock[0]

const defaultProps: EmailBodyFooterCompletionCardProps = {
  scenario
}

const updateScenarioHookValuesDefault: UseUpdateScenarioHook = {
  updateScenario: jest.fn(() => Promise.resolve(Option.of(scenario))),
  isUpdateScenarioLoading: false
}

const updateScenarioStateSpy = jest.spyOn(useUpdateScenarioHook, "useUpdateScenario")

describe("email-body-footer-completion-card", () => {
  it("renders correctly", async () => {
    updateScenarioStateSpy.mockReturnValue(updateScenarioHookValuesDefault)
    const component = create(<EmailBodyFooterCompletionCard {...defaultProps} />)
    await act(() => wait(0))
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("has correct structure", async () => {
    updateScenarioStateSpy.mockReturnValue(updateScenarioHookValuesDefault)
    const tree = shallow(<EmailBodyFooterCompletionCard {...defaultProps} />)

    await act(() => wait(0))

    const overviewCard = tree.find(OverviewCard)
    expect(overviewCard).toHaveLength(1)

    const content = overviewCard.dive()

    expect(content.find(Text)).toHaveLength(1)
    expect(content.find(EmailBodyMetaEntry)).toHaveLength(1)
  })
  it("has correct structure (disabled)", async () => {
    updateScenarioStateSpy.mockReturnValue(updateScenarioHookValuesDefault)
    const tree = shallow(<EmailBodyFooterCompletionCard {...defaultProps} disabled={true} />)

    await act(() => wait(0))

    const overviewCard = tree.find(OverviewCard)
    const content = overviewCard.dive()

    expect(content.find(EmailBodyMetaEntry).prop("disabled")).toBeTruthy()
  })
})
