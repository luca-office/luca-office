// importing from direct file because of issues of babel loader and spyOn
import {act} from "@testing-library/react"
import {mount, shallow} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {Button, CardFooter, Content, DetailViewHeader, Text} from "shared/components"
import {sampleCompaniesMock} from "shared/graphql/__mocks__"
import {SampleCompany} from "shared/models"
import {fakeTranslate} from "sharedTests/utils/translate-mock"
import wait from "waait"
import {CardOverview, EditingStatusIndicator} from "../../../../components"
import {ModuleSelection, ModuleSelectionComponentProps} from "../module-selection"
import {SelectionCardFooter} from "../selection-card-footer/selection-card-footer"

const defaultProps: ModuleSelectionComponentProps<SampleCompany> = {
  alreadyAssignedEntities: [],
  deselectEntity: jest.fn(),
  entities: sampleCompaniesMock,
  footerConfig: {
    emptySelectionKey: "sample_companies__selection_empty_selection",
    entitySelectionKey: "sample_companies__filter_title"
  },
  t: fakeTranslate,
  onSelectionConfirmed: jest.fn(),
  renderContent: (sampleCompany, footer) => (
    <div className="selection-item">
      {sampleCompany.id}
      {footer}
    </div>
  ),
  selectEntity: jest.fn(),
  selectedEntities: [],
  subheaderConfig: {
    entityFilterType: "scenarioSampleCompanySelection",
    labelKey: "sample_companies__selection_header",
    navigationButton: {
      labelKey: "placeholder",
      onClick: jest.fn()
    }
  },
  renderCustomCardFooterItem: sampleCompany => <div className="custom-footer">{sampleCompany.id}</div>
}

const getComponent = (props?: Partial<ModuleSelectionComponentProps<SampleCompany>>) => (
  <ModuleSelection {...{...defaultProps, ...props}} />
)

describe("module-selection", () => {
  it("renders correctly", async () => {
    const component = create(getComponent())
    await act(() => wait(0))
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  it("has correct structure", async () => {
    const component = mount(getComponent())

    expect(component.find(Content)).toHaveLength(1)
    expect(component.find(CardOverview)).toHaveLength(1)
    expect(component.find(DetailViewHeader)).toHaveLength(1)
    expect(component.find(CardFooter)).toHaveLength(4)
    expect(component.find(SelectionCardFooter)).toHaveLength(3)
    expect(component.find(Text)).toHaveLength(7)
    expect(component.find(Button)).toHaveLength(5)
    expect(component.find(".custom-footer")).toHaveLength(3)
  })

  it("renders correct amount of items", async () => {
    const component = shallow(getComponent())

    expect(component.find(".selection-item")).toHaveLength(3)
  })

  it("shows correct footer text if none selected or assigned", async () => {
    const component = mount(getComponent())

    expect(component.find(Text)).toHaveLength(7)
    expect(component.find(Text).last().prop("children")).toBe("sample_companies__selection_empty_selection")
  })

  it("shows correct footer text if one selected", async () => {
    const component = mount(getComponent({selectedEntities: [sampleCompaniesMock[0]]}))

    expect(component.find(Text)).toHaveLength(7)
    expect(component.find(Text).last().prop("children")).toBe("module_selection__single_entity_selected")
  })
  it("shows correct footer with custom props", async () => {
    const component = mount(
      getComponent({
        renderCustomCardFooterItem: entity => <div className={"test-element"}>hello</div>,
        getEditingStatusConfig: entity => ({isFinalized: false, isPublished: !!entity.publishedAt})
      })
    )

    expect(component.find(".test-element")).toHaveLength(sampleCompaniesMock.length)
    expect(component.find(EditingStatusIndicator)).toHaveLength(sampleCompaniesMock.length)
  })
})
