import {css} from "@emotion/react"
import * as React from "react"
import {Column, Columns, CustomSelect, Heading, Label, Text} from "shared/components"
import {HeadingLevel} from "shared/enums"
import {FeatureType, OfficeTool} from "shared/graphql/generated/globalTypes"
import {FeatureUsageScenarioCodingAutomatedCriterion} from "shared/models"
import {insetShadow, spacingMedium} from "shared/styles"
import {useLucaTranslation} from "shared/translations"
import {featureUsageMap} from "shared/utils"
import {featureUsageToolSelectOptions} from "../config/select-option"

interface Props {
  readonly criterion: FeatureUsageScenarioCodingAutomatedCriterion
  readonly onChangeTool: (officeTool: OfficeTool) => void
  readonly onChangeFeatureType: (featureType: FeatureType) => void
}

export const FeatureUsageContent: React.FC<Props> = ({criterion, onChangeFeatureType, onChangeTool}) => {
  const {t} = useLucaTranslation()

  return (
    <div>
      <Label label={t("coding_criteria__item_meta_data_automated_rule")} />
      <div css={styles.content}>
        <Heading level={HeadingLevel.h3}>
          {t("coding_models__create_item_label_rating_type_automated_tool_usage")}
        </Heading>
        <Text customStyles={styles.text}>
          {t("coding_models__create_item_label_rating_type_automated_tool_usage_hint")}
        </Text>
        <Columns>
          <Column>
            <CustomSelect
              customStyles={styles.select}
              onChange={tool => onChangeTool(tool as OfficeTool)}
              value={criterion.officeTool}
              labelKey="coding_criteria__automated_criterion_tool_usage_column"
              name="officeTool"
              optionList={featureUsageToolSelectOptions(t)}
            />
          </Column>
          <Column>
            <CustomSelect
              customStyles={styles.select}
              onChange={featureType => onChangeFeatureType(featureType as FeatureType)}
              value={criterion.featureType}
              labelKey="coding_models__automated_item_feature_usage_table_header"
              name="featureType"
              optionList={
                featureUsageMap
                  .get(criterion.officeTool)
                  ?.map(info => ({label: t(info.languageKey), value: info.featureType})) ?? []
              }
            />
          </Column>
        </Columns>
      </div>
    </div>
  )
}

const styles = {
  content: css({
    padding: spacingMedium,
    boxShadow: insetShadow
  }),
  select: css({
    marginTop: spacingMedium,
    width: "100%"
  }),
  text: css({
    marginBottom: spacingMedium
  })
}
