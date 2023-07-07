import {Salutation} from "../generated/globalTypes"
import {UserAccountFragment} from "../generated/UserAccountFragment"

export const userAccountsMock: UserAccountFragment[] = [
  {
    __typename: "UserAccount",
    id: "c3eaff0d-e1f9-4efd-aac5-ffef3a571057",
    createdAt: new Date(2020, 10, 5).toISOString(),
    modifiedAt: new Date(2020, 10, 15).toISOString(),
    email: "test-user@cap3.de",
    firstName: "John",
    lastName: "Doe",
    organization: "Cap3 GmbH",
    salutation: Salutation.Mr,
    mayAdministrateUserAccounts: false,
    mayArchive: false,
    mayFinalizeWithoutPublishing: false,
    mayAdministrateRScripts: false
  },
  {
    __typename: "UserAccount",
    id: "8ceeb865-8db7-4518-a9b9-b54427b325bf",
    createdAt: new Date(2020, 10, 5).toISOString(),
    modifiedAt: new Date(2020, 10, 15).toISOString(),
    email: "max-mustermann@cap3.de",
    firstName: "Max",
    lastName: "Mustermann",
    organization: "Cap3 GmbH",
    salutation: Salutation.Mr,
    mayAdministrateUserAccounts: true,
    mayArchive: false,
    mayFinalizeWithoutPublishing: false,
    mayAdministrateRScripts: false
  },
  {
    __typename: "UserAccount",
    id: "39c69c40-04df-4922-8395-8cb7e4b276e2",
    createdAt: new Date(2020, 10, 5).toISOString(),
    modifiedAt: new Date(2020, 10, 15).toISOString(),
    email: "marianne-musterfrau@cap3.de",
    firstName: "Marianne",
    lastName: "Musterfrau",
    organization: "Cap3 GmbH",
    salutation: Salutation.Mrs,
    mayAdministrateUserAccounts: false,
    mayArchive: false,
    mayFinalizeWithoutPublishing: true,
    mayAdministrateRScripts: false
  }
]
