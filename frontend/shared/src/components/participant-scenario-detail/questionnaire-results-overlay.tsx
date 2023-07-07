import {css} from "@emotion/react"
import React, {useEffect, useState} from "react"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  ContentLoadingIndicator,
  Icon,
  Overlay,
  QuestionnaireView,
  ScenarioInfoCard,
  Text
} from "../../components"
import {IconName} from "../../enums"
import {ScenarioInfo, useFreetextAnswersForQuestionnaireLazy} from "../../graphql/hooks"
import {RuntimeSurveyResults, ScenarioQuestionnaire} from "../../models"
import {Flex, FontWeight, spacingHuge, spacingLarge, spacingMedium, spacingTiny, TextSize} from "../../styles"
import {useLucaTranslation} from "../../translations"
import {HeaderCarouselBaseElement, HeaderCarouselContainer} from "../header-carousel/header-carousel-container"
import {runtimeSurveyResultsToQuestionnaireParticipantResults} from "./utils"

export interface QuestionnaireResultsOverlayProps {
  readonly scenarioInfo: ScenarioInfo
  readonly scenarioQuestionnaires: Array<ScenarioQuestionnaire>
  readonly results: Array<RuntimeSurveyResults>
  readonly selectedQuestionnaireId?: UUID
  readonly onClose: () => void
  readonly surveyId: UUID
  readonly invitationId: UUID
}

export interface QuestionnaireCarouselElement extends HeaderCarouselBaseElement {
  readonly questionnaireId: UUID
}

export const QuestionnaireResultsOverlay: React.FC<QuestionnaireResultsOverlayProps> = ({
  scenarioInfo,
  scenarioQuestionnaires,
  results,
  selectedQuestionnaireId,
  onClose,
  surveyId,
  invitationId
}) => {
  const {t} = useLucaTranslation()

  const {
    freetextAnswersForQuestionnaire,
    freetextAnswersForQuestionnaireLoading,
    getFreetextAnswersForQuestionnaire
  } = useFreetextAnswersForQuestionnaireLazy(surveyId)

  useEffect(() => {
    if (selectedQuestionnaireId) {
      getFreetextAnswersForQuestionnaire(selectedQuestionnaireId)
    }
  }, [])

  const [currentQuestionnaire, setCurrentQuestionnaire] = useState(
    scenarioQuestionnaires.find(questionnaire => questionnaire.questionnaireId === selectedQuestionnaireId)
      ?.questionnaire
  )

  const [currentResults, setCurrentResults] = useState(
    results.find(result => result.questionnaireId === currentQuestionnaire?.id)
  )

  const carouselElements: Array<QuestionnaireCarouselElement> = scenarioQuestionnaires.map(questionnaire => ({
    label: questionnaire.questionnaire.title,
    questionnaireId: questionnaire.questionnaireId
  }))

  const onChangeQuestionnaire = (questionnaireId: UUID) => {
    const questionnaire = scenarioQuestionnaires.find(
      questionnaire => questionnaire.questionnaireId === questionnaireId
    )?.questionnaire
    const result = results.find(result => result.questionnaireId === questionnaireId)

    setCurrentQuestionnaire(questionnaire)
    setCurrentResults(result)
    getFreetextAnswersForQuestionnaire(questionnaireId)
  }

  const {projectName, scenarioName, surveyTitle, participantCount} = scenarioInfo

  return (
    <Overlay>
      <Card customStyles={styles.card}>
        <CardHeader customStyles={styles.header} hasGreyBackground={true} hasShadow={true}>
          <Text size={TextSize.Medium}>
            {t("reporting_result__show_results_for_all_participants", {count: participantCount})}
          </Text>
          <Icon name={IconName.Close} onClick={onClose} />
        </CardHeader>
        <CardContent customStyles={styles.content}>
          {currentQuestionnaire !== undefined && currentResults !== undefined ? (
            <>
              <ScenarioInfoCard projectName={projectName} surveyTitle={surveyTitle} scenarioName={scenarioName} />
              <Text size={TextSize.Medium} customStyles={styles.title}>
                {t("reporting_result__events_count", {count: scenarioQuestionnaires.length})}
              </Text>
              <Card hasShadow={true} customStyles={styles.resultCard}>
                <HeaderCarouselContainer
                  elements={carouselElements}
                  onChange={({questionnaireId}) => onChangeQuestionnaire(questionnaireId)}
                />
                <CardContent customStyles={styles.results}>
                  {freetextAnswersForQuestionnaireLoading ? (
                    <ContentLoadingIndicator />
                  ) : (
                    <QuestionnaireView
                      questionnaire={currentQuestionnaire}
                      results={runtimeSurveyResultsToQuestionnaireParticipantResults(
                        invitationId,
                        currentQuestionnaire,
                        currentResults,
                        freetextAnswersForQuestionnaire
                      )}
                    />
                  )}
                </CardContent>
                <CardFooter customStyles={styles.footer} />
              </Card>
            </>
          ) : null}
        </CardContent>
        <CardFooter customStyles={styles.footer} />
      </Card>
    </Overlay>
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
  footer: css({
    height: spacingMedium,
    padding: 0
  })
}
