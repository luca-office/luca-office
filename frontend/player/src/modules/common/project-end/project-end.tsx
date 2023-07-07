import {css} from "@emotion/react"
import * as React from "react"
import {AppHeader, DesktopBackgroundOverlay, Heading, Text} from "shared/components"
import {styles as desktopStyles} from "shared/components/desktop/desktop.styles"
import {HeadingLevel} from "shared/enums"
import {Flex, FontWeight, headerHeight, spacingCard, spacingLarge, spacingSmall, TextSize} from "shared/styles"
import {useLucaTranslation} from "shared/translations"

interface Props {
  readonly token: string
}

export const ProjectEnd: React.FC<Props> = ({token}) => {
  const {t} = useLucaTranslation()
  return (
    <div css={desktopStyles.container}>
      <AppHeader title={t("project__end_successful_header")} />
      <DesktopBackgroundOverlay
        customStyles={styles.backgroundOverlay}
        customContentStyles={[styles.backgroundOverlayContent, styles.content]}>
        <div className="desktop-final-content" css={styles.content}>
          <Heading customStyles={{marginBottom: spacingCard}} level={HeadingLevel.h2}>
            {t("project__end_successful_title")}
          </Heading>
          <Text size={TextSize.Smaller}>{t("project__end_successful_text")}</Text>
          <div css={styles.tokenRow}>
            <Heading fontWeight={FontWeight.Bold} level={HeadingLevel.h3}>
              {t("project__start_dialog_text_confirm_modal_code")}
            </Heading>
            <Text customStyles={styles.token}>{token}</Text>
          </div>
        </div>
      </DesktopBackgroundOverlay>
    </div>
  )
}

const styles = {
  content: css(Flex.column, {
    alignItems: "center",
    justifyContent: "center"
  }),
  tokenRow: css(Flex.row, {
    marginTop: spacingLarge,
    alignItems: "center"
  }),
  token: css({
    marginLeft: spacingSmall,
    fontSize: TextSize.Medium
  }),
  backgroundOverlay: css({
    height: `calc(100vh - ${headerHeight}px)`
  }),
  backgroundOverlayContent: css({
    maxWidth: 600,
    margin: "auto"
  })
}
