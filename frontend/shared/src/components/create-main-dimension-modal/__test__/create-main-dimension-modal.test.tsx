import {MockedProvider} from "@apollo/client/testing"
import {act} from "@testing-library/react"
import {mount} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import wait from "waait"
import {TextInput} from "../../input"
import {Modal} from "../../modal/modal"
import {Text} from "../../typography/typography"
import {CreateMainDimensionModal} from "../create-main-dimension-modal"

describe("create-main-dimension-modal", () => {
  it("renders correctly", async () => {
    const component = create(
      <MockedProvider>
        <CreateMainDimensionModal
          scenarioId="sflkfjsdf"
          codingModelId="sfsfsdf"
          onConfirm={jest.fn()}
          onDismiss={jest.fn()}
        />
      </MockedProvider>
    )
    await act(() => wait(0))
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("has correct structure", async () => {
    const component = mount(
      <MockedProvider>
        <CreateMainDimensionModal
          scenarioId="sflkfjsdf"
          codingModelId="sfsfsdf"
          onConfirm={jest.fn()}
          onDismiss={jest.fn()}
        />
      </MockedProvider>
    )
    await act(() => wait(0))

    expect(component.find(Modal)).toHaveLength(1)
    expect(component.find(TextInput)).toHaveLength(1)
    expect(component.find(Text)).toHaveLength(1)
  })
})
