import {MockedProvider} from "@apollo/client/testing"
import {mount} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {Button, Column, Columns, Label, ReadonlyActionField, Table} from "shared/components"
import {codingCriteriaMock, manualCodingItemMock} from "shared/graphql/__mocks__"
import {Option} from "shared/utils"
import {EditCodingCriterionModal} from "../../../common/edit-coding-criterion-modal/edit-coding-criterion-modal"
import {CodingModelCommonDetailView} from "../../common/detail-view/coding-model-common-detail-view"
import {ManualCodingItemDetailView} from "../manual-coding-item-detail-view"

const getComponent = () => (
  <MockedProvider>
    <ManualCodingItemDetailView
      isReadOnly={false}
      addCodingCriterion={jest.fn()}
      codingCriteria={codingCriteriaMock}
      updateCodingItem={jest.fn()}
      codingModelId="AFsdf"
      scenarioId="sdkfsdl"
      codingItem={manualCodingItemMock}
      visibleCodingItemUpdateModalType={Option.none()}
      showUpdateCodingItemTypeModal={jest.fn()}
      hideCodingItemUpdateModal={jest.fn()}
      editCodingCriterionModalVisibility={{defaultSelectedCriterionId: Option.none(), isVisible: false}}
      showEditCodingCriterionModal={jest.fn()}
      hideEditCodingCriterionModal={jest.fn()}
    />
  </MockedProvider>
)

describe("coding-item-detail-view", () => {
  it("renders correctly", () => {
    const component = create(getComponent())
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  it("has correct structure", () => {
    const component = mount(getComponent())

    expect(component.find(CodingModelCommonDetailView)).toHaveLength(1)
    expect(component.find(Column)).toHaveLength(17)
    expect(component.find(Columns)).toHaveLength(1)
    expect(component.find(ReadonlyActionField)).toHaveLength(3)
    expect(component.find(Button)).toHaveLength(4)
    expect(component.find(Table)).toHaveLength(1)
    expect(component.find(Label)).toHaveLength(3)
    expect(component.find(EditCodingCriterionModal)).toHaveLength(0)
  })
  it("has correct structure with edit modal", () => {
    const component = mount(
      <MockedProvider>
        <ManualCodingItemDetailView
          isReadOnly={false}
          codingModelId="AFsdf"
          scenarioId="sdkfsdl"
          addCodingCriterion={jest.fn()}
          codingCriteria={codingCriteriaMock}
          updateCodingItem={jest.fn()}
          codingItem={manualCodingItemMock}
          visibleCodingItemUpdateModalType={Option.none()}
          showUpdateCodingItemTypeModal={jest.fn()}
          hideCodingItemUpdateModal={jest.fn()}
          editCodingCriterionModalVisibility={{defaultSelectedCriterionId: Option.none(), isVisible: true}}
          showEditCodingCriterionModal={jest.fn()}
          hideEditCodingCriterionModal={jest.fn()}
        />
      </MockedProvider>
    )

    expect(component.find(CodingModelCommonDetailView)).toHaveLength(1)
    expect(component.find(Column)).toHaveLength(17)
    expect(component.find(Columns)).toHaveLength(1)
    expect(component.find(ReadonlyActionField)).toHaveLength(3)
    expect(component.find(Button)).toHaveLength(4)
    expect(component.find(Table)).toHaveLength(1)
    expect(component.find(Label)).toHaveLength(3)
    expect(component.find(EditCodingCriterionModal)).toHaveLength(1)
  })
})
