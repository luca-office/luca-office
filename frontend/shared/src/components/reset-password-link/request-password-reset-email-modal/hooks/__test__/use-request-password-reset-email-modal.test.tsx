import {act, renderHook} from "@testing-library/react-hooks"
import * as React from "react"
import wait from "waait"
import {mockedFormMethods} from "../../../../../../tests/utils/form-methods-mock"
import * as useRequestResetPasswordModalHook from "../use-request-password-reset-email-modal"
import {useRequestPasswordResetEmail, UseRequestResetPasswordModalHook} from "../use-request-password-reset-email-modal"

const requestPasswordResetEmailHookValuesDefault: UseRequestResetPasswordModalHook = {
  formMethods: mockedFormMethods,
  requestPasswordResetEmail: jest.fn(() => Promise.resolve({})),
  showSuccessModal: jest.fn()
}
const requestPasswordResetEmailSpy = jest.spyOn(useRequestResetPasswordModalHook, "useRequestPasswordResetEmail")

const getConnectedHook = () => renderHook(() => useRequestPasswordResetEmail())

describe("useRequestPasswordResetEmail", () => {
  describe("formMethods", () => {
    it("should default to be defined", async () => {
      requestPasswordResetEmailSpy.mockReturnValue(requestPasswordResetEmailHookValuesDefault)
      const {result} = getConnectedHook()
      expect(result.current.formMethods).toBeDefined()
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
})
