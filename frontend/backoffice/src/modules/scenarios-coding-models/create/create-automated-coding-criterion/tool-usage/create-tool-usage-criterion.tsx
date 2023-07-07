import {css} from "@emotion/react"
import * as React from "react"
import {Column, Columns, CustomSelect, Modal, Overlay, Text} from "shared/components"
import {OfficeTool} from "shared/graphql/generated/globalTypes"
import {insetShadow, spacingMedium} from "shared/styles"
import {useLucaTranslation} from "shared/translations"
import {toolUsageSelectOptions} from "../../../common/edit-coding-criterion-modal/coding-criteria-card/automated-criteria-content/config/select-option"

interface Props {
  readonly selectedTool: OfficeTool | null
  readonly onDismiss: () => void
  readonly onConfirm: () => void
  readonly onChangeTool: (officeTool: OfficeTool) => void
  readonly alreadyUsedTools: OfficeTool[]
}

export const CreateToolUsageCriterion: React.FC<Props> = ({
  selectedTool,
  alreadyUsedTools,
  onDismiss,
  onChangeTool,
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
                optionList={toolUsageSelectOptions(t).filter(
                  value => !alreadyUsedTools.includes(value.value as OfficeTool)
                )}
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
