import {act, renderHook} from "@testing-library/react-hooks"
import {Email} from "shared/models"
import {Option} from "shared/utils"
import wait from "waait"
import {emailsMock} from "../../../../hooks/__mocks__/emails.mock"
import {useEmailDirectoriesFooter} from "../use-email-directories-footer"

const getConnectedHook = (actionsDisabled = false, mail = Option.of(emailsMock[0] as Email)) =>
  renderHook(() => useEmailDirectoriesFooter(actionsDisabled, mail))

describe("use-email-directories-footer", () => {
  describe("showCreateEmailModal", () => {
    it("should be defined", async () => {
      const {result} = getConnectedHook()
      expect(result.current.showCreateEmailModal).toBeDefined()
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
    it("should be undefined if actions are disabled", async () => {
      const {result} = getConnectedHook(true)
      expect(result.current.showCreateEmailModal).toBeUndefined()
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
  describe("handleCreateClick", () => {
    it("should be defined", async () => {
      const {result} = getConnectedHook()
      expect(result.current.handleCreateClick).toBeDefined()
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
    it("should be undefined if actions are disabled and no opening mail is present", async () => {
      const {result} = getConnectedHook(true, Option.none())
      expect(result.current.handleCreateClick).toBeUndefined()
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
    it("should be defined if actions are disabled and opening mail is present", async () => {
      const {result} = getConnectedHook(true)
      expect(result.current.handleCreateClick).toBeDefined()
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
})
