import {css} from "@emotion/react"
import React from "react"
import {AppHeader, DesktopBackgroundOverlay, Text} from "shared/components"
import {styles as desktopStyles} from "shared/components/desktop/desktop.styles"
import {Flex, headerHeight, TextSize} from "shared/styles"
import {useLucaTranslation} from "shared/translations"

export interface WaitForNextModuleProps {
  readonly isStartScreenOfManualSurvey: boolean
}

export const WaitForNextModule: React.FC<WaitForNextModuleProps> = ({isStartScreenOfManualSurvey}) => {
  const {t} = useLucaTranslation()

  return (
    <div css={desktopStyles.container}>
      <AppHeader title={t("project__wait_for_next_module")} />
      <DesktopBackgroundOverlay
        customStyles={styles.backgroundOverlay}
        customContentStyles={[styles.backgroundOverlayContent, styles.content]}>
        <div css={styles.content}>
          <Text size={TextSize.Medium}>
            {t(isStartScreenOfManualSurvey ? "project__wait_project_start_text" : "project__wait_for_next_module_text")}
          </Text>
        </div>
      </DesktopBackgroundOverlay>
    </div>
  )
}

const styles = {
  backgroundOverlay: css({
    height: `calc(100vh - ${headerHeight}px)`
  }),
  content: css(Flex.column, {
    alignItems: "center",
    justifyContent: "center"
  }),
  backgroundOverlayContent: css({
    maxWidth: 600,
    margin: "auto"
  })
}
