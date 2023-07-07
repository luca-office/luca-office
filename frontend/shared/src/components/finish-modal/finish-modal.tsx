import {css} from "@emotion/react"
import React from "react"
import {ProjectModuleType} from "../../graphql/generated/globalTypes"
import {Flex, flex1, spacing, spacingMedium, spacingSmaller, TextSize} from "../../styles"
import {useLucaTranslation} from "../../translations"
import {Modal, Text} from ".."

export interface FinishModalProps {
  title: string
  onFinish: () => void
  onAbort: () => void
  moduleType: ProjectModuleType
}

export const FinishModal: React.FC<FinishModalProps> = ({title, onFinish, onAbort, moduleType}) => {
  const {t} = useLucaTranslation()

  const description = (
    <div css={styles.description}>
      <Text size={TextSize.Small}>
        {moduleType === ProjectModuleType.Questionnaire
          ? t("questionnaire__finish_questionnaire_text")
          : t("scenario__finish_scenario_text")}
      </Text>
      <Text customStyles={styles.secondText} size={TextSize.Small}>
        {moduleType === ProjectModuleType.Questionnaire
          ? t("questionnaire__finish_questionnaire_question")
          : t("scenario__finish_scenario_question")}
      </Text>
    </div>
  )

  return (
    <Modal
      onConfirm={onFinish}
      onDismiss={onAbort}
      customStyles={styles.modal}
      customButtonStyles={styles.button}
      confirmButtonKey={
        moduleType === ProjectModuleType.Questionnaire
          ? "questionnaire__finish_questionnaire_button"
          : "scenario__finish_scenario_button"
      }
      title={t("project__finish_title", {title})}
      dismissButtonKey="back">
      {description}
    </Modal>
  )
}

const styles = {
  header: css(Flex.row, {
    marginBottom: spacingMedium
  }),
  button: css({
    padding: spacing(0, spacingMedium)
  }),
  description: css({
    marginBottom: spacingMedium,
    flex: flex1,
    overflowY: "auto"
  }),
  modal: css({
    minHeight: "initial"
  }),
  secondText: css({
    marginTop: spacingSmaller,
    marginBottom: spacingMedium
  })
}
