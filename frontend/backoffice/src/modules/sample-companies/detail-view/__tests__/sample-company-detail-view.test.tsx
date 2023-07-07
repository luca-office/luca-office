import {MockedProvider} from "@apollo/client/testing"
import {act} from "@testing-library/react-hooks"
import {mount} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {DetailViewHeader} from "shared/components"
import {sampleCompaniesMock, userAccountMock} from "shared/graphql/__mocks__"
import {checkLoginQuery} from "shared/graphql/queries"
import {SampleCompany} from "shared/models"
import {Option} from "shared/utils"
import {mockedFormMethods} from "sharedTests/utils/form-methods-mock"
import wait from "waait"
import * as useSampleCompanyDetail from "../hooks/use-sample-company-detail"
import {UseSampleCompanyDetailHook} from "../hooks/use-sample-company-detail"
import {SampleCompanyInformation} from "../information/sample-company-information"
import {SampleCompanyDetailView, SampleCompanyDetailViewProps} from "../sample-company-detail-view"
import {Settings} from "../settings/settings"

const sampleCompany = sampleCompaniesMock[0]

const defaultProps: SampleCompanyDetailViewProps = {
  sampleCompanyId: sampleCompany.id
}

const stateHookValuesDefault: UseSampleCompanyDetailHook = {
  sampleCompany: Option.of(sampleCompany),
  dataLoading: false,
  duplicateSampleCompany: jest.fn(),
  publishSampleCompany: jest.fn(),
  formMethods: mockedFormMethods,
  navigateToOverview: jest.fn(),
  updateSampleCompany: jest.fn(() => Promise.resolve(Option.of(sampleCompany))),
  canBePublished: false,
  isPublished: false,
  userMayArchive: false,
  publishSampleCompanyLoading: false,
  duplicateSampleCompanyLoading: false
}

const stateSpy = jest.spyOn(useSampleCompanyDetail, "useSampleCompanyDetail")

const getComponent = (props?: Partial<SampleCompanyDetailViewProps>) => (
  <MockedProvider
    mocks={[
      {
        request: {
          query: checkLoginQuery
        },
        result: {
          data: {
            checkLoginQuery: userAccountMock
          }
        }
      }
    ]}>
    <SampleCompanyDetailView {...{...defaultProps, ...props}} />
  </MockedProvider>
)

describe("sample-company-detail", () => {
  it("renders correctly", async () => {
    stateSpy.mockReturnValue(stateHookValuesDefault)
    const component = create(getComponent())
    await act(() => wait(0))
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  it("has content", async () => {
    stateSpy.mockReturnValue(stateHookValuesDefault)
    const tree = mount(getComponent())

    await act(() => wait(0))

    const header = tree.find(DetailViewHeader)
    expect(header).toHaveLength(1)

    const infos = tree.find(SampleCompanyInformation)
    expect(infos).toHaveLength(1)

    const settings = tree.find(Settings)
    expect(settings).toHaveLength(1)
  })

  it("has correct tooltip structure warning if intro missing", async () => {
    stateSpy.mockReturnValue({
      ...stateHookValuesDefault,
      sampleCompany: Option.of<SampleCompany>({...sampleCompany, profileFileId: null})
    })
    const tree = mount(getComponent())

    await act(() => wait(0))

    const header = tree.find(DetailViewHeader)
    expect(header).toHaveLength(1)
    expect(header.prop("operationButtonConfig")?.tooltipConfig?.warningConfig).toBeDefined()
    expect(header.prop("operationButtonConfig")?.tooltipConfig?.warningConfig).toHaveLength(1)
  })
  it("has correct tooltip structure  if intro and logo missing", async () => {
    stateSpy.mockReturnValue({
      ...stateHookValuesDefault,
      sampleCompany: Option.of<SampleCompany>({...sampleCompany, profileFileId: null, logoFileId: null})
    })
    const tree = mount(getComponent())

    await act(() => wait(0))

    const header = tree.find(DetailViewHeader)
    expect(header).toHaveLength(1)
    expect(header.prop("operationButtonConfig")?.tooltipConfig?.warningConfig).toBeDefined()
    expect(header.prop("operationButtonConfig")?.tooltipConfig?.warningConfig).toHaveLength(2)
  })
})
