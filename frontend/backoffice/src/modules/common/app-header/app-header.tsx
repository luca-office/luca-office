import {css} from "@emotion/react"
import * as React from "react"
import {Heading} from "shared/components"
import {HeadingLevel} from "shared/enums"
import {
  fontColorLight,
  headerBoxShadow,
  headerHeight,
  primaryColor,
  spacing,
  spacingMedium,
  spacingSmall,
  zIndexHeader
} from "shared/styles"
import {useLucaTranslation} from "shared/translations"
import {AppMode} from "../../../enums"
import {Route} from "../../../routes"
import {AccountMenu} from "./account-menu/account-menu"
import {AppModeSelect} from "./app-mode-select/app-mode-select"
import {getHeaderNavigationItems, HeaderMenuItem} from "./utils/navigation-config"

interface Props {
  readonly activeRoute: Route | undefined
  readonly appMode: AppMode
  readonly navigate: (route: Route) => void
  readonly userMayAdministrateRScripts: boolean
}

export const AppHeader: React.FC<Props> = ({appMode, activeRoute, navigate, userMayAdministrateRScripts}) => {
  const {t} = useLucaTranslation()

  const isActiveItem = (menuItem: HeaderMenuItem) => activeRoute && activeRoute.indexOf(menuItem.route) !== -1

  return (
    <div css={styles.wrapper}>
      <AppModeSelect />
      <menu role="menu" css={styles.menu}>
        {getHeaderNavigationItems(appMode, t, userMayAdministrateRScripts).map(menuItem => (
          <React.Fragment key={menuItem.route}>
            <Heading
              className={"nav-item"}
              level={HeadingLevel.h5}
              customStyles={[styles.heading(!!menuItem.disabled), isActiveItem(menuItem) && styles.activeHeading]}
              color={isActiveItem(menuItem) ? "primary" : undefined}
              onClick={!!menuItem.disabled || isActiveItem(menuItem) ? () => null : () => navigate(menuItem.route)}>
              {menuItem.label}
            </Heading>
            {menuItem.showSeparator && <div css={styles.separator} />}
          </React.Fragment>
        ))}
      </menu>
      <AccountMenu />
    </div>
  )
}

const styles = {
  wrapper: css({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    height: headerHeight,
    background: "white",
    position: "relative",
    zIndex: zIndexHeader,
    boxShadow: headerBoxShadow
  }),
  menu: css({
    flex: "60%",
    display: "flex",
    justifyContent: "center"
  }),
  heading: (isDisabled: boolean) =>
    css({
      display: "flex",
      alignItems: "center",
      margin: spacing(0, spacingMedium),
      cursor: isDisabled ? "not-allowed" : "pointer",
      borderBottom: "2px solid transparent",
      height: headerHeight - 2,
      color: isDisabled ? fontColorLight : undefined
    }),
  activeHeading: {
    borderBottom: `2px solid ${primaryColor}`
  },
  separator: css({
    display: "flex",
    alignItems: "center",
    alignSelf: "center",
    height: spacingMedium,
    width: 1,
    backgroundColor: "rgba(79, 130, 207, 0.24)",
    borderRadius: "1px",
    margin: spacing(2, spacingSmall - 1, 0, spacingSmall)
  })
}
