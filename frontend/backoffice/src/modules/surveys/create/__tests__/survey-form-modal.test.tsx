// importing from direct file because of issues of babel loader and spyOn
import {mount, shallow} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {Card, Checkbox, Heading, LoadingIndicator, Modal, TextInput, Tooltip} from "shared/components"
import {projectsMock, surveysMock} from "shared/graphql/__mocks__"
import {mockedFormMethods} from "sharedTests/utils/form-methods-mock"
import {SurveyConditions, SurveyPeriodSelection} from "../cards"
import * as createSurveyHook from "../hooks/use-create-survey"
import {UseSurveyFormHook} from "../hooks/use-create-survey"
import * as editSurveyHook from "../hooks/use-edit-survey"
import {SurveyFormModal, SurveyFormModalProps} from "../survey-form-modal"

const hookValuesDefault: UseSurveyFormHook = {
  formMethods: mockedFormMethods,
  onConfirm: jest.fn(),
  onCancel: jest.fn(),
  firstProjectSurveyOrlyVisible: false,
  submitSurvey: jest.fn(),
  submitSurveyLoading: false,
  initialized: true
}

const useComponent = (props?: Partial<SurveyFormModalProps>) => (
  <SurveyFormModal projectId={projectsMock[0].id} {...props} />
)
const stateSpy = jest.spyOn(createSurveyHook, "useCreateSurvey")
const stateSpyEdit = jest.spyOn(editSurveyHook, "useEditSurvey")

describe("create-survey-modal", () => {
  it("renders correctly", () => {
    stateSpy.mockReturnValue(hookValuesDefault)
    const component = create(useComponent())
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  it("renders correctly with orly", () => {
    stateSpy.mockReturnValue({...hookValuesDefault, firstProjectSurveyOrlyVisible: true})
    const component = create(useComponent())
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("renders correct structure", async () => {
    stateSpy.mockReturnValue(hookValuesDefault)
    stateSpyEdit.mockReturnValue(hookValuesDefault)
    const component = mount(useComponent())
    expect(component.find(Modal)).toHaveLength(1)
    expect(component.find(Card)).toHaveLength(5)
    expect(component.find(Checkbox)).toHaveLength(1)
    expect(component.find(Tooltip)).toHaveLength(1)
    expect(component.find(TextInput)).toHaveLength(1)
    expect(component.find(SurveyConditions)).toHaveLength(1)
    expect(component.find(SurveyPeriodSelection)).toHaveLength(1)
  })
  it("renders correct structure for test survey", async () => {
    stateSpy.mockReturnValue(hookValuesDefault)
    stateSpyEdit.mockReturnValue(hookValuesDefault)
    const component = mount(useComponent({createTestSurvey: true}))
    expect(component.find(Modal)).toHaveLength(1)
    expect(component.find(Modal).find(Heading).at(0).html()).toContain("projects__surveys_test_creation_form_title")
    expect(component.find(Card)).toHaveLength(5)
    expect(component.find(Checkbox)).toHaveLength(1)
    expect(component.find(Tooltip)).toHaveLength(1)
    expect(component.find(TextInput)).toHaveLength(1)
    expect(component.find(SurveyConditions)).toHaveLength(1)
    expect(component.find(SurveyPeriodSelection)).toHaveLength(1)
  })
  it("renders correct structure with surveyId", async () => {
    stateSpy.mockReturnValue(hookValuesDefault)
    stateSpyEdit.mockReturnValue(hookValuesDefault)
    const component = mount(useComponent({surveyId: surveysMock[0].id}))
    expect(component.find(Modal)).toHaveLength(1)
    expect(component.find(Card)).toHaveLength(5)
    expect(component.find(Checkbox)).toHaveLength(1)
    expect(component.find(Tooltip)).toHaveLength(1)
    expect(component.find(TextInput)).toHaveLength(0)
    expect(component.find(SurveyConditions)).toHaveLength(1)
    expect(component.find(SurveyPeriodSelection)).toHaveLength(1)
  })
  it("renders correct structure with orly", () => {
    stateSpy.mockReturnValue({...hookValuesDefault, firstProjectSurveyOrlyVisible: true})
    stateSpyEdit.mockReturnValue({...hookValuesDefault, firstProjectSurveyOrlyVisible: true})
    const component = shallow(useComponent())

    expect(component.find(Modal)).toHaveLength(1)
    const html = component.find(Modal).html()
    expect(html).toContain("projects__surveys_creation_orly_title")
    expect(html).toContain("projects__surveys_creation_orly_text")
  })
  it("does not show orly for survey edit", () => {
    stateSpy.mockReturnValue({...hookValuesDefault, firstProjectSurveyOrlyVisible: true})
    stateSpyEdit.mockReturnValue({...hookValuesDefault, firstProjectSurveyOrlyVisible: true})
    const component = shallow(useComponent({surveyId: surveysMock[0].id}))

    expect(component.find(Modal)).toHaveLength(1)
    const html = component.find(Modal).html()
    expect(html).not.toContain("projects__surveys_creation_orly_title")
    expect(html).not.toContain("projects__surveys_creation_orly_text")
  })
  it("renders correctly loading", () => {
    stateSpy.mockReturnValue({...hookValuesDefault, initialized: false})
    stateSpyEdit.mockReturnValue({...hookValuesDefault, initialized: false})
    const component = shallow(<SurveyFormModal projectId={projectsMock[0].id} />)

    expect(component.find(LoadingIndicator)).toHaveLength(1)
  })
})
