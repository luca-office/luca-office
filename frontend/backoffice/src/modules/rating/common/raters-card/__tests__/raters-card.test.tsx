import {MockedProvider} from "@apollo/client/testing"
import {shallow} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {Button, Card, CardContent, CardFooter, CardHeader, Heading, Text} from "shared/components"
import {ratingsMock, surveysMock, userAccountsMock} from "shared/graphql/__mocks__"
import {inviteSurveyRatersMutation} from "shared/graphql/mutations"
import {RaterInvitationOverlay} from "../../rater-invitation-overlay/rater-invitation-overlay"
import {RaterPaper} from "../../rater-paper/rater-paper"
import * as useRatersCardHook from "../hooks/use-raters-card"
import {UseRatersCardHook} from "../hooks/use-raters-card"
import {RatersCard, RatersCardProps} from "../raters-card"

const survey = surveysMock[0]
const emails = userAccountsMock.map(mock => mock.email)

const defaultProps: RatersCardProps = {
  surveyId: survey.id
}

const stateHookValuesDefault: UseRatersCardHook = {
  ratersCount: userAccountsMock.length,
  raterEntities: userAccountsMock.map(mock => ({raterId: mock.id, email: mock.email, finalized: false})),
  raterEmails: emails,
  inviteOverlayVisible: false,
  showInviteOverlay: jest.fn(),
  hideInviteOverlay: jest.fn(),
  raters: userAccountsMock,
  ratings: ratingsMock,
  isRatingFinalized: false
}

const stateSpy = jest.spyOn(useRatersCardHook, "useRatersCard")

const getComponent = (props?: Partial<UseRatersCardHook>) => (
  <MockedProvider
    mocks={[
      {
        request: {
          query: inviteSurveyRatersMutation,
          variables: {surveyId: survey.id, emails}
        },
        result: {
          data: {
            inviteSurveyRaters: ""
          }
        }
      }
    ]}
    addTypename={true}>
    <RatersCard {...{...defaultProps, ...props}} />
  </MockedProvider>
)

describe("raters-card", () => {
  it("renders correctly", async () => {
    stateSpy.mockReturnValue(stateHookValuesDefault)
    const component = create(getComponent())
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("renders correctly (invite-overlay visible)", async () => {
    stateSpy.mockReturnValue({...stateHookValuesDefault, inviteOverlayVisible: true})
    const component = create(getComponent())
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("renders correctly (no raters)", async () => {
    stateSpy.mockReturnValue({...stateHookValuesDefault, ratersCount: 0})
    const component = create(getComponent())
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("has correct structure", async () => {
    stateSpy.mockReturnValue(stateHookValuesDefault)
    const component = getComponent()
    const tree = shallow(component).childAt(0).dive()

    expect(tree.find(Heading)).toHaveLength(1)
    expect(tree.find(RaterInvitationOverlay)).toHaveLength(0)

    const cardComponent = tree.find(Card)
    expect(cardComponent).toHaveLength(1)

    const cardComponentContent = cardComponent.dive()
    expect(cardComponent.find(CardHeader)).toHaveLength(1)

    const cardContentComponent = cardComponentContent.find(CardContent)
    expect(cardContentComponent).toHaveLength(1)

    const cardContentComponentContent = cardContentComponent.dive()
    expect(cardContentComponentContent.find(RaterPaper)).toHaveLength(userAccountsMock.length)
    expect(cardContentComponentContent.find(Text)).toHaveLength(0)
    expect(cardContentComponentContent.find(Button)).toHaveLength(0)

    const cardFooterComponent = cardComponentContent.find(CardFooter)
    expect(cardFooterComponent).toHaveLength(1)
    expect(cardFooterComponent.dive().find(Button)).toHaveLength(1)
  })
  it("has correct structure (invite-overlay visible)", async () => {
    stateSpy.mockReturnValue({...stateHookValuesDefault, inviteOverlayVisible: true})
    const component = getComponent()
    const tree = shallow(component).childAt(0).dive()

    expect(tree.find(Heading)).toHaveLength(1)
    expect(tree.find(RaterInvitationOverlay)).toHaveLength(1)

    const cardComponent = tree.find(Card)
    expect(cardComponent).toHaveLength(1)

    const cardComponentContent = cardComponent.dive()
    expect(cardComponent.find(CardHeader)).toHaveLength(1)

    const cardContentComponent = cardComponentContent.find(CardContent)
    expect(cardContentComponent).toHaveLength(1)

    const cardContentComponentContent = cardContentComponent.dive()
    expect(cardContentComponentContent.find(RaterPaper)).toHaveLength(userAccountsMock.length)
    expect(cardContentComponentContent.find(Text)).toHaveLength(0)
    expect(cardContentComponentContent.find(Button)).toHaveLength(0)

    const cardFooterComponent = cardComponentContent.find(CardFooter)
    expect(cardFooterComponent).toHaveLength(1)
    expect(cardFooterComponent.dive().find(Button)).toHaveLength(1)
  })
  it("has correct structure (no raters)", async () => {
    stateSpy.mockReturnValue({...stateHookValuesDefault, ratersCount: 0})
    const component = getComponent()
    const tree = shallow(component).childAt(0).dive()

    expect(tree.find(Heading)).toHaveLength(1)
    expect(tree.find(RaterInvitationOverlay)).toHaveLength(0)

    const cardComponent = tree.find(Card)
    expect(cardComponent).toHaveLength(1)

    const cardComponentContent = cardComponent.dive()
    expect(cardComponent.find(CardHeader)).toHaveLength(1)

    const cardContentComponent = cardComponentContent.find(CardContent)
    expect(cardContentComponent).toHaveLength(1)

    const cardContentComponentContent = cardContentComponent.dive()
    expect(cardContentComponentContent.find(RaterPaper)).toHaveLength(0)
    expect(cardContentComponentContent.find(Text)).toHaveLength(1)
    expect(cardContentComponentContent.find(Button)).toHaveLength(1)

    const cardFooterComponent = cardComponentContent.find(CardFooter)
    expect(cardFooterComponent).toHaveLength(1)
    expect(cardFooterComponent.dive().find(Button)).toHaveLength(1)
  })
})
