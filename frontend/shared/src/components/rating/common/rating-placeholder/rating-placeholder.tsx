import {css} from "@emotion/react"
import * as React from "react"
import {HeadingLevel} from "../../../../enums"
import {Flex, flex1, headerHeight, spacingTinier, subHeaderHeight} from "../../../../styles"
import {useLucaTranslation} from "../../../../translations"
import {DesktopBackgroundOverlay} from "../../../desktop/desktop-background-overlay"
import {Heading, Text} from "../../../typography/typography"

export interface RatingPlaceholderProps {
  readonly title?: string
  readonly description?: string
}

export const RatingPlaceholder: React.FC<RatingPlaceholderProps> = ({title, description}: RatingPlaceholderProps) => {
  const {t} = useLucaTranslation()
  return (
    <DesktopBackgroundOverlay
      customStyles={styles.backgroundOverlay}
      customContentStyles={styles.backgroundOverlayContent}>
      <div css={styles.wrapper}>
        <Heading customStyles={styles.headline} level={HeadingLevel.h4}>
          {title ?? t("rating__rating__placeholder_headline")}
        </Heading>
        <Text>{description ?? t("rating__rating__placeholder_text")}</Text>
      </div>
    </DesktopBackgroundOverlay>
  )
}

const styles = {
  backgroundOverlay: css({
    width: "100%",
    height: `calc(100vh - ${headerHeight + subHeaderHeight}px)`
  }),
  backgroundOverlayContent: css(Flex.column, {
    alignItems: "center",
    justifyContent: "center"
  }),
  wrapper: css(Flex.column, {
    flex: flex1,
    alignContent: "center",
    alignItems: "center",
    textAlign: "center",
    justifyContent: "center",
    width: 400,
    margin: "auto"
  }),
  headline: css({
    marginBottom: spacingTinier
  })
}
