import {act, renderHook} from "@testing-library/react-hooks"
import {codingDimensionsMock} from "shared/graphql/__mocks__"
import {fakeTranslate} from "sharedTests/utils/translate-mock"
import wait from "waait"
import {getRaterRatingProjectModuleColumns} from "../../../../../../config/project-module-table.config"
import {useRaterRatingProjectModuleTable} from "../use-rater-rating-project-module-table"

const getConnectedHook = () =>
  renderHook(() =>
    useRaterRatingProjectModuleTable({
      fullyRatedParticipantCount: 6,
      codingDimensions: codingDimensionsMock
    })
  )

describe("use-rater-rating-project-module-table", () => {
  describe("columns", () => {
    it("should have correct value", async () => {
      const {result} = getConnectedHook()
      expect(result.current.columns.toString()).toEqual(
        getRaterRatingProjectModuleColumns(fakeTranslate, codingDimensionsMock, 6).toString()
      )
      await act(() => wait(0))
    })
  })
})
