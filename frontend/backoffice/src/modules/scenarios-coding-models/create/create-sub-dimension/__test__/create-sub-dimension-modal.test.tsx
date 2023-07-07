// importing from direct file because of issues of babel loader and spyOn
import {MockedProvider} from "@apollo/client/testing"
import {mount} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {Column, Columns, Modal, ReadonlyActionField, Text, TextInput} from "shared/components"
import {codingDimensionsMock} from "shared/graphql/__mocks__"
import {mockedFormMethods} from "sharedTests/utils/form-methods-mock"
import {CreateSubDimensionModal} from "../create-sub-dimension-modal"
import * as createSubdimensionModalHook from "../hooks/use-create-sub-dimension"
import {UseCreateSubDimensionHook} from "../hooks/use-create-sub-dimension"

const scenarioId = "iwrjsf-wrpofd"

const hookValuesDefault: UseCreateSubDimensionHook = {
  formMethods: mockedFormMethods,
  createSubDimension: jest.fn(),
  createSubDimensionLoading: false
}

const stateSpy = jest.spyOn(createSubdimensionModalHook, "useCreateSubDimensionModal")

describe("create-sub-dimension-modal", () => {
  it("renders correctly", async () => {
    stateSpy.mockReturnValue(hookValuesDefault)

    const component = create(
      <MockedProvider>
        <CreateSubDimensionModal
          parentDimension={codingDimensionsMock[0]}
          codingModelId="sfsfsd-sfsdf"
          scenarioId={scenarioId}
          onConfirm={jest.fn()}
          onDismiss={jest.fn()}
        />
      </MockedProvider>
    )
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("has correct structure", async () => {
    stateSpy.mockReturnValue(hookValuesDefault)

    const component = mount(
      <MockedProvider>
        <CreateSubDimensionModal
          parentDimension={codingDimensionsMock[0]}
          codingModelId="sfsfsdf"
          onConfirm={jest.fn()}
          onDismiss={jest.fn()}
          scenarioId={scenarioId}
        />
      </MockedProvider>
    )

    expect(component.find(Modal)).toHaveLength(1)
    expect(component.find(TextInput)).toHaveLength(1)
    expect(component.find(Text)).toHaveLength(2)
    expect(component.find(Columns)).toHaveLength(1)
    expect(component.find(Column)).toHaveLength(2)
    expect(component.find(ReadonlyActionField)).toHaveLength(1)
  })

  it("does not submit with field errors", async () => {
    const handleSubmit = jest.fn()
    const createSubDimension = jest.fn()

    stateSpy.mockReturnValue({
      ...hookValuesDefault,
      createSubDimension,
      formMethods: {
        ...mockedFormMethods,
        errors: {title: undefined, description: {type: "error", message: "Error at Field"}},
        handleSubmit
      } as any
    })

    const component = mount(
      <MockedProvider>
        <CreateSubDimensionModal
          parentDimension={codingDimensionsMock[0]}
          codingModelId="sfsfsdf"
          onConfirm={jest.fn()}
          onDismiss={jest.fn()}
          scenarioId={scenarioId}
        />
      </MockedProvider>
    )

    component.find(".confirm-button").last().simulate("click")
    expect(handleSubmit).toHaveBeenCalledTimes(1)
    expect(createSubDimension).toHaveBeenCalledTimes(0)
  })
})
