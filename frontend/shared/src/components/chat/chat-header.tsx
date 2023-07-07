import {css} from "@emotion/react"
import * as React from "react"
import {IconName} from "../../enums"
import {
  CustomStyle,
  Flex,
  fontColorLight,
  FontWeight,
  headerBoxShadow,
  spacingHuger,
  spacingSmall,
  zIndex1
} from "../../styles"
import {LucaI18nLangKey, useLucaTranslation} from "../../translations"
import {Button} from "../button/button"
import {Label} from "../label/label"

export interface ChatHeaderButtonConfig {
  readonly icon: IconName
  readonly textKey: LucaI18nLangKey
  readonly onBackNavigation: () => void
}
export interface ChatHeaderProps extends CustomStyle {
  readonly attendeeView: boolean
  readonly title?: string
  readonly buttonConfig?: ChatHeaderButtonConfig
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({title, attendeeView, buttonConfig, customStyles}) => {
  const {t} = useLucaTranslation()

  return (
    <div css={[styles.header, customStyles]}>
      {title && <Label label={title} customStyles={styles.label} />}
      {attendeeView && <Label label={t("chat__supervisor")} customStyles={[styles.label, styles.supervisorLabel]} />}
      {!attendeeView && buttonConfig && (
        <Button onClick={buttonConfig.onBackNavigation} icon={buttonConfig.icon} customStyles={styles.button}>
          {t(buttonConfig.textKey)}
        </Button>
      )}
    </div>
  )
}

const Size = {
  buttonWidth: 225
}

const styles = {
  header: css(Flex.row, {
    boxSizing: "border-box",
    background: "white",
    minHeight: spacingHuger,
    padding: spacingSmall,
    boxShadow: headerBoxShadow,
    justifyContent: "space-between",
    zIndex: zIndex1
  }),
  label: css({
    fontWeight: FontWeight.Regular,
    marginBottom: 0
  }),
  supervisorLabel: css({
    color: fontColorLight
  }),
  button: css({
    minWidth: Size.buttonWidth,
    flexWrap: "nowrap"
  })
}
