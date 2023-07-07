import * as React from "react"
import {useDispatch} from "react-redux"
import {back, history} from "redux-first-router"
import {Button, Icon} from "shared/components"
import {IconName} from "shared/enums"
import {fontColor} from "shared/styles"
import {useLucaTranslation} from "shared/translations"
import {navigateToRouteAction} from "../../../redux/actions/navigation-action"
import {Route} from "../../../routes"
import {notFoundPageStyle as styles} from "./not-found-page.style"

// eslint-disable-next-line @typescript-eslint/ban-types
export interface NotFoundPageProps<T extends Record<string, unknown> = {}> {
  readonly homeRoute: Route
  readonly urlParams?: T
}

// eslint-disable-next-line @typescript-eslint/ban-types
export const NotFoundPage = <T extends Record<string, unknown> = {}>({homeRoute, urlParams}: NotFoundPageProps<T>) => {
  const {t} = useLucaTranslation()
  const dispatch = useDispatch()

  const navigateToHome = () => {
    dispatch(navigateToRouteAction(homeRoute, urlParams))
  }
  const handleClick = () => (!history()?.length ? navigateToHome() : back())

  return (
    <div css={styles.content}>
      <Icon customStyles={styles.icon} color={fontColor} name={IconName.NotFound} />
      <div css={[styles.text, styles.label]}>{t("not_found__label")}</div>
      <div css={styles.text} />
      <Button customStyles={styles.button} onClick={handleClick}>
        {t("back_button")}
      </Button>
    </div>
  )
}
