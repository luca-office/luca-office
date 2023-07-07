import {css} from "@emotion/react"
import * as React from "react"
import {CardFooter, CardFooterItem, ContentLoadingIndicator, OverviewCard} from "shared/components"
import {IconName} from "shared/enums"
import {useLucaTranslation} from "shared/translations"
import {formatDate} from "shared/utils"
import {CardDurationInfo, CardOverview, EditingStatusIndicator} from "../../../components"
import {cardOverview} from "../../../styles/common"
import {useQuestionnaires} from "./hooks/use-questionnaires"

export interface QuestionnaireProps {
  readonly isRuntimeSurvey?: boolean
}

export const Questionnaires: React.FC<QuestionnaireProps> = ({isRuntimeSurvey = false}) => {
  const {t} = useLucaTranslation()
  const {
    questionnaires,
    navigateCreateQuestionnaire,
    navigateQuestionnaireDetail,
    userMayFinalizeWithoutPublishing,
    questionnairesLoading
  } = useQuestionnaires(isRuntimeSurvey)

  return (
    <CardOverview
      customStyles={cardOverview}
      create={navigateCreateQuestionnaire}
      entityFilterType={isRuntimeSurvey ? "events" : "questionnaires"}
      creationText={t(isRuntimeSurvey ? "events__create_event" : "questionnaires__create_event")}
      userMayFinalizeWithoutPublishing={userMayFinalizeWithoutPublishing}>
      {questionnairesLoading ? (
        <ContentLoadingIndicator />
      ) : (
        questionnaires.map(questionnaire => (
          <OverviewCard
            onClick={() => navigateQuestionnaireDetail(questionnaire.id)}
            key={questionnaire.id}
            headerText={questionnaire.title}
            headerIcon={isRuntimeSurvey ? IconName.Event : IconName.Questionnaire}
            headerInfo={<CardDurationInfo t={t} maxDurationInSeconds={questionnaire.maxDurationInSeconds} />}
            text={questionnaire.description}
            footer={
              <CardFooter customStyles={styles.cardFooter}>
                <CardFooterItem
                  title={t("create_date_title")}
                  icon={IconName.Calendar}
                  text={formatDate(new Date(questionnaire.createdAt))}
                />
                <CardFooterItem
                  title={t("author_title")}
                  icon={IconName.Profile}
                  text={`${questionnaire.author.firstName} ${questionnaire.author.lastName}`}
                />
                <CardFooterItem
                  icon={IconName.Questions}
                  text={`${questionnaire.questionsCount} ${
                    questionnaire.questionsCount === 1 ? t("question") : t("questions")
                  }`}
                />

                <EditingStatusIndicator
                  t={t}
                  isPublished={!!questionnaire.publishedAt}
                  isFinalized={!!questionnaire.finalizedAt}
                />
              </CardFooter>
            }
          />
        ))
      )}
    </CardOverview>
  )
}

const Sizes = {
  footerStatus: 16
}

const styles = {
  cardFooter: css({
    display: "grid",
    gridTemplateColumns: `1fr 1fr 1fr ${Sizes.footerStatus}px`
  })
}
