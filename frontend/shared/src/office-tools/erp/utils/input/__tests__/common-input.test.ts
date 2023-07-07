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
import {binaryFileMock} from "../../../../../components/binary-upload-input/__mocks__/binary-file.mock"
import {InputType} from "../../../../../enums"
import {PaymentStatus} from "../../../../../graphql/generated/globalTypes"
import {UseAutoCompleteHook} from "../../../../../hooks"
import * as useAutoCompleteHook from "../../../../../hooks/use-auto-complete"
import {ErpEmployee, ErpInvoice, ErpSupplier} from "../../../../../models"
import {Subject} from "../../../../../utils"
import {getPaymentStatusLabel} from "../../common"
import {
  getBinaryFileIdInput,
  getCentInput,
  getDatePicker,
  getEmailInput,
  getSalutationSelect,
  getSelect,
  getTextInput
} from "../common-input"

const autocompleteValuesDefault: UseAutoCompleteHook = {
  setSearchQuery: jest.fn(),
  results: []
}

const autocompleteSpy = jest.spyOn(useAutoCompleteHook, "useAutoComplete")

const autoCompleteList = erpOrdersMockGraphQl.map(mock => `${mock.id}`)

const sectionScrollSubject = new Subject<void>()

describe("common-input", () => {
  describe("getDatePicker", () => {
    it("renders correctly if enabled", () => {
      autocompleteSpy.mockReturnValue(autocompleteValuesDefault)
      const component = create(
        getDatePicker<ErpInvoice>({
          key: "invoiceDate",
          formMethods: mockedFormMethods,
          sectionScrollSubject
        }) as ReactElement
      )
      const tree = component.toJSON()
      expect(tree).toMatchSnapshot()
    })
    it("has correct structure (enabled)", () => {
      autocompleteSpy.mockReturnValue(autocompleteValuesDefault)
      const component = shallow(
        getDatePicker<ErpInvoice>({
          key: "invoiceDate",
          formMethods: mockedFormMethods,
          sectionScrollSubject
        }) as ReactElement
      )
      expect(component.find(SingleDatePicker)).toHaveLength(1)
    })
    it("renders correctly if disabled", () => {
      autocompleteSpy.mockReturnValue(autocompleteValuesDefault)
      const component = create(
        getDatePicker<ErpInvoice>({
          key: "invoiceDate",
          formMethods: mockedFormMethods,
          disabled: true,
          sectionScrollSubject
        }) as ReactElement
      )
      const tree = component.toJSON()
      expect(tree).toMatchSnapshot()
    })
    it("has correct structure (disabled)", () => {
      autocompleteSpy.mockReturnValue(autocompleteValuesDefault)
      const component = shallow(
        getDatePicker<ErpInvoice>({
          key: "invoiceDate",
          formMethods: mockedFormMethods,
          disabled: true,
          sectionScrollSubject
        }) as ReactElement
      )
      expect(component.find(SingleDatePicker)).toHaveLength(1)
    })
  })
  describe("getSelect", () => {
    it("renders correctly if enabled", () => {
      autocompleteSpy.mockReturnValue(autocompleteValuesDefault)
      const component = create(
        getSelect<ErpInvoice>({
          key: "paymentStatus",
          formMethods: mockedFormMethods,
          options: [
            {
              value: PaymentStatus.Paid,
              label: getPaymentStatusLabel(fakeTranslate, PaymentStatus.Paid)
            },
            {
              value: PaymentStatus.Unpaid,
              label: getPaymentStatusLabel(fakeTranslate, PaymentStatus.Paid)
            }
          ]
        }) as ReactElement
      )
      const tree = component.toJSON()
      expect(tree).toMatchSnapshot()
    })
    it("has correct structure (enabled)", () => {
      autocompleteSpy.mockReturnValue(autocompleteValuesDefault)
      const component = shallow(
        getSelect<ErpInvoice>({
          key: "paymentStatus",
          formMethods: mockedFormMethods,
          options: [
            {
              value: PaymentStatus.Paid,
              label: getPaymentStatusLabel(fakeTranslate, PaymentStatus.Paid)
            },
            {
              value: PaymentStatus.Unpaid,
              label: getPaymentStatusLabel(fakeTranslate, PaymentStatus.Paid)
            }
          ]
        }) as ReactElement
      )
      expect(component.find(CustomSelect)).toHaveLength(1)
    })
    it("renders correctly if disabled", () => {
      autocompleteSpy.mockReturnValue(autocompleteValuesDefault)
      const component = create(
        getSelect<ErpInvoice>({
          key: "paymentStatus",
          formMethods: mockedFormMethods,
          options: [
            {
              value: PaymentStatus.Paid,
              label: getPaymentStatusLabel(fakeTranslate, PaymentStatus.Paid)
            },
            {
              value: PaymentStatus.Unpaid,
              label: getPaymentStatusLabel(fakeTranslate, PaymentStatus.Paid)
            }
          ],
          disabled: true
        }) as ReactElement
      )
      const tree = component.toJSON()
      expect(tree).toMatchSnapshot()
    })
    it("has correct structure (disabled)", () => {
      autocompleteSpy.mockReturnValue(autocompleteValuesDefault)
      const component = shallow(
        getSelect<ErpInvoice>({
          key: "paymentStatus",
          formMethods: mockedFormMethods,
          options: [
            {
              value: PaymentStatus.Paid,
              label: getPaymentStatusLabel(fakeTranslate, PaymentStatus.Paid)
            },
            {
              value: PaymentStatus.Unpaid,
              label: getPaymentStatusLabel(fakeTranslate, PaymentStatus.Paid)
            }
          ],
          disabled: true
        }) as ReactElement
      )
      expect(component.find(CustomSelect)).toHaveLength(1)
    })
  })
  describe("getSalutationSelect", () => {
    it("renders correctly if enabled", () => {
      autocompleteSpy.mockReturnValue(autocompleteValuesDefault)
      const component = create(
        getSalutationSelect<ErpEmployee>({t: fakeTranslate, formMethods: mockedFormMethods}) as ReactElement
      )
      const tree = component.toJSON()
      expect(tree).toMatchSnapshot()
    })
    it("has correct structure (enabled)", () => {
      autocompleteSpy.mockReturnValue(autocompleteValuesDefault)
      const component = shallow(
        getSalutationSelect<ErpEmployee>({t: fakeTranslate, formMethods: mockedFormMethods}) as ReactElement
      )
      expect(component.find(CustomSelect)).toHaveLength(1)
    })
    it("renders correctly if disabled", () => {
      autocompleteSpy.mockReturnValue(autocompleteValuesDefault)
      const component = create(
        getSalutationSelect<ErpEmployee>({
          t: fakeTranslate,
          formMethods: mockedFormMethods,
          disabled: true
        }) as ReactElement
      )
      const tree = component.toJSON()
      expect(tree).toMatchSnapshot()
    })
    it("has correct structure (disabled)", () => {
      autocompleteSpy.mockReturnValue(autocompleteValuesDefault)
      const component = shallow(
        getSalutationSelect<ErpEmployee>({
          t: fakeTranslate,
          formMethods: mockedFormMethods,
          disabled: true
        }) as ReactElement
      )
      expect(component.find(CustomSelect)).toHaveLength(1)
    })
  })
  describe("getTextInput (no autocomplete)", () => {
    it("renders correctly if enabled", () => {
      autocompleteSpy.mockReturnValue(autocompleteValuesDefault)
      const component = create(
        getTextInput<ErpInvoice>({
          t: fakeTranslate,
          key: "paymentTerms",
          formMethods: mockedFormMethods,
          type: InputType.text
        }) as ReactElement
      )
      const tree = component.toJSON()
      expect(tree).toMatchSnapshot()
    })
    it("has correct structure (enabled)", () => {
      autocompleteSpy.mockReturnValue(autocompleteValuesDefault)
      const component = shallow(
        getTextInput<ErpInvoice>({
          t: fakeTranslate,
          key: "paymentTerms",
          formMethods: mockedFormMethods,
          type: InputType.text
        }) as ReactElement
      )
      expect(component.find(TextInput)).toHaveLength(1)
    })
    it("renders correctly if disabled", () => {
      autocompleteSpy.mockReturnValue(autocompleteValuesDefault)
      const component = create(
        getTextInput<ErpInvoice>({
          t: fakeTranslate,
          key: "paymentTerms",
          formMethods: mockedFormMethods,
          type: InputType.text,
          disabled: true
        }) as ReactElement
      )
      const tree = component.toJSON()
      expect(tree).toMatchSnapshot()
    })
    it("has correct structure (disabled)", () => {
      autocompleteSpy.mockReturnValue(autocompleteValuesDefault)
      const component = shallow(
        getTextInput<ErpInvoice>({
          t: fakeTranslate,
          key: "paymentTerms",
          formMethods: mockedFormMethods,
          type: InputType.text,
          disabled: true
        }) as ReactElement
      )
      expect(component.find(TextInput)).toHaveLength(1)
    })
  })
  describe("getTextInput (autocomplete)", () => {
    it("renders correctly if enabled", () => {
      autocompleteSpy.mockReturnValue(autocompleteValuesDefault)
      const component = create(
        getTextInput<ErpInvoice>({
          t: fakeTranslate,
          key: "orderId",
          formMethods: mockedFormMethods,
          type: InputType.number,
          autoCompleteList
        }) as ReactElement
      )
      const tree = component.toJSON()
      expect(tree).toMatchSnapshot()
    })
    it("has correct structure (enabled)", () => {
      autocompleteSpy.mockReturnValue(autocompleteValuesDefault)
      const component = shallow(
        getTextInput<ErpInvoice>({
          t: fakeTranslate,
          key: "orderId",
          formMethods: mockedFormMethods,
          type: InputType.number,
          autoCompleteList
        }) as ReactElement
      )
      expect(component.find(AutoCompleteInput)).toHaveLength(1)
    })
    it("renders correctly if disabled", () => {
      autocompleteSpy.mockReturnValue(autocompleteValuesDefault)
      const component = create(
        getTextInput<ErpInvoice>({
          t: fakeTranslate,
          key: "orderId",
          formMethods: mockedFormMethods,
          type: InputType.number,
          autoCompleteList,
          disabled: true
        }) as ReactElement
      )
      const tree = component.toJSON()
      expect(tree).toMatchSnapshot()
    })
    it("has correct structure (disabled)", () => {
      autocompleteSpy.mockReturnValue(autocompleteValuesDefault)
      const component = shallow(
        getTextInput<ErpInvoice>({
          t: fakeTranslate,
          key: "orderId",
          formMethods: mockedFormMethods,
          type: InputType.number,
          autoCompleteList,
          disabled: true
        }) as ReactElement
      )
      expect(component.find(AutoCompleteInput)).toHaveLength(1)
    })
  })
  describe("getBinaryFileIdInput", () => {
    it("renders correctly if enabled", () => {
      autocompleteSpy.mockReturnValue(autocompleteValuesDefault)
      const component = create(
        getBinaryFileIdInput<ErpInvoice>({
          binaryFile: binaryFileMock,
          formMethods: mockedFormMethods
        }) as ReactElement
      )
      const tree = component.toJSON()
      expect(tree).toMatchSnapshot()
    })
    it("has correct structure (enabled)", () => {
      autocompleteSpy.mockReturnValue(autocompleteValuesDefault)
      const component = shallow(
        getBinaryFileIdInput<ErpInvoice>({
          binaryFile: binaryFileMock,
          formMethods: mockedFormMethods
        }) as ReactElement
      )
      expect(component.find(BinaryUploadInput)).toHaveLength(1)
    })
    it("renders correctly if disabled", () => {
      autocompleteSpy.mockReturnValue(autocompleteValuesDefault)
      const component = create(
        getBinaryFileIdInput<ErpInvoice>({
          formMethods: mockedFormMethods,
          disabled: true
        }) as ReactElement
      )
      const tree = component.toJSON()
      expect(tree).toMatchSnapshot()
    })
    it("has correct structure (disabled)", () => {
      autocompleteSpy.mockReturnValue(autocompleteValuesDefault)
      const component = shallow(
        getBinaryFileIdInput<ErpInvoice>({
          formMethods: mockedFormMethods,
          disabled: true
        }) as ReactElement
      )
      expect(component.find(BinaryUploadInput)).toHaveLength(1)
    })
  })
  describe("getCentInput", () => {
    it("renders correctly if enabled", () => {
      autocompleteSpy.mockReturnValue(autocompleteValuesDefault)
      const component = create(
        getCentInput<ErpInvoice>({
          t: fakeTranslate,
          key: "amountPaidInCents",
          formMethods: mockedFormMethods
        }) as ReactElement
      )
      const tree = component.toJSON()
      expect(tree).toMatchSnapshot()
    })
    it("has correct structure (enabled)", () => {
      autocompleteSpy.mockReturnValue(autocompleteValuesDefault)
      const component = shallow(
        getCentInput<ErpInvoice>({
          t: fakeTranslate,
          key: "amountPaidInCents",
          formMethods: mockedFormMethods
        }) as ReactElement
      )
      expect(component.find(TextInput)).toHaveLength(1)
    })
    it("renders correctly if disabled", () => {
      autocompleteSpy.mockReturnValue(autocompleteValuesDefault)
      const component = create(
        getCentInput<ErpInvoice>({
          t: fakeTranslate,
          key: "amountPaidInCents",
          formMethods: mockedFormMethods,
          disabled: true
        }) as ReactElement
      )
      const tree = component.toJSON()
      expect(tree).toMatchSnapshot()
    })
    it("has correct structure (disabled)", () => {
      autocompleteSpy.mockReturnValue(autocompleteValuesDefault)
      const component = shallow(
        getCentInput<ErpInvoice>({
          t: fakeTranslate,
          key: "amountPaidInCents",
          formMethods: mockedFormMethods,
          disabled: true
        }) as ReactElement
      )
      expect(component.find(TextInput)).toHaveLength(1)
    })
  })
  describe("getEmailInput", () => {
    it("renders correctly if enabled", () => {
      autocompleteSpy.mockReturnValue(autocompleteValuesDefault)
      const component = create(
        getEmailInput<ErpSupplier>({
          t: fakeTranslate,
          key: "email",
          formMethods: mockedFormMethods
        }) as ReactElement
      )
      const tree = component.toJSON()
      expect(tree).toMatchSnapshot()
    })
    it("has correct structure (enabled)", () => {
      autocompleteSpy.mockReturnValue(autocompleteValuesDefault)
      const component = shallow(
        getEmailInput<ErpSupplier>({
          t: fakeTranslate,
          key: "email",
          formMethods: mockedFormMethods
        }) as ReactElement
      )
      expect(component.find(TextInput)).toHaveLength(1)
    })
    it("renders correctly if disabled", () => {
      autocompleteSpy.mockReturnValue(autocompleteValuesDefault)
      const component = create(
        getEmailInput<ErpSupplier>({
          t: fakeTranslate,
          key: "email",
          formMethods: mockedFormMethods,
          disabled: true
        }) as ReactElement
      )
      const tree = component.toJSON()
      expect(tree).toMatchSnapshot()
    })
    it("has correct structure (disabled)", () => {
      autocompleteSpy.mockReturnValue(autocompleteValuesDefault)
      const component = shallow(
        getEmailInput<ErpSupplier>({
          t: fakeTranslate,
          key: "email",
          formMethods: mockedFormMethods,
          disabled: true
        }) as ReactElement
      )
      expect(component.find(TextInput)).toHaveLength(1)
    })
  })
})
