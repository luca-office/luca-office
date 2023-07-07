import i18next from "i18next"
import {useCallback, useState} from "react"
import {useDispatch} from "react-redux"
import {useCheckLogin} from "shared/graphql/hooks"
import {LucaAppLanguage, UserAccountForLogin} from "shared/models"
import {Option} from "shared/utils"
import {useLogout} from "../../../../../graphql/hooks"
import {navigateToRouteAction} from "../../../../../redux/actions/navigation-action"
import {Route} from "../../../../../routes"

export interface UseAccountMenuHook {
  readonly isMenuVisible: boolean
  readonly activeLanguage: string
  readonly logout: () => void
  readonly openAccountSettings: () => void
  readonly toggleMenu: () => void
  readonly userAccount: Option<UserAccountForLogin>
  readonly setStoredSelectedLanguage: (language: LucaAppLanguage) => void
}

export const useAccountMenu = (): UseAccountMenuHook => {
  const [isMenuVisible, toggleMenuVisibility] = useState(false)
  const {logout} = useLogout()
  const {account: userAccount} = useCheckLogin()
  const dispatch = useDispatch()

  const openAccountSettings = useCallback(() => {
    dispatch(navigateToRouteAction(Route.MyAccount))
  }, [])

  const toggleMenu = () => {
    toggleMenuVisibility(!isMenuVisible)
  }

  const handleSetStoredSelectedLanguage = (language: LucaAppLanguage) => i18next.changeLanguage(language)

  const activeLanguage = i18next.language

  return {
    isMenuVisible,
    activeLanguage,
    logout,
    openAccountSettings,
    toggleMenu,
    userAccount,
    setStoredSelectedLanguage: handleSetStoredSelectedLanguage
  }
}
