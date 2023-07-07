import {shallow} from "enzyme"
import {ReactElement} from "react"
import {create} from "react-test-renderer"
import {mockedFormMethods} from "../../../../../../tests/utils/form-methods-mock"
import {fakeTranslate} from "../../../../../../tests/utils/translate-mock"
import {BinaryUploadInput, TextInput} from "../../../../../components"
import {Option, Subject} from "../../../../../utils"
import {getErpProductInput} from "../erp-product-input"

const sectionScrollSubject = new Subject<void>()

describe("erp-product-input", () => {
  describe("id", () => {
    it("renders correctly if enabled", () => {
      const component = create(
        getErpProductInput({
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
      const component = shallow(
        getErpProductInput({
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
      const component = create(
        getErpProductInput({
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
      const component = shallow(
        getErpProductInput({
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
      const component = create(
        getErpProductInput({
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
      const component = shallow(
        getErpProductInput({
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
      const component = create(
        getErpProductInput({
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
      const component = shallow(
        getErpProductInput({
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
  describe("netPriceInCents", () => {
    it("renders correctly if enabled", () => {
      const component = create(
        getErpProductInput({
          t: fakeTranslate,
          key: "netPriceInCents",
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
      const component = shallow(
        getErpProductInput({
          t: fakeTranslate,
          key: "netPriceInCents",
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
      const component = create(
        getErpProductInput({
          t: fakeTranslate,
          key: "netPriceInCents",
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
      const component = shallow(
        getErpProductInput({
          t: fakeTranslate,
          key: "netPriceInCents",
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
  describe("taxRate", () => {
    it("renders correctly if enabled", () => {
      const component = create(
        getErpProductInput({
          t: fakeTranslate,
          key: "taxRate",
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
      const component = shallow(
        getErpProductInput({
          t: fakeTranslate,
          key: "taxRate",
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
      const component = create(
        getErpProductInput({
          t: fakeTranslate,
          key: "taxRate",
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
      const component = shallow(
        getErpProductInput({
          t: fakeTranslate,
          key: "taxRate",
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
    it("renders correctly if enabled", () => {
      const component = create(
        getErpProductInput({
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
      const component = shallow(
        getErpProductInput({
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
      const component = create(
        getErpProductInput({
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
      const component = shallow(
        getErpProductInput({
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
  describe("binaryFileId", () => {
    it("renders correctly if enabled", () => {
      const component = create(
        getErpProductInput({
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
      const component = shallow(
        getErpProductInput({
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
      const component = create(
        getErpProductInput({
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
      const component = shallow(
        getErpProductInput({
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
      const component = create(
        getErpProductInput({
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
      const component = shallow(
        getErpProductInput({
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
      const component = create(
        getErpProductInput({
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
      const component = shallow(
        getErpProductInput({
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
      const component = create(
        getErpProductInput({
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
      const component = shallow(
        getErpProductInput({
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
      const component = create(
        getErpProductInput({
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
      const component = shallow(
        getErpProductInput({
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
  describe("packSize", () => {
    it("renders correctly if enabled", () => {
      const component = create(
        getErpProductInput({
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
      const component = shallow(
        getErpProductInput({
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
      const component = create(
        getErpProductInput({
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
      const component = shallow(
        getErpProductInput({
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
      const component = create(
        getErpProductInput({
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
      const component = shallow(
        getErpProductInput({
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
      const component = create(
        getErpProductInput({
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
      const component = shallow(
        getErpProductInput({
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
      const component = create(
        getErpProductInput({
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
      const component = shallow(
        getErpProductInput({
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
      const component = create(
        getErpProductInput({
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
      const component = shallow(
        getErpProductInput({
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
      const component = create(
        getErpProductInput({
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
      const component = shallow(
        getErpProductInput({
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
      const component = create(
        getErpProductInput({
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
      const component = shallow(
        getErpProductInput({
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
})
