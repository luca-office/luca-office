import * as React from "react"
import {Icon} from "shared/components"
import {IconName} from "shared/enums"
import {iconNameOfLanguageKey, LanugageKeys, useLucaTranslation} from "shared/translations"
import {Route} from "../../../../routes"
import {accountMenuStyle} from "./account-menu.style"
import {useAccountMenu} from "./hooks"

export const AccountMenu: React.FC = () => {
  const {
    logout,
    activeLanguage,
    isMenuVisible,
    toggleMenu,
    openAccountSettings,
    userAccount,
    setStoredSelectedLanguage
  } = useAccountMenu()
  const {t} = useLucaTranslation()

  const renderLink = (handler: () => void, icon: IconName, text: string, route: string) => {
    const handleClick = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
      if (event) {
        event.preventDefault()
      }
      handler()
      toggleMenu()
    }

    return (
      <a href={route} role="menuitem" onClick={handleClick} css={accountMenuStyle.link}>
        <Icon name={icon} customStyles={accountMenuStyle.menuIcon} />
        {text}
      </a>
    )
  }

  return userAccount
    .map(user => (
      <React.Fragment>
        <div css={accountMenuStyle.container}>
          <div onClick={toggleMenu} css={accountMenuStyle.infoLine}>
            {user.email} <Icon name={IconName.User} customStyles={accountMenuStyle.infoLineIcon} />
          </div>
          {isMenuVisible && (
            <menu css={accountMenuStyle.menu}>
              <div css={accountMenuStyle.menuHeadline}>
                <Icon name={IconName.User} customStyles={accountMenuStyle.menuIcon} /> {user.email}
              </div>

              <a css={accountMenuStyle.link}>
                <Icon
                  name={iconNameOfLanguageKey[activeLanguage as LanugageKeys] ?? IconName.German}
                  customStyles={accountMenuStyle.menuIcon}
                />
                {`${t("account__language")} (${activeLanguage})`}
                <menu className="langauge-menu" css={accountMenuStyle.languageMenu}>
                  <a role="menuitem" onClick={() => setStoredSelectedLanguage("en")} css={accountMenuStyle.link}>
                    <Icon name={IconName.English} customStyles={accountMenuStyle.menuIcon} />
                    {t("lang_en")}
                  </a>

                  <a role="menuitem" onClick={() => setStoredSelectedLanguage("de")} css={accountMenuStyle.link}>
                    <Icon name={IconName.German} customStyles={accountMenuStyle.menuIcon} />
                    {t("lang_de")}
                  </a>

                  <a role="menuitem" onClick={() => setStoredSelectedLanguage("es")} css={accountMenuStyle.link}>
                    <Icon name={IconName.Spanish} customStyles={accountMenuStyle.menuIcon} />
                    {t("lang_es")}
                  </a>
                </menu>
              </a>

              {renderLink(openAccountSettings, IconName.LockClosed, t("header__user_my_account"), Route.MyAccount)}
              {renderLink(logout, IconName.Logout, t("header__user_logout"), Route.Scenarios)}
            </menu>
          )}
          {}
        </div>
        {isMenuVisible && <div css={accountMenuStyle.backdrop} onClick={toggleMenu} />}
      </React.Fragment>
    ))
    .orNull()
}
