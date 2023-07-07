import {css} from "@emotion/react"
import * as React from "react"
import {Heading, Icon, Label, Paper, Text} from "shared/components"
import {HeadingLevel, IconName} from "shared/enums"
import {RScript, RScriptScenarioCodingAutomatedCriterion} from "shared/models"
import {borderRadius, Flex, insetShadow, spacingMedium, spacingSmall} from "shared/styles"
import {useLucaTranslation} from "shared/translations"
import {Option} from "shared/utils"
import {
  CreateOrUpdateRScriptModalContainer,
  RScriptCriterionDisplayMode
} from "../../../../create-or-update-r-script-modal/create-or-update-r-script-modal-container"

interface Props {
  readonly rScript: RScript
  readonly criterion: RScriptScenarioCodingAutomatedCriterion
  readonly codingItemId: UUID
  readonly codingModelId: UUID
  readonly isSelectRScriptModalVisible: boolean
  readonly setIsSelectRScriptModalVisible: React.Dispatch<React.SetStateAction<boolean>>
}

export const RScriptContent: React.FC<Props> = ({
  rScript,
  criterion,
  isSelectRScriptModalVisible,
  codingItemId,
  codingModelId,
  setIsSelectRScriptModalVisible
}) => {
  const {t} = useLucaTranslation()
  return (
    <div>
      <Label label={t("coding_criteria__item_meta_data_automated_rule")} />
      <div css={styles.content}>
        <Heading level={HeadingLevel.h3}>{t("coding_models__automated_item_r_scripts_column_header")}</Heading>
        <Text customStyles={styles.text}>{t("coding_models__automated_item_r_scripts_edit_content_description")}</Text>

        <Label label={t("coding_models__automated_item_r_scripts_edit_content_selected_script_label")} />
        <Paper>
          <div css={styles.heading}>
            <Heading level={HeadingLevel.h3}>{rScript.title || t("r_scripts__title_placeholder")}</Heading>
            <Icon
              customStyles={styles.icon}
              onClick={() => setIsSelectRScriptModalVisible(true)}
              name={IconName.Close}
            />
          </div>
          <Text>{rScript.description}</Text>
        </Paper>
      </div>
      {isSelectRScriptModalVisible && (
        <CreateOrUpdateRScriptModalContainer
          onDismiss={() => setIsSelectRScriptModalVisible(false)}
          onSuccess={() => setIsSelectRScriptModalVisible(false)}
          displayMode={RScriptCriterionDisplayMode.Update}
          criterion={Option.of(criterion)}
          codingItemId={codingItemId}
          codingModelId={codingModelId}
        />
      )}
    </div>
  )
}

const styles = {
  content: css({
    padding: spacingMedium,
    boxShadow: insetShadow,
    borderRadius: borderRadius
  }),
  heading: css(Flex.row, {
    justifyContent: "space-between",
    marginBottom: spacingSmall
  }),
  icon: css({
    cursor: "pointer"
  }),
  text: css({
    marginBottom: spacingMedium,
    marginTop: spacingSmall
  }),
  card: css({
    cursor: "initial"
  })
}
