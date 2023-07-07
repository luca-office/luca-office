import {shallow} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {CustomSelect, Heading, Label, Text} from "shared/components"
import {automatedToolUsageCodingCriterionMock} from "shared/graphql/__mocks__"
import {UpdateToolUsageContent} from "../update-tool-usage-content"

describe("update-tool-usage-content", () => {
  it("renders correctly", async () => {
    const component = create(
      <UpdateToolUsageContent
        onChangeTool={jest.fn()}
        alreadyUsedTools={[]}
        criterion={automatedToolUsageCodingCriterionMock}
      />
    )
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("has correct structure", async () => {
    const component = shallow(
      <UpdateToolUsageContent
        onChangeTool={jest.fn()}
        alreadyUsedTools={[]}
        criterion={automatedToolUsageCodingCriterionMock}
      />
    )

    expect(component.find(Label)).toHaveLength(1)
    expect(component.find(Heading)).toHaveLength(1)
    expect(component.find(Text)).toHaveLength(1)
    expect(component.find(CustomSelect)).toHaveLength(1)
  })
})
