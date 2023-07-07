import {css} from "@emotion/react"
import * as React from "react"
import {CardFooterItem, Overlay, OverviewCard} from "shared/components"
import {IconName} from "shared/enums"
import {Questionnaire} from "shared/models"
import {useLucaTranslation} from "shared/translations"
import {Option} from "shared/utils"
import {ModuleSelectionContainer} from "../../../common/module-selection/module-selection-container"
import {EventQuestionnairePreview} from "../../../questionnaires/preview/event-questionnaire-preview"
import {useQuestionnaireSelection} from "./hooks/use-questionnaire-selection"

export interface SampleCompanySelectionProps {
  readonly scenarioId: UUID
  readonly isRuntimeSurvey: boolean
}

export const QuestionnaireSelection: React.FC<SampleCompanySelectionProps> = ({
  scenarioId,
  isRuntimeSurvey = false
}) => {
  const {
    questionnaires,
    handleBackNavigation,
    updateAssignment,
    assignedQuestionnaires,
    eventQuestionnairePreviewForModal,
    setEventQuestionnairePreviewForModal
  } = useQuestionnaireSelection(scenarioId, isRuntimeSurvey)
  const {t} = useLucaTranslation()

  return (
    <>
      <ModuleSelectionContainer<Questionnaire>
        multiSelection={true}
        onSelectionConfirmed={updateAssignment}
        customCardCount={3}
        subheaderConfig={{
          entityFilterType: "scenarioQuestionnaireSelection",
          labelKey: "questionnaires__selection_header",
          navigationButton: {
            labelKey: "questionnaires__selection_back_button",
            onClick: handleBackNavigation
          },
          customFilterHeaderStyles: css({gridTemplateColumns: "1fr 1fr 3fr"})
        }}
        renderContent={(questionnaire, footer) => (
          <OverviewCard
            key={questionnaire.id}
            onClick={() => setEventQuestionnairePreviewForModal(Option.of(questionnaire))}
            headerText={questionnaire.title}
            noAnimationOnHover={true}
            text={questionnaire.description}
            footer={footer}
          />
        )}
        footerConfig={{
          emptySelectionKey: "questionnaires__selection_empty_selection",
          entitySelectionKey: "events__filter_title"
        }}
        entities={questionnaires}
        alreadyAssignedEntities={assignedQuestionnaires}
        renderCustomCardFooterItem={questionnaire => (
          <CardFooterItem
            icon={IconName.Questions}
            text={t("questionnaires__selection_questions_count", {count: questionnaire.questions.length})}
          />
        )}
      />
      {eventQuestionnairePreviewForModal
        .map(questionnaire => (
          <Overlay>
            <EventQuestionnairePreview
              onClose={() => setEventQuestionnairePreviewForModal(Option.none())}
              questionnaire={questionnaire}
            />
          </Overlay>
        ))
        .orNull()}
    </>
  )
}
