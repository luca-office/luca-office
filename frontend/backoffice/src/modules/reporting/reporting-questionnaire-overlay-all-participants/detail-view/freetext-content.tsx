import {css} from "@emotion/react"
import {compact, groupBy} from "lodash"
import React from "react"
import {
  Button,
  CriterionCountById,
  Heading,
  Icon,
  Paper,
  ReportingCriteriaTableAllParticipants,
  Text
} from "shared/components"
import {ButtonVariant, HeadingLevel, IconName} from "shared/enums"
import {QuestionScoringType, ScoringType} from "shared/graphql/generated/globalTypes"
import {
  FreetextQuestionCodingCriterion,
  QuestionnaireQuestion,
  QuestionnaireSurveyResultsForParticipant,
  SurveyInvitationLight
} from "shared/models"
import {
  Flex,
  fontColorLight,
  FontWeight,
  primaryColor,
  spacingLarge,
  spacingMedium,
  spacingSmall,
  TextSize
} from "shared/styles"
import {LucaTFunction, useLucaTranslation} from "shared/translations"
import {getParticipantNameOrToken} from "shared/utils"

type ParticpantNameOrTokenById = {[id: string]: string}

interface ContainerProps {
  readonly question: QuestionnaireQuestion
  readonly questionnaireSurveyResultsForParticipants: QuestionnaireSurveyResultsForParticipant[]
  readonly freetextQuestionCodingCriteria: FreetextQuestionCodingCriterion[]
  readonly surveyInvitations: SurveyInvitationLight[]
}

interface Props extends ContainerProps {
  readonly selectedIndex: number
  readonly setSelectedIndex: (index: number) => void
  readonly t: LucaTFunction
}

export const FreeTextContentContainer: React.FC<ContainerProps> = ({
  freetextQuestionCodingCriteria,
  question,
  questionnaireSurveyResultsForParticipants,
  surveyInvitations
}) => {
  const [selectedIndex, setSelectedIndex] = React.useState<number>(0)

  const {t} = useLucaTranslation()

  return (
    <FreeTextContent
      freetextQuestionCodingCriteria={freetextQuestionCodingCriteria}
      t={t}
      selectedIndex={selectedIndex}
      setSelectedIndex={setSelectedIndex}
      surveyInvitations={surveyInvitations}
      question={question}
      questionnaireSurveyResultsForParticipants={questionnaireSurveyResultsForParticipants}
    />
  )
}

const FreeTextContent: React.FC<Props> = ({
  t,
  freetextQuestionCodingCriteria,
  question,
  questionnaireSurveyResultsForParticipants,
  surveyInvitations,
  selectedIndex,
  setSelectedIndex
}) => {
  const resultOfSelectedParticipant = questionnaireSurveyResultsForParticipants[selectedIndex]?.questionResults?.find(
    questionResult => questionResult.questionId === question.id
  )

  const allResultsOfQuestion = questionnaireSurveyResultsForParticipants
    .flatMap(result => result.questionResults)
    .filter(questionResult => questionResult.questionId === question.id)

  const allSelectedCriteriaIds = allResultsOfQuestion.flatMap(questionResult => questionResult.selectedCriteriaIds)

  const criteriaGroupedById = groupBy(allSelectedCriteriaIds, criterionId => criterionId)
  const selectedCriterionCountById = Object.keys(criteriaGroupedById).reduce<CriterionCountById>(
    (acc, current) => ({...acc, [current]: criteriaGroupedById[current].length}),
    {}
  )
  const selectedCriteriaIdsBySelectedParticipant = resultOfSelectedParticipant?.selectedCriteriaIds ?? []

  const isFreetextAnswerNonempty =
    resultOfSelectedParticipant !== undefined && resultOfSelectedParticipant.freetextAnswer !== ""

  const participantDataBySurveyInvitationId = surveyInvitations.reduce<ParticpantNameOrTokenById>(
    (acc, current) => ({...acc, [current.id]: getParticipantNameOrToken(current.participantData, current.token)}),
    {}
  )

  const noCriterionFulfilledCount = compact(
    allResultsOfQuestion.flatMap(questionResult => questionResult.noCriterionFulfilled)
  ).length

  const selectedSurveyInvitationId = questionnaireSurveyResultsForParticipants[selectedIndex]?.surveyInvitationId

  const participantName = participantDataBySurveyInvitationId[selectedSurveyInvitationId]

  const handleRightClick = () => {
    if (selectedIndex < questionnaireSurveyResultsForParticipants.length - 1) {
      setSelectedIndex(selectedIndex + 1)
    } else {
      setSelectedIndex(0)
    }
  }

  const handleLeftClick = () => {
    if (selectedIndex === 0) {
      setSelectedIndex(questionnaireSurveyResultsForParticipants.length - 1)
    } else {
      setSelectedIndex(selectedIndex - 1)
    }
  }

  return (
    <React.Fragment>
      <div css={styles.freetextAnswerWrapper}>
        <Heading customStyles={styles.label} level={HeadingLevel.h3} fontWeight={FontWeight.Bold}>
          {t("rating__freetext_answer_label")}:
        </Heading>
        <Paper customStyles={[styles.freeTextPaper]}>
          <Text size={TextSize.Medium} customStyles={isFreetextAnswerNonempty ? undefined : styles.freeTextPlaceholder}>
            {isFreetextAnswerNonempty ? resultOfSelectedParticipant?.freetextAnswer : t("common__no_data")}
          </Text>
          <Paper customStyles={[Flex.row, {justifyContent: "space-between", marginTop: spacingSmall}]}>
            <div css={Flex.row}>
              <Icon color={primaryColor} hasSpacing name={IconName.Student} />
              <Text customStyles={styles.participantName} size={TextSize.Medium}>
                {participantName}
              </Text>
              <Text customStyles={[styles.marginLeft, styles.participantName]} size={TextSize.Medium}>
                {`(${t("rating__rating__scoring", {
                  score: resultOfSelectedParticipant?.score,
                  maxScore: resultOfSelectedParticipant?.maximumScore
                })})`}
              </Text>
            </div>
            <div css={Flex.row}>
              <Button variant={ButtonVariant.IconOnly} onClick={handleLeftClick} icon={IconName.ArrowLeft} />
              <Button
                variant={ButtonVariant.IconOnly}
                onClick={handleRightClick}
                customStyles={styles.marginLeft}
                icon={IconName.ArrowRight}
              />
            </div>
          </Paper>
        </Paper>
      </div>
      <ReportingCriteriaTableAllParticipants
        t={t}
        customStyles={styles.table}
        scoringType={
          question.scoringType === QuestionScoringType.Analytical ? ScoringType.Analytical : ScoringType.Holistic
        }
        noCriterionFulfilled={resultOfSelectedParticipant?.noCriterionFulfilled}
        noCriterionFulfilledCount={noCriterionFulfilledCount}
        criteria={freetextQuestionCodingCriteria}
        selectedCriteriaIds={selectedCriteriaIdsBySelectedParticipant}
        totalParticipants={questionnaireSurveyResultsForParticipants.length}
        selectedCriterionCountById={selectedCriterionCountById}
      />
    </React.Fragment>
  )
}

const styles = {
  heading: {
    marginBottom: spacingMedium
  },
  label: css({
    textAlign: "initial"
  }),
  freetextAnswerWrapper: {
    display: "grid",
    gridTemplateRows: "minmax(min-content, max-content) 1fr",
    gridRowGap: spacingSmall
  },
  freeTextPaper: {
    padding: spacingSmall
  },
  freeTextPlaceholder: {
    color: fontColorLight
  },
  table: {
    marginTop: spacingLarge
  },
  marginLeft: {
    marginLeft: spacingSmall
  },
  participantName: {
    color: primaryColor
  }
}
