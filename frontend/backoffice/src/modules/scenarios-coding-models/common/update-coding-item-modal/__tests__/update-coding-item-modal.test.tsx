import {shallow} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {FeatureDisabledMarker, Modal, Overlay, SelectableCard, Text} from "shared/components"
import {manualCodingItemMock} from "shared/graphql/__mocks__"
import {Option} from "shared/utils"
import * as useUpdateCodingItemModalHook from "../hooks/use-update-coding-item-modal"
import {UpdateCodingItemType, UseUpdateCodingItemModalHook} from "../hooks/use-update-coding-item-modal"
import {UpdateCodingItemModal, UpdateCodingItemModalProps} from "../update-coding-item-modal"

const hookValuesDefault: UseUpdateCodingItemModalHook = {
  selectedIndex: Option.of(0),
  selectIndex: jest.fn(),
  updateCodingItem: jest.fn(() => Promise.resolve(Option.of(manualCodingItemMock)))
}

const stateSpy = jest.spyOn(useUpdateCodingItemModalHook, "useUpdateCodingItemModal")

const defaultProps: UpdateCodingItemModalProps = {
  codingItemId: manualCodingItemMock.id,
  type: UpdateCodingItemType.Type,
  onDismiss: jest.fn(),
  onUpdate: jest.fn()
}

const getComponent = (props?: Partial<UpdateCodingItemModalProps>) => (
  <UpdateCodingItemModal {...{...defaultProps, ...props}} />
)

describe("update-coding-item-modal", () => {
  it("renders correctly", async () => {
    stateSpy.mockReturnValue(hookValuesDefault)
    const component = create(getComponent())

    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("has correct structure (type=UpdateCodingItemType.Type)", async () => {
    stateSpy.mockReturnValue(hookValuesDefault)
    const component = shallow(getComponent())

    const overlay = component.find(Overlay)
    expect(overlay).toHaveLength(1)

    const modal = overlay.dive().find(Modal)
    expect(modal).toHaveLength(1)

    const modalContent = modal.dive()

    const text = modalContent.find(Text)
    expect(text).toHaveLength(2)

    const contentTypeCard = modalContent.find(SelectableCard)
    expect(contentTypeCard).toHaveLength(2)

    const featureDisabledMarker = modalContent.find(FeatureDisabledMarker)
    expect(featureDisabledMarker).toHaveLength(0)
  })
  it("has correct structure (type=UpdateCodingItemType.Method)", async () => {
    stateSpy.mockReturnValue(hookValuesDefault)
    const component = shallow(getComponent({type: UpdateCodingItemType.Method}))

    const overlay = component.find(Overlay)
    expect(overlay).toHaveLength(1)

    const modal = overlay.dive().find(Modal)
    expect(modal).toHaveLength(1)

    const modalContent = modal.dive()

    const text = modalContent.find(Text)
    expect(text).toHaveLength(2)

    const contentTypeCard = modalContent.find(SelectableCard)
    expect(contentTypeCard).toHaveLength(2)

    const featureDisabledMarker = modalContent.find(FeatureDisabledMarker)
    expect(featureDisabledMarker).toHaveLength(1)
  })
  it("triggers dismiss correctly", async () => {
    const onDismissMock = jest.fn()
    stateSpy.mockReturnValue(hookValuesDefault)
    const component = shallow(getComponent({onDismiss: onDismissMock}))

    const modal = component.find(Overlay).dive().find(Modal)
    expect(modal).toHaveLength(1)

    const onDismissHandler = modal.prop("onDismiss")
    expect(onDismissHandler).toBeDefined()

    onDismissHandler!()
    expect(onDismissMock).toHaveBeenCalledTimes(1)
  })
})
