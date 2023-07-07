import {css} from "@emotion/react"
import {debounce} from "lodash"
import * as React from "react"
import {Heading, Icon, Label, ReadonlyActionField, Text, TextInput} from "shared/components"
import {indexToCellName} from "shared/components/spreadsheet"
import {HeadingLevel, InputType} from "shared/enums"
import {OfficeTool} from "shared/graphql/generated/globalTypes"
import {InputValueScenarioCodingAutomatedCriterion} from "shared/models"
import {Flex, insetShadow, spacingMedium, spacingSmall, TextSize} from "shared/styles"
import {useLucaTranslation} from "shared/translations"
import {iconForOfficeTool, labelKeyForInputValue, Option} from "shared/utils"
import {borderRadius} from "../../../../../../../styles/common"
import {CreateOrUpdateInputValueContentModalContainer} from "./create-or-update-input-value-criterion-modal-container"

export interface UpdateInputValueContentProps {
  readonly criterion: InputValueScenarioCodingAutomatedCriterion
  readonly codingItemId: UUID
  readonly isChooseDocumentModalVisible: boolean
  readonly onChangeInputValue: (value: string) => void
  readonly scenarioId: UUID
  readonly codingModelId: UUID
  readonly setIsChooseDocumentModalVisible: React.Dispatch<React.SetStateAction<boolean>>
}

const onChangeDebounceTimeInMilliseconds = 300

export const UpdateInputValueContent: React.FC<UpdateInputValueContentProps> = ({
  criterion,
  onChangeInputValue,
  isChooseDocumentModalVisible,
  setIsChooseDocumentModalVisible,
  scenarioId,
  codingModelId,
  codingItemId
}) => {
  const {t} = useLucaTranslation()

  return (
    <div>
      <Label label={t("coding_criteria__item_meta_data_automated_rule")} />
      <div css={styles.content}>
        <Heading level={HeadingLevel.h3}>
          {t("coding_models__create_item_label_rating_type_automated_input_value")}
        </Heading>
        <Text customStyles={styles.text}>
          {t("coding_models__create_item_label_rating_type_automated_input_value_hint")}
        </Text>
        <div css={styles.wrapper}>
          <ReadonlyActionField
            label={t("document")}
            onClick={() => setIsChooseDocumentModalVisible(true)}
            buttonLabel={t("edit_button")}
            renderValue={() => (
              <div css={Flex.row}>
                <Icon customStyles={styles.icon} name={iconForOfficeTool(criterion.officeTool)} />
                <Text size={TextSize.Medium}>{`${t(labelKeyForInputValue(criterion.officeTool))}`}</Text>
              </div>
            )}
          />
          {criterion.officeTool === OfficeTool.SpreadsheetEditor && (
            <ReadonlyActionField
              label={t("erp__cell_short")}
              renderValue={() => (
                <div css={Flex.row}>
                  <Text size={TextSize.Medium}>
                    {criterion.spreadsheetColumnIndex !== null && criterion.spreadsheetRowIndex !== null
                      ? `${t("coding_models__automated_item_input_value_preview_spreadsheet_specific_cell", {
                          cellName: `(${indexToCellName({
                            columnIndex: criterion.spreadsheetColumnIndex,
                            rowIndex: criterion.spreadsheetRowIndex
                          })})`
                        })}`
                      : t("coding_models__automated_item_input_value_preview_spreadsheet_whole_table")}
                  </Text>
                </div>
              )}
            />
          )}
          <TextInput
            type={InputType.text}
            onChange={debounce(onChangeInputValue, onChangeDebounceTimeInMilliseconds)}
            labelKey="coding_models__automated_item_input_value_value"
            value={criterion.value}
          />
        </div>
      </div>
      {isChooseDocumentModalVisible && (
        <CreateOrUpdateInputValueContentModalContainer
          onConfirm={() => setIsChooseDocumentModalVisible(false)}
          onDismiss={() => setIsChooseDocumentModalVisible(false)}
          criterion={Option.of(criterion)}
          scenarioId={scenarioId}
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
  preview: css({
    height: "85vh",
    width: "85vw"
  }),
  wrapper: css({
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: spacingMedium
  }),
  select: css({
    marginTop: spacingMedium,
    width: "50%"
  }),
  text: css({
    marginBottom: spacingMedium,
    marginTop: spacingSmall
  }),
  icon: css({
    marginRight: spacingSmall
  })
}
