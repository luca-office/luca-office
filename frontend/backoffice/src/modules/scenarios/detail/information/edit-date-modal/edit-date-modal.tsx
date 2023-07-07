import {css} from "@emotion/react"
import {isArray} from "lodash-es"
import * as React from "react"
import {Modal, Overlay, SelectableCard, SelectionIconType, SingleDatePicker, Text} from "shared/components"
import {Flex, spacingCard, spacingLarge, spacingMedium} from "shared/styles"
import {useLucaTranslation} from "shared/translations"

export interface EditDateModalProps {
  readonly isFictiveDateSelected: boolean
  readonly onConfirm: (date: string | null | undefined) => void
  readonly onDismiss: () => void
  readonly selectedFictiveDate: Date
  readonly setIsFictiveDateSelected: React.Dispatch<React.SetStateAction<boolean>>
  readonly setSelectedFictiveDate: React.Dispatch<React.SetStateAction<Date>>
}

export const EditScenarioDateModal: React.FC<EditDateModalProps> = ({
  onDismiss,
  selectedFictiveDate,
  isFictiveDateSelected,
  setIsFictiveDateSelected,
  setSelectedFictiveDate,
  onConfirm
}) => {
  const {t} = useLucaTranslation()

  return (
    <Overlay>
      <Modal
        customStyles={styles.modal}
        title={t("scenario_details__date_edit")}
        onDismiss={onDismiss}
        onConfirm={() => onConfirm(isFictiveDateSelected ? selectedFictiveDate.toISOString() : null)}
        confirmButtonDisabled={isFictiveDateSelected && !selectedFictiveDate}>
        <>
          <Text customStyles={styles.instruction}>{t("scenario_details__date_edit_modal_text")}</Text>
          <SelectableCard
            customStyles={styles.actualDateCard}
            selectionIconType={SelectionIconType.RADIO}
            onClick={() => setIsFictiveDateSelected(false)}
            selected={!isFictiveDateSelected}
            title={t("scenario_details__actual_date")}
            text={t("scenario_details__date_edit_modal_actual_date")}
          />
          <SelectableCard
            selectionIconType={SelectionIconType.RADIO}
            selected={isFictiveDateSelected}
            customStyles={styles.fictiveDateCard}
            onClick={() => setIsFictiveDateSelected(true)}
            title={t("scenario_details__fictive_date")}
            text={t("scenario_details__date_edit_modal_fictive_date")}
            customContent={
              <SingleDatePicker
                customStyles={Flex.column}
                customDatePickerStyles={styles.datePicker}
                onChange={(date: Date | Date[]) => setSelectedFictiveDate(isArray(date) ? date[0] : date)} // is never an array -> avoid type errors
                value={selectedFictiveDate}
              />
            }
          />
        </>
      </Modal>
    </Overlay>
  )
}

const styles = {
  modal: css({
    width: "40vw",

    header: {
      marginBottom: spacingCard
    }
  }),
  instruction: css({
    marginBottom: spacingMedium
  }),
  actualDateCard: css({
    marginBottom: spacingMedium
  }),
  fictiveDateCard: css({
    marginBottom: spacingLarge
  }),
  datePicker: css({
    margin: spacingMedium
  })
}
