import {act, renderHook} from "@testing-library/react-hooks"
import {surveyInvitationsMock} from "shared/graphql/__mocks__"
import wait from "waait"
import {ratingProjectModulesMock} from "../../../../../../__mocks__/rating-project-modules.mock"
import {useRaterRatingParticipantTable} from "../use-rater-rating-participant-table"

const getConnectedHook = () =>
  renderHook(() =>
    useRaterRatingParticipantTable({
      surveyInvitations: surveyInvitationsMock,
      ratingProjectModules: ratingProjectModulesMock
    })
  )

describe("use-rater-rating-participant-table", () => {
  describe("indexedSurveyInvitations", () => {
    it("should be defined", async () => {
      const {result} = getConnectedHook()
      expect(result.current.indexedSurveyInvitations).toBeDefined()
      await act(() => wait(0))
    })
  })
  describe("columns", () => {
    it("should be defined", async () => {
      const {result} = getConnectedHook()
      expect(result.current.columns).toBeDefined()
      await act(() => wait(0))
    })
  })
})
