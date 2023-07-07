import {MockedProvider} from "@apollo/client/testing"
import {fireEvent, render, screen, waitFor} from "@testing-library/react"
import {act} from "@testing-library/react-hooks"
import {mount} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {Button} from "../../button/button"
import {DeleteOrArchiveEntityButton} from "../../delete-or-archive-entity-button/delete-or-archive-entity-button"
import {
  DetailViewHeader,
  DetailViewHeaderDeleteOrArchiveButtonConfig,
  DetailViewHeaderProps
} from "../detail-view-header"

const mockedDeleteHook = () => ({deleteEntity: jest.fn(), deleteEntityLoading: false})

const mockedDeleteOrArchiveButtonConfig: DetailViewHeaderDeleteOrArchiveButtonConfig = {
  deleteHook: mockedDeleteHook,
  disabled: false,
  entityId: "123",
  onSuccess: jest.fn
}

const defaultProps: DetailViewHeaderProps = {
  labelKey: "sample_companies__selection_back_button",
  navigationButtonConfig: {labelKey: "sample_companies__detail_header_navigate_back_label", onClick: jest.fn()},
  operationButtonConfig: {labelKey: "sample_companies__header_duplicate_label", onClick: jest.fn()},
  deleteOrArchiveButtonConfig: mockedDeleteOrArchiveButtonConfig,
  customContent: <div className={"test-content"}>test</div>
}

const getComponent = (props?: Partial<DetailViewHeaderProps>) => (
  <MockedProvider>
    <DetailViewHeader {...{...defaultProps, ...props}} />
  </MockedProvider>
)

describe("detail-header", () => {
  it("renders correctly", () => {
    const component = getComponent()
    const tree = create(component).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it("shows delete button if visible", () => {
    const component = getComponent({
      deleteOrArchiveButtonConfig: {
        ...mockedDeleteOrArchiveButtonConfig,
        invisible: false
      }
    })
    const tree = mount(component)
    expect(tree.find(DeleteOrArchiveEntityButton)).toHaveLength(1)
  })

  it("does not show delete button if invisible", () => {
    const component = getComponent({
      deleteOrArchiveButtonConfig: {
        ...mockedDeleteOrArchiveButtonConfig,
        invisible: true
      }
    })
    const tree = mount(component)
    expect(tree.find(DeleteOrArchiveEntityButton)).toHaveLength(0)
  })

  it("renders custom content", () => {
    const component = getComponent()
    const tree = mount(component)
    expect(tree.find(".test-content")).toHaveLength(1)
  })

  it("handles button clicks correctly", async () => {
    const mockOnNavigationClick = jest.fn()
    const mockOnOperationClick = jest.fn()
    const mockOnDeleteClick = jest.fn()
    const component = getComponent({
      navigationButtonConfig: {
        labelKey: "sample_companies__detail_header_navigate_back_label",
        onClick: mockOnNavigationClick
      },
      operationButtonConfig: {labelKey: "sample_companies__header_duplicate_label", onClick: mockOnOperationClick},
      deleteOrArchiveButtonConfig: {
        ...mockedDeleteOrArchiveButtonConfig,
        deleteHook: () => ({deleteEntity: mockOnDeleteClick, deleteEntityLoading: false})
      }
    })
    render(component)

    const navigationButton = screen.queryByText("sample_companies__detail_header_navigate_back_label")
    const operationButton = screen.queryByText("sample_companies__header_duplicate_label")

    expect(navigationButton).toBeDefined()
    expect(operationButton).toBeDefined()

    fireEvent.click(navigationButton!)

    await waitFor(() => {
      expect(mockOnNavigationClick).toBeCalled()
    })

    fireEvent.click(operationButton!)

    await waitFor(() => {
      expect(mockOnOperationClick).toBeCalled()
    })
  })
})
