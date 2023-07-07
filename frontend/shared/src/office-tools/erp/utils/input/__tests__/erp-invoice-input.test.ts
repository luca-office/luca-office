import {shallow} from "enzyme"
import {ReactElement} from "react"
import {create} from "react-test-renderer"
import {erpOrdersMockGraphQl} from "../../../../../../tests/__mocks__"
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
import {getErpInvoiceInput} from "../erp-invoice-input"

const autocompleteValuesDefault: UseAutoCompleteHook = {
  setSearchQuery: jest.fn(),
  results: []
}

const autocompleteSpy = jest.spyOn(useAutoCompleteHook, "useAutoComplete")

const autoCompleteList = erpOrdersMockGraphQl.map(mock => `${mock.id}`)

const sectionScrollSubject = new Subject<void>()

describe("erp-invoice-input", () => {
  describe("id", () => {
    it("renders correctly if enabled", () => {
      autocompleteSpy.mockReturnValue(autocompleteValuesDefault)
      const component = create(
        getErpInvoiceInput({
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
        getErpInvoiceInput({
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
        getErpInvoiceInput({
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
        getErpInvoiceInput({
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
  describe("invoiceDate", () => {
    it("renders correctly if enabled", () => {
      autocompleteSpy.mockReturnValue(autocompleteValuesDefault)
      const component = create(
        getErpInvoiceInput({
          t: fakeTranslate,
          key: "invoiceDate",
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
        getErpInvoiceInput({
          t: fakeTranslate,
          key: "invoiceDate",
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
        getErpInvoiceInput({
          t: fakeTranslate,
          key: "invoiceDate",
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
        getErpInvoiceInput({
          t: fakeTranslate,
          key: "invoiceDate",
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
  describe("dueDate", () => {
    it("renders correctly if enabled", () => {
      autocompleteSpy.mockReturnValue(autocompleteValuesDefault)
      const component = create(
        getErpInvoiceInput({
          t: fakeTranslate,
          key: "dueDate",
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
        getErpInvoiceInput({
          t: fakeTranslate,
          key: "dueDate",
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
        getErpInvoiceInput({
          t: fakeTranslate,
          key: "dueDate",
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
        getErpInvoiceInput({
          t: fakeTranslate,
          key: "dueDate",
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
  describe("paymentTerms", () => {
    it("renders correctly if enabled", () => {
      autocompleteSpy.mockReturnValue(autocompleteValuesDefault)
      const component = create(
        getErpInvoiceInput({
          t: fakeTranslate,
          key: "paymentTerms",
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
        getErpInvoiceInput({
          t: fakeTranslate,
          key: "paymentTerms",
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
        getErpInvoiceInput({
          t: fakeTranslate,
          key: "paymentTerms",
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
        getErpInvoiceInput({
          t: fakeTranslate,
          key: "paymentTerms",
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
  describe("amountPaidInCents", () => {
    it("renders correctly if enabled", () => {
      autocompleteSpy.mockReturnValue(autocompleteValuesDefault)
      const component = create(
        getErpInvoiceInput({
          t: fakeTranslate,
          key: "amountPaidInCents",
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
        getErpInvoiceInput({
          t: fakeTranslate,
          key: "amountPaidInCents",
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
        getErpInvoiceInput({
          t: fakeTranslate,
          key: "amountPaidInCents",
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
        getErpInvoiceInput({
          t: fakeTranslate,
          key: "amountPaidInCents",
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
  describe("paymentStatus", () => {
    it("renders correctly if enabled", () => {
      autocompleteSpy.mockReturnValue(autocompleteValuesDefault)
      const component = create(
        getErpInvoiceInput({
          t: fakeTranslate,
          key: "paymentStatus",
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
        getErpInvoiceInput({
          t: fakeTranslate,
          key: "paymentStatus",
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
        getErpInvoiceInput({
          t: fakeTranslate,
          key: "paymentStatus",
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
        getErpInvoiceInput({
          t: fakeTranslate,
          key: "paymentStatus",
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
  describe("reminderFeeInCents", () => {
    it("renders correctly if enabled", () => {
      autocompleteSpy.mockReturnValue(autocompleteValuesDefault)
      const component = create(
        getErpInvoiceInput({
          t: fakeTranslate,
          key: "reminderFeeInCents",
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
        getErpInvoiceInput({
          t: fakeTranslate,
          key: "reminderFeeInCents",
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
        getErpInvoiceInput({
          t: fakeTranslate,
          key: "reminderFeeInCents",
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
        getErpInvoiceInput({
          t: fakeTranslate,
          key: "reminderFeeInCents",
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
  describe("defaultChargesInCents", () => {
    it("renders correctly if enabled", () => {
      autocompleteSpy.mockReturnValue(autocompleteValuesDefault)
      const component = create(
        getErpInvoiceInput({
          t: fakeTranslate,
          key: "defaultChargesInCents",
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
        getErpInvoiceInput({
          t: fakeTranslate,
          key: "defaultChargesInCents",
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
        getErpInvoiceInput({
          t: fakeTranslate,
          key: "defaultChargesInCents",
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
        getErpInvoiceInput({
          t: fakeTranslate,
          key: "defaultChargesInCents",
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
  describe("note", () => {
    it("renders correctly if enabled", () => {
      autocompleteSpy.mockReturnValue(autocompleteValuesDefault)
      const component = create(
        getErpInvoiceInput({
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
        getErpInvoiceInput({
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
        getErpInvoiceInput({
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
        getErpInvoiceInput({
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
        getErpInvoiceInput({
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
        getErpInvoiceInput({
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
        getErpInvoiceInput({
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
        getErpInvoiceInput({
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
  describe("orderId", () => {
    it("renders correctly if enabled", () => {
      autocompleteSpy.mockReturnValue(autocompleteValuesDefault)
      const component = create(
        getErpInvoiceInput({
          t: fakeTranslate,
          key: "orderId",
          formMethods: mockedFormMethods,
          disabled: false,
          binaryFile: Option.none(),
          sectionScrollSubject,
          isFloat: false,
          autoCompleteList
        }) as ReactElement
      )
      const tree = component.toJSON()
      expect(tree).toMatchSnapshot()
    })
    it("has correct structure (enabled)", () => {
      autocompleteSpy.mockReturnValue(autocompleteValuesDefault)
      const component = shallow(
        getErpInvoiceInput({
          t: fakeTranslate,
          key: "orderId",
          formMethods: mockedFormMethods,
          disabled: false,
          binaryFile: Option.none(),
          sectionScrollSubject,
          isFloat: false,
          autoCompleteList
        }) as ReactElement
      )
      expect(component.find(AutoCompleteInput)).toHaveLength(1)
    })
    it("renders correctly if disabled", () => {
      autocompleteSpy.mockReturnValue(autocompleteValuesDefault)
      const component = create(
        getErpInvoiceInput({
          t: fakeTranslate,
          key: "orderId",
          formMethods: mockedFormMethods,
          disabled: true,
          binaryFile: Option.none(),
          sectionScrollSubject,
          isFloat: false,
          autoCompleteList
        }) as ReactElement
      )
      const tree = component.toJSON()
      expect(tree).toMatchSnapshot()
    })
    it("has correct structure (disabled)", () => {
      autocompleteSpy.mockReturnValue(autocompleteValuesDefault)
      const component = shallow(
        getErpInvoiceInput({
          t: fakeTranslate,
          key: "orderId",
          formMethods: mockedFormMethods,
          disabled: true,
          binaryFile: Option.none(),
          sectionScrollSubject,
          isFloat: false,
          autoCompleteList
        }) as ReactElement
      )
      expect(component.find(AutoCompleteInput)).toHaveLength(1)
    })
  })
  describe("totalNetInCents", () => {
    it("renders correctly if enabled", () => {
      autocompleteSpy.mockReturnValue(autocompleteValuesDefault)
      const component = create(
        getErpInvoiceInput({
          t: fakeTranslate,
          key: "totalNetInCents",
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
        getErpInvoiceInput({
          t: fakeTranslate,
          key: "totalNetInCents",
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
        getErpInvoiceInput({
          t: fakeTranslate,
          key: "totalNetInCents",
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
        getErpInvoiceInput({
          t: fakeTranslate,
          key: "totalNetInCents",
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
  describe("totalGrossInCents", () => {
    it("renders correctly if enabled", () => {
      autocompleteSpy.mockReturnValue(autocompleteValuesDefault)
      const component = create(
        getErpInvoiceInput({
          t: fakeTranslate,
          key: "totalGrossInCents",
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
        getErpInvoiceInput({
          t: fakeTranslate,
          key: "totalGrossInCents",
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
        getErpInvoiceInput({
          t: fakeTranslate,
          key: "totalGrossInCents",
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
        getErpInvoiceInput({
          t: fakeTranslate,
          key: "totalGrossInCents",
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
  describe("taxAmountInCents", () => {
    it("renders correctly if enabled", () => {
      autocompleteSpy.mockReturnValue(autocompleteValuesDefault)
      const component = create(
        getErpInvoiceInput({
          t: fakeTranslate,
          key: "taxAmountInCents",
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
        getErpInvoiceInput({
          t: fakeTranslate,
          key: "taxAmountInCents",
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
        getErpInvoiceInput({
          t: fakeTranslate,
          key: "taxAmountInCents",
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
        getErpInvoiceInput({
          t: fakeTranslate,
          key: "taxAmountInCents",
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
  describe("binaryFileId", () => {
    it("renders correctly if enabled", () => {
      autocompleteSpy.mockReturnValue(autocompleteValuesDefault)
      const component = create(
        getErpInvoiceInput({
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
        getErpInvoiceInput({
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
        getErpInvoiceInput({
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
        getErpInvoiceInput({
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
