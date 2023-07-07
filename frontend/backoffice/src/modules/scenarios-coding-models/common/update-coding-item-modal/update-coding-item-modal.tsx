import {css} from "@emotion/react"
import {partial} from "lodash-es"
import * as React from "react"
import {FeatureDisabledMarker, Modal, Overlay, SelectableCard, SelectionIconType, Text} from "shared/components"
import {IconName} from "shared/enums"
import {FontWeight, spacingCard, spacingHuge, spacingLarge, spacingMedium, spacingTiny, TextSize} from "shared/styles"
import {useLucaTranslation} from "shared/translations"
import {UpdateCodingItemType, useUpdateCodingItemModal} from "./hooks/use-update-coding-item-modal"

export interface UpdateCodingItemModalProps {
  readonly codingItemId: UUID
  readonly type: UpdateCodingItemType
  readonly onDismiss: () => void
  readonly onUpdate: () => void
}

export const UpdateCodingItemModal: React.FC<UpdateCodingItemModalProps> = ({
  codingItemId,
  type,
  onDismiss,
  onUpdate
}) => {
  const {t} = useLucaTranslation()

  const {selectedIndex: selectedIndexOption, selectIndex, updateCodingItem} = useUpdateCodingItemModal(
    codingItemId,
    type
  )

  const selectedIndex = selectedIndexOption.orNull()

  const handleConfirm = () => updateCodingItem(onUpdate)

  const selectionLeft = (
    <SelectableCard
      selectionIconType={SelectionIconType.RADIO}
      selected={selectedIndex === 0}
      onClick={partial(selectIndex, 0)}
      {...{
        ...(type === UpdateCodingItemType.Type
          ? {
              iconName: IconName.SingleChoice,
              title: t("coding_item_update__selection_card_type_holistic_label"),
              text: t("coding_item_update__selection_card_type_holistic_description")
            }
          : {
              iconName: IconName.Mouse,
              title: t("coding_item_update__selection_card_method_manual_label"),
              text: t("coding_item_update__selection_card_method_manual_description")
            })
      }}
    />
  )
  const selectionRight = (
    <SelectableCard
      selectionIconType={SelectionIconType.RADIO}
      selected={selectedIndex === 1}
      onClick={partial(selectIndex, 1)}
      {...{
        ...(type === UpdateCodingItemType.Type
          ? {
              iconName: IconName.MultipleChoice,
              title: t("coding_item_update__selection_card_type_analytical_label"),
              text: t("coding_item_update__selection_card_type_analytical_description")
            }
          : {
              iconName: IconName.Gear,
              title: t("coding_item_update__selection_card_method_automatic_label"),
              text: t("coding_item_update__selection_card_method_automatic_description")
            })
      }}
    />
  )

  return (
    <Overlay>
      <Modal
        customStyles={styles.modal}
        onConfirm={handleConfirm}
        confirmButtonDisabled={selectedIndexOption.isEmpty()}
        onDismiss={onDismiss}
        title={
          type === UpdateCodingItemType.Type
            ? t("coding_item_update__title_type")
            : t("coding_item_update__title_method")
        }
        preventDismissOnEscape={true}
        preventSubmitOnEnter={true}>
        <div css={styles.content}>
          <Text>
            {type === UpdateCodingItemType.Type
              ? t("coding_item_update__description_type")
              : t("coding_item_update__description_method")}
          </Text>
          <div css={styles.selectionWrapper}>
            <Text size={TextSize.Medium} customStyles={styles.selectionLabel}>
              {type === UpdateCodingItemType.Type
                ? t("coding_item_update__selection_label_type")
                : t("coding_item_update__selection_label_method")}
            </Text>
            <div css={styles.selection}>
              {selectionLeft}
              {/*TODO LUCA-992 handle selection of method type (manual / automatic) */}
              {type === UpdateCodingItemType.Method ? (
                <FeatureDisabledMarker>{selectionRight}</FeatureDisabledMarker>
              ) : (
                selectionRight
              )}
            </div>
          </div>
        </div>
      </Modal>
    </Overlay>
  )
}

const styles = {
  modal: css({
    width: 900,

    header: {
      marginBottom: spacingCard
    }
  }),
  content: css({
    display: "grid",
    gridRowGap: spacingLarge,
    gridTemplateRows: "minmax(0, 1fr) minmax(min-content, max-content)",
    marginBottom: spacingHuge
  }),
  selectionWrapper: css({
    display: "grid",
    gridRowGap: spacingTiny,
    gridTemplateRows: "minmax(min-content, max-content) minmax(0, 1fr)"
  }),
  selectionLabel: css({
    fontWeight: FontWeight.Bold
  }),
  selection: css({
    display: "grid",
    gridColumnGap: spacingMedium,
    gridTemplateColumns: "1fr 1fr"
  })
}
