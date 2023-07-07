import {act} from "@testing-library/react"
import {shallow} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {Content, DetailViewHeader, HeaderContentContainer} from "shared/components"
import {sampleCompaniesMock} from "shared/graphql/__mocks__"
import {Option} from "shared/utils"
import wait from "waait"
import {CompanyDomainModal} from "../company-domain-modal/company-domain-modal"
import * as useSampleCompanyDomainSignatureHook from "../hooks/use-sample-company-domain-signature"
import {UseSampleCompanyDomainSignatureHook} from "../hooks/use-sample-company-domain-signature"
import {SampleCompanyDomainSignature, SampleCompanyDomainSignatureProps} from "../sample-company-domain-signature"

const sampleCompanyId = sampleCompaniesMock[0].id

const defaultProps: SampleCompanyDomainSignatureProps = {
  sampleCompanyId
}

const hookValuesDefault: UseSampleCompanyDomainSignatureHook = {
  dataLoading: false,
  handleUpdateSampleCompany: jest.fn(),
  isDomainOverlayVisible: false,
  isPublished: false,
  navigateToSampleCompany: jest.fn(),
  sampleCompany: Option.none(),
  setDomainOverlayVisible: jest.fn()
}

const stateSpy = jest.spyOn(useSampleCompanyDomainSignatureHook, "useSampleCompanyDomainSignature")

const getComponent = (props?: Partial<SampleCompanyDomainSignatureProps>) => (
  <SampleCompanyDomainSignature {...{...defaultProps, ...props}} />
)

describe("sample-company-domain-signature", () => {
  it("renders correctly", async () => {
    stateSpy.mockReturnValue(hookValuesDefault)
    const component = create(getComponent())
    await act(() => wait(0))

    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  it("has correct structure", async () => {
    stateSpy.mockReturnValue(hookValuesDefault)
    const tree = shallow(getComponent())

    await act(() => wait(0))

    const content = tree.find(Content)
    expect(content).toHaveLength(1)

    const detailViewHeader = content.dive().find(DetailViewHeader)
    expect(detailViewHeader).toHaveLength(1)

    const headerContentContainers = content.dive().find(HeaderContentContainer)
    expect(headerContentContainers).toHaveLength(2)
  })

  it("has disabled cards", async () => {
    stateSpy.mockReturnValue({...hookValuesDefault, ...{isPublished: true}})
    const tree = shallow(getComponent())

    await act(() => wait(0))

    const headerContentContainers = tree.find(HeaderContentContainer)
    expect(headerContentContainers.first().prop("disabled")).toBeTruthy()
    expect(headerContentContainers.last().prop("disabled")).toBeTruthy()
  })

  it("handles domain overlay", async () => {
    stateSpy.mockReturnValue({...hookValuesDefault, ...{isDomainOverlayVisible: true}})
    const tree = shallow(getComponent())

    await act(() => wait(0))

    const overlay = tree.find(CompanyDomainModal)
    expect(overlay).toHaveLength(1)
  })
})
