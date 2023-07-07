// importing from direct file because of issues of babel loader and spyOn
import {act} from "@testing-library/react"
import {shallow} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {OverviewCard} from "shared/components"
import {scenarioWithCodingModelsMock} from "shared/graphql/__mocks__"
import wait from "waait"
import {CardOverview} from "../../../../components"
import {CodingModelsOverview} from "../coding-models-overview"
import * as useCodingModelOverviewHook from "../hooks/use-coding-models-overview"
import {UseCodingModelsOverviewHook} from "../hooks/use-coding-models-overview"

const hookValuesDefault: UseCodingModelsOverviewHook = {
  loading: false,
  scenariosWithCodingModel: scenarioWithCodingModelsMock,
  navigateToDetails: jest.fn(),
  onCreateClicked: jest.fn(),
  onCodingModelCardClicked: jest.fn()
}

const stateSpy = jest.spyOn(useCodingModelOverviewHook, "useCodingModelOverviewHook")

describe("coding-models", () => {
  it("renders correctly", async () => {
    stateSpy.mockReturnValue(hookValuesDefault)
    const component = create(<CodingModelsOverview scenarioId="adadasd" />)
    await act(() => wait(0))
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("has correct structure", async () => {
    stateSpy.mockReturnValue(hookValuesDefault)

    const component = shallow(<CodingModelsOverview scenarioId="adadasd" />)
    await act(() => wait(0))

    expect(component.find(CardOverview)).toHaveLength(1)
    expect(component.find(OverviewCard)).toHaveLength(2)
  })
  it("triggers Card Click correctly", async () => {
    const onCodingModelCardClicked = jest.fn()
    stateSpy.mockReturnValue({...hookValuesDefault, onCodingModelCardClicked})

    const component = shallow(<CodingModelsOverview scenarioId="adadasd" />)
    await act(() => wait(0))

    expect(component.find(CardOverview)).toHaveLength(1)

    const overviewCards = component.find(OverviewCard)
    expect(overviewCards).toHaveLength(2)
    overviewCards.last().simulate("click")
    expect(onCodingModelCardClicked).toHaveBeenCalledTimes(1)
  })
})
