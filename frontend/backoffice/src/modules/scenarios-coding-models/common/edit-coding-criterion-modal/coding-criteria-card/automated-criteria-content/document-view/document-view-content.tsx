import {css} from "@emotion/react"
import * as React from "react"
import {Heading, Icon, Label, ReadonlyActionField, Text} from "shared/components"
import {HeadingLevel} from "shared/enums"
import {DocumentViewScenarioCodingAutomatedCriterion} from "shared/models"
import {borderRadius, Flex, insetShadow, spacingMedium, spacingSmall, TextSize} from "shared/styles"
import {useLucaTranslation} from "shared/translations"
import {iconForDocumentViewCodingCriterion, labelDocumentViewCodingCriterionActionField, Option} from "shared/utils"
import {
  CreateOrUpdateDocumentViewCriterionContainer,
  DocumentViewCriterionDisplayMode
} from "../../../../../create/create-automated-coding-criterion/document-view/create-or-update-document-view-criterion-container"
import {getErpDocumentViewTitle} from "../../../../../detail/coding-criterion/coding-criterion-util"

interface Props {
  readonly criterion: DocumentViewScenarioCodingAutomatedCriterion
  readonly scenarioId: UUID
  readonly codingModelId: UUID
  readonly titleForDocumentViewCodingCriterion: (criterion: DocumentViewScenarioCodingAutomatedCriterion) => string
  readonly setIsUpdateModalVisible: React.Dispatch<React.SetStateAction<boolean>>
  readonly isUpdateModalVisible: boolean
}

export const DocumentViewContent: React.FC<Props> = ({
  criterion,
  titleForDocumentViewCodingCriterion,
  isUpdateModalVisible,
  setIsUpdateModalVisible,
  scenarioId,
  codingModelId
}) => {
  const {t} = useLucaTranslation()
  return (
    <div>
      <Label label={t("coding_criteria__item_meta_data_automated_rule")} />
      <div css={styles.content}>
        <Heading level={HeadingLevel.h3}>
          {t("coding_models__create_item_label_rating_type_automated_document_view")}
        </Heading>
        <Text customStyles={styles.text}>
          {t("coding_models__create_item_label_rating_type_automated_document_view_hint")}
        </Text>
        <ReadonlyActionField
          label={labelDocumentViewCodingCriterionActionField(criterion, t)}
          onClick={() => setIsUpdateModalVisible(true)}
          buttonLabel={t("edit_button")}
          renderValue={() => (
            <div css={Flex.row}>
              <Icon customStyles={styles.icon} name={iconForDocumentViewCodingCriterion(criterion)} />
              <Text size={TextSize.Medium}>{`${
                criterion.erpTableType !== null
                  ? getErpDocumentViewTitle(criterion, t)
                  : titleForDocumentViewCodingCriterion(criterion)
              }`}</Text>
            </div>
          )}
        />
      </div>

      {isUpdateModalVisible && (
        <CreateOrUpdateDocumentViewCriterionContainer
          criterion={Option.of(criterion)}
          codingItemId={criterion.itemId}
          displayMode={DocumentViewCriterionDisplayMode.Update}
          onSuccess={() => setIsUpdateModalVisible(false)}
          onDismiss={() => setIsUpdateModalVisible(false)}
          scenarioId={scenarioId}
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
  text: css({
    marginBottom: spacingMedium,
    marginTop: spacingSmall
  }),
  icon: css({
    marginRight: spacingSmall
  })
}
