import {css} from "@emotion/react"
import {isEmpty} from "lodash"
import * as React from "react"
import {Card, CardHeader, Modal, Overlay, SelectableCard, SelectionIconType, Text, TextInput} from "shared/components"
import {IconName, InputType} from "shared/enums"
import {RScript} from "shared/models"
import {
  Flex,
  flex1,
  fontColorLight,
  spacing,
  spacingCard,
  spacingMedium,
  spacingSmall,
  spacingTiny,
  TextSize
} from "shared/styles"
import {useLucaTranslation} from "shared/translations"
import {Option} from "shared/utils"

export interface ChooseRScriptModalProps {
  readonly onDismiss: () => void
  readonly onConfirm: (rScriptId: UUID) => void
  readonly searchValue: string
  readonly selectedRScriptId: Option<UUID>
  readonly setSelectedRScriptId: React.Dispatch<React.SetStateAction<Option<string>>>
  readonly setSearchValue: React.Dispatch<React.SetStateAction<string>>
  readonly rScripts: RScript[]
  readonly isConfirmButtonLoading: boolean
}

export const CreateOrUpdateRScriptModal: React.FC<ChooseRScriptModalProps> = ({
  onDismiss,
  searchValue,
  setSearchValue,
  selectedRScriptId,
  setSelectedRScriptId,
  onConfirm,
  isConfirmButtonLoading,
  rScripts
}) => {
  const {t} = useLucaTranslation()

  return (
    <Overlay>
      <Modal
        customStyles={styles.modal}
        customContentStyles={styles.modalContent}
        onConfirm={() => selectedRScriptId.forEach(id => onConfirm(id))}
        confirmButtonDisabled={selectedRScriptId.isEmpty()}
        isConfirmButtonLoading={isConfirmButtonLoading}
        onDismiss={onDismiss}
        title={t("coding_models__automated_item_r_scripts_choose_modal_title")}
        preventDismissOnEscape={true}
        preventSubmitOnEnter={true}>
        <Text>{t("coding_models__automated_item_r_scripts_choose_modal_description")}</Text>
        <Card customStyles={styles.card}>
          <CardHeader customStyles={styles.cardHeader} hasGreyBackground hasShadow>
            <TextInput
              value={searchValue}
              type={InputType.text}
              icon={IconName.Search}
              customStyles={styles.search}
              onChange={setSearchValue}
              placeholderKey="coding_models__automated_item_r_scripts_choose_modal_search_placeholder"
            />
          </CardHeader>
          <div css={styles.scriptWrapper}>
            {rScripts.map(script => (
              <SelectableCard
                customStyles={styles.selectableCard}
                selected={selectedRScriptId.contains(script.id)}
                onClick={() => setSelectedRScriptId(Option.of(script.id))}
                selectionIconType={SelectionIconType.RADIO}
                key={script.id}
                title={!isEmpty(script.title) ? script.title : t("r_scripts__title_placeholder")}
                text={script.description}
              />
            ))}
            {rScripts.length === 0 && (
              <div css={styles.placeholderWrapper}>
                <Text size={TextSize.Medium}>
                  {t("coding_models__automated_item_r_scripts_choose_modal_search_empty")}
                </Text>
                <Text size={TextSize.Medium} customStyles={styles.placeholderText}>
                  {t("coding_models__automated_item_r_scripts_choose_modal_search_empty_text")}
                </Text>
              </div>
            )}
          </div>
        </Card>
      </Modal>
    </Overlay>
  )
}

const styles = {
  modal: css({
    width: "60vw",
    height: "60vh",

    header: {
      marginBottom: spacingCard
    }
  }),
  modalContent: css(Flex.column, {
    overflow: "auto"
  }),
  scriptWrapper: css(Flex.column, {
    overflow: "auto",
    marginBottom: spacingMedium,
    flex: flex1
  }),
  card: css({
    overflow: "auto",
    flex: flex1
  }),
  selectableCard: css({
    margin: spacing(spacingSmall, spacingTiny)
  }),
  search: css({
    width: "100%"
  }),
  cardHeader: css({
    margin: spacingTiny,
    marginTop: spacingMedium
  }),
  content: css({
    marginBottom: spacingMedium,
    marginTop: spacingMedium
  }),
  placeholderWrapper: css(Flex.column, {
    flex: flex1,
    justifyContent: "center",
    alignItems: "center"
  }),
  placeholderText: css({
    marginTop: spacingTiny,
    color: fontColorLight
  })
}
