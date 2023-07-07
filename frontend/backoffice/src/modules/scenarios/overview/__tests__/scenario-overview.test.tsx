// importing from direct file because of issues of babel loader and spyOn
import {fireEvent, render, waitFor} from "@testing-library/react"
import {mount, shallow} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {OverviewCard} from "shared/components"
import {scenariosMock} from "shared/graphql/__mocks__"
import {CardOverview, CreationCard} from "../../../../components"
import * as scenarioOverviewHook from "../hooks/use-scenario-overview"
import {UseScenarioOverviewHook} from "../hooks/use-scenario-overview"
import {ScenarioOverview} from "../scenario-overview"

const hookValuesDefault: UseScenarioOverviewHook = {
  loading: false,
  navigateToDetails: jest.fn(),
  onCreateClicked: jest.fn(),
  scenarios: scenariosMock,
  mayFinalizeWithoutPublishing: false
}

const stateSpy = jest.spyOn(scenarioOverviewHook, "useScenarioOverview")

describe("Scenario Overview", () => {
  it("renders correctly", async () => {
    stateSpy.mockReturnValue(hookValuesDefault)
    const component = create(<ScenarioOverview />)

    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("has correct structure (0 Scenario)", async () => {
    stateSpy.mockReturnValue({...hookValuesDefault, scenarios: []})

    const component = shallow(<ScenarioOverview />)
    expect(component.find(OverviewCard)).toHaveLength(0)
    expect(component.find(CardOverview)).toHaveLength(1)
  })
  it("has correct structure (1 Scenario)", async () => {
    stateSpy.mockReturnValue(hookValuesDefault)

    const component = shallow(<ScenarioOverview />)
    expect(component.find(OverviewCard)).toHaveLength(scenariosMock.length)
  })

  it("shows no time if maxDurationInSeconds is null", async () => {
    stateSpy.mockReturnValue(hookValuesDefault)

    const {queryByText, queryAllByTestId} = render(<ScenarioOverview />)
    const cardWithTime = queryByText("90min")
    expect(cardWithTime).toBeDefined()

    const allCardsWithDuration = queryAllByTestId("card-duration-info")
    expect(allCardsWithDuration).toHaveLength(1)
  })

  it("triggers actions correctly", async () => {
    const navigateToDetails = jest.fn()
    const onCreateClicked = jest.fn()
    stateSpy.mockReturnValue({...hookValuesDefault, navigateToDetails, onCreateClicked})

    const component = render(<ScenarioOverview />)

    fireEvent.click(component.getByText("scenario_create_scenario"))

    await waitFor(() => expect(onCreateClicked).toBeCalledTimes(1))

    fireEvent.click(component.getByText(scenariosMock[0].name))

    await waitFor(() => expect(navigateToDetails).toBeCalledTimes(1))
  })
})
