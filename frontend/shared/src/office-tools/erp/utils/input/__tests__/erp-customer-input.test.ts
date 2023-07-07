import {shallow} from "enzyme"
import {ReactElement} from "react"
import {create} from "react-test-renderer"
import {mockedFormMethods} from "../../../../../../tests/utils/form-methods-mock"
import {fakeTranslate} from "../../../../../../tests/utils/translate-mock"
import {BinaryUploadInput, CustomSelect, TextInput} from "../../../../../components"
import {Option, Subject} from "../../../../../utils"
import {getErpCustomerInput} from "../erp-customer-input"

const sectionScrollSubject = new Subject<void>()

describe("erp-customer-input", () => {
  describe("id", () => {
    it("renders correctly if enabled", () => {
      const component = create(
        getErpCustomerInput({
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
        getErpCustomerInput({
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
        getErpCustomerInput({
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
        getErpCustomerInput({
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
  describe("salutation", () => {
    it("renders correctly if enabled", () => {
      const component = create(
        getErpCustomerInput({
          t: fakeTranslate,
          key: "salutation",
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
        getErpCustomerInput({
          t: fakeTranslate,
          key: "salutation",
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
      const component = create(
        getErpCustomerInput({
          t: fakeTranslate,
          key: "salutation",
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
        getErpCustomerInput({
          t: fakeTranslate,
          key: "salutation",
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
  describe("firstName", () => {
    it("renders correctly if enabled", () => {
      const component = create(
        getErpCustomerInput({
          t: fakeTranslate,
          key: "firstName",
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
        getErpCustomerInput({
          t: fakeTranslate,
          key: "firstName",
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
        getErpCustomerInput({
          t: fakeTranslate,
          key: "firstName",
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
        getErpCustomerInput({
          t: fakeTranslate,
          key: "firstName",
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
  describe("lastName", () => {
    it("renders correctly if enabled", () => {
      const component = create(
        getErpCustomerInput({
          t: fakeTranslate,
          key: "lastName",
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
        getErpCustomerInput({
          t: fakeTranslate,
          key: "lastName",
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
        getErpCustomerInput({
          t: fakeTranslate,
          key: "lastName",
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
        getErpCustomerInput({
          t: fakeTranslate,
          key: "lastName",
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
  describe("company", () => {
    it("renders correctly if enabled", () => {
      const component = create(
        getErpCustomerInput({
          t: fakeTranslate,
          key: "company",
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
        getErpCustomerInput({
          t: fakeTranslate,
          key: "company",
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
        getErpCustomerInput({
          t: fakeTranslate,
          key: "company",
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
        getErpCustomerInput({
          t: fakeTranslate,
          key: "company",
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
  describe("addressLine", () => {
    it("renders correctly if enabled", () => {
      const component = create(
        getErpCustomerInput({
          t: fakeTranslate,
          key: "addressLine",
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
        getErpCustomerInput({
          t: fakeTranslate,
          key: "addressLine",
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
        getErpCustomerInput({
          t: fakeTranslate,
          key: "addressLine",
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
        getErpCustomerInput({
          t: fakeTranslate,
          key: "addressLine",
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
  describe("postalCode", () => {
    it("renders correctly if enabled", () => {
      const component = create(
        getErpCustomerInput({
          t: fakeTranslate,
          key: "postalCode",
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
        getErpCustomerInput({
          t: fakeTranslate,
          key: "postalCode",
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
        getErpCustomerInput({
          t: fakeTranslate,
          key: "postalCode",
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
        getErpCustomerInput({
          t: fakeTranslate,
          key: "postalCode",
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
  describe("city", () => {
    it("renders correctly if enabled", () => {
      const component = create(
        getErpCustomerInput({
          t: fakeTranslate,
          key: "city",
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
        getErpCustomerInput({
          t: fakeTranslate,
          key: "city",
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
        getErpCustomerInput({
          t: fakeTranslate,
          key: "city",
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
        getErpCustomerInput({
          t: fakeTranslate,
          key: "city",
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
  describe("country", () => {
    it("renders correctly if enabled", () => {
      const component = create(
        getErpCustomerInput({
          t: fakeTranslate,
          key: "country",
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
        getErpCustomerInput({
          t: fakeTranslate,
          key: "country",
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
        getErpCustomerInput({
          t: fakeTranslate,
          key: "country",
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
        getErpCustomerInput({
          t: fakeTranslate,
          key: "country",
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
  describe("email", () => {
    it("renders correctly if enabled", () => {
      const component = create(
        getErpCustomerInput({
          t: fakeTranslate,
          key: "email",
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
        getErpCustomerInput({
          t: fakeTranslate,
          key: "email",
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
        getErpCustomerInput({
          t: fakeTranslate,
          key: "email",
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
        getErpCustomerInput({
          t: fakeTranslate,
          key: "email",
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
  describe("phone", () => {
    it("renders correctly if enabled", () => {
      const component = create(
        getErpCustomerInput({
          t: fakeTranslate,
          key: "phone",
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
        getErpCustomerInput({
          t: fakeTranslate,
          key: "phone",
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
        getErpCustomerInput({
          t: fakeTranslate,
          key: "phone",
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
        getErpCustomerInput({
          t: fakeTranslate,
          key: "phone",
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
        getErpCustomerInput({
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
        getErpCustomerInput({
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
        getErpCustomerInput({
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
        getErpCustomerInput({
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
      const component = create(
        getErpCustomerInput({
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
        getErpCustomerInput({
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
        getErpCustomerInput({
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
        getErpCustomerInput({
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
        getErpCustomerInput({
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
        getErpCustomerInput({
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
        getErpCustomerInput({
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
        getErpCustomerInput({
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
