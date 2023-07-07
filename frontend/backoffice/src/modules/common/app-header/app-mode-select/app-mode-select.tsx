import {css} from "@emotion/react"
import * as React from "react"
import {Heading, Icon, ReactPortal} from "shared/components"
import {HeadingLevel, IconName} from "shared/enums"
import {spacingHeader, spacingSmall, spacingTiny, zIndexHeaderMenu} from "shared/styles"
import {LucaI18nLangKey, useLucaTranslation} from "shared/translations"
import {AppMode} from "../../../../enums"
import {Route} from "../../../../routes"
import {accountMenuStyle} from "../account-menu/account-menu.style"
import {useAppModeSelect} from "./hooks"

interface MenuEntryElement {
  readonly content: JSX.Element
  readonly appMode: AppMode
}

// Atm, this component has a very similar look to account menu
// however, it is not merged into an extracted (global) component yet, as there might be changes incoming from design
// that can be handled more efficiently it these two components stay seperated
export const AppModeSelect: React.FC = () => {
  const {t} = useLucaTranslation()
  const {appMode, changeAppMode, isMenuVisible, toggleMenu, account} = useAppModeSelect()

  const navigate = (event: React.MouseEvent<HTMLAnchorElement>) => (appMode: AppMode) => {
    event.preventDefault()
    changeAppMode(appMode)
  }

  const userMayAdministrateUserAccounts = account.exists(user => user.mayAdministrateUserAccounts)

  const renderMenuItems = (selectedAppMode: AppMode) => {
    const editorEntry = (
      <a
        key="editor"
        role="menuitem"
        href={Route.Scenarios}
        onClick={event => navigate(event)(AppMode.EDITOR)}
        css={accountMenuStyle.link}>
        {t("header__label_editor")}
      </a>
    )

    const managerEntry = (
      <a
        key="manager"
        role="menuitem"
        href={Route.Projects}
        onClick={event => navigate(event)(AppMode.MANAGER)}
        css={accountMenuStyle.link}>
        {t("header__label_manager")}
      </a>
    )

    const ratingEntry = (
      <a
        key="rating"
        role="menuitem"
        href={Route.RaterRatingOverview}
        onClick={event => navigate(event)(AppMode.RATING)}
        css={accountMenuStyle.link}>
        {t("header__label_rating")}
      </a>
    )

    const userManagementEntry = (
      <a
        key="user-management"
        role="menuitem"
        href={Route.Projects}
        onClick={event => navigate(event)(AppMode.USERMANAGEMENT)}
        css={accountMenuStyle.link}>
        {t("header__label_user_management")}
      </a>
    )

    const menuEntries: MenuEntryElement[] = [
      {content: editorEntry, appMode: AppMode.EDITOR},
      {content: managerEntry, appMode: AppMode.MANAGER},
      {content: ratingEntry, appMode: AppMode.RATING}
    ]

    if (userMayAdministrateUserAccounts) {
      menuEntries.push({content: userManagementEntry, appMode: AppMode.USERMANAGEMENT})
    }

    return menuEntries.filter(entry => entry.appMode !== selectedAppMode).map(entry => entry.content)
  }

  return (
    <React.Fragment>
      <div css={[accountMenuStyle.container, styles.brand]}>
        <div onClick={toggleMenu} css={[accountMenuStyle.infoLine, styles.menuLine]}>
          <Icon name={IconName.LucaLogo} customStyles={styles.icon} />
          <Heading level={HeadingLevel.h5} className={"luca-title"}>
            {t(`header__label_${appMode}` as LucaI18nLangKey)}
          </Heading>
          <Icon name={IconName.ChevronDown} customStyles={styles.chevron} />
        </div>
        <ReactPortal>
          {isMenuVisible && <menu css={[accountMenuStyle.menu, styles.menu]}>{renderMenuItems(appMode)}</menu>}
        </ReactPortal>
      </div>
      {isMenuVisible && <div css={accountMenuStyle.backdrop} onClick={toggleMenu} className={"backdrop"} />}
    </React.Fragment>
  )
}

const styles = {
  icon: css({
    width: 24,
    height: 24,
    marginRight: spacingSmall
  }),
  chevron: css({
    width: 14,
    height: 14,
    marginLeft: spacingTiny
  }),
  brand: css({
    marginLeft: spacingHeader,
    justifyContent: "flex-start"
  }),
  menu: css({
    width: 200,
    top: 20,
    right: "auto",
    left: 16,
    padding: spacingTiny,
    zIndex: zIndexHeaderMenu
  }),
  menuLine: css({
    justifyContent: "flex-start"
  })
}
