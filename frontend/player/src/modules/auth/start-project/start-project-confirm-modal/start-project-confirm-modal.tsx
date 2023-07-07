import {css} from "@emotion/react"
import React from "react"
import {Heading, Modal, Text} from "shared/components"
import {HeadingLevel} from "shared/enums"
import {SurveyInvitation} from "shared/models"
import {Flex, FontWeight, spacingMedium, spacingSmall, TextSize} from "shared/styles"
import {useLucaTranslation} from "shared/translations"
import {convertSecondsToMinutes} from "shared/utils"

interface Props {
  readonly onConfirm: () => void
  readonly onDismiss: () => void
  readonly surveyInvitation: SurveyInvitation
}

export const StartProjectConfirmModal: React.FC<Props> = ({onConfirm, onDismiss, surveyInvitation}) => {
  const {t} = useLucaTranslation()
  return (
    <Modal
      onConfirm={onConfirm}
      onDismiss={onDismiss}
      customStyles={styles.modal}
      title={`${t("project__start_dialog_title", {title: surveyInvitation.survey.project.name})}`}
      confirmButtonKey="project__start_confirm"
      dismissButtonKey="back_button">
      <Text>
        {t("project__start_dialog_text_confirm_modal", {
          durationInMinutes: convertSecondsToMinutes(surveyInvitation.survey.project.maxDurationInSeconds)
        })}
      </Text>
      <div css={styles.tokenRow}>
        <Heading fontWeight={FontWeight.Bold} level={HeadingLevel.h3}>
          {t("project__start_dialog_text_confirm_modal_code")}
        </Heading>
        <Text customStyles={styles.token} size={TextSize.Medium}>
          {surveyInvitation.token}
        </Text>
      </div>

      <Text customStyles={styles.confirmText}>{t("project__start_dialog_text_2")}</Text>
    </Modal>
  )
}

const styles = {
  modal: css({
    width: "40vw"
  }),
  tokenRow: css(Flex.row, {
    alignItems: "baseline",
    marginTop: spacingMedium,
    marginBottom: spacingMedium
  }),
  token: css({
    marginLeft: spacingSmall
  }),
  confirmText: css({
    marginBottom: spacingMedium
  })
}
