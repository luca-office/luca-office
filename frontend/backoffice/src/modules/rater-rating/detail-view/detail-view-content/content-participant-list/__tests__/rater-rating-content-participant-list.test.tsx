import * as apolloClient from "@apollo/client"
import {shallow} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {Card, CardContent, LoadingIndicator, Text} from "shared/components"
import {
  checkLoginMock,
  codingDimensionsMock,
  questionnairesMock,
  ratingsMock,
  surveyInvitationsMock,
  surveysMock,
  userAccountMock
} from "shared/graphql/__mocks__"
import {QuestionnairesProps, UseCheckLogin, UseRatingsHook} from "shared/graphql/hooks"
import * as useQuestionnairesHook from "shared/graphql/hooks/queries/questionnaires/use-questionnaires"
import * as useRatingsHook from "shared/graphql/hooks/queries/ratings/use-ratings"
import * as useCheckLoginHook from "shared/graphql/hooks/queries/use-check-login"
import {Option} from "shared/utils"
import {makeFakeClient} from "sharedTests/react-apollo/apollo-fake-client"
import {TabbedCard} from "../../../../../../components"
import {ratingProjectModulesMock} from "../../../../__mocks__/rating-project-modules.mock"
import * as useRaterRatingContentParticipantListHook from "../hooks/use-rater-rating-content-participant-list"
import {UseRaterRatingContentParticipantListHook} from "../hooks/use-rater-rating-content-participant-list"
import {RaterRatingParticipantTable} from "../participant-table/rater-rating-participant-table"
import {RaterRatingProjectModuleTable} from "../project-module-table/rater-rating-project-module-table"
import {
  RaterRatingContentParticipantList,
  RaterRatingContentParticipantListProps
} from "../rater-rating-content-participant-list"

const survey = surveysMock[0]

const defaultProps: RaterRatingContentParticipantListProps = {
  userAccountId: userAccountMock.id,
  survey
}

const stateHookValuesDefault: UseRaterRatingContentParticipantListHook = {
  dataLoading: false,
  participantCount: 12,
  fullyRatedParticipantsCount: 8,
  projectModulesCount: 2,
  fullyRatedProjectModulesCount: 1,
  surveyInvitations: surveyInvitationsMock.map(mock => ({...mock, surveyId: survey.id})),
  ratingProjectModules: ratingProjectModulesMock.map(mock => ({...mock, projectId: survey.project.id})),
  allCodingDimensions: codingDimensionsMock
}

const stateSpy = jest.spyOn(useRaterRatingContentParticipantListHook, "useRaterRatingContentParticipantList")

const fakeClient = makeFakeClient({})
fakeClient.query = jest.fn(
  () =>
    new Promise(resolve => {
      setTimeout(() => resolve({data: {codingDimensions: codingDimensionsMock}}), 100)
    })
) as any

const apolloClientSpy = jest.spyOn(apolloClient, "useApolloClient")

const checkLoginHookValuesDefault: UseCheckLogin = {
  account: Option.of(checkLoginMock),
  checkLoginLoading: false
}
const checkLoginSpy = jest.spyOn(useCheckLoginHook, "useCheckLogin")

const ratingsHookValuesDefault: UseRatingsHook = {
  ratings: ratingsMock,
  ratingsLoading: false
}
const ratingsSpy = jest.spyOn(useRatingsHook, "useRatings")

const questionnairesHookValuesDefault: QuestionnairesProps = {
  questionnaires: Option.of(questionnairesMock),
  questionnairesLoading: false
}
const questionnairesSpy = jest.spyOn(useQuestionnairesHook, "useQuestionnaires")

const getComponent = (props?: Partial<RaterRatingContentParticipantListProps>) => (
  <RaterRatingContentParticipantList {...{...defaultProps, ...props}} />
)

describe("rater-rating-content-participant-list", () => {
  it("renders correctly", () => {
    apolloClientSpy.mockReturnValue(fakeClient)
    stateSpy.mockReturnValue(stateHookValuesDefault)
    checkLoginSpy.mockReturnValue(checkLoginHookValuesDefault)
    ratingsSpy.mockReturnValue(ratingsHookValuesDefault)
    questionnairesSpy.mockReturnValue(questionnairesHookValuesDefault)
    const component = getComponent()
    const tree = create(component).toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("renders correctly (loading)", () => {
    apolloClientSpy.mockReturnValue(fakeClient)
    stateSpy.mockReturnValue({...stateHookValuesDefault, dataLoading: true})
    checkLoginSpy.mockReturnValue(checkLoginHookValuesDefault)
    ratingsSpy.mockReturnValue(ratingsHookValuesDefault)
    questionnairesSpy.mockReturnValue(questionnairesHookValuesDefault)
    const component = getComponent()
    const tree = create(component).toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("has correct structure", () => {
    apolloClientSpy.mockReturnValue(fakeClient)
    stateSpy.mockReturnValue(stateHookValuesDefault)
    checkLoginSpy.mockReturnValue(checkLoginHookValuesDefault)
    ratingsSpy.mockReturnValue(ratingsHookValuesDefault)
    questionnairesSpy.mockReturnValue(questionnairesHookValuesDefault)
    const component = getComponent()
    const tree = shallow(component)

    expect(tree.find(Text)).toHaveLength(1)

    const tabbedCard = tree.find(TabbedCard)
    expect(tabbedCard).toHaveLength(1)

    const card = tabbedCard.dive().find(Card)
    expect(card).toHaveLength(1)

    const cardContent = card.dive().find(CardContent)
    expect(cardContent).toHaveLength(1)

    const tabContents = cardContent.dive().find(".card-tab-content")
    expect(tabContents).toHaveLength(2)
    expect(tabContents.at(0).find(RaterRatingParticipantTable)).toHaveLength(1)
    expect(tabContents.at(0).find(LoadingIndicator)).toHaveLength(0)
    expect(tabContents.at(1).find(RaterRatingProjectModuleTable)).toHaveLength(1)
    expect(tabContents.at(1).find(LoadingIndicator)).toHaveLength(0)
  })
  it("has correct structure (loading)", () => {
    apolloClientSpy.mockReturnValue(fakeClient)
    stateSpy.mockReturnValue({...stateHookValuesDefault, dataLoading: true})
    checkLoginSpy.mockReturnValue(checkLoginHookValuesDefault)
    ratingsSpy.mockReturnValue(ratingsHookValuesDefault)
    questionnairesSpy.mockReturnValue(questionnairesHookValuesDefault)
    const component = getComponent()
    const tree = shallow(component)

    expect(tree.find(Text)).toHaveLength(1)

    const tabbedCard = tree.find(TabbedCard)
    expect(tabbedCard).toHaveLength(1)

    const card = tabbedCard.dive().find(Card)
    expect(card).toHaveLength(1)

    const cardContent = card.dive().find(CardContent)
    expect(cardContent).toHaveLength(1)

    const tabContents = cardContent.dive().find(".card-tab-content")
    expect(tabContents).toHaveLength(2)
    expect(tabContents.at(0).find(RaterRatingParticipantTable)).toHaveLength(0)
    expect(tabContents.at(0).find(LoadingIndicator)).toHaveLength(1)
    expect(tabContents.at(1).find(RaterRatingProjectModuleTable)).toHaveLength(0)
    expect(tabContents.at(1).find(LoadingIndicator)).toHaveLength(1)
  })
})
