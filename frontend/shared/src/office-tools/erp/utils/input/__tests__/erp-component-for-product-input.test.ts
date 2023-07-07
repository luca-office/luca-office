import {shallow} from "enzyme"
import {ReactElement} from "react"
import {create} from "react-test-renderer"
import {erpComponentsMockGraphQl, erpProductsMockGraphQl} from "../../../../../../tests/__mocks__"
import {mockedFormMethods} from "../../../../../../tests/utils/form-methods-mock"
import {fakeTranslate} from "../../../../../../tests/utils/translate-mock"
import {AutoCompleteInput, TextInput} from "../../../../../components"
import {UseAutoCompleteHook} from "../../../../../hooks"
import * as useAutoCompleteHook from "../../../../../hooks/use-auto-complete"
import {Option, Subject} from "../../../../../utils"
import {getErpComponentForProductInput} from "../erp-component-for-product-input"

const autocompleteValuesDefault: UseAutoCompleteHook = {
  setSearchQuery: jest.fn(),
  results: []
}

const autocompleteSpy = jest.spyOn(useAutoCompleteHook, "useAutoComplete")

const componentAutoCompleteList = erpComponentsMockGraphQl.map(mock => `${mock.id}`)
const productAutoCompleteList = erpProductsMockGraphQl.map(mock => `${mock.id}`)

const sectionScrollSubject = new Subject<void>()

describe("erp-component-for-product-input", () => {
  describe("componentId", () => {
    it("renders correctly if enabled", () => {
      autocompleteSpy.mockReturnValue(autocompleteValuesDefault)
      const component = create(
        getErpComponentForProductInput({
          t: fakeTranslate,
          key: "componentId",
          formMethods: mockedFormMethods,
          disabled: false,
          autoCompleteList: componentAutoCompleteList,
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
        getErpComponentForProductInput({
          t: fakeTranslate,
          key: "componentId",
          formMethods: mockedFormMethods,
          disabled: false,
          autoCompleteList: componentAutoCompleteList,
          binaryFile: Option.none(),
          sectionScrollSubject,
          isFloat: false
        }) as ReactElement
      )
      expect(component.find(AutoCompleteInput)).toHaveLength(1)
    })
    it("renders correctly if disabled", () => {
      autocompleteSpy.mockReturnValue(autocompleteValuesDefault)
      const component = create(
        getErpComponentForProductInput({
          t: fakeTranslate,
          key: "componentId",
          formMethods: mockedFormMethods,
          disabled: true,
          autoCompleteList: componentAutoCompleteList,
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
        getErpComponentForProductInput({
          t: fakeTranslate,
          key: "componentId",
          formMethods: mockedFormMethods,
          disabled: true,
          autoCompleteList: componentAutoCompleteList,
          binaryFile: Option.none(),
          sectionScrollSubject,
          isFloat: false
        }) as ReactElement
      )
      expect(component.find(AutoCompleteInput)).toHaveLength(1)
    })
  })
  describe("productId", () => {
    it("renders correctly if enabled", () => {
      autocompleteSpy.mockReturnValue(autocompleteValuesDefault)
      const component = create(
        getErpComponentForProductInput({
          t: fakeTranslate,
          key: "productId",
          formMethods: mockedFormMethods,
          disabled: false,
          autoCompleteList: productAutoCompleteList,
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
        getErpComponentForProductInput({
          t: fakeTranslate,
          key: "productId",
          formMethods: mockedFormMethods,
          disabled: false,
          autoCompleteList: productAutoCompleteList,
          binaryFile: Option.none(),
          sectionScrollSubject,
          isFloat: false
        }) as ReactElement
      )
      expect(component.find(AutoCompleteInput)).toHaveLength(1)
    })
    it("renders correctly if disabled", () => {
      autocompleteSpy.mockReturnValue(autocompleteValuesDefault)
      const component = create(
        getErpComponentForProductInput({
          t: fakeTranslate,
          key: "productId",
          formMethods: mockedFormMethods,
          disabled: true,
          autoCompleteList: productAutoCompleteList,
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
        getErpComponentForProductInput({
          t: fakeTranslate,
          key: "productId",
          formMethods: mockedFormMethods,
          disabled: true,
          autoCompleteList: productAutoCompleteList,
          binaryFile: Option.none(),
          sectionScrollSubject,
          isFloat: false
        }) as ReactElement
      )
      expect(component.find(AutoCompleteInput)).toHaveLength(1)
    })
  })
  describe("sampleCompanyId", () => {
    it("renders correctly if enabled", () => {
      autocompleteSpy.mockReturnValue(autocompleteValuesDefault)
      const component = create(
        getErpComponentForProductInput({
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
        getErpComponentForProductInput({
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
        getErpComponentForProductInput({
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
        getErpComponentForProductInput({
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
  describe("quantity", () => {
    it("renders correctly if enabled", () => {
      autocompleteSpy.mockReturnValue(autocompleteValuesDefault)
      const component = create(
        getErpComponentForProductInput({
          t: fakeTranslate,
          key: "quantity",
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
        getErpComponentForProductInput({
          t: fakeTranslate,
          key: "quantity",
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
        getErpComponentForProductInput({
          t: fakeTranslate,
          key: "quantity",
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
        getErpComponentForProductInput({
          t: fakeTranslate,
          key: "quantity",
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
})
