import {css} from "@emotion/react"
import * as React from "react"
import {HeadingLevel, IconName} from "../../enums"
import {
  Flex,
  flex0,
  flex1,
  headerBoxShadow,
  headerHeight,
  spacing,
  spacingHuge,
  spacingSmall,
  textEllipsis,
  zIndex2
} from "../../styles"
import {useLucaTranslation} from "../../translations"
import {Heading, Icon, ProgressTimeClock, Text} from ".."

interface Props {
  readonly title: string
  readonly maxModuleTimeInSeconds?: number
  readonly fictiveDate?: Date
}

export const AppHeader: React.FC<Props> = ({title, maxModuleTimeInSeconds, fictiveDate}) => {
  const {t} = useLucaTranslation()

  const appTitle = (
    <div css={styles.appTitle} className="app-title">
      <Icon name={IconName.LucaLogo} width={24} height={24} customStyles={styles.appLogo} />
      <Heading level={HeadingLevel.h5}>{t("header__app_title")}</Heading>
    </div>
  )

  return (
    <div css={styles.container}>
      {appTitle}
      <Text css={styles.title}>
        <span css={textEllipsis}>{title}</span>
      </Text>
      <ProgressTimeClock
        fictiveDate={fictiveDate}
        maxModuleTimeInSeconds={maxModuleTimeInSeconds}
        customStyles={styles.progressClock}
      />
    </div>
  )
}

const Sizes = {
  container: 250
}

const styles = {
  container: css(Flex.row, {
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    height: headerHeight,
    minHeight: headerHeight,
    padding: spacing(0, spacingHuge),
    boxSizing: "border-box",
    background: "white",
    position: "relative",
    zIndex: zIndex2,
    boxShadow: headerBoxShadow,
    userSelect: "none"
  }),
  appTitle: css(Flex.row, {
    flex: flex0,
    alignItems: "center",
    minWidth: Sizes.container
  }),
  appLogo: css({
    marginRight: spacingSmall
  }),
  title: css({
    display: "flex",
    flex: flex1,
    minWidth: 0,
    justifyContent: "center"
  }),
  progressClock: css({
    minWidth: Sizes.container
  })
}
