import {shallow} from "enzyme"
import {ReactElement} from "react"
import {create} from "react-test-renderer"
import {erpSuppliersMockGraphQl} from "../../../../../../tests/__mocks__"
import {mockedFormMethods} from "../../../../../../tests/utils/form-methods-mock"
import {fakeTranslate} from "../../../../../../tests/utils/translate-mock"
import {AutoCompleteInput, TextInput} from "../../../../../components"
import {BinaryUploadInput} from "../../../../../components/binary-upload-input/binary-upload-input"
import {UseAutoCompleteHook} from "../../../../../hooks"
import * as useAutoCompleteHook from "../../../../../hooks/use-auto-complete"
import {Option, Subject} from "../../../../../utils"
import {getErpComponentInput} from "../erp-component-input"

const autocompleteValuesDefault: UseAutoCompleteHook = {
  setSearchQuery: jest.fn(),
  results: []
}

const autocompleteSpy = jest.spyOn(useAutoCompleteHook, "useAutoComplete")

const autoCompleteList = erpSuppliersMockGraphQl.map(mock => `${mock.id}`)

const sectionScrollSubject = new Subject<void>()

describe("erp-component-input", () => {
  describe("id", () => {
    it("renders correctly if enabled", () => {
      autocompleteSpy.mockReturnValue(autocompleteValuesDefault)
      const component = create(
        getErpComponentInput({
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
        getErpComponentInput({
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
        getErpComponentInput({
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
        getErpComponentInput({
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
  describe("name", () => {
    it("renders correctly if enabled", () => {
      autocompleteSpy.mockReturnValue(autocompleteValuesDefault)
      const component = create(
        getErpComponentInput({
          t: fakeTranslate,
          key: "name",
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
        getErpComponentInput({
          t: fakeTranslate,
          key: "name",
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
        getErpComponentInput({
          t: fakeTranslate,
          key: "name",
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
        getErpComponentInput({
          t: fakeTranslate,
          key: "name",
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
  describe("category", () => {
    it("renders correctly if enabled", () => {
      autocompleteSpy.mockReturnValue(autocompleteValuesDefault)
      const component = create(
        getErpComponentInput({
          t: fakeTranslate,
          key: "category",
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
        getErpComponentInput({
          t: fakeTranslate,
          key: "category",
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
        getErpComponentInput({
          t: fakeTranslate,
          key: "category",
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
  })
  describe("purchasingPriceInCents", () => {
    it("renders correctly if enabled", () => {
      autocompleteSpy.mockReturnValue(autocompleteValuesDefault)
      const component = create(
        getErpComponentInput({
          t: fakeTranslate,
          key: "purchasingPriceInCents",
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
        getErpComponentInput({
          t: fakeTranslate,
          key: "purchasingPriceInCents",
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
        getErpComponentInput({
          t: fakeTranslate,
          key: "purchasingPriceInCents",
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
        getErpComponentInput({
          t: fakeTranslate,
          key: "purchasingPriceInCents",
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
  describe("margin", () => {
    it("renders correctly if enabled", () => {
      autocompleteSpy.mockReturnValue(autocompleteValuesDefault)
      const component = create(
        getErpComponentInput({
          t: fakeTranslate,
          key: "margin",
          formMethods: mockedFormMethods,
          disabled: false,
          binaryFile: Option.none(),
          sectionScrollSubject,
          isFloat: true
        }) as ReactElement
      )
      const tree = component.toJSON()
      expect(tree).toMatchSnapshot()
    })
    it("has correct structure (enabled)", () => {
      autocompleteSpy.mockReturnValue(autocompleteValuesDefault)
      const component = shallow(
        getErpComponentInput({
          t: fakeTranslate,
          key: "margin",
          formMethods: mockedFormMethods,
          disabled: false,
          binaryFile: Option.none(),
          sectionScrollSubject,
          isFloat: true
        }) as ReactElement
      )
      expect(component.find(TextInput)).toHaveLength(1)
    })
    it("renders correctly if disabled", () => {
      autocompleteSpy.mockReturnValue(autocompleteValuesDefault)
      const component = create(
        getErpComponentInput({
          t: fakeTranslate,
          key: "margin",
          formMethods: mockedFormMethods,
          disabled: true,
          binaryFile: Option.none(),
          sectionScrollSubject,
          isFloat: true
        }) as ReactElement
      )
      const tree = component.toJSON()
      expect(tree).toMatchSnapshot()
    })
    it("has correct structure (disabled)", () => {
      autocompleteSpy.mockReturnValue(autocompleteValuesDefault)
      const component = shallow(
        getErpComponentInput({
          t: fakeTranslate,
          key: "margin",
          formMethods: mockedFormMethods,
          disabled: true,
          binaryFile: Option.none(),
          sectionScrollSubject,
          isFloat: true
        }) as ReactElement
      )
      expect(component.find(TextInput)).toHaveLength(1)
    })
  })
  describe("sampleCompanyId", () => {
    autocompleteSpy.mockReturnValue(autocompleteValuesDefault)
    it("renders correctly if enabled", () => {
      const component = create(
        getErpComponentInput({
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
        getErpComponentInput({
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
        getErpComponentInput({
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
        getErpComponentInput({
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
  describe("supplierId", () => {
    it("renders correctly if enabled", () => {
      autocompleteSpy.mockReturnValue(autocompleteValuesDefault)
      const component = create(
        getErpComponentInput({
          t: fakeTranslate,
          key: "supplierId",
          formMethods: mockedFormMethods,
          disabled: false,
          binaryFile: Option.none(),
          sectionScrollSubject,
          autoCompleteList,
          isFloat: false
        }) as ReactElement
      )
      const tree = component.toJSON()
      expect(tree).toMatchSnapshot()
    })
    it("has correct structure (enabled)", () => {
      autocompleteSpy.mockReturnValue(autocompleteValuesDefault)
      const component = shallow(
        getErpComponentInput({
          t: fakeTranslate,
          key: "supplierId",
          formMethods: mockedFormMethods,
          disabled: false,
          binaryFile: Option.none(),
          sectionScrollSubject,
          autoCompleteList,
          isFloat: false
        }) as ReactElement
      )
      expect(component.find(AutoCompleteInput)).toHaveLength(1)
    })
    it("renders correctly if disabled", () => {
      autocompleteSpy.mockReturnValue(autocompleteValuesDefault)
      const component = create(
        getErpComponentInput({
          t: fakeTranslate,
          key: "supplierId",
          formMethods: mockedFormMethods,
          disabled: true,
          binaryFile: Option.none(),
          sectionScrollSubject,
          autoCompleteList,
          isFloat: false
        }) as ReactElement
      )
      const tree = component.toJSON()
      expect(tree).toMatchSnapshot()
    })
    it("has correct structure (disabled)", () => {
      autocompleteSpy.mockReturnValue(autocompleteValuesDefault)
      const component = shallow(
        getErpComponentInput({
          t: fakeTranslate,
          key: "supplierId",
          formMethods: mockedFormMethods,
          disabled: true,
          binaryFile: Option.none(),
          sectionScrollSubject,
          autoCompleteList,
          isFloat: false
        }) as ReactElement
      )
      expect(component.find(AutoCompleteInput)).toHaveLength(1)
    })
  })
  describe("packSize", () => {
    it("renders correctly if enabled", () => {
      autocompleteSpy.mockReturnValue(autocompleteValuesDefault)
      const component = create(
        getErpComponentInput({
          t: fakeTranslate,
          key: "packSize",
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
        getErpComponentInput({
          t: fakeTranslate,
          key: "packSize",
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
        getErpComponentInput({
          t: fakeTranslate,
          key: "packSize",
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
        getErpComponentInput({
          t: fakeTranslate,
          key: "packSize",
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
  describe("availableStock", () => {
    it("renders correctly if enabled", () => {
      autocompleteSpy.mockReturnValue(autocompleteValuesDefault)
      const component = create(
        getErpComponentInput({
          t: fakeTranslate,
          key: "availableStock",
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
        getErpComponentInput({
          t: fakeTranslate,
          key: "availableStock",
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
        getErpComponentInput({
          t: fakeTranslate,
          key: "availableStock",
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
        getErpComponentInput({
          t: fakeTranslate,
          key: "availableStock",
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
  describe("stockCostPerUnitInCents", () => {
    it("renders correctly if enabled", () => {
      autocompleteSpy.mockReturnValue(autocompleteValuesDefault)
      const component = create(
        getErpComponentInput({
          t: fakeTranslate,
          key: "stockCostPerUnitInCents",
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
        getErpComponentInput({
          t: fakeTranslate,
          key: "stockCostPerUnitInCents",
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
        getErpComponentInput({
          t: fakeTranslate,
          key: "stockCostPerUnitInCents",
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
        getErpComponentInput({
          t: fakeTranslate,
          key: "stockCostPerUnitInCents",
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
  describe("stockCostTotalInCents", () => {
    it("renders correctly if enabled", () => {
      autocompleteSpy.mockReturnValue(autocompleteValuesDefault)
      const component = create(
        getErpComponentInput({
          t: fakeTranslate,
          key: "stockCostTotalInCents",
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
        getErpComponentInput({
          t: fakeTranslate,
          key: "stockCostTotalInCents",
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
        getErpComponentInput({
          t: fakeTranslate,
          key: "stockCostTotalInCents",
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
        getErpComponentInput({
          t: fakeTranslate,
          key: "stockCostTotalInCents",
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
        getErpComponentInput({
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
        getErpComponentInput({
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
        getErpComponentInput({
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
        getErpComponentInput({
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
  describe("unit", () => {
    it("renders correctly if enabled", () => {
      autocompleteSpy.mockReturnValue(autocompleteValuesDefault)
      const component = create(
        getErpComponentInput({
          t: fakeTranslate,
          key: "unit",
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
        getErpComponentInput({
          t: fakeTranslate,
          key: "unit",
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
        getErpComponentInput({
          t: fakeTranslate,
          key: "unit",
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
        getErpComponentInput({
          t: fakeTranslate,
          key: "unit",
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
        getErpComponentInput({
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
        getErpComponentInput({
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
        getErpComponentInput({
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
        getErpComponentInput({
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
})
