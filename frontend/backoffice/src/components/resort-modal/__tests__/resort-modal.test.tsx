import {shallow} from "enzyme"
import * as React from "react"
import {act, create} from "react-test-renderer"
import {Button, Heading, Modal, Overlay, Table, TableContainer} from "shared/components"
import {ResortableEntity} from "../../../models"
import {resortableEntitiesMock} from "../__mocks__/resortable-entities.mock"
import {ReorderModalProps, ResortModal} from "../resort-modal"

const defaultProps: ReorderModalProps<ResortableEntity> = {
  disabled: false,
  entities: resortableEntitiesMock,
  onConfirm: jest.fn(),
  onDismiss: jest.fn(),
  titleKey: "reference_books__sort_article_content_table_of_contents_label",
  tableLabel: "table-label"
}

const getComponent = (props?: Partial<ReorderModalProps<ResortableEntity>>) => (
  <ResortModal {...{...defaultProps, ...props}} />
)

describe("resort-modal", () => {
  it("renders correctly", () => {
    const component = getComponent()
    const tree = create(component).toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("has correct structure", () => {
    const component = getComponent()
    const tree = shallow(component)

    const overlay = tree.find(Overlay)
    expect(overlay).toHaveLength(1)

    const modal = overlay.dive().find(Modal)
    expect(modal).toHaveLength(1)

    const modalContent = modal.dive()
    expect(modalContent.find(Heading)).toHaveLength(2)
    expect(modalContent.find(TableContainer)).toHaveLength(1)
  })
  it("correctly reorders entities", () => {
    const onConfirmMock = jest.fn()
    const component = getComponent({onConfirm: onConfirmMock})
    const tree = shallow(component)

    const modal = tree.find(Overlay).dive().find(Modal)
    expect(modal).toHaveLength(1)

    const modalContent = modal.dive()

    const table = modalContent.find(TableContainer)
    expect(table).toHaveLength(1)

    const rows = table.dive().find(Table).dive().find(".entity-row")
    expect(rows).toHaveLength(3)

    const buttons = rows.at(1).find(Button)
    expect(buttons).toHaveLength(3)

    // press down
    act(() => {
      buttons.at(2).simulate("click")
    })
  })
})
