import {shallow} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {Button, CardContent, Heading, Modal, Overlay, Text, Tooltip} from "shared/components"
import {surveysMock} from "shared/graphql/__mocks__"
import * as useSurveyDetailDataDownloadHook from "../hooks/use-survey-detail-data-download"
import {UseSurveyDetailDataDownloadHook} from "../hooks/use-survey-detail-data-download"
import {SurveyDetailDataDownload, SurveyDetailDataDownloadProps} from "../survey-detail-data-download"

const survey = surveysMock[0]

const defaultProps: SurveyDetailDataDownloadProps = {
  survey
}

const stateHookValuesDefault: UseSurveyDetailDataDownloadHook = {
  isConfirmModalVisible: false,
  showConfirmModal: jest.fn(),
  hideConfirmModal: jest.fn()
}
const stateSpy = jest.spyOn(useSurveyDetailDataDownloadHook, "useSurveyDetailDataDownload")

const useComponent = (props?: Partial<SurveyDetailDataDownloadProps>) => (
  <SurveyDetailDataDownload {...defaultProps} {...props} />
)

describe("survey-detail-data-download", () => {
  it("renders correctly (modal not visible)", () => {
    stateSpy.mockReturnValue(stateHookValuesDefault)
    const component = create(useComponent())
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("renders correctly (modal visible)", () => {
    stateSpy.mockReturnValue({...stateHookValuesDefault, isConfirmModalVisible: true})
    const component = create(useComponent({survey: {...survey, isTestSurvey: true}}))
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("has correct structure (modal not visible)", () => {
    stateSpy.mockReturnValue(stateHookValuesDefault)
    const component = shallow(useComponent())

    expect(component.find(Heading)).toHaveLength(1)
    expect(component.find(Tooltip)).toHaveLength(2)
    expect(component.find(CardContent)).toHaveLength(1)
    expect(component.find(Overlay)).toHaveLength(0)
    expect(component.find(Modal)).toHaveLength(0)
    expect(component.find(Button)).toHaveLength(2)
    expect(component.find(Text)).toHaveLength(0)
  })
  it("has correct structure (modal visible)", () => {
    stateSpy.mockReturnValue({...stateHookValuesDefault, isConfirmModalVisible: true})
    const component = shallow(useComponent({survey: {...survey, isTestSurvey: true}}))

    expect(component.find(Heading)).toHaveLength(1)
    expect(component.find(Tooltip)).toHaveLength(3)
    expect(component.find(CardContent)).toHaveLength(1)
    expect(component.find(Overlay)).toHaveLength(1)
    expect(component.find(Modal)).toHaveLength(1)
    expect(component.find(Button)).toHaveLength(3)
    expect(component.find(Text)).toHaveLength(1)
  })
})
