import {css} from "@emotion/react"
import {uniq} from "lodash-es"
import React, {useEffect, useState} from "react"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  ContentLoadingIndicator,
  HeaderCarouselBaseElement,
  HeaderCarouselContainer,
  Icon,
  QuestionnaireIntroduction,
  ScenarioInfoCard,
  Text
} from "shared/components"
import {IconName} from "shared/enums"
import {ScenarioInfo, useFreetextAnswersForQuestionnaireLazy, useSurveyInvitations} from "shared/graphql/hooks"
import {QuestionnaireQuestion, RuntimeSurveyResults, ScenarioQuestionnaire} from "shared/models"
import {
  Flex,
  FontWeight,
  spacingHuge,
  spacingHuger,
  spacingLarge,
  spacingMedium,
  spacingSmall,
  spacingTiny,
  TextSize
} from "shared/styles"
import {useLucaTranslation} from "shared/translations"
import {Option, sortByPosition} from "shared/utils"
import {getUserIdentificationFromSurveyInvitation} from "../../../utils/survey-invitation"
import {MultiQuestionResult} from "./multi-question-result"

export interface QuestionnaireResultsProps {
  readonly scenarioInfo: ScenarioInfo
  readonly questionnaires: Array<ScenarioQuestionnaire>
  readonly results: Array<RuntimeSurveyResults>
  readonly selectedQuestionnaireId: Option<UUID>
  readonly onClose: () => void
  readonly surveyId: UUID
}

export interface QuestionnaireCarouselElement extends HeaderCarouselBaseElement {
  readonly questionnaireId: UUID
}

export const QuestionnaireResults: React.FC<QuestionnaireResultsProps> = ({
  scenarioInfo,
  questionnaires,
  results,
  selectedQuestionnaireId,
  onClose,
  surveyId
}) => {
  const {t} = useLucaTranslation()

  const {surveyInvitations, surveyInvitationsLoading} = useSurveyInvitations(surveyId)
  const {
    freetextAnswersForQuestionnaire,
    freetextAnswersForQuestionnaireLoading,
    getFreetextAnswersForQuestionnaire
  } = useFreetextAnswersForQuestionnaireLazy(surveyId)

  const [currentQuestionnaire, setCurrentQuestionnaire] = useState(
    questionnaires.find(questionnaire => questionnaire.questionnaireId === selectedQuestionnaireId.getOrElse(""))
  )
  const [currentResults, setCurrentResults] = useState(
    results.find(result => result.questionnaireId === currentQuestionnaire?.questionnaireId)
  )

  const {projectName, scenarioName, surveyTitle, participantCount} = scenarioInfo
  const participantNames = surveyInvitations.reduce((names, surveyInvitation) => {
    return {
      ...names,
      [surveyInvitation.id]: getUserIdentificationFromSurveyInvitation(surveyInvitation)
    }
  }, {})
  const carouselElements: QuestionnaireCarouselElement[] = questionnaires.map(questionnaire => ({
    label: questionnaire.questionnaire.title,
    questionnaireId: questionnaire.questionnaireId
  }))

  const onChangeQuestionnaire = (questionnaireId: UUID) => {
    setCurrentQuestionnaire(questionnaires.find(questionnaire => questionnaire.questionnaireId === questionnaireId))

    setCurrentResults(results.find(result => result.questionnaireId === questionnaireId))
    getFreetextAnswersForQuestionnaire(questionnaireId)
  }

  const freetextAnswersForQuestion = (questionId: UUID) =>
    freetextAnswersForQuestionnaire.filter(freeTextAnswer => freeTextAnswer.questionId === questionId)

  useEffect(() => {
    selectedQuestionnaireId.forEach(id => getFreetextAnswersForQuestionnaire(id))
  }, [])

  return (
    <Card customStyles={styles.card}>
      <CardHeader customStyles={styles.header} hasGreyBackground={true} hasShadow={true}>
        <Text size={TextSize.Medium}>
          {t("reporting_result__show_results_for_all_participants", {count: participantCount})}
        </Text>
        <Icon name={IconName.Close} onClick={onClose} />
      </CardHeader>
      <CardContent customStyles={styles.content}>
        <ScenarioInfoCard projectName={projectName} surveyTitle={surveyTitle} scenarioName={scenarioName} />
        <Text size={TextSize.Medium} customStyles={styles.title}>
          {t("reporting_result__events_count", {count: questionnaires.length})}
        </Text>
        <Card hasShadow={true} customStyles={styles.resultCard}>
          <HeaderCarouselContainer
            defaultSelectedElement={carouselElements.find(
              element => element.questionnaireId === selectedQuestionnaireId.orUndefined()
            )}
            elements={carouselElements}
            onChange={({questionnaireId}) => onChangeQuestionnaire(questionnaireId)}
          />
          <CardContent customStyles={styles.results}>
            {currentQuestionnaire ? (
              <>
                <QuestionnaireIntroduction
                  title={currentQuestionnaire.questionnaire.title}
                  description={currentQuestionnaire.questionnaire.description}
                  binaryFile={currentQuestionnaire.questionnaire.binaryFile ?? undefined}
                />
                {freetextAnswersForQuestionnaireLoading && surveyInvitationsLoading ? (
                  <ContentLoadingIndicator />
                ) : (
                  <div css={[styles.questions]}>
                    {sortByPosition<QuestionnaireQuestion>(currentQuestionnaire.questionnaire.questions).map(
                      (question: QuestionnaireQuestion, index: number) => (
                        <MultiQuestionResult
                          key={question.id}
                          question={question}
                          questionNumber={index + 1}
                          results={currentResults?.questionResults.find(
                            questionResult => questionResult.questionId === question.id
                          )}
                          freeTextAnswers={freetextAnswersForQuestion(question.id)}
                          participantCount={participantCount}
                          participantNames={participantNames}
                        />
                      )
                    )}
                  </div>
                )}
              </>
            ) : null}
          </CardContent>
          <CardFooter customStyles={styles.footer} />
        </Card>
      </CardContent>
      <CardFooter customStyles={styles.footer} />
    </Card>
  )
}

const styles = {
  card: css({width: 900, maxHeight: "90vh"}),
  header: css(Flex.row, {
    justifyContent: "space-between"
  }),
  title: css({
    fontWeight: FontWeight.Bold,
    marginBottom: spacingTiny
  }),
  content: css({
    padding: spacingMedium,
    boxSizing: "border-box",
    overflow: "hidden"
  }),
  results: css({
    boxSizing: "border-box",
    padding: spacingMedium,
    overflow: "auto"
  }),
  resultCard: css({
    maxHeight: `calc(100% - ${spacingMedium}px - ${spacingHuge}px - ${spacingLarge}px - ${spacingLarge}px)`,
    overflow: "auto"
  }),
  tagBreadcrumbs: css(Flex.row, {
    gap: spacingSmall,
    marginBottom: spacingLarge
  }),
  questions: css(Flex.column, {
    gap: spacingHuger
  }),
  footer: css({
    height: spacingMedium,
    padding: 0
  })
}
