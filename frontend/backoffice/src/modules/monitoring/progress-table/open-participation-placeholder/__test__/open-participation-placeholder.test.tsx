import {shallow} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {Heading, ReadonlyActionField, Text} from "shared/components"
import {OpenParticipationPlaceholder} from "../open-participation-placeholder"

const linkMock = "http://link.de"

describe("open-participation-placeholder", () => {
  it("renders correctly", () => {
    const component = create(<OpenParticipationPlaceholder copy={jest.fn()} openParticipationPlayerUrl={linkMock} />)

    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("has correct structure with url", () => {
    const component = shallow(<OpenParticipationPlaceholder copy={jest.fn()} openParticipationPlayerUrl={linkMock} />)
    expect(component.find(ReadonlyActionField)).toHaveLength(1)
    expect(component.find(Heading)).toHaveLength(1)
    expect(component.find(Text)).toHaveLength(1)
  })
})
