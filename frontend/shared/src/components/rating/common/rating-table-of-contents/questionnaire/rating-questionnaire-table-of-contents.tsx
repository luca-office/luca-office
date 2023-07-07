import {css} from "@emotion/react"
import {CSSInterpolation} from "@emotion/serialize"
import {sumBy} from "lodash-es"
import * as React from "react"
import {IconName, RaterMode} from "../../../../../enums"
import {QuestionScoringType, QuestionType} from "../../../../../graphql/generated/globalTypes"
import {Questionnaire, QuestionnaireNode} from "../../../../../models"
import {
  chartProgressColor,
  CustomStyle,
  Flex,
  fontColor,
  fontColorLight,
  spacingHuge,
  spacingSmall,
  TextSize
} from "../../../../../styles"
import {LucaI18nLangKey, useLucaTranslation} from "../../../../../translations"
import {buildRatingQuestionnaireTree, Option, roundNumber, Subject} from "../../../../../utils"
import {Icon} from "../../../../icon/icon"
import {TableOfContentsContainer, TableOfContentsEntry} from "../../../../table-of-content"
import {tocEntryStyles as styles} from "../../../../table-of-content/table-of-contents-entry/table-of-contents-entry-style"
import {Text} from "../../../../typography/typography"
import {RatingTableOfContentsFooter} from "../../rating-table-of-contents-footer/rating-table-of-contents-footer"
import {RatingTableOfContentsFooterPlaceholder} from "../../rating-table-of-contents-footer-placeholder/rating-table-of-contents-footer-placeholder"
import {useRatingQuestionnaireTableOfContents} from "./hooks/use-rating-questionnaire-table-of-contents"

export interface RatingQuestionnaireTableOfContentsProps extends CustomStyle {
  readonly customHeaderStyles?: CSSInterpolation
  readonly customFooterStyles?: CSSInterpolation
  readonly surveyId: UUID
  readonly questionnaire: Option<Questionnaire>
  readonly selectedEntityId: Option<UUID>
  readonly selectEntityId: (id: Option<UUID>) => void
  readonly fetchFreetextQuestionRatingsSubject: Subject<void>
  readonly surveyInvitationId?: UUID
  readonly isReadonly: boolean
  readonly isNotRatable: boolean
  readonly mode: RaterMode
  readonly showDataForAllParticipants?: boolean
  readonly rightSideKey?: LucaI18nLangKey
  readonly isScoringPreviewForParticipant?: boolean
}

export const RatingQuestionnaireTableOfContents: React.FC<RatingQuestionnaireTableOfContentsProps> = ({
  surveyId,
  questionnaire: questionnaireOption,
  selectedEntityId,
  selectEntityId,
  fetchFreetextQuestionRatingsSubject,
  surveyInvitationId,
  isReadonly,
  isNotRatable,
  mode,
  showDataForAllParticipants = false,
  customStyles,
  customHeaderStyles,
  customFooterStyles,
  rightSideKey = "rating__rating__right_side_title_table_of_contents",
  isScoringPreviewForParticipant = false
}) => {
  const {t} = useLucaTranslation()

  const {
    allRated,
    score,
    maxScore,
    isRated: isQuestionRated,
    dataLoading,
    getScores,
    getScoresOfAllQuestions
  } = useRatingQuestionnaireTableOfContents({
    surveyId,
    questionnaire: questionnaireOption,
    fetchFreetextQuestionRatingsSubject,
    surveyInvitationId,
    mode,
    showDataForAllParticipants
  })

  const useDisabledColor =
    !showDataForAllParticipants && !isScoringPreviewForParticipant && (isReadonly || isNotRatable)
  const scoresOfAllQuestions = getScoresOfAllQuestions()

  const customQuestionNode = (node: QuestionnaireNode, onClick: () => void) => {
    const isNodeRated = node.isRated ?? false
    const ratedChildren =
      node.children?.filter(question => {
        const isChildRated = question.isRated ?? false
        return (
          isChildRated ||
          question.questionType !== QuestionType.FreeText ||
          question.scoringType === QuestionScoringType.None
        )
      }).length ?? 0
    const percentageRated =
      node.children && node.children.length > 0 ? Math.round((ratedChildren * 100) / node.children.length) : 0

    const allRated =
      !node.parentId &&
      node.children &&
      node.children.every(question => question.isRated || question.scoringType === QuestionScoringType.None)
    const isRated =
      isNodeRated || node.questionType !== QuestionType.FreeText || node.scoringType === QuestionScoringType.None
    const scores = getScores(node.id)
    const childrenScores = node.children?.map(({id}) => getScores(id)) ?? []
    const childrenMaxScore = childrenScores.length > 0 ? sumBy(childrenScores, ({maxScore}) => maxScore) : 0
    const childrenAverageScore = childrenScores.length > 0 ? sumBy(childrenScores, ({averageScore}) => averageScore) : 0

    const percentageRatedForNodeWithoutParent = showDataForAllParticipants
      ? childrenMaxScore > 0
        ? roundNumber((childrenAverageScore / childrenMaxScore) * 100)
        : 0
      : !isNotRatable
      ? percentageRated
      : 0
    const percentageRatedForNodeWithParent = showDataForAllParticipants
      ? node.questionType !== QuestionType.FreeText
        ? 100
        : scores.maxScore > 0
        ? roundNumber((scores.averageScore / scores.maxScore) * 100)
        : 0
      : isNodeRated
      ? 100
      : 0

    return !node.parentId ? (
      <div className="toc-entry-text" css={tocEntryStyles.ratingRow} onClick={onClick}>
        <Text customStyles={styles.listItemText} size={TextSize.Medium}>
          {node.name}
        </Text>
        <div css={tocEntryStyles.ratingLabel}>
          <Text
            customStyles={
              useDisabledColor
                ? tocEntryStyles.disabledColor
                : tocEntryStyles.ratingColor(isRated, showDataForAllParticipants || isScoringPreviewForParticipant)
            }>
            {percentageRatedForNodeWithoutParent}
            {t("rating__rating__trailing_percent")}
          </Text>
          {!showDataForAllParticipants && !isScoringPreviewForParticipant && (
            <Icon
              customStyles={[tocEntryStyles.ratingIcon, useDisabledColor && tocEntryStyles.disabledColor]}
              name={!isNotRatable && allRated ? IconName.Check : IconName.Sandglass}
            />
          )}
        </div>
      </div>
    ) : (
      <div className="toc-entry-text" css={tocEntryStyles.ratingRow} onClick={onClick}>
        {node.iconName && <Icon customStyles={styles.icon} name={node.iconName} />}
        <Text customStyles={[styles.listItemText]} size={TextSize.Medium}>
          {node.name}
        </Text>
        <div css={[tocEntryStyles.ratingLabel]}>
          {showDataForAllParticipants || isScoringPreviewForParticipant ? (
            <Text customStyles={tocEntryStyles.disabledColor}>
              {percentageRatedForNodeWithParent}
              {t("rating__rating__trailing_percent")}
            </Text>
          ) : (
            <React.Fragment>
              <Text
                customStyles={useDisabledColor ? tocEntryStyles.disabledColor : tocEntryStyles.ratingColor(isRated)}>
                {node.scoringType === QuestionScoringType.None
                  ? t("rater_rating_details__project_module_no_rating")
                  : node.questionType !== QuestionType.FreeText
                  ? t("rating__rating__automatic_rating")
                  : t("rating__rating__manual_rating")}
              </Text>
              {node.scoringType !== QuestionScoringType.None && (
                <Icon
                  name={!isNotRatable && isRated ? IconName.Check : IconName.InProgressCheck}
                  customStyles={[
                    tocEntryStyles.ratingIcon,
                    useDisabledColor ? tocEntryStyles.disabledColor : tocEntryStyles.ratingColor(isRated)
                  ]}
                />
              )}
            </React.Fragment>
          )}
        </div>
      </div>
    )
  }

  return (
    <TableOfContentsContainer
      customCardStyles={customStyles}
      customTocBodyStyles={questionnaireTocStyles.content(dataLoading)}
      customCardHeaderStyles={customHeaderStyles}
      customFooterStyles={[styles.footer, customFooterStyles]}
      title={t("table_of_contents")}
      titleRightSide={t(rightSideKey)}
      loading={dataLoading}
      actionFooter={
        isNotRatable && !showDataForAllParticipants && !isScoringPreviewForParticipant ? (
          <RatingTableOfContentsFooterPlaceholder />
        ) : (
          <RatingTableOfContentsFooter
            allRated={allRated}
            score={score}
            maxScore={showDataForAllParticipants ? scoresOfAllQuestions.maxScore : maxScore}
            averageScore={scoresOfAllQuestions.averageScore}
            showAverageScore={showDataForAllParticipants}
          />
        )
      }>
      {questionnaireOption
        .map(questionnaire => (
          <TableOfContentsEntry<QuestionnaireNode>
            key={questionnaire.id}
            node={buildRatingQuestionnaireTree({questionnaire, isRuntimeSurvey: false, t, isRated: isQuestionRated})}
            selectNode={nodeOption => selectEntityId(nodeOption.map(node => node.id))}
            selectedNode={selectedEntityId}
            isCollapsible={false}
            indentChildren={true}
            renderCustomNodeContent={customQuestionNode}
          />
        ))
        .orNull()}
    </TableOfContentsContainer>
  )
}

export const tocEntryStyles = {
  ratingRow: css(Flex.row, {
    minWidth: 0,
    flexGrow: 1
  }),
  ratingLabel: css(Flex.row, {
    justifySelf: "right",
    marginLeft: "auto",
    alignSelf: "flex-end"
  }),
  ratingIcon: css({
    marginLeft: spacingSmall
  }),
  ratingColor: (isRated: boolean, useDefaultColor = false) =>
    css({
      color: isRated || useDefaultColor ? fontColor : chartProgressColor
    }),
  disabledColor: css({
    color: fontColorLight
  })
}

const questionnaireTocStyles = {
  content: (loading: boolean) =>
    loading
      ? css(Flex.column, {
          justifyContent: "center",
          alignItems: "center",
          height: `calc(100% - ${spacingHuge}px)`
        })
      : css({
          height: `calc(100% - ${spacingHuge}px)`
        })
}
