import {shallow} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {sampleCompaniesMock} from "shared/graphql/__mocks__"
import {SampleCompany} from "shared/models"
import {Option} from "shared/utils"
import {InformationEntry, InlineEditableHeaderContainer, MetaEntryTags} from "../../../../../components"
import {InformationMainContent, InformationMainContentProps} from "../information-main-content"

const defaultProps: InformationMainContentProps = {
  isFinalized: false,
  sampleCompanyOption: Option.of<SampleCompany>(sampleCompaniesMock[0]),
  updateLoading: false,
  updateSampleCompany: jest.fn(),
  isSelectedForScenario: false
}

const getComponent = (props?: Partial<InformationMainContentProps>) => (
  <InformationMainContent {...{...defaultProps, ...props}} />
)

describe("information-main-content", () => {
  it("renders correctly", () => {
    const component = getComponent()
    const tree = create(component).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it("has correct structure", () => {
    const component = getComponent()
    const tree = shallow(component)

    const informationEntries = tree.find(InformationEntry)
    expect(informationEntries).toHaveLength(2)

    const metaEntries = tree.find(MetaEntryTags)
    expect(metaEntries).toHaveLength(1)
    expect(tree.find(MetaEntryTags)).toHaveLength(1)

    expect(tree.find(InlineEditableHeaderContainer).first().props().disabled).toBeFalsy()
  })

  it("has correct structure (finalized)", () => {
    const component = getComponent({isFinalized: true})
    const tree = shallow(component)

    const informationEntries = tree.find(InformationEntry)
    expect(informationEntries).toHaveLength(2)

    const metaEntries = tree.find(MetaEntryTags)
    expect(metaEntries).toHaveLength(1)
    expect(tree.find(MetaEntryTags)).toHaveLength(1)

    expect(tree.find(InlineEditableHeaderContainer).first().props().disabled).toEqual(true)
  })
})
