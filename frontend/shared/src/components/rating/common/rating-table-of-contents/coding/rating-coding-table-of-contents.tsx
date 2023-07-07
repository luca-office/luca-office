import {css} from "@emotion/react"
import {CSSInterpolation} from "@emotion/serialize"
import * as React from "react"
import {IconName, NodeType} from "../../../../../enums"
import {CodingDimension, CodingNode} from "../../../../../models"
import {getExpandedNodeIds} from "../../../../../office-tools/erp/erp-navigation/hooks/use-erp-navigation"
import {CustomStyle, Flex, spacingHuge, TextSize} from "../../../../../styles"
import {LucaI18nLangKey, useLucaTranslation} from "../../../../../translations"
import {Option, roundNumber} from "../../../../../utils"
import {Icon} from "../../../../icon/icon"
import {ScenarioCodingModelTableOfContents} from "../../../../scenario-coding-model-table-of-contents/scenario-coding-model-table-of-contents"
import {tocEntryStyles as styles} from "../../../../table-of-content/table-of-contents-entry/table-of-contents-entry-style"
import {Text} from "../../../../typography/typography"
import {RatingTableOfContentsFooter} from "../../rating-table-of-contents-footer/rating-table-of-contents-footer"
import {RatingTableOfContentsFooterPlaceholder} from "../../rating-table-of-contents-footer-placeholder/rating-table-of-contents-footer-placeholder"
import {useRatingCodingTableOfContents} from "./hooks/use-rating-coding-table-of-contents"
import {tocEntryStyles} from "./rating-coding-table-of-contents.style"

export interface RatingCodingTableOfContentsProps extends CustomStyle {
  readonly customHeaderStyles?: CSSInterpolation
  readonly customFooterStyles?: CSSInterpolation
  readonly surveyId: UUID
  readonly codingDimensions: CodingDimension[]
  readonly surveyInvitationId?: UUID
  readonly selectedEntityId: Option<UUID>
  readonly selectEntityId: (id: Option<UUID>) => void
  readonly isOverviewSelected?: boolean
  readonly isReadonly: boolean
  readonly ratingId: Option<UUID>
  readonly isNotRatable: boolean
  readonly showDataForAllParticipants?: boolean
  readonly rightSideKey?: LucaI18nLangKey
  readonly isScoringPreviewForParticipant?: boolean
}

export const RatingCodingTableOfContents: React.FC<RatingCodingTableOfContentsProps> = ({
  customStyles,
  customHeaderStyles,
  customFooterStyles,
  surveyId,
  codingDimensions,
  selectedEntityId,
  selectEntityId,
  surveyInvitationId,
  isOverviewSelected = false,
  isReadonly,
  ratingId,
  isNotRatable,
  showDataForAllParticipants = false,
  rightSideKey = "rating__rating__right_side_title_table_of_contents",
  isScoringPreviewForParticipant = false
}) => {
  const {t} = useLucaTranslation()
  const {
    loading,
    codingNodes,
    scenarioPercentageRated,
    getPercentageRatedForCodingDimensionNode,
    getPercentageRatedForCodingItemNode,
    allRated,
    score,
    maxScore,
    averageScore,
    getScoresForCodingDimension,
    getScoresForCodingItem
  } = useRatingCodingTableOfContents({
    ratingId,
    surveyInvitationId,
    codingDimensions,
    surveyId,
    showDataForAllParticipants
  })

  const useDisabledColor =
    !showDataForAllParticipants && !isScoringPreviewForParticipant && (isReadonly || isNotRatable)

  const overViewElement = (
    <div
      className="toc-entry-text"
      css={[tocEntryStyles.overviewRatingRow(isOverviewSelected), tocEntryStyles.overviewSpacing]}
      onClick={() => selectEntityId(Option.none())}>
      <Text customStyles={styles.listItemText} size={TextSize.Medium}>
        {t("overview")}
      </Text>
      <div css={tocEntryStyles.ratingLabel}>
        <Text customStyles={useDisabledColor ? tocEntryStyles.disabledColor : undefined}>
          {!isNotRatable || showDataForAllParticipants || isScoringPreviewForParticipant ? scenarioPercentageRated : 0}
          {t("rating__rating__trailing_percent")}
        </Text>
        {!showDataForAllParticipants && !isScoringPreviewForParticipant && (
          <Icon
            customStyles={[tocEntryStyles.ratingIcon, useDisabledColor && tocEntryStyles.disabledColor]}
            name={!isNotRatable && scenarioPercentageRated === 100 ? IconName.Check : IconName.Sandglass}
          />
        )}
      </div>
    </div>
  )

  const renderCodingDimensionNode = (node: CodingNode, onClick: (id: UUID) => void) => {
    const scores = getScoresForCodingDimension(node.id)
    const percentageRated = showDataForAllParticipants
      ? scores.maxScore > 0
        ? roundNumber((scores.averageScore / scores.maxScore) * 100)
        : 0
      : !isNotRatable
      ? getPercentageRatedForCodingDimensionNode(node)
      : 0
    const allRated = percentageRated === 100

    return (
      <div className="toc-entry-text" css={tocEntryStyles.ratingRow} onClick={() => onClick(node.id)}>
        <Text customStyles={styles.listItemText} size={TextSize.Medium}>
          {node.name}
        </Text>
        <div css={tocEntryStyles.ratingLabel}>
          <Text
            customStyles={
              useDisabledColor
                ? tocEntryStyles.disabledColor
                : tocEntryStyles.ratingColor(allRated, showDataForAllParticipants || isScoringPreviewForParticipant)
            }>
            {percentageRated}
            {t("rating__rating__trailing_percent")}
          </Text>
          {!showDataForAllParticipants && !isScoringPreviewForParticipant && (
            <Icon
              customStyles={[
                tocEntryStyles.ratingIcon,
                useDisabledColor ? tocEntryStyles.disabledColor : tocEntryStyles.ratingColor(allRated)
              ]}
              name={allRated ? IconName.Check : IconName.InProgressCheck}
            />
          )}
        </div>
      </div>
    )
  }
  const renderCodingItemNode = (node: CodingNode, onClick: (id: UUID) => void) => {
    const scores = getScoresForCodingItem(node.id)
    const percentageRated = showDataForAllParticipants
      ? scores.maxScore > 0
        ? roundNumber((scores.averageScore / scores.maxScore) * 100)
        : 0
      : getPercentageRatedForCodingItemNode(node)

    return (
      <div className="toc-entry-text" css={tocEntryStyles.ratingRow} onClick={() => onClick(node.id)}>
        {node.iconName && <Icon customStyles={styles.icon} name={node.iconName} />}
        <Text customStyles={[styles.listItemText]} size={TextSize.Medium}>
          {node.name}
        </Text>
        <div css={[tocEntryStyles.ratingLabel]}>
          {showDataForAllParticipants || isScoringPreviewForParticipant ? (
            <Text customStyles={tocEntryStyles.disabledColor}>
              {percentageRated}
              {t("rating__rating__trailing_percent")}
            </Text>
          ) : (
            <React.Fragment>
              <Text
                customStyles={
                  useDisabledColor ? tocEntryStyles.disabledColor : tocEntryStyles.ratingColor(node.isRated === true)
                }>
                {node.canBeEvaluatedAutomatically
                  ? t("rating__rating__automatic_rating")
                  : t("rating__rating__manual_rating")}
              </Text>
              {!showDataForAllParticipants && !isScoringPreviewForParticipant && (
                <Icon
                  customStyles={[
                    tocEntryStyles.ratingIcon,
                    useDisabledColor ? tocEntryStyles.disabledColor : tocEntryStyles.ratingColor(node.isRated === true)
                  ]}
                  name={node.isRated ? IconName.Check : IconName.InProgressCheck}
                />
              )}
            </React.Fragment>
          )}
        </div>
      </div>
    )
  }

  const renderCustomCodingNode = (node: CodingNode, onClick: (id: UUID) => void) => {
    if (node.type !== NodeType.CodingModelAutomatedItem && node.type !== NodeType.CodingModelManualItem) {
      return renderCodingDimensionNode(node, onClick)
    } else {
      return renderCodingItemNode(node, onClick)
    }
  }

  const expandedNodeIds = getExpandedNodeIds(codingNodes, selectedEntityId)

  return (
    <ScenarioCodingModelTableOfContents
      customStyles={customStyles}
      customTocBodyStyles={ratingTocStyles.content(loading)}
      customHeaderStyles={customHeaderStyles}
      customFooterStyles={[styles.footer, customFooterStyles]}
      titleKey={"coding_models__title"}
      titleRightSideKey={rightSideKey}
      allCodingNodes={codingNodes}
      selectedNodeId={selectedEntityId}
      handleSelectNode={nodeOption => selectEntityId(nodeOption.map(node => node.id))}
      expandedNodeIds={expandedNodeIds}
      renderCustomNodeContent={renderCustomCodingNode}
      customOverviewElement={overViewElement}
      loading={loading}
      actionFooter={
        isNotRatable && !showDataForAllParticipants && !showDataForAllParticipants ? (
          <RatingTableOfContentsFooterPlaceholder />
        ) : (
          <RatingTableOfContentsFooter
            allRated={allRated}
            score={score}
            maxScore={maxScore}
            averageScore={averageScore}
            showAverageScore={showDataForAllParticipants}
          />
        )
      }
    />
  )
}

const ratingTocStyles = {
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
