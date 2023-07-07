import {MockedProvider} from "@apollo/client/testing"
import {act} from "@testing-library/react"
import {mount} from "enzyme"
import {pick} from "lodash-es"
import * as React from "react"
import {create} from "react-test-renderer"
import {ContentLoadingIndicator, Modal, Text} from "shared/components"
import {codingCriteriaMock, codingItemMock} from "shared/graphql/__mocks__"
import {deleteCodingCriterionMutation, updateCodingCriterionMutation} from "shared/graphql/mutations"
import {Option} from "shared/utils"
import wait from "waait"
import {CodingCriteriaCard} from "../coding-criteria-card/coding-criteria-card"
import {CodingCriteriaList} from "../coding-criteria-list/coding-criteria-list"
import {CodingItemMetaCard} from "../coding-item-meta-card/coding-item-meta-card"
import {EditCodingCriterionModal, EditCodingCriterionModalProps} from "../edit-coding-criterion-modal"
import * as useEditCodingCriterionModalHook from "../hooks/use-edit-coding-criterion-modal"
import {UseEditCodingCriterionModalHook} from "../hooks/use-edit-coding-criterion-modal"

const codingItem = codingItemMock
const codingCriteria = codingCriteriaMock

const hookValuesDefault: UseEditCodingCriterionModalHook = {
  dataLoading: false,
  codingItem: Option.of(codingItem),
  codingCriteria,
  selectedCriterionId: Option.of(codingCriteria[0].id),
  selectCriterion: jest.fn(),
  deselectCriterion: jest.fn(),
  getTitleForDocumentViewCodingCriterion: jest.fn(),
  getAssociatedRScriptForRScriptCodingCriterion: jest.fn()
}

const stateSpy = jest.spyOn(useEditCodingCriterionModalHook, "useEditCodingCriterionModal")

const defaultProps: EditCodingCriterionModalProps = {
  codingItemId: codingItem.id,
  onDismiss: jest.fn(),
  codingModelId: "a4a505ed-4b92-4f35-978a-7a144fe38ca9",
  selectedCodingCriterionId: Option.none(),
  scenarioId: "ad14237c-4fc6-4e04-8a1a-33d33b722f52",
  rScripts: [],
  automatedCodingCriteria: []
}

const getComponent = (props?: Partial<EditCodingCriterionModalProps>) => (
  <MockedProvider
    mocks={[
      {
        request: {
          query: updateCodingCriterionMutation,
          variables: {
            id: codingCriteria[0].id,
            creation: pick(codingCriteria[0], ["description", "score"])
          }
        },
        result: {
          data: {
            updateCodingCriterion: codingCriteriaMock[0]
          }
        }
      },
      {
        request: {
          query: deleteCodingCriterionMutation,
          variables: {id: codingCriteria[0].id}
        },
        result: {
          data: {
            deleteCodingCriterion: codingCriteria[0].id
          }
        }
      }
    ]}
    addTypename={true}>
    <EditCodingCriterionModal {...{...defaultProps, ...props}} />
  </MockedProvider>
)

describe("edit-coding-criterion-modal", () => {
  it("renders correctly (selected criterion)", async () => {
    stateSpy.mockReturnValue(hookValuesDefault)
    const component = create(getComponent())
    await act(() => wait(0))
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("renders correctly (no selected criterion)", async () => {
    stateSpy.mockReturnValue({...hookValuesDefault, selectedCriterionId: Option.none()})
    const component = create(getComponent())
    await act(() => wait(0))
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("has correct structure", async () => {
    stateSpy.mockReturnValue(hookValuesDefault)

    const component = mount(getComponent())
    await act(() => wait(0))

    expect(component.find(Modal)).toHaveLength(1)
    expect(component.find(ContentLoadingIndicator)).toHaveLength(0)
    expect(component.find(Text)).toHaveLength(17)
    expect(component.find(CodingItemMetaCard)).toHaveLength(1)
    expect(component.find(CodingCriteriaList)).toHaveLength(1)
    expect(component.find(CodingCriteriaCard)).toHaveLength(1)
  })
  it("has correct structure (loading)", async () => {
    stateSpy.mockReturnValue({...hookValuesDefault, dataLoading: true})

    const component = mount(getComponent())
    await act(() => wait(0))

    expect(component.find(Modal)).toHaveLength(1)
    expect(component.find(ContentLoadingIndicator)).toHaveLength(1)
    expect(component.find(Text)).toHaveLength(0)
    expect(component.find(CodingItemMetaCard)).toHaveLength(0)
    expect(component.find(CodingCriteriaList)).toHaveLength(0)
    expect(component.find(CodingCriteriaCard)).toHaveLength(0)
  })
  it("triggers dismiss correctly", async () => {
    const onDismissMock = jest.fn()
    stateSpy.mockReturnValue(hookValuesDefault)

    const component = mount(getComponent({onDismiss: onDismissMock}))
    await act(() => wait(0))

    const modal = component.find(Modal)
    expect(modal).toHaveLength(1)

    const onDismissHandler = modal.prop("onDismiss")
    expect(onDismissHandler).toBeDefined()

    onDismissHandler!()
    expect(onDismissMock).toHaveBeenCalledTimes(1)
  })
})
