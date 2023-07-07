import {shallow} from "enzyme"
import React from "react"
import {create} from "react-test-renderer"
import {erpTableColumns} from "../../../../../stories/__mocks__/table.mock"
import {ErpType} from "../../../../enums"
import {ErpEntity} from "../../../../models"
import {Option} from "../../../../utils"
import {erpComponentMockEntities} from "../../erp-content-view/__mocks__/erp-entities.mock"
import {ErpContentView} from "../../erp-content-view/erp-content-view"
import {ErpNavigation} from "../../erp-navigation/erp-navigation"
import {ErpView, ErpViewProps} from "../erp-view"
import * as useErpView from "../hooks/use-erp-view"
import {UseErpView} from "../hooks/use-erp-view"

const hooksValuesDefault: UseErpView = {
  dispatch: jest.fn(),
  selectErpNavigationNode: jest.fn(),
  selectedErpNavigationNode: Option.none(),
  columns: Option.of(erpTableColumns),
  entities: Option.of(erpComponentMockEntities as Array<ErpEntity>),
  isLoading: false,
  currentErpTypeName: "currentErpTypeName",
  isDataSetOverlayVisible: false,
  setIsDataSetOverlayVisible: jest.fn(),
  selectedEntity: Option.none(),
  setSelectedEntity: jest.fn(),
  getEntity: jest.fn(),
  currentErpType: Option.of<ErpType>(ErpType.Component),
  isImportDialogVisible: false,
  setIsImportDialogVisible: jest.fn(),
  linkRef: {current: null},
  selectedEntityIndex: 0,
  setSelectedEntityIndex: jest.fn(),
  isReadOnly: false
}

const stateSpy = jest.spyOn(useErpView, "useErpView")

const defaultProps: ErpViewProps = {
  sampleCompanyId: "asdf",
  sampleCompanyName: "CompanyName",
  readOnly: false,
  selectedEntityId: Option.none(),
  selectedErpNode: Option.none()
}

const getComponent = (props?: Partial<ErpViewProps>) => <ErpView {...{...defaultProps, ...props}} />

describe("ErpView", () => {
  it("renders correctly with default props", () => {
    stateSpy.mockReturnValue(hooksValuesDefault)
    const component = getComponent()
    const tree = create(component).toJSON()

    expect(tree).toMatchSnapshot()
  })

  it("has correct structure (default props)", () => {
    stateSpy.mockReturnValue(hooksValuesDefault)
    const component = shallow(getComponent())

    expect(component.find(ErpNavigation)).toHaveLength(1)
    expect(component.find(ErpContentView)).toHaveLength(0)
  })
})
