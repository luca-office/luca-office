import {Salutation} from "../generated/globalTypes"
import {UserAccountFragment} from "../generated/UserAccountFragment"
import {UserAccount} from "../../models"

export const userAccountMock: UserAccountFragment = {
  __typename: "UserAccount",
  id: "f3d37f8f-7577-4572-8872-240476ab9211",
  createdAt: new Date(2020, 10, 5).toISOString(),
  modifiedAt: new Date(2020, 10, 15).toISOString(),
  email: "test-user@cap3.de",
  firstName: "John",
  lastName: "Doe",
  organization: "Cap3 GmbH",
  salutation: Salutation.Mr,
  mayArchive: false,
  mayAdministrateUserAccounts: false,
  mayFinalizeWithoutPublishing: false,
  mayAdministrateRScripts: false
}
