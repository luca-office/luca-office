// importing from direct file because of issues of babel loader and spyOn
import {act, render, screen} from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import {mount} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {ContentLoadingIndicator, OverviewCard} from "shared/components"
import {sampleCompaniesMock} from "shared/graphql/__mocks__"
import wait from "waait"
import {CreationCard, SubHeaderFilter} from "../../../../components"
import {UseSampleCompaniesHook} from "../hooks"
import * as useSampleCompanies from "../hooks/use-sample-companies"
import {SampleCompanies} from "../sample-companies"

const hookValuesDefault: UseSampleCompaniesHook = {
  sampleCompanies: sampleCompaniesMock,
  sampleCompaniesLoading: false,
  navigateSampleCompanyDetail: jest.fn(),
  navigateCreateSampleCompany: jest.fn()
}

const stateSpy = jest.spyOn(useSampleCompanies, "useSampleCompanies")

describe("sample-companies", () => {
  it("renders correctly", async () => {
    stateSpy.mockReturnValue(hookValuesDefault)
    const component = create(<SampleCompanies />)
    await act(() => wait(0))
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("has correct structure", async () => {
    stateSpy.mockReturnValue(hookValuesDefault)

    const component = mount(<SampleCompanies />)
    await act(() => wait(0))

    expect(component.find(SubHeaderFilter)).toHaveLength(1)
    expect(component.find(CreationCard)).toHaveLength(1)
    expect(component.find(OverviewCard)).toHaveLength(3)
  })

  it("has correct structure (no sampleCompanies)", async () => {
    stateSpy.mockReturnValue({...hookValuesDefault, sampleCompanies: []})

    const component = mount(<SampleCompanies />)

    await act(() => wait(0))
    expect(component.find(SubHeaderFilter)).toHaveLength(1)
    expect(component.find(CreationCard)).toHaveLength(1)
  })
  it("has correct structure (loading)", async () => {
    stateSpy.mockReturnValue({...hookValuesDefault, sampleCompanies: [], sampleCompaniesLoading: true})

    const component = mount(<SampleCompanies />)

    await act(() => wait(0))
    expect(component.find(SubHeaderFilter)).toHaveLength(1)
    expect(component.find(CreationCard)).toHaveLength(1)
    expect(component.find(ContentLoadingIndicator)).toHaveLength(1)
  })
  it("triggers actions correctly", async () => {
    const user = userEvent.setup()

    const navigateDetail = jest.fn()
    const navigateCreation = jest.fn()
    stateSpy.mockReturnValue({
      ...hookValuesDefault,
      navigateSampleCompanyDetail: navigateDetail,
      navigateCreateSampleCompany: navigateCreation
    })

    const component = mount(<SampleCompanies />)

    render(<SampleCompanies />)

    await user.click(screen.getByText("sample_companies__create_sample_company"))

    expect(navigateDetail).toHaveBeenCalledTimes(0)
    expect(navigateCreation).toHaveBeenCalledTimes(1)

    await user.click(screen.getByText(sampleCompaniesMock[0].name))

    expect(navigateDetail).toHaveBeenCalledTimes(1)
    expect(navigateCreation).toHaveBeenCalledTimes(1)
  })
})
