// importing from direct file because of issues of babel loader and spyOn
import {act, render, screen} from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import {mount} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {ContentLoadingIndicator, OverviewCard} from "shared/components"
import {questionnairesMock} from "shared/graphql/__mocks__"
import wait from "waait"
import {CreationCard, SubHeaderFilter} from "../../../../components"
import * as useQuestionnaires from "../hooks/use-questionnaires"
import {UseQuestionnairesHook} from "../hooks/use-questionnaires"
import {Questionnaires} from "../questionnaires"

const hookValuesDefault: UseQuestionnairesHook = {
  questionnaires: questionnairesMock,
  questionnairesLoading: false,
  navigateQuestionnaireDetail: jest.fn(),
  navigateCreateQuestionnaire: jest.fn(),
  userMayFinalizeWithoutPublishing: false
}

const stateSpy = jest.spyOn(useQuestionnaires, "useQuestionnaires")

describe("questionnaires", () => {
  it("renders correctly", async () => {
    stateSpy.mockReturnValue(hookValuesDefault)
    const component = create(<Questionnaires />)
    await act(() => wait(0))
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("has correct structure", async () => {
    stateSpy.mockReturnValue(hookValuesDefault)

    const component = mount(<Questionnaires />)
    await act(() => wait(0))

    expect(component.find(SubHeaderFilter)).toHaveLength(1)
    expect(component.find(CreationCard)).toHaveLength(1)
    expect(component.find(OverviewCard)).toHaveLength(4)
  })

  it("has correct structure (no questionnaire)", async () => {
    stateSpy.mockReturnValue({...hookValuesDefault, questionnaires: []})

    const component = mount(<Questionnaires />)

    await act(() => wait(0))
    expect(component.find(SubHeaderFilter)).toHaveLength(1)
    expect(component.find(CreationCard)).toHaveLength(1)
  })
  it("has correct structure (loading)", async () => {
    stateSpy.mockReturnValue({...hookValuesDefault, questionnaires: [], questionnairesLoading: true})

    const component = mount(<Questionnaires />)

    await act(() => wait(0))
    expect(component.find(SubHeaderFilter)).toHaveLength(1)
    expect(component.find(CreationCard)).toHaveLength(1)
    expect(component.find(ContentLoadingIndicator)).toHaveLength(1)
  })
  it("triggers actions correctly", async () => {
    const user = userEvent.setup()

    const navigateDetail = jest.fn()
    const navigateCreate = jest.fn()
    stateSpy.mockReturnValue({
      ...hookValuesDefault,
      navigateQuestionnaireDetail: navigateDetail,
      navigateCreateQuestionnaire: navigateCreate
    })
    render(<Questionnaires />)

    await user.click(screen.getByText("questionnaires__create_event"))

    expect(navigateDetail).toHaveBeenCalledTimes(0)
    expect(navigateCreate).toHaveBeenCalledTimes(1)

    await user.click(screen.getAllByText(questionnairesMock[0].title)[0])

    expect(navigateDetail).toHaveBeenCalledTimes(1)
    expect(navigateCreate).toHaveBeenCalledTimes(1)
  })
})
