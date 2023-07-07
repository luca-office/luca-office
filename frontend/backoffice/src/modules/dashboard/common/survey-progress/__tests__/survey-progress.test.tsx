import {shallow} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {Card, CardContent, CardHeader} from "shared/components"
import {ratingsMock, surveysMock, userAccountsMock} from "shared/graphql/__mocks__"
import {SurveyUserAccountsHook as UseSurveyUserAccountsHook, UseRatingsHook} from "shared/graphql/hooks"
import * as useRatingsHook from "shared/graphql/hooks/queries/ratings/use-ratings"
import * as useSurveyUserAccountsHook from "shared/graphql/hooks/queries/survey/use-survey-user-accounts"
import {Option} from "shared/utils"
import {DonutChartWithLegend, RatingProgressCard} from "../../../../../components"
import {surveyResultsOverviewMock} from "../../../../../graphql/__mocks__"
import {ReportingCard} from "../reporting-card/reporting-card"
import {SurveyProgress, SurveyProgressProps} from "../survey-progress"

const survey = surveysMock[0]

const defaultProps: SurveyProgressProps = {
  navigateToProjectDashboard: jest.fn(),
  navigateToReportingOverview: jest.fn(),
  navigateToRatingOverview: jest.fn(),
  surveyResultsOverview: Option.of(surveyResultsOverviewMock),
  survey,
  isRatingFinalized: false,
  raters: userAccountsMock,
  completedParticipantsCount: {
    numCompletedParticipants: 3,
    totalParticipants: 6
  }
}

const ratingsHookValuesDefault: UseRatingsHook = {
  ratingsLoading: false,
  ratings: ratingsMock
}
const ratingsSpy = jest.spyOn(useRatingsHook, "useRatings")

const surveyUserAccountsHookValuesDefault: UseSurveyUserAccountsHook = {
  surveyUserAccountsLoading: false,
  surveyUserAccounts: userAccountsMock
}
const surveyUserAccountsSpy = jest.spyOn(useSurveyUserAccountsHook, "useSurveyUserAccounts")

const useComponent = (props?: Partial<SurveyProgressProps>) => <SurveyProgress {...defaultProps} {...props} />

describe("survey-progress", () => {
  it("renders correctly", () => {
    ratingsSpy.mockReturnValue(ratingsHookValuesDefault)
    surveyUserAccountsSpy.mockReturnValue(surveyUserAccountsHookValuesDefault)
    const component = create(useComponent())
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  it("has correct structure", () => {
    ratingsSpy.mockReturnValue(ratingsHookValuesDefault)
    surveyUserAccountsSpy.mockReturnValue(surveyUserAccountsHookValuesDefault)
    const component = shallow(useComponent())
    expect(component.find(Card)).toHaveLength(2)
    expect(component.find(ReportingCard)).toHaveLength(1)
    expect(component.find(CardContent)).toHaveLength(2)
    expect(component.find(CardHeader)).toHaveLength(2)
    expect(component.find(DonutChartWithLegend)).toHaveLength(1)
    expect(component.find(RatingProgressCard)).toHaveLength(1)
  })
})
