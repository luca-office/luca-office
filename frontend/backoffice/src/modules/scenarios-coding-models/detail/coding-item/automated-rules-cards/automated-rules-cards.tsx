import {css} from "@emotion/react"
import * as React from "react"
import {Column, Columns, Label, SelectableCard, SelectionIconType} from "shared/components"
import {AutomatedCodingItemRule} from "shared/graphql/generated/globalTypes"
import {spacingHuge, spacingMedium} from "shared/styles"
import {useLucaTranslation} from "shared/translations"

export interface AutomatedRulesCardsProps {
  readonly selectedRule: AutomatedCodingItemRule
  readonly setSelectedRule: React.Dispatch<React.SetStateAction<AutomatedCodingItemRule>>
}

export const AutomatedRulesCards: React.FC<AutomatedRulesCardsProps> = ({selectedRule, setSelectedRule}) => {
  const {t} = useLucaTranslation()

  return (
    <>
      <Label label={t("coding_models__create_item_label_rating_type_automated_title")} />
      <Columns>
        <Column>
          <SelectableCard
            customStyles={styles.typeCard}
            selectionIconType={SelectionIconType.RADIO}
            selected={selectedRule === AutomatedCodingItemRule.DocumentView}
            onClick={() => setSelectedRule(AutomatedCodingItemRule.DocumentView)}
            text={t("coding_models__create_item_label_rating_type_automated_document_view_hint")}
            title={t("coding_models__create_item_label_rating_type_automated_document_view")}
          />
        </Column>
        <Column>
          <SelectableCard
            customStyles={styles.typeCard}
            selectionIconType={SelectionIconType.RADIO}
            selected={selectedRule === AutomatedCodingItemRule.FeatureUsage}
            onClick={() => setSelectedRule(AutomatedCodingItemRule.FeatureUsage)}
            text={t("coding_models__create_item_label_rating_type_automated_feature_usage_hint")}
            title={t("coding_models__create_item_label_rating_type_automated_feature_usage")}
          />
        </Column>
        <Column>
          <SelectableCard
            customStyles={styles.typeCard}
            selectionIconType={SelectionIconType.RADIO}
            selected={selectedRule === AutomatedCodingItemRule.ToolUsage}
            onClick={() => setSelectedRule(AutomatedCodingItemRule.ToolUsage)}
            text={t("coding_models__create_item_label_rating_type_automated_tool_usage_hint")}
            title={t("coding_models__create_item_label_rating_type_automated_tool_usage")}
          />
        </Column>
      </Columns>
      <Columns customStyles={styles.secondRowWrapper}>
        <Column customStyles={styles.secondRow}>
          <SelectableCard
            customStyles={styles.typeCard}
            selectionIconType={SelectionIconType.RADIO}
            selected={selectedRule === AutomatedCodingItemRule.InputValue}
            onClick={() => setSelectedRule(AutomatedCodingItemRule.InputValue)}
            text={t("coding_models__create_item_label_rating_type_automated_input_value_hint")}
            title={t("coding_models__create_item_label_rating_type_automated_input_value")}
          />
        </Column>
        <Column customStyles={styles.secondRow}>
          <SelectableCard
            customStyles={styles.typeCard}
            selectionIconType={SelectionIconType.RADIO}
            selected={selectedRule === AutomatedCodingItemRule.RScript}
            onClick={() => setSelectedRule(AutomatedCodingItemRule.RScript)}
            text={t("coding_models__create_item_label_rating_type_automated_r_script_hint")}
            title={t("coding_models__create_item_label_rating_type_automated_r_script")}
          />
        </Column>
      </Columns>
    </>
  )
}

const styles = {
  hint: css({
    marginBottom: spacingMedium
  }),
  row: css({
    marginTop: spacingHuge
  }),
  secondRow: css({
    flexGrow: 0,
    flexBasis: "33%"
  }),
  secondRowWrapper: css({
    marginTop: spacingMedium
  }),
  typeCard: css({
    height: 100
  })
}
