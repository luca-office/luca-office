import {css} from "@emotion/react"
import * as React from "react"
import {Card, Icon, Text} from "shared/components"
import {IconName} from "shared/enums"
import {ScoringType} from "shared/graphql/generated/globalTypes"
import {AutomatedCodingItem, CodingItem} from "shared/models"
import {FontWeight, spacing, spacingMedium, spacingSmall, spacingTiny, TextSize} from "shared/styles"
import {useLucaTranslation} from "shared/translations"
import {isAutomatedCodingItem, languageKeyForAutomatedRule, Option} from "shared/utils"

export interface ItemMetaCardProps {
  readonly codingItem: Option<CodingItem>
}

export const CodingItemMetaCard: React.FC<ItemMetaCardProps> = ({codingItem}) => {
  const {t} = useLucaTranslation()

  const isAutomatedItem = codingItem.exists(item => isAutomatedCodingItem(item))

  return (
    <Card customStyles={styles.codingItemCard} hasShadow={true}>
      <div css={styles.codingItemWrapper}>
        <div css={styles.codingItemMeta(isAutomatedItem)}>
          <div css={styles.labeledContent}>
            <Text size={TextSize.Medium} customStyles={styles.textLabel}>
              {t("coding_criteria__item_meta_data_title")}
            </Text>
            <Text size={TextSize.Medium}>{codingItem.map(item => item.title).orNull()}</Text>
          </div>
          <div css={styles.labeledContent}>
            <Text size={TextSize.Medium} customStyles={styles.textLabel}>
              {t("coding_criteria__item_meta_data_method")}
            </Text>
            <div css={styles.codingItemIconWrapper}>
              <Icon name={IconName.Mouse} />
              <Text size={TextSize.Medium}>
                {t(
                  !isAutomatedItem
                    ? "coding_criteria__item_meta_data_method_manual"
                    : "coding_criteria__item_meta_data_method_automatic"
                )}
              </Text>
            </div>
          </div>
          <div css={styles.labeledContent}>
            <Text size={TextSize.Medium} customStyles={styles.textLabel}>
              {t("coding_criteria__item_meta_data_type")}
            </Text>
            <div css={styles.codingItemIconWrapper}>
              {codingItem
                .map(item => (
                  <Icon
                    name={item.scoringType === ScoringType.Holistic ? IconName.SingleChoice : IconName.MultipleChoice}
                  />
                ))
                .orNull()}
              <Text size={TextSize.Medium}>
                {codingItem
                  .map(item =>
                    item.scoringType === ScoringType.Holistic
                      ? t("coding_criteria__item_meta_data_type_holistic")
                      : t("coding_criteria__item_meta_data_type_analytical")
                  )
                  .orNull()}
              </Text>
            </div>
          </div>
          {isAutomatedItem && (
            <div css={styles.labeledContent}>
              <Text size={TextSize.Medium} customStyles={styles.textLabel}>
                {t("coding_criteria__item_meta_data_automated_rule")}
              </Text>
              <div css={styles.codingItemIconWrapper}>
                <Text size={TextSize.Medium}>
                  {codingItem.map(item => t(languageKeyForAutomatedRule((item as AutomatedCodingItem).rule))).orNull()}
                </Text>
              </div>
            </div>
          )}
        </div>

        <div css={styles.labeledContent}>
          <Text size={TextSize.Medium} customStyles={styles.textLabel}>
            {t("coding_criteria__item_meta_data_description")}
          </Text>
          <Text size={TextSize.Medium}>{codingItem.map(item => item.description).orNull()}</Text>
        </div>
      </div>
    </Card>
  )
}

const styles = {
  textLabel: css({
    fontWeight: FontWeight.Bold
  }),
  labeledContent: css({
    display: "grid",
    gridRowGap: spacingTiny,
    gridTemplateRows: "minmax(min-content, max-content) minmax(0, 1fr)"
  }),
  codingItemCard: css({
    padding: spacing(spacingSmall, spacingMedium, spacingMedium, spacingMedium)
  }),
  codingItemWrapper: css({
    display: "grid",
    gridRowGap: spacingMedium + spacingTiny,
    gridTemplateRows: "minmax(min-content, max-content) minmax(0, 1fr)"
  }),
  codingItemMeta: (isAutomatedItem: boolean) =>
    css({
      display: "grid",
      gridColumnGap: spacingMedium,
      gridTemplateColumns: `repeat(${isAutomatedItem ? 4 : 3}, 1fr)`
    }),
  codingItemIconWrapper: css({
    display: "grid",
    gridColumnGap: spacingSmall,
    gridTemplateColumns: "minmax(min-content, max-content) minmax(0, 1fr)"
  })
}
