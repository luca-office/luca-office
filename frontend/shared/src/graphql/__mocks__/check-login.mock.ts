import {CheckLoginQuery_checkLogin} from "../generated/CheckLoginQuery"
import {userAccountMock} from "./user-account.mock"

export const checkLoginMock: CheckLoginQuery_checkLogin = {
  ...userAccountMock,
  needsToConfirmBackofficeTermsAndConditions: false
}

export const checkLoginMayAdministrateUserAccountsMock: CheckLoginQuery_checkLogin = {
  ...checkLoginMock,
  mayAdministrateUserAccounts: true
}
