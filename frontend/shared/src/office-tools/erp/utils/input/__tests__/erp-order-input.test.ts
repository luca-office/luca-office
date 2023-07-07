import {shallow} from "enzyme"
import {ReactElement} from "react"
import {create} from "react-test-renderer"
import {erpCustomersMockGraphQl, erpEmployeesMockGraphQl} from "../../../../../../tests/__mocks__"
import {mockedFormMethods} from "../../../../../../tests/utils/form-methods-mock"
import {fakeTranslate} from "../../../../../../tests/utils/translate-mock"
import {
  AutoCompleteInput,
  BinaryUploadInput,
  CustomSelect,
  SingleDatePicker,
  TextInput
} from "../../../../../components"
import {UseAutoCompleteHook} from "../../../../../hooks"
import * as useAutoCompleteHook from "../../../../../hooks/use-auto-complete"
import {Option, Subject} from "../../../../../utils"
import {getErpOrderInput} from "../erp-order-input"

const customerAutoCompleteList = erpCustomersMockGraphQl.map(mock => `${mock.id}`)
const employeeAutoCompleteList = erpEmployeesMockGraphQl.map(mock => `${mock.id}`)

const sectionScrollSubject = new Subject<void>()

const autocompleteValuesDefault: UseAutoCompleteHook = {
  setSearchQuery: jest.fn(),
  results: []
}

const autocompleteSpy = jest.spyOn(useAutoCompleteHook, "useAutoComplete")

describe("erp-order-input", () => {
  describe("id", () => {
    it("renders correctly if enabled", () => {
      autocompleteSpy.mockReturnValue(autocompleteValuesDefault)
      const component = create(
        getErpOrderInput({
          t: fakeTranslate,
          key: "id",
          formMethods: mockedFormMethods,
          disabled: false,
          binaryFile: Option.none(),
          sectionScrollSubject,
          isFloat: false
        }) as ReactElement
      )
      const tree = component.toJSON()
      expect(tree).toMatchSnapshot()
    })
    it("has correct structure (enabled)", () => {
      autocompleteSpy.mockReturnValue(autocompleteValuesDefault)
      const component = shallow(
        getErpOrderInput({
          t: fakeTranslate,
          key: "id",
          formMethods: mockedFormMethods,
          disabled: false,
          binaryFile: Option.none(),
          sectionScrollSubject,
          isFloat: false
        }) as ReactElement
      )
      expect(component.find(TextInput)).toHaveLength(1)
    })
    it("renders correctly if disabled", () => {
      autocompleteSpy.mockReturnValue(autocompleteValuesDefault)
      const component = create(
        getErpOrderInput({
          t: fakeTranslate,
          key: "id",
          formMethods: mockedFormMethods,
          disabled: true,
          binaryFile: Option.none(),
          sectionScrollSubject,
          isFloat: false
        }) as ReactElement
      )
      const tree = component.toJSON()
      expect(tree).toMatchSnapshot()
    })
    it("has correct structure (disabled)", () => {
      autocompleteSpy.mockReturnValue(autocompleteValuesDefault)
      const component = shallow(
        getErpOrderInput({
          t: fakeTranslate,
          key: "id",
          formMethods: mockedFormMethods,
          disabled: true,
          binaryFile: Option.none(),
          sectionScrollSubject,
          isFloat: false
        }) as ReactElement
      )
      expect(component.find(TextInput)).toHaveLength(1)
    })
  })
  describe("cashbackInCents", () => {
    it("renders correctly if enabled", () => {
      autocompleteSpy.mockReturnValue(autocompleteValuesDefault)
      const component = create(
        getErpOrderInput({
          t: fakeTranslate,
          key: "cashbackInCents",
          formMethods: mockedFormMethods,
          disabled: false,
          binaryFile: Option.none(),
          sectionScrollSubject,
          isFloat: false
        }) as ReactElement
      )
      const tree = component.toJSON()
      expect(tree).toMatchSnapshot()
    })
    it("has correct structure (enabled)", () => {
      autocompleteSpy.mockReturnValue(autocompleteValuesDefault)
      const component = shallow(
        getErpOrderInput({
          t: fakeTranslate,
          key: "cashbackInCents",
          formMethods: mockedFormMethods,
          disabled: false,
          binaryFile: Option.none(),
          sectionScrollSubject,
          isFloat: false
        }) as ReactElement
      )
      expect(component.find(TextInput)).toHaveLength(1)
    })
    it("renders correctly if disabled", () => {
      autocompleteSpy.mockReturnValue(autocompleteValuesDefault)
      const component = create(
        getErpOrderInput({
          t: fakeTranslate,
          key: "cashbackInCents",
          formMethods: mockedFormMethods,
          disabled: true,
          binaryFile: Option.none(),
          sectionScrollSubject,
          isFloat: false
        }) as ReactElement
      )
      const tree = component.toJSON()
      expect(tree).toMatchSnapshot()
    })
    it("has correct structure (disabled)", () => {
      autocompleteSpy.mockReturnValue(autocompleteValuesDefault)
      const component = shallow(
        getErpOrderInput({
          t: fakeTranslate,
          key: "cashbackInCents",
          formMethods: mockedFormMethods,
          disabled: true,
          binaryFile: Option.none(),
          sectionScrollSubject,
          isFloat: false
        }) as ReactElement
      )
      expect(component.find(TextInput)).toHaveLength(1)
    })
  })
  describe("discountInCents", () => {
    it("renders correctly if enabled", () => {
      autocompleteSpy.mockReturnValue(autocompleteValuesDefault)
      const component = create(
        getErpOrderInput({
          t: fakeTranslate,
          key: "discountInCents",
          formMethods: mockedFormMethods,
          disabled: false,
          binaryFile: Option.none(),
          sectionScrollSubject,
          isFloat: false
        }) as ReactElement
      )
      const tree = component.toJSON()
      expect(tree).toMatchSnapshot()
    })
    it("has correct structure (enabled)", () => {
      autocompleteSpy.mockReturnValue(autocompleteValuesDefault)
      const component = shallow(
        getErpOrderInput({
          t: fakeTranslate,
          key: "discountInCents",
          formMethods: mockedFormMethods,
          disabled: false,
          binaryFile: Option.none(),
          sectionScrollSubject,
          isFloat: false
        }) as ReactElement
      )
      expect(component.find(TextInput)).toHaveLength(1)
    })
    it("renders correctly if disabled", () => {
      autocompleteSpy.mockReturnValue(autocompleteValuesDefault)
      const component = create(
        getErpOrderInput({
          t: fakeTranslate,
          key: "discountInCents",
          formMethods: mockedFormMethods,
          disabled: true,
          binaryFile: Option.none(),
          sectionScrollSubject,
          isFloat: false
        }) as ReactElement
      )
      const tree = component.toJSON()
      expect(tree).toMatchSnapshot()
    })
    it("has correct structure (disabled)", () => {
      autocompleteSpy.mockReturnValue(autocompleteValuesDefault)
      const component = shallow(
        getErpOrderInput({
          t: fakeTranslate,
          key: "discountInCents",
          formMethods: mockedFormMethods,
          disabled: true,
          binaryFile: Option.none(),
          sectionScrollSubject,
          isFloat: false
        }) as ReactElement
      )
      expect(component.find(TextInput)).toHaveLength(1)
    })
  })
  describe("deliveryChargeInCents", () => {
    it("renders correctly if enabled", () => {
      autocompleteSpy.mockReturnValue(autocompleteValuesDefault)
      const component = create(
        getErpOrderInput({
          t: fakeTranslate,
          key: "deliveryChargeInCents",
          formMethods: mockedFormMethods,
          disabled: false,
          binaryFile: Option.none(),
          sectionScrollSubject,
          isFloat: false
        }) as ReactElement
      )
      const tree = component.toJSON()
      expect(tree).toMatchSnapshot()
    })
    it("has correct structure (enabled)", () => {
      autocompleteSpy.mockReturnValue(autocompleteValuesDefault)
      const component = shallow(
        getErpOrderInput({
          t: fakeTranslate,
          key: "deliveryChargeInCents",
          formMethods: mockedFormMethods,
          disabled: false,
          binaryFile: Option.none(),
          sectionScrollSubject,
          isFloat: false
        }) as ReactElement
      )
      expect(component.find(TextInput)).toHaveLength(1)
    })
    it("renders correctly if disabled", () => {
      autocompleteSpy.mockReturnValue(autocompleteValuesDefault)
      const component = create(
        getErpOrderInput({
          t: fakeTranslate,
          key: "deliveryChargeInCents",
          formMethods: mockedFormMethods,
          disabled: true,
          binaryFile: Option.none(),
          sectionScrollSubject,
          isFloat: false
        }) as ReactElement
      )
      const tree = component.toJSON()
      expect(tree).toMatchSnapshot()
    })
    it("has correct structure (disabled)", () => {
      autocompleteSpy.mockReturnValue(autocompleteValuesDefault)
      const component = shallow(
        getErpOrderInput({
          t: fakeTranslate,
          key: "deliveryChargeInCents",
          formMethods: mockedFormMethods,
          disabled: true,
          binaryFile: Option.none(),
          sectionScrollSubject,
          isFloat: false
        }) as ReactElement
      )
      expect(component.find(TextInput)).toHaveLength(1)
    })
  })
  describe("deliveryStatus", () => {
    it("renders correctly if enabled", () => {
      autocompleteSpy.mockReturnValue(autocompleteValuesDefault)
      const component = create(
        getErpOrderInput({
          t: fakeTranslate,
          key: "deliveryStatus",
          formMethods: mockedFormMethods,
          disabled: false,
          binaryFile: Option.none(),
          sectionScrollSubject,
          isFloat: false
        }) as ReactElement
      )
      const tree = component.toJSON()
      expect(tree).toMatchSnapshot()
    })
    it("has correct structure (enabled)", () => {
      autocompleteSpy.mockReturnValue(autocompleteValuesDefault)
      const component = shallow(
        getErpOrderInput({
          t: fakeTranslate,
          key: "deliveryStatus",
          formMethods: mockedFormMethods,
          disabled: false,
          binaryFile: Option.none(),
          sectionScrollSubject,
          isFloat: false
        }) as ReactElement
      )
      expect(component.find(CustomSelect)).toHaveLength(1)
    })
    it("renders correctly if disabled", () => {
      autocompleteSpy.mockReturnValue(autocompleteValuesDefault)
      const component = create(
        getErpOrderInput({
          t: fakeTranslate,
          key: "deliveryStatus",
          formMethods: mockedFormMethods,
          disabled: true,
          binaryFile: Option.none(),
          sectionScrollSubject,
          isFloat: false
        }) as ReactElement
      )
      const tree = component.toJSON()
      expect(tree).toMatchSnapshot()
    })
    it("has correct structure (disabled)", () => {
      autocompleteSpy.mockReturnValue(autocompleteValuesDefault)
      const component = shallow(
        getErpOrderInput({
          t: fakeTranslate,
          key: "deliveryStatus",
          formMethods: mockedFormMethods,
          disabled: true,
          binaryFile: Option.none(),
          sectionScrollSubject,
          isFloat: false
        }) as ReactElement
      )
      expect(component.find(CustomSelect)).toHaveLength(1)
    })
  })
  describe("deliveryDate", () => {
    it("renders correctly if enabled", () => {
      autocompleteSpy.mockReturnValue(autocompleteValuesDefault)
      const component = create(
        getErpOrderInput({
          t: fakeTranslate,
          key: "deliveryDate",
          formMethods: mockedFormMethods,
          disabled: false,
          binaryFile: Option.none(),
          sectionScrollSubject,
          isFloat: false
        }) as ReactElement
      )
      const tree = component.toJSON()
      expect(tree).toMatchSnapshot()
    })
    it("has correct structure (enabled)", () => {
      autocompleteSpy.mockReturnValue(autocompleteValuesDefault)
      const component = shallow(
        getErpOrderInput({
          t: fakeTranslate,
          key: "deliveryDate",
          formMethods: mockedFormMethods,
          disabled: false,
          binaryFile: Option.none(),
          sectionScrollSubject,
          isFloat: false
        }) as ReactElement
      )
      expect(component.find(SingleDatePicker)).toHaveLength(1)
    })
    it("renders correctly if disabled", () => {
      autocompleteSpy.mockReturnValue(autocompleteValuesDefault)
      const component = create(
        getErpOrderInput({
          t: fakeTranslate,
          key: "deliveryDate",
          formMethods: mockedFormMethods,
          disabled: true,
          binaryFile: Option.none(),
          sectionScrollSubject,
          isFloat: false
        }) as ReactElement
      )
      const tree = component.toJSON()
      expect(tree).toMatchSnapshot()
    })
    it("has correct structure (disabled)", () => {
      autocompleteSpy.mockReturnValue(autocompleteValuesDefault)
      const component = shallow(
        getErpOrderInput({
          t: fakeTranslate,
          key: "deliveryDate",
          formMethods: mockedFormMethods,
          disabled: true,
          binaryFile: Option.none(),
          sectionScrollSubject,
          isFloat: false
        }) as ReactElement
      )
      expect(component.find(SingleDatePicker)).toHaveLength(1)
    })
  })
  describe("note", () => {
    it("renders correctly if enabled", () => {
      autocompleteSpy.mockReturnValue(autocompleteValuesDefault)
      const component = create(
        getErpOrderInput({
          t: fakeTranslate,
          key: "note",
          formMethods: mockedFormMethods,
          disabled: false,
          binaryFile: Option.none(),
          sectionScrollSubject,
          isFloat: false
        }) as ReactElement
      )
      const tree = component.toJSON()
      expect(tree).toMatchSnapshot()
    })
    it("has correct structure (enabled)", () => {
      autocompleteSpy.mockReturnValue(autocompleteValuesDefault)
      const component = shallow(
        getErpOrderInput({
          t: fakeTranslate,
          key: "note",
          formMethods: mockedFormMethods,
          disabled: false,
          binaryFile: Option.none(),
          sectionScrollSubject,
          isFloat: false
        }) as ReactElement
      )
      expect(component.find(TextInput)).toHaveLength(1)
    })
    it("renders correctly if disabled", () => {
      autocompleteSpy.mockReturnValue(autocompleteValuesDefault)
      const component = create(
        getErpOrderInput({
          t: fakeTranslate,
          key: "note",
          formMethods: mockedFormMethods,
          disabled: true,
          binaryFile: Option.none(),
          sectionScrollSubject,
          isFloat: false
        }) as ReactElement
      )
      const tree = component.toJSON()
      expect(tree).toMatchSnapshot()
    })
    it("has correct structure (disabled)", () => {
      autocompleteSpy.mockReturnValue(autocompleteValuesDefault)
      const component = shallow(
        getErpOrderInput({
          t: fakeTranslate,
          key: "note",
          formMethods: mockedFormMethods,
          disabled: true,
          binaryFile: Option.none(),
          sectionScrollSubject,
          isFloat: false
        }) as ReactElement
      )
      expect(component.find(TextInput)).toHaveLength(1)
    })
  })
  describe("sampleCompanyId", () => {
    it("renders correctly if enabled", () => {
      autocompleteSpy.mockReturnValue(autocompleteValuesDefault)
      const component = create(
        getErpOrderInput({
          t: fakeTranslate,
          key: "sampleCompanyId",
          formMethods: mockedFormMethods,
          disabled: false,
          binaryFile: Option.none(),
          sectionScrollSubject,
          isFloat: false
        }) as ReactElement
      )
      const tree = component.toJSON()
      expect(tree).toMatchSnapshot()
    })
    it("has correct structure (enabled)", () => {
      autocompleteSpy.mockReturnValue(autocompleteValuesDefault)
      const component = shallow(
        getErpOrderInput({
          t: fakeTranslate,
          key: "sampleCompanyId",
          formMethods: mockedFormMethods,
          disabled: false,
          binaryFile: Option.none(),
          sectionScrollSubject,
          isFloat: false
        }) as ReactElement
      )
      expect(component.find(TextInput)).toHaveLength(1)
    })
    it("renders correctly if disabled", () => {
      autocompleteSpy.mockReturnValue(autocompleteValuesDefault)
      const component = create(
        getErpOrderInput({
          t: fakeTranslate,
          key: "sampleCompanyId",
          formMethods: mockedFormMethods,
          disabled: true,
          binaryFile: Option.none(),
          sectionScrollSubject,
          isFloat: false
        }) as ReactElement
      )
      const tree = component.toJSON()
      expect(tree).toMatchSnapshot()
    })
    it("has correct structure (disabled)", () => {
      autocompleteSpy.mockReturnValue(autocompleteValuesDefault)
      const component = shallow(
        getErpOrderInput({
          t: fakeTranslate,
          key: "sampleCompanyId",
          formMethods: mockedFormMethods,
          disabled: true,
          binaryFile: Option.none(),
          sectionScrollSubject,
          isFloat: false
        }) as ReactElement
      )
      expect(component.find(TextInput)).toHaveLength(1)
    })
  })
  describe("customerId", () => {
    it("renders correctly if enabled", () => {
      autocompleteSpy.mockReturnValue(autocompleteValuesDefault)
      const component = create(
        getErpOrderInput({
          t: fakeTranslate,
          key: "customerId",
          formMethods: mockedFormMethods,
          disabled: false,
          binaryFile: Option.none(),
          sectionScrollSubject,
          isFloat: false,
          autoCompleteList: customerAutoCompleteList
        }) as ReactElement
      )
      const tree = component.toJSON()
      expect(tree).toMatchSnapshot()
    })
    it("has correct structure (enabled)", () => {
      autocompleteSpy.mockReturnValue(autocompleteValuesDefault)
      const component = shallow(
        getErpOrderInput({
          t: fakeTranslate,
          key: "customerId",
          formMethods: mockedFormMethods,
          disabled: false,
          binaryFile: Option.none(),
          sectionScrollSubject,
          isFloat: false,
          autoCompleteList: customerAutoCompleteList
        }) as ReactElement
      )
      expect(component.find(AutoCompleteInput)).toHaveLength(1)
    })
    it("renders correctly if disabled", () => {
      autocompleteSpy.mockReturnValue(autocompleteValuesDefault)
      const component = create(
        getErpOrderInput({
          t: fakeTranslate,
          key: "customerId",
          formMethods: mockedFormMethods,
          disabled: true,
          binaryFile: Option.none(),
          sectionScrollSubject,
          isFloat: false,
          autoCompleteList: customerAutoCompleteList
        }) as ReactElement
      )
      const tree = component.toJSON()
      expect(tree).toMatchSnapshot()
    })
    it("has correct structure (disabled)", () => {
      autocompleteSpy.mockReturnValue(autocompleteValuesDefault)
      const component = shallow(
        getErpOrderInput({
          t: fakeTranslate,
          key: "customerId",
          formMethods: mockedFormMethods,
          disabled: true,
          binaryFile: Option.none(),
          sectionScrollSubject,
          isFloat: false,
          autoCompleteList: customerAutoCompleteList
        }) as ReactElement
      )
      expect(component.find(AutoCompleteInput)).toHaveLength(1)
    })
  })
  describe("employeeId", () => {
    it("renders correctly if enabled", () => {
      autocompleteSpy.mockReturnValue(autocompleteValuesDefault)
      const component = create(
        getErpOrderInput({
          t: fakeTranslate,
          key: "employeeId",
          formMethods: mockedFormMethods,
          disabled: false,
          binaryFile: Option.none(),
          sectionScrollSubject,
          isFloat: false,
          autoCompleteList: employeeAutoCompleteList
        }) as ReactElement
      )
      const tree = component.toJSON()
      expect(tree).toMatchSnapshot()
    })
    it("has correct structure (enabled)", () => {
      autocompleteSpy.mockReturnValue(autocompleteValuesDefault)
      const component = shallow(
        getErpOrderInput({
          t: fakeTranslate,
          key: "employeeId",
          formMethods: mockedFormMethods,
          disabled: false,
          binaryFile: Option.none(),
          sectionScrollSubject,
          isFloat: false,
          autoCompleteList: employeeAutoCompleteList
        }) as ReactElement
      )
      expect(component.find(AutoCompleteInput)).toHaveLength(1)
    })
    it("renders correctly if disabled", () => {
      autocompleteSpy.mockReturnValue(autocompleteValuesDefault)
      const component = create(
        getErpOrderInput({
          t: fakeTranslate,
          key: "employeeId",
          formMethods: mockedFormMethods,
          disabled: true,
          binaryFile: Option.none(),
          sectionScrollSubject,
          isFloat: false,
          autoCompleteList: employeeAutoCompleteList
        }) as ReactElement
      )
      const tree = component.toJSON()
      expect(tree).toMatchSnapshot()
    })
    it("has correct structure (disabled)", () => {
      autocompleteSpy.mockReturnValue(autocompleteValuesDefault)
      const component = shallow(
        getErpOrderInput({
          t: fakeTranslate,
          key: "employeeId",
          formMethods: mockedFormMethods,
          disabled: true,
          binaryFile: Option.none(),
          sectionScrollSubject,
          isFloat: false,
          autoCompleteList: employeeAutoCompleteList
        }) as ReactElement
      )
      expect(component.find(AutoCompleteInput)).toHaveLength(1)
    })
  })
  describe("binaryFileId", () => {
    it("renders correctly if enabled", () => {
      autocompleteSpy.mockReturnValue(autocompleteValuesDefault)
      const component = create(
        getErpOrderInput({
          t: fakeTranslate,
          key: "binaryFileId",
          formMethods: mockedFormMethods,
          disabled: false,
          binaryFile: Option.none(),
          sectionScrollSubject,
          isFloat: false
        }) as ReactElement
      )
      const tree = component.toJSON()
      expect(tree).toMatchSnapshot()
    })
    it("has correct structure (enabled)", () => {
      autocompleteSpy.mockReturnValue(autocompleteValuesDefault)
      const component = shallow(
        getErpOrderInput({
          t: fakeTranslate,
          key: "binaryFileId",
          formMethods: mockedFormMethods,
          disabled: false,
          binaryFile: Option.none(),
          sectionScrollSubject,
          isFloat: false
        }) as ReactElement
      )
      expect(component.find(BinaryUploadInput)).toHaveLength(1)
    })
    it("renders correctly if disabled", () => {
      autocompleteSpy.mockReturnValue(autocompleteValuesDefault)
      const component = create(
        getErpOrderInput({
          t: fakeTranslate,
          key: "binaryFileId",
          formMethods: mockedFormMethods,
          disabled: true,
          binaryFile: Option.none(),
          sectionScrollSubject,
          isFloat: false
        }) as ReactElement
      )
      const tree = component.toJSON()
      expect(tree).toMatchSnapshot()
    })
    it("has correct structure (disabled)", () => {
      autocompleteSpy.mockReturnValue(autocompleteValuesDefault)
      const component = shallow(
        getErpOrderInput({
          t: fakeTranslate,
          key: "binaryFileId",
          formMethods: mockedFormMethods,
          disabled: true,
          binaryFile: Option.none(),
          sectionScrollSubject,
          isFloat: false
        }) as ReactElement
      )
      expect(component.find(BinaryUploadInput)).toHaveLength(1)
    })
  })
})
