import {MockedProvider} from "@apollo/client/testing"
import {mount} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {PdfViewer} from "shared/components"
import {profileFileMock, sampleCompaniesMock} from "shared/graphql/__mocks__"
import {SampleCompany} from "shared/models"
import {Option} from "shared/utils"
import {fakeTranslate} from "sharedTests/utils/translate-mock"
import {BinaryUpdateModal, UploadFileModal} from "../../../../../components"
import * as useInformationBinaryContent from "../hooks/use-information-binary-content"
import {UseInformationBinaryContentHook} from "../hooks/use-information-binary-content"
import {InformationBinaryContent, InformationBinaryContentProps} from "../information-binary-content"

const defaultProps: InformationBinaryContentProps = {
  sampleCompany: Option.of(sampleCompaniesMock[0]),
  isFinalized: false,
  updateSampleCompany: jest.fn()
}

const hookValuesDefault: UseInformationBinaryContentHook = {
  createIntro: jest.fn(),
  createLogo: jest.fn(),
  deleteIntro: jest.fn(),
  deleteLogo: jest.fn(),
  setShowEditIntroModal: jest.fn(),
  setShowUploadIntroModal: jest.fn(),
  setShowViewIntroModal: jest.fn(),
  showEditIntroModal: false,
  showUploadIntroModal: false,
  showViewIntroModal: false,
  t: fakeTranslate,
  updateIntro: jest.fn()
}

const stateSpy = jest.spyOn(useInformationBinaryContent, "useInformationBinaryContent")

const getComponent = (props?: Partial<InformationBinaryContentProps>) => (
  <MockedProvider>
    <InformationBinaryContent {...{...defaultProps, ...props}} />
  </MockedProvider>
)

describe("information-binary-content", () => {
  it("renders correctly", () => {
    const component = getComponent()
    const tree = create(component).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it("shows upload intro modal", () => {
    stateSpy.mockReturnValue({...hookValuesDefault, showUploadIntroModal: true})
    const component = getComponent()
    const tree = mount(component)

    expect(tree.find(UploadFileModal)).toHaveLength(1)
    expect(tree.find(BinaryUpdateModal)).toHaveLength(0)
  })
  it("shows edit intro modal if sample company has intro", () => {
    stateSpy.mockReturnValue({...hookValuesDefault, showEditIntroModal: true})
    const component = getComponent({
      sampleCompany: Option.of<SampleCompany>({
        ...sampleCompaniesMock[0],
        profileFile: profileFileMock
      })
    })
    const tree = mount(component)

    expect(tree.find(BinaryUpdateModal)).toHaveLength(1)
  })

  it("shows view intro modal", () => {
    stateSpy.mockReturnValue({...hookValuesDefault, showViewIntroModal: true})
    const component = getComponent({
      sampleCompany: Option.of<SampleCompany>({
        ...sampleCompaniesMock[0],
        profileFile: profileFileMock
      })
    })
    const tree = mount(component)

    expect(tree.find(UploadFileModal)).toHaveLength(0)
    expect(tree.find(PdfViewer)).toHaveLength(1)
    expect(tree.find(BinaryUpdateModal)).toHaveLength(0)
  })
})
