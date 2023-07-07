import {CreateUserAccountMutation_createUserAccount} from "../generated/CreateUserAccountMutation"
import {Salutation} from "../generated/globalTypes"

export const createUserAccountMock: CreateUserAccountMutation_createUserAccount = {
  id: "123",
  createdAt: new Date(2020, 12, 12).toISOString(),
  modifiedAt: new Date(2020, 12, 12).toISOString(),
  email: "test@test.de",
  firstName: "test user",
  lastName: "user",
  organization: "Cap3",
  __typename: "UserAccount",
  salutation: Salutation.Mrs,
  mayAdministrateUserAccounts: false,
  mayArchive: false,
  mayFinalizeWithoutPublishing: false,
  mayAdministrateRScripts: false
}
