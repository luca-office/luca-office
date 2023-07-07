import {MockedProvider} from "@apollo/client/testing"
import {mount} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {Column, Columns, Modal, ReadonlyActionField, SelectableCard, Text, TextInput} from "shared/components"
import {codingDimensionsMock} from "shared/graphql/__mocks__"
import {CreateItemModal} from "../create-item-modal"

const scenarioId = "cec80fb0-86be-4d59-8549-6038bb25bf66"

describe("create-item-modal", () => {
  it("renders correctly", async () => {
    const component = create(
      <MockedProvider>
        <CreateItemModal
          parentDimension={codingDimensionsMock[0]}
          codingModelId="2b953fcb-0ba3-4540-9e81-080e353f80ce"
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
    const component = mount(
      <MockedProvider>
        <CreateItemModal
          parentDimension={codingDimensionsMock[0]}
          codingModelId="ea34e5ae-1abc-4ab9-a00c-b353fd6c1596"
          onConfirm={jest.fn()}
          onDismiss={jest.fn()}
          scenarioId={scenarioId}
        />
      </MockedProvider>
    )

    expect(component.find(Modal)).toHaveLength(1)
    expect(component.find(TextInput)).toHaveLength(1)
    expect(component.find(Text)).toHaveLength(11)
    expect(component.find(Columns)).toHaveLength(5)
    expect(component.find(Column)).toHaveLength(11)
    expect(component.find(SelectableCard)).toHaveLength(9)
    expect(component.find(ReadonlyActionField)).toHaveLength(1)
  })
})
