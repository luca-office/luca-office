// importing from direct file because of issues of babel loader and spyOn
import {act} from "@testing-library/react"
import {shallow} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {Button, Card, CardFooter, CardHeader, Content, Heading, Text} from "shared/components"
import wait from "waait"
import {ModuleSelectionPlaceholder} from "../.."

const getComponent = () => (
  <ModuleSelectionPlaceholder
    entityKey="navigation__sample_companies"
    onCreateClick={jest.fn()}
    subheaderConfig={{
      labelKey: "navigation__sample_companies",
      navigationButton: {onClick: jest.fn(), labelKey: "placeholder"}
    }}
  />
)

describe("module-selection-placeholder", () => {
  it("renders correctly", async () => {
    const component = create(getComponent())
    await act(() => wait(0))
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  it("has correct structure", async () => {
    const component = shallow(getComponent())

    expect(component.find(Content)).toHaveLength(1)
    expect(component.find(Card)).toHaveLength(1)
    expect(component.find(CardHeader)).toHaveLength(1)
    expect(component.find(Heading)).toHaveLength(1)
    expect(component.find(Text)).toHaveLength(1)
    expect(component.find(Button)).toHaveLength(1)
    expect(component.find(CardFooter)).toHaveLength(1)
  })
})
