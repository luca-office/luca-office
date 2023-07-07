import {render, screen} from "@testing-library/react"
import {shallow} from "enzyme"
import {create} from "react-test-renderer"
import {ErpEntity} from "../../../../models"
import {Option} from "../../../../utils"
import {ErpTable} from "../../erp-table"
import {ErpContentView, ErpContentViewProps} from "../erp-content-view"
import {erpColumnsMock} from "../__mocks__/erp-columns.mock"
import {erpComponentMockEntities} from "../__mocks__/erp-entities.mock"

const defaultProps: ErpContentViewProps = {
  entities: Option.of(erpComponentMockEntities as Array<ErpEntity>),
  isLoadingEntities: false,
  columns: Option.of(erpColumnsMock),
  label: "erp-content-view-label",
  onEntityDoubleClicked: jest.fn(),
  onAddEntityClicked: jest.fn(),
  selectedEntityId: Option.none()
}

const getComponent = (props?: Partial<ErpContentViewProps>) => <ErpContentView {...{...defaultProps, ...props}} />

describe("erp-content-view", () => {
  it("renders correctly", () => {
    const component = getComponent()
    const tree = create(component).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it("has a label", () => {
    const mockLabel = "erp-label"
    const component = getComponent({label: mockLabel})
    render(component)
    expect(screen.getAllByText(mockLabel)).toHaveLength(1)
  })

  it("has a table", () => {
    const component = getComponent()
    const tree = shallow(component)

    const erpTable = tree.find(ErpTable)
    expect(erpTable).toHaveLength(1)
  })
})
