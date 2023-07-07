import React, {useState} from "react"
import {UserAccountUpdate} from "shared/graphql/generated/globalTypes"
import {questionnairesQuery, scenariosQuery} from "shared/graphql/queries"
import {UserGlobalClaim} from "../../../enums"
import {UserAccount} from "../../../models"
import {useEditUser} from "../../users/edit/hooks"
import {UserGlobalClaimsState} from "../detail/user-management-detail-container"
import {isClaimSelected} from "../utils/user-management"
import {EditUserClaimsModal} from "./edit-user-claims-modal"

export interface EditUserClaimsModalContainerProps {
  readonly onConfirm: () => void
  readonly onDismiss: () => void
  readonly user: UserAccount
}

export const EditUserClaimsModalContainer: React.FC<EditUserClaimsModalContainerProps> = ({
  user,
  onConfirm,
  onDismiss
}) => {
  const defaultClaimsState: UserGlobalClaimsState[] = [
    {isSelected: user.mayAdministrateUserAccounts, claim: UserGlobalClaim.UserManagement},
    {isSelected: user.mayArchive, claim: UserGlobalClaim.Archive},
    {isSelected: user.mayFinalizeWithoutPublishing, claim: UserGlobalClaim.FinalizeWithoutPublishing},
    {isSelected: user.mayAdministrateRScripts, claim: UserGlobalClaim.RScripts}
  ]
  const [userClaimsState, setUserClaims] = useState<UserGlobalClaimsState[]>(defaultClaimsState)

  const {updateAccount, userAccount, updateLoading} = useEditUser([
    {query: scenariosQuery},
    {query: questionnairesQuery, variables: {isRuntimeSurvey: false}}
  ])

  const handleClaimClick = (claim: UserGlobalClaim) =>
    setUserClaims(
      userClaimsState.map(claimState =>
        claimState.claim === claim ? {...claimState, isSelected: !claimState.isSelected} : claimState
      )
    )

  const handleUpdateUser = () => {
    const userUpdate: UserAccountUpdate = {
      firstName: user.firstName,
      lastName: user.lastName,
      organization: user.organization,
      salutation: user.salutation,
      mayAdministrateUserAccounts: isClaimSelected(UserGlobalClaim.UserManagement, userClaimsState),
      mayArchive: isClaimSelected(UserGlobalClaim.Archive, userClaimsState),
      mayFinalizeWithoutPublishing: isClaimSelected(UserGlobalClaim.FinalizeWithoutPublishing, userClaimsState),
      mayAdministrateRScripts: isClaimSelected(UserGlobalClaim.RScripts, userClaimsState)
    }
    updateAccount(user.id, userUpdate).then(onConfirm)
  }

  return (
    <EditUserClaimsModal
      isCurrentUser={userAccount.exists(currentUser => currentUser.id === user.id)}
      userClaims={userClaimsState}
      onClaimClick={handleClaimClick}
      user={user}
      onConfirm={handleUpdateUser}
      onDismiss={onDismiss}
      isUpdateLoading={updateLoading}
    />
  )
}
