import {shallow} from "enzyme"
import * as React from "react"
import {Button, Icon, OrlyButtonContainer, Text} from "shared/components"
import {IconName} from "shared/enums"
import {projectModulesMockWithQuestionnaire, surveysMock} from "shared/graphql/__mocks__"
import {ProjectModuleType} from "shared/graphql/generated/globalTypes"
import {fakeTranslate} from "sharedTests/utils/translate-mock"
import {CardDurationInfo, EditingStatusIndicator} from "../../../../components"
import {getSurveyListIcon, getSurveyTimingLabel} from "../../../../utils"
import {
  getProjectModuleColumns,
  GetProjectModuleColumnsParams,
  getSurveyColumns,
  GetSurveyColumnsParams
} from "../detail-tables"

const deleteSpy = jest.fn()
const createSpy = jest.fn()
const sortSpy = jest.fn()

const defaultModuleParams: GetProjectModuleColumnsParams = {
  deleteModule: deleteSpy,
  sortingDisabled: false,
  openCreation: createSpy,
  moduleActionsDisabled: false,
  openSorting: sortSpy,
  t: fakeTranslate
}
const defaultSurveyParams: GetSurveyColumnsParams = {
  surveyCreationDisabled: false,
  t: fakeTranslate,
  openCreation: createSpy,
  deleteSurvey: deleteSpy,
  isTestSurvey: false
}

const questionnaire = projectModulesMockWithQuestionnaire.find(
  module => module.moduleType === ProjectModuleType.Questionnaire
)
const scenario = projectModulesMockWithQuestionnaire[0]
const survey = surveysMock[0]

describe("detail-tables-config", () => {
  it("can getProjectModuleColumns with default setting", () => {
    const defaultCols = getProjectModuleColumns(defaultModuleParams)
    expect(defaultCols).toHaveLength(5)
    // renders titles correctly
    const questionContent = shallow(<div>{defaultCols[0].content(questionnaire!)}</div>)
    const scenarioContent = shallow(<div>{defaultCols[0].content(scenario)}</div>)
    expect(questionContent.html()).toContain(questionnaire!.questionnaire?.title)
    expect(scenarioContent.html()).toContain(scenario!.scenario?.name)
    // renders icons correctly
    const questionType = shallow(<div>{defaultCols[1].content(questionnaire!)}</div>)
    const scenarioType = shallow(<div>{defaultCols[1].content(scenario)}</div>)
    expect(questionType.find(Icon).prop("name")).toEqual(IconName.Questionnaire)
    expect(scenarioType.find(Icon).prop("name")).toEqual(IconName.Monitor)
    // renders timing correctly
    const questionTime = shallow(<div>{defaultCols[2].content(questionnaire!)}</div>).find(CardDurationInfo)
    const scenarioTime = shallow(<div>{defaultCols[2].content(scenario)}</div>).find(CardDurationInfo)
    expect(questionTime.prop("maxDurationInSeconds")).toEqual(undefined)
    expect(questionTime.prop("placeholder")).toEqual("(60 min)")
    expect(scenarioTime.prop("maxDurationInSeconds")).toEqual(scenario!.scenario?.maxDurationInSeconds)
    // renders status correctly
    const questionStatus = shallow(<div>{defaultCols[3].content(questionnaire!)}</div>).find(EditingStatusIndicator)
    const scenarioStatus = shallow(<div>{defaultCols[3].content(scenario)}</div>).find(EditingStatusIndicator)
    expect(questionStatus.prop("isFinalized")).toEqual(true)
    expect(questionStatus.prop("isPublished")).toEqual(false)
    expect(scenarioStatus.prop("isFinalized")).toEqual(false)
    expect(scenarioStatus.prop("isPublished")).toEqual(false)
    // renders actions correctly
    const actionHeader = shallow(<div>{defaultCols[4].header}</div>)
    expect(actionHeader.find(Button)).toHaveLength(2)
    actionHeader.find(Button).first().simulate("click")
    expect(sortSpy).toHaveBeenCalled()
    actionHeader.find(Button).last().simulate("click")
    expect(createSpy).toHaveBeenCalled()
    const actionContent = shallow(<div>{defaultCols[4].content(scenario)}</div>)
    expect(actionContent.find(OrlyButtonContainer)).toHaveLength(1)
  })
  it("can getProjectModuleColumns with moduleActionsDisabled", () => {
    const defaultCols = getProjectModuleColumns({...defaultModuleParams, moduleActionsDisabled: true})
    expect(defaultCols).toHaveLength(5)
    // renders titles correctly
    const questionContent = shallow(<div>{defaultCols[0].content(questionnaire!)}</div>)
    const scenarioContent = shallow(<div>{defaultCols[0].content(scenario)}</div>)
    expect(questionContent.html()).toContain(questionnaire!.questionnaire?.title)
    expect(scenarioContent.html()).toContain(scenario!.scenario?.name)
    // renders icons correctly
    const questionType = shallow(<div>{defaultCols[1].content(questionnaire!)}</div>)
    const scenarioType = shallow(<div>{defaultCols[1].content(scenario)}</div>)
    expect(questionType.find(Icon).prop("name")).toEqual(IconName.Questionnaire)
    expect(scenarioType.find(Icon).prop("name")).toEqual(IconName.Monitor)
    // renders timing correctly
    const questionTime = shallow(<div>{defaultCols[2].content(questionnaire!)}</div>).find(CardDurationInfo)
    const scenarioTime = shallow(<div>{defaultCols[2].content(scenario)}</div>).find(CardDurationInfo)
    expect(questionTime.prop("maxDurationInSeconds")).toEqual(undefined)
    expect(questionTime.prop("placeholder")).toEqual("(60 min)")
    expect(scenarioTime.prop("maxDurationInSeconds")).toEqual(scenario!.scenario?.maxDurationInSeconds)
    // renders status correctly
    const questionStatus = shallow(<div>{defaultCols[3].content(questionnaire!)}</div>).find(EditingStatusIndicator)
    const scenarioStatus = shallow(<div>{defaultCols[3].content(scenario)}</div>).find(EditingStatusIndicator)
    expect(questionStatus.prop("isFinalized")).toEqual(true)
    expect(questionStatus.prop("isPublished")).toEqual(false)
    expect(scenarioStatus.prop("isFinalized")).toEqual(false)
    expect(scenarioStatus.prop("isPublished")).toEqual(false)
    // renders actions correctly
    const actionHeader = shallow(<div>{defaultCols[4].header}</div>)
    expect(actionHeader.find(Button)).toHaveLength(2)
    expect(actionHeader.find(Button).first().prop("disabled")).toEqual(false)
    expect(actionHeader.find(Button).last().prop("disabled")).toEqual(true)
    const actionContent = shallow(<div>{defaultCols[4].content(scenario)}</div>)
    expect(actionContent.find(OrlyButtonContainer)).toHaveLength(1)
    expect(actionContent.find(OrlyButtonContainer).prop("disabled")).toEqual(true)
  })
  it("can getProjectModuleColumns with sortingDisabled", () => {
    const defaultCols = getProjectModuleColumns({...defaultModuleParams, sortingDisabled: true})
    expect(defaultCols).toHaveLength(5)
    // renders titles correctly
    const questionContent = shallow(<div>{defaultCols[0].content(questionnaire!)}</div>)
    const scenarioContent = shallow(<div>{defaultCols[0].content(scenario)}</div>)
    expect(questionContent.html()).toContain(questionnaire!.questionnaire?.title)
    expect(scenarioContent.html()).toContain(scenario!.scenario?.name)
    // renders icons correctly
    const questionType = shallow(<div>{defaultCols[1].content(questionnaire!)}</div>)
    const scenarioType = shallow(<div>{defaultCols[1].content(scenario)}</div>)
    expect(questionType.find(Icon).prop("name")).toEqual(IconName.Questionnaire)
    expect(scenarioType.find(Icon).prop("name")).toEqual(IconName.Monitor)
    // renders timing correctly
    const questionTime = shallow(<div>{defaultCols[2].content(questionnaire!)}</div>).find(CardDurationInfo)
    const scenarioTime = shallow(<div>{defaultCols[2].content(scenario)}</div>).find(CardDurationInfo)
    expect(questionTime.prop("maxDurationInSeconds")).toEqual(undefined)
    expect(questionTime.prop("placeholder")).toEqual("(60 min)")
    expect(scenarioTime.prop("maxDurationInSeconds")).toEqual(scenario!.scenario?.maxDurationInSeconds)
    // renders status correctly
    const questionStatus = shallow(<div>{defaultCols[3].content(questionnaire!)}</div>).find(EditingStatusIndicator)
    const scenarioStatus = shallow(<div>{defaultCols[3].content(scenario)}</div>).find(EditingStatusIndicator)
    expect(questionStatus.prop("isFinalized")).toEqual(true)
    expect(questionStatus.prop("isPublished")).toEqual(false)
    expect(scenarioStatus.prop("isFinalized")).toEqual(false)
    expect(scenarioStatus.prop("isPublished")).toEqual(false)
    // renders actions correctly
    const actionHeader = shallow(<div>{defaultCols[4].header}</div>)
    expect(actionHeader.find(Button)).toHaveLength(2)
    expect(actionHeader.find(Button).first().prop("disabled")).toEqual(true)
    expect(actionHeader.find(Button).last().prop("disabled")).toEqual(false)
    const actionContent = shallow(<div>{defaultCols[4].content(scenario)}</div>)
    expect(actionContent.find(OrlyButtonContainer)).toHaveLength(1)
    expect(actionContent.find(OrlyButtonContainer).prop("disabled")).toEqual(false)
  })
  it("can getSurveyColumns with default setting", () => {
    const defaultCols = getSurveyColumns(defaultSurveyParams)
    expect(defaultCols).toHaveLength(5)
    // renders titles correctly
    const title = shallow(<div>{defaultCols[0].content(survey)}</div>)
    expect(title.html()).toContain(survey.title)
    // renders condition correctly
    const condition = shallow(<div>{defaultCols[1].content(survey)}</div>)
    expect(condition.html()).toContain("projects__survey_overlay_closed_participation")
    // renders participants correctly
    const participants = shallow(<div>{defaultCols[2].content(survey)}</div>)
    expect(participants.html()).toContain("projects__surveys_table_participants_column")
    // renders status correctly
    const status = shallow(<div>{defaultCols[3].content(survey)}</div>)
    expect(status.find(Icon).prop("name")).toEqual(
      getSurveyListIcon(survey.startsAt, survey.endsAt, survey.isCompleted)
    )
    expect(status.html()).toContain(getSurveyTimingLabel(fakeTranslate, survey))
    expect(status.find(Text)).toHaveLength(1)
    // renders actions correctly
    const actionHeader = shallow(<div>{defaultCols[4].header}</div>)
    expect(actionHeader.find(Button)).toHaveLength(1)
    actionHeader.find(Button).first().simulate("click")
    expect(createSpy).toHaveBeenCalled()
    const actionContent = shallow(<div>{defaultCols[4].content(survey)}</div>)
    expect(actionContent.find(OrlyButtonContainer)).toHaveLength(1)
  })
  it("can getSurveyColumns with surveyCreationDisabled", () => {
    const defaultCols = getSurveyColumns({...defaultSurveyParams, surveyCreationDisabled: true})
    expect(defaultCols).toHaveLength(5)
    // renders titles correctly
    const title = shallow(<div>{defaultCols[0].content(survey)}</div>)
    expect(title.html()).toContain(survey.title)
    // renders condition correctly
    const condition = shallow(<div>{defaultCols[1].content(survey)}</div>)
    expect(condition.html()).toContain("<div>projects__survey_overlay_closed_participation</div>")
    // renders participants correctly
    const participants = shallow(<div>{defaultCols[2].content(survey)}</div>)
    expect(participants.html()).toContain("projects__surveys_table_participants_column")
    // renders status correctly
    const status = shallow(<div>{defaultCols[3].content(survey)}</div>)
    expect(status.find(Icon).prop("name")).toEqual(
      getSurveyListIcon(survey.startsAt, survey.endsAt, survey.isCompleted)
    )
    expect(status.html()).toContain(getSurveyTimingLabel(fakeTranslate, survey))
    expect(status.find(Text)).toHaveLength(1)
    // renders actions correctly
    const actionHeader = shallow(<div>{defaultCols[4].header}</div>)
    expect(actionHeader.find(Button)).toHaveLength(1)
    expect(actionHeader.find(Button).prop("disabled")).toBe(true)
    const actionContent = shallow(<div>{defaultCols[4].content(survey)}</div>)
    expect(actionContent.find(OrlyButtonContainer)).toHaveLength(1)
  })
})
