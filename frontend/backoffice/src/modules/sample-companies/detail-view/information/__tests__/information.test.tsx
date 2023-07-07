import {MockedProvider} from "@apollo/client/testing"
import {mount} from "enzyme"
import * as React from "react"
import {act} from "react-dom/test-utils"
import {create} from "react-test-renderer"
import {checkLoginMock, sampleCompaniesMock, scenariosMock} from "shared/graphql/__mocks__"
import {checkLoginQuery} from "shared/graphql/queries"
import {Option} from "shared/utils"
import {getDateValueMock} from "sharedTests/utils/date-mock"
import wait from "waait"
import * as useScenarioUpdateHook from "../../../../scenarios/detail/hooks/use-scenario-update"
import {UseScenarioUpdateHook} from "../../../../scenarios/detail/hooks/use-scenario-update"
import {InformationBinaryContent} from "../../information-binary-content/information-binary-content"
import {SampleCompanyInformation, SampleCompanyInformationProps} from "../sample-company-information"

const scenario = scenariosMock[0]

const defaultProps: SampleCompanyInformationProps = {
  updateLoading: false,
  sampleCompany: Option.of(sampleCompaniesMock[0]),
  isFinalized: false,
  updateSampleCompany: jest.fn()
}

const scenarioUpdateHookValuesDefault: UseScenarioUpdateHook = {
  updateScenario: jest.fn(() => Promise.resolve(Option.of(scenario))),
  updateScenarioLoading: false
}

const scenarioUpdateStateSpy = jest.spyOn(useScenarioUpdateHook, "useScenarioUpdate")

const getComponent = (props?: Partial<SampleCompanyInformationProps>) => (
  <MockedProvider
    {...{
      addTypename: false,
      mocks: [{request: {query: checkLoginQuery}, result: {data: {checkLogin: checkLoginMock}}}]
    }}>
    <SampleCompanyInformation {...{...defaultProps, ...props}} />
  </MockedProvider>
)

describe("information", () => {
  const _Date = Date
  beforeEach(() => {
    const mockDate = getDateValueMock(1970, 1, 1)
    Date = mockDate
  })
  afterEach(() => {
    Date = _Date
  })
  it("renders correctly", async () => {
    scenarioUpdateStateSpy.mockReturnValue(scenarioUpdateHookValuesDefault)
    const component = create(getComponent())
    await act(() => wait(0))
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("has content and footer", async () => {
    scenarioUpdateStateSpy.mockReturnValue(scenarioUpdateHookValuesDefault)
    const tree = mount(getComponent())
    await act(() => wait(0))

    const binaryContent = tree.find(InformationBinaryContent)
    expect(binaryContent).toHaveLength(1)
  })
})
