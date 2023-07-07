import {css} from "@emotion/react"
import * as React from "react"
import {Modal, Overlay, SelectableCard} from "shared/components"
import {IconName} from "shared/enums"
import {ProjectModuleType} from "shared/graphql/generated/globalTypes"
import {spacingMedium} from "shared/styles"
import {useLucaTranslation} from "shared/translations"
import {useCreateProjectModuleModal} from "./hooks/use-create-project-module-modal"

export interface CreateProjectModuleModalProps {
  readonly projectId: UUID
  readonly onDismiss: () => void
}

export const CreateProjectModuleModal: React.FC<CreateProjectModuleModalProps> = ({onDismiss, projectId}) => {
  const {t} = useLucaTranslation()

  const {selectedProjectModuleType, setProjectModuleType, onConfirm} = useCreateProjectModuleModal(projectId)
  const projectModuleType = selectedProjectModuleType.orNull()

  return (
    <Overlay>
      <Modal
        customStyles={styles.modal}
        onConfirm={onConfirm}
        confirmButtonDisabled={!projectModuleType}
        onDismiss={onDismiss}
        title={t("project_module__create_module_title")}
        preventDismissOnEscape={true}
        preventSubmitOnEnter={true}>
        <div css={styles.content}>
          <SelectableCard
            customStyles={styles.typeCard}
            title={t("project_module__create_scenario_label")}
            iconName={IconName.Monitor}
            text={t("projects__scenarios_add_scenario_text")}
            selected={projectModuleType === ProjectModuleType.Scenario}
            onClick={() => setProjectModuleType(ProjectModuleType.Scenario)}
          />
          <SelectableCard
            customStyles={styles.typeCard}
            title={t("project_module__create_questionnaire_label")}
            iconName={IconName.ClipboardFilled}
            text={t("projects__scenarios_add_questionnaire_text")}
            selected={projectModuleType === ProjectModuleType.Questionnaire}
            onClick={() => setProjectModuleType(ProjectModuleType.Questionnaire)}
          />
        </div>
      </Modal>
    </Overlay>
  )
}

const styles = {
  modal: css({
    width: 600 // use 900 to display 3 cards in a row
  }),
  content: css({
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gridGap: spacingMedium
  }),
  typeCard: css({
    minHeight: 96
  })
}
