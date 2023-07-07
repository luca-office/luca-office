import {projectModulesMock, surveysMock} from "shared/graphql/__mocks__"
import {ProjectModuleProgressType} from "shared/graphql/generated/globalTypes"
import {ProjectModule} from "shared/models"
import {getSurveyStatusLabelKey, Option} from "shared/utils"
import {fakeTranslate} from "sharedTests/utils/translate-mock"
import {getSurveyProgressData} from "../dashboard-data"

const survey = surveysMock[0]
const moduleData = surveysMock[0].projectModuleProgresses[0]
const module = Option.of<ProjectModule>(projectModulesMock[0])

describe("dashboard-data", () => {
  it("can getSurveyProgressData", async () => {
    const data = getSurveyProgressData(survey, Option.none(), fakeTranslate)
    expect(data).toHaveLength(3)
    expect(data[0].key).toEqual("invited")
    expect(data[0].value).toEqual(
      survey.invitationsCount - survey.inProgressParticipationsCount - survey.completedParticipationsCount
    )
    expect(data[1].key).toEqual("active")
    expect(data[1].value).toEqual(survey.inProgressParticipationsCount)
    expect(data[2].key).toEqual("completed")
    expect(data[2].value).toEqual(survey.completedParticipationsCount)

    // with module
    const dataMod = getSurveyProgressData(
      survey,
      module.map(module => module.id),
      fakeTranslate
    )
    expect(dataMod).toHaveLength(3)
    expect(dataMod[0].key).toEqual("invited")
    expect(dataMod[0].value).toEqual(
      survey.invitationsCount - moduleData.inProgressParticipationsCount - moduleData.completedParticipationsCount
    )
    expect(dataMod[1].key).toEqual("active")
    expect(dataMod[1].value).toEqual(moduleData.inProgressParticipationsCount)
    expect(dataMod[2].key).toEqual("completed")
    expect(dataMod[2].value).toEqual(moduleData.completedParticipationsCount)
  })
  it("can getScoringProgressData", async () => {
    const data = getSurveyProgressData(survey, Option.none(), fakeTranslate)
    expect(data).toHaveLength(3)
  })
  it("can getSurveyStatusLabelKey", async () => {
    expect(getSurveyStatusLabelKey(undefined)).toBeDefined()
    expect(getSurveyStatusLabelKey(ProjectModuleProgressType.InProgress)).toBeDefined()
    expect(getSurveyStatusLabelKey(ProjectModuleProgressType.Completed)).toBeDefined()
  })
})
