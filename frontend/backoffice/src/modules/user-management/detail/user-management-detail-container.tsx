import React, {useState} from "react"
import {useDispatch} from "react-redux"
import {NotificationSeverity} from "shared/enums"
import {useCheckLogin, useUserAccounts} from "shared/graphql/hooks"
import {AppNotification} from "shared/models"
import {Option} from "shared/utils"
import {UserGlobalClaim} from "../../../enums"
import {UserAccount} from "../../../models"
import {navigateToRouteAction} from "../../../redux/actions/navigation-action"
import {updateNotification} from "../../../redux/actions/ui/common-ui-action"
import {Route} from "../../../routes"
import {isClaimSelected} from "../utils/user-management"
import {UserManagementDetail} from "./user-management-detail"

export interface UserGlobalClaimsState {
  readonly claim: UserGlobalClaim
  readonly isSelected: boolean
}

export const UserManagementDetailContainer = () => {
  const defaultUserGlobalClaimsState: UserGlobalClaimsState[] = [
    {isSelected: false, claim: UserGlobalClaim.UserManagement},
    {isSelected: false, claim: UserGlobalClaim.Archive},
    {isSelected: false, claim: UserGlobalClaim.FinalizeWithoutPublishing},
    {isSelected: false, claim: UserGlobalClaim.RScripts}
  ]

  const [globalClaims, setGlobalClaims] = useState<UserGlobalClaimsState[]>(defaultUserGlobalClaimsState)
  const [searchValue, setSearchValue] = useState("")
  const [userForEditingModal, setUserForEditingModal] = useState<Option<UserAccount>>(Option.none())

  const dispatch = useDispatch()

  const {userAccounts} = useUserAccounts()

  const {account, checkLoginLoading} = useCheckLogin()

  const toggleUserClaim = (right: UserGlobalClaim) => {
    setGlobalClaims(
      globalClaims.map(globalRight =>
        globalRight.claim === right ? {...globalRight, isSelected: !globalRight.isSelected} : globalRight
      )
    )
  }

  const administrateUserAccountsChecked = isClaimSelected(UserGlobalClaim.UserManagement, globalClaims)
  const archiveChecked = isClaimSelected(UserGlobalClaim.Archive, globalClaims)
  const finalizeWithoutPublishingChecked = isClaimSelected(UserGlobalClaim.FinalizeWithoutPublishing, globalClaims)
  const administrateRScripts = isClaimSelected(UserGlobalClaim.RScripts, globalClaims)

  const filteredUsers = userAccounts.filter(
    user =>
      (!archiveChecked || user.mayArchive) &&
      (!administrateUserAccountsChecked || user.mayAdministrateUserAccounts) &&
      (!finalizeWithoutPublishingChecked || user.mayFinalizeWithoutPublishing) &&
      (!administrateRScripts || user.mayAdministrateRScripts)
  )

  const searchedUsers = filteredUsers.filter(
    user =>
      user.firstName.toLowerCase().includes(searchValue.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchValue.toLowerCase()) ||
      user.organization.toLowerCase().includes(searchValue.toLowerCase())
  )

  if (account.exists(user => user.mayAdministrateUserAccounts !== true) && !checkLoginLoading) {
    dispatch(navigateToRouteAction(Route.Scenarios))
    dispatch(
      updateNotification(
        Option.of<AppNotification>({
          messageKey: "user_management__missing_claims",
          severity: NotificationSeverity.Error
        })
      )
    )
  }

  return (
    <UserManagementDetail
      setUserForEditingModal={setUserForEditingModal}
      userForEditingModal={userForEditingModal}
      users={searchedUsers}
      searchValue={searchValue}
      onSearchValueChange={text => setSearchValue(text)}
      globalClaims={globalClaims}
      toggleUserClaim={toggleUserClaim}
      ownId={account.map(account => account.id).orUndefined()}
    />
  )
}
