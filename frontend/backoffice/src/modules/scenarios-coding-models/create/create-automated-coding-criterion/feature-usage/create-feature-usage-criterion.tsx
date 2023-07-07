import {css} from "@emotion/react"
import * as React from "react"
import {Column, Columns, CustomSelect, Modal, Overlay, Text} from "shared/components"
import {FeatureType, OfficeTool} from "shared/graphql/generated/globalTypes"
import {insetShadow, spacingMedium} from "shared/styles"
import {useLucaTranslation} from "shared/translations"
import {featureUsageMap} from "shared/utils"
import {
  featureUsageToolSelectOptions,
  toolUsageSelectOptions
} from "../../../common/edit-coding-criterion-modal/coding-criteria-card/automated-criteria-content/config/select-option"

interface Props {
  readonly selectedTool: OfficeTool | null
  readonly selectedFeatureType: FeatureType | null
  readonly onDismiss: () => void
  readonly onConfirm: () => void
  readonly onChangeTool: (officeTool: OfficeTool) => void
  readonly onChangeFeatureType: (featureType: FeatureType) => void
}

export const CreateFeatureUsageCriterion: React.FC<Props> = ({
  selectedTool,
  selectedFeatureType,
  onDismiss,
  onChangeTool,
  onChangeFeatureType,
  onConfirm
}) => {
  const {t} = useLucaTranslation()

  return (
    <Overlay>
      <Modal
        customStyles={styles.modal}
        onConfirm={onConfirm}
        confirmButtonDisabled={selectedTool === null}
        onDismiss={onDismiss}
        confirmButtonKey="create_button"
        title={t("coding_models__create_item_label_rating_type_automated_tool_usage")}
        preventDismissOnEscape={true}
        preventSubmitOnEnter={true}>
        <div>
          <Text customStyles={styles.text}>
            {t("coding_models__create_item_label_rating_type_automated_tool_usage_hint")}
          </Text>
          <Columns>
            <Column>
              <CustomSelect
                customStyles={styles.select}
                onChange={tool => onChangeTool(tool as OfficeTool)}
                value={selectedTool ?? ""}
                labelKey="coding_criteria__automated_criterion_tool_usage_column"
                optionList={featureUsageToolSelectOptions(t)}
              />
            </Column>
            <Column>
              <CustomSelect
                customStyles={styles.select}
                onChange={featureType => onChangeFeatureType(featureType as FeatureType)}
                value={selectedFeatureType ?? ""}
                labelKey="coding_models__automated_item_feature_usage_table_header"
                name="featureType"
                optionList={
                  selectedTool !== null
                    ? featureUsageMap
                        .get(selectedTool)
                        ?.map(info => ({label: t(info.languageKey), value: info.featureType})) ?? []
                    : []
                }
              />
            </Column>
          </Columns>
        </div>
      </Modal>
    </Overlay>
  )
}

const styles = {
  preview: css({
    height: "85vh",
    width: "85vw"
  }),
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
  }),
  modal: css({
    width: "60vw"
  })
}
