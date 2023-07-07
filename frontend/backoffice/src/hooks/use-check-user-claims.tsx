import {useCheckLogin} from "shared/graphql/hooks"
import {UserAccount} from "shared/models"
import {Option} from "shared/utils"

export interface CheckUserClaimsProps {
  readonly userClaims: Pick<
    UserAccount,
    "mayAdministrateUserAccounts" | "mayArchive" | "mayFinalizeWithoutPublishing" | "mayAdministrateRScripts"
  >
  readonly userClaimsCheckLoading: boolean
}
/**
 *
 * @param elementAuthorId Option of authorId of project elements: Scenario, Questionnaire, Events, Referencebook. If an id is passed and it is equal to the current user, the user mayArchive, even if he doesnt have the corresponding claim
 * @returns
 */
export const useCheckUserClaims = (elementAuthorId?: Option<UUID>): CheckUserClaimsProps => {
  const {account, checkLoginLoading} = useCheckLogin()

  const userMayArchive =
    account.exists(user => user.mayArchive) ||
    (elementAuthorId !== undefined && account.exists(account => account.id === elementAuthorId.orNull()))

  return {
    userClaims: {
      mayAdministrateUserAccounts: account.exists(user => user.mayAdministrateUserAccounts),
      mayArchive: userMayArchive,
      mayFinalizeWithoutPublishing: account.exists(user => user.mayFinalizeWithoutPublishing),
      mayAdministrateRScripts: account.exists(user => user.mayAdministrateRScripts)
    },
    userClaimsCheckLoading: checkLoginLoading
  }
}
