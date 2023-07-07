import {LucaI18nLangKey} from "shared/translations"
import {UserGlobalClaim} from "../../../enums"
import {UserGlobalClaimsState} from "../detail/user-management-detail-container"

export const userRightsToCheckBoxLabelKey = (right: UserGlobalClaim): LucaI18nLangKey => {
  switch (right) {
    case UserGlobalClaim.Archive:
      return "user_management__filter_label_archive"
    case UserGlobalClaim.FinalizeWithoutPublishing:
      return "user_management__filter_label_finalize"
    case UserGlobalClaim.UserManagement:
      return "user_management__filter_label_management"
    case UserGlobalClaim.RScripts:
      return "user_management__filter_label_r_scripts_short"
  }
}

export const isClaimSelected = (claim: UserGlobalClaim, allClaimsState: UserGlobalClaimsState[]) =>
  allClaimsState.some(globalClaim => globalClaim.claim === claim && globalClaim.isSelected)
