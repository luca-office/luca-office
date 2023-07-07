import {css} from "@emotion/react"
import * as React from "react"
import {Modal, SelectableCard} from "shared/components"
import {IconName} from "shared/enums"
import {InterventionType} from "shared/graphql/generated/globalTypes"
import {errorColor, Flex, spacing, spacingMedium} from "shared/styles"
import {LucaTFunction, useLucaTranslation} from "shared/translations"

export type TextDocumentInterventionType = InterventionType.FileOpening | InterventionType.TextDocumentContent

interface ChooseTextDocumentInterventionTypeModalProps extends ChooseTextDocumentInterventionTypeModalContainerProps {
  readonly selectedTextDocumentInterventionType: TextDocumentInterventionType
  readonly setSelectedInterventionType: (interventionType: TextDocumentInterventionType) => void
  readonly t: LucaTFunction
}

export interface ChooseTextDocumentInterventionTypeModalContainerProps {
  readonly onDismiss: () => void
  readonly onConfirm: (interventionType: TextDocumentInterventionType) => void
}

export const ChooseTextDocumentInterventionTypeModalContainer: React.FC<ChooseTextDocumentInterventionTypeModalContainerProps> = ({
  onDismiss,
  onConfirm
}) => {
  const {t} = useLucaTranslation()

  const [
    selectedTextDocumentInterventionType,
    setSelectedTextDocumentInterventionType
  ] = React.useState<TextDocumentInterventionType>(InterventionType.FileOpening)

  return (
    <ChooseTextDocumentInterventionTypeModal
      selectedTextDocumentInterventionType={selectedTextDocumentInterventionType}
      setSelectedInterventionType={setSelectedTextDocumentInterventionType}
      onConfirm={onConfirm}
      onDismiss={onDismiss}
      t={t}
    />
  )
}

const ChooseTextDocumentInterventionTypeModal: React.FC<ChooseTextDocumentInterventionTypeModalProps> = ({
  onDismiss,
  onConfirm,
  selectedTextDocumentInterventionType,
  setSelectedInterventionType,
  t
}) => {
  return (
    <Modal
      customStyles={styles.modal}
      onConfirm={() => onConfirm(selectedTextDocumentInterventionType)}
      onDismiss={onDismiss}
      title={t("interventions__interventions_choose_textdocument_intervention_type")}
      preventDismissOnEscape={true}
      preventSubmitOnEnter={false}>
      <div css={styles.content}>
        <SelectableCard
          title={t("interventions__interventions_choose_textdocument_intervention_type_file_opening")}
          iconName={IconName.File}
          text={t("interventions__interventions_choose_textdocument_intervention_type_file_opening_description")}
          selected={selectedTextDocumentInterventionType === InterventionType.FileOpening}
          onClick={() => setSelectedInterventionType(InterventionType.FileOpening)}
        />
        <SelectableCard
          title={t("interventions__interventions_choose_textdocument_intervention_type_content")}
          iconName={IconName.TextEditor}
          text={t("interventions__interventions_choose_textdocument_intervention_type_content_description")}
          selected={selectedTextDocumentInterventionType === InterventionType.TextDocumentContent}
          onClick={() => setSelectedInterventionType(InterventionType.TextDocumentContent)}
        />
      </div>
    </Modal>
  )
}

const styles = {
  modal: css({
    width: 900
  }),
  content: css({
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gridGap: spacingMedium
  }),
  errorMessageWrapper: css(Flex.row, {
    justifyContent: "flex-end",
    margin: spacing(spacingMedium, 0)
  }),
  errorMessage: css({
    color: errorColor
  })
}
