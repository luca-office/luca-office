import {MockedProvider} from "@apollo/client/testing"
import {act, renderHook} from "@testing-library/react-hooks"
import * as React from "react"
import {surveyInvitationsMock} from "shared/graphql/__mocks__"
import {createSurveyInvitationsMutation} from "shared/graphql/mutations"
import {surveyInvitationsQuery} from "shared/graphql/queries"
import {Children} from "shared/styles"
import {removeTypename} from "shared/utils"
import wait from "waait"
import {surveyInvitationCreationMock, surveyInvitationCreationResultMock} from "../../../../../graphql/__mocks__"
import {useManageInvitationsModal, UseManageInvitationsModalProps} from "../use-manage-invitations-modal"

const surveyId: UUID = "usoifs-sfipjsd-qqeqwe"
const props: UseManageInvitationsModalProps = {
  invitationProcessLoading: true,
  existingInvitations: ["cap3@cap3.de"],
  handleInvitations: jest.fn()
}

const getConnectedHook = () =>
  renderHook(() => useManageInvitationsModal(props), {
    wrapper: ({children}: Children) => (
      <MockedProvider
        addTypename={true}
        mocks={[
          {
            request: {
              query: surveyInvitationsQuery,
              variables: {surveyId}
            },
            result: {
              data: {surveyInvitations: surveyInvitationsMock.map(invite => removeTypename(invite))}
            }
          },
          {
            request: {
              query: createSurveyInvitationsMutation,
              variables: {creations: [surveyInvitationCreationMock]}
            },
            result: {
              data: {
                createSurveyInvitations: [surveyInvitationCreationResultMock]
              }
            }
          }
        ]}>
        <React.Fragment>{children}</React.Fragment>
      </MockedProvider>
    )
  })

describe("useInviteAttendeesModal", () => {
  describe("createInvitationsLoading", () => {
    it("should default to be defined", async () => {
      const {result} = getConnectedHook()
      expect(result.current.createInvitationsLoading).toEqual(props.invitationProcessLoading)
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
})
