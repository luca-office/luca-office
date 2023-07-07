import {fireEvent, render} from "@testing-library/react"
import {mount} from "enzyme"
import {create} from "react-test-renderer"
import {CardFooterItem, Heading, OverviewCard} from "shared/components"
import {sampleCompaniesMock} from "shared/graphql/__mocks__"
import {Option} from "shared/utils"
import * as useSettings from "../hooks/use-settings"
import {UseSettingsHook} from "../hooks/use-settings"
import {Settings, SettingsProps} from "../settings"

const navigateDocumentsSpy = jest.fn()
const navigateDomainSignatureSpy = jest.fn()
const navigateToErpSpy = jest.fn()
const hookValuesDefault: UseSettingsHook = {
  navigateToDocuments: navigateDocumentsSpy,
  navigateToDomainSignature: navigateDomainSignatureSpy,
  navigateToErp: navigateToErpSpy
}

const defaultProps: SettingsProps = {
  sampleCompany: Option.of(sampleCompaniesMock[0]),
  isSelectedForScenario: false
}

const stateSpy = jest.spyOn(useSettings, "useSettings")
const getComponent = (props?: Partial<SettingsProps>) => <Settings {...{...defaultProps, ...props}} />

describe("settings", () => {
  it("renders correctly", () => {
    stateSpy.mockReturnValue(hookValuesDefault)
    const component = getComponent()
    const tree = create(component).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it("has correct structure (no scenario)", () => {
    stateSpy.mockReturnValue(hookValuesDefault)
    const component = getComponent()
    const tree = mount(component)

    const overviewCards = tree.find(OverviewCard)
    expect(overviewCards).toHaveLength(3)
    expect(tree.find(CardFooterItem)).toHaveLength(7)
  })

  it("has correct structure (with scenario)", () => {
    stateSpy.mockReturnValue(hookValuesDefault)
    const component = getComponent({isSelectedForScenario: true})
    const tree = mount(component)

    expect(tree.find(OverviewCard)).toHaveLength(3)
    expect(tree.find(Heading)).toHaveLength(5)
  })

  it("has handles button clicks correctly", async () => {
    stateSpy.mockReturnValue(hookValuesDefault)
    const component = getComponent({isSelectedForScenario: true})
    const {findByText} = render(component)

    const overviewCards = await findByText("sample_companies__detail_settings_company_files_desc")

    fireEvent.click(overviewCards)

    expect(navigateDocumentsSpy).toHaveBeenCalledTimes(1)
  })
})
