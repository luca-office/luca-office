import {LucaTFunction} from "shared/translations"
import {AppMode} from "../../../../enums"
import {Route} from "../../../../routes"

export interface HeaderMenuItem {
  readonly label: string
  readonly route: Route
  readonly disabled?: boolean
  readonly showSeparator?: boolean
}

export const getHeaderNavigationItems = (
  appMode: AppMode,
  t: LucaTFunction,
  userMayAdministrateRScripts: boolean
): HeaderMenuItem[] => {
  switch (appMode) {
    case AppMode.MANAGER: {
      return []
    }
    case AppMode.EDITOR:
      return [
        {label: t("navigation__scenarios"), route: Route.Scenarios},
        {label: t("navigation__questionnaires"), route: Route.Questionnaires, showSeparator: true},
        {label: t("navigation__reference_books"), route: Route.ReferenceBookChapters},
        {label: t("navigation__sample_companies"), route: Route.SampleCompanies},
        {label: t("navigation__events"), route: Route.Events},
        ...(userMayAdministrateRScripts ? [{label: t("navigation__r_scripts"), route: Route.RScripts}] : [])
      ]
    default:
      return []
  }
}
