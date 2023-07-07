import {shallow} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {interventionsMock} from "shared/__mocks__"
import {Label, TableContainer} from "shared/components"
import {InterventionsTable, InterventionsTableProps} from "../interventions-table"

// only renders table container -> only basic test

const defaultProps: InterventionsTableProps = {
  onDeleteEntityClick: jest.fn(),
  entities: interventionsMock,
  isReadOnly: false,
  onEntityClick: jest.fn()
}

const getComponent = (props?: Partial<InterventionsTableProps>) => (
  <InterventionsTable {...{...defaultProps, ...props}} />
)

describe("interventions-table", () => {
  it("renders correctly", () => {
    const component = getComponent()
    const tree = create(component).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it("has correct structure", () => {
    const component = getComponent()
    const tree = shallow(component)

    expect(tree.find(Label)).toHaveLength(1)
    expect(tree.find(TableContainer)).toHaveLength(1)
  })
})
