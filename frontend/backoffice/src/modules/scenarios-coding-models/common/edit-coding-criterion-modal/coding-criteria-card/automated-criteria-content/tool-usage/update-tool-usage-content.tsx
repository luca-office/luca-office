import {css} from "@emotion/react"
import * as React from "react"
import {CustomSelect, Heading, Label, Text} from "shared/components"
import {HeadingLevel} from "shared/enums"
import {OfficeTool} from "shared/graphql/generated/globalTypes"
import {ToolUsageScenarioCodingAutomatedCriterion} from "shared/models"
import {insetShadow, spacingMedium} from "shared/styles"
import {useLucaTranslation} from "shared/translations"
import {toolUsageSelectOptions} from "../config/select-option"

interface Props {
  readonly criterion: ToolUsageScenarioCodingAutomatedCriterion
  readonly onChangeTool: (officeTool: OfficeTool) => void
  readonly alreadyUsedTools: OfficeTool[]
}

export const UpdateToolUsageContent: React.FC<Props> = ({criterion, onChangeTool, alreadyUsedTools}) => {
  const {t} = useLucaTranslation()

  const usedToolsExceptCurrent = alreadyUsedTools.filter(tool => tool !== criterion.officeTool)

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
        <CustomSelect
          customStyles={styles.select}
          onChange={tool => onChangeTool(tool as OfficeTool)}
          value={criterion.officeTool}
          labelKey="coding_criteria__automated_criterion_tool_usage_column"
          optionList={toolUsageSelectOptions(t).filter(
            option => !usedToolsExceptCurrent.includes(option.value as OfficeTool)
          )}
        />
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
    width: "50%"
  }),
  text: css({
    marginBottom: spacingMedium
  })
}
