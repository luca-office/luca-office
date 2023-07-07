import {css} from "@emotion/react"
import * as React from "react"
import {CardFooterItem, Icon, OverviewCard, Text} from "shared/components"
import {IconName} from "shared/enums"
import {QuestionnaireLight} from "shared/models"
import {
  Flex,
  headerHeight,
  spacingHuger,
  spacingLarge,
  spacingMedium,
  spacingSmall,
  spacingSmaller,
  subHeaderHeight,
  TextSize
} from "shared/styles"
import {useLucaTranslation} from "shared/translations"
import {CardDurationInfo, EditingStatusIndicator} from "../../../../components"
import {ModuleSelectionContainer} from "../../../common/module-selection/module-selection-container"
import {useProjectQuestionnaireSelection} from "./hooks/use-project-questionnaire-selection"

interface Props {
  readonly projectId: UUID
}

export const ProjectQuestionnaireSelection: React.FC<Props> = ({projectId}) => {
  const {
    questionnaires,
    openProjectDetail,
    openSelectionDetail,
    saveQuestionnaireAssignment,
    alreadyAssignedQuestionnaires,
    userMayFinalizeWithoutPublishing,
    isProjectFinalized
  } = useProjectQuestionnaireSelection(projectId)
  const {t} = useLucaTranslation()
  return (
    <ModuleSelectionContainer<QuestionnaireLight>
      customCardOverviewStyles={styles.cardOverview}
      customCardCount={3}
      entities={questionnaires}
      multiSelection={true}
      alreadyAssignedEntities={alreadyAssignedQuestionnaires}
      onSelectionConfirmed={saveQuestionnaireAssignment}
      userMayFinalizeWithoutPublishing={userMayFinalizeWithoutPublishing}
      subheaderConfig={{
        entityFilterType: isProjectFinalized ? "questionnaireSelectionPublished" : "questionnaireSelection",
        labelKey: "projects__questionnaire_header_label",
        navigationButton: {
          labelKey: "projects__header_details_label",
          onClick: openProjectDetail
        },
        customFilterHeaderStyles: styles.headerFilter
      }}
      footerConfig={{
        emptySelectionKey: "project_module_selection__empty_selection_questionnaire",
        entitySelectionKey: "project_module_selection__selected_questionnaire"
      }}
      renderContent={(questionnaire, footer) => (
        <OverviewCard
          key={questionnaire.id}
          onClick={() => openSelectionDetail(questionnaire.id)}
          headerText={
            <div css={Flex.row}>
              <Icon customStyles={styles.headerIcon} name={IconName.Questionnaire} />
              <Text size={TextSize.Medium}>{questionnaire.title}</Text>
            </div>
          }
          headerInfo={<CardDurationInfo t={t} maxDurationInSeconds={questionnaire.maxDurationInSeconds} />}
          noAnimationOnHover={true}
          text={questionnaire.description}
          footer={footer}
        />
      )}
      renderCustomCardFooterItem={questionnaire => (
        <>
          <CardFooterItem
            icon={IconName.Questions}
            text={t("questionnaires__selection_questions_count", {count: questionnaire.questionsCount})}
          />
          <EditingStatusIndicator
            t={t}
            customStyles={styles.editingStatus}
            isPublished={questionnaire.publishedAt !== null}
            isFinalized={questionnaire.finalizedAt !== null}
          />
        </>
      )}
    />
  )
}

const styles = {
  headerFilter: css({
    gridTemplateColumns: "1fr 1fr 1fr 3fr"
  }),
  editingStatus: css({
    marginLeft: spacingSmall
  }),
  headerIcon: css({
    marginRight: spacingSmaller
  }),
  cardOverview: css({
    maxHeight: `calc(100vh - ${2 * headerHeight + 2 * subHeaderHeight + spacingHuger + spacingLarge + spacingMedium}px)`
  })
}
