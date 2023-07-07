import {css} from "@emotion/react"
import {sumBy} from "lodash-es"
import * as React from "react"
import {CardHeader, TableOfContentsContainer, TableOfContentsEntry, Text} from "shared/components"
import {TocNode} from "shared/components/reporting-questionnaire-overlay/toc/toc-node"
import {ReportParticipantScenarioNode, ScenarioSurveyResultsForParticipant} from "shared/models"
import {
  borderRadius,
  CustomStyle,
  fileExplorerSelectedColor,
  flex0,
  mediumBoxShadow,
  spacingSmall,
  spacingTiny,
  TextSize
} from "shared/styles"
import {LucaTFunction} from "shared/translations"
import {first, Option, roundNumber} from "shared/utils"

interface Props extends CustomStyle {
  readonly scenarioSurveyResultsForParticipants: ScenarioSurveyResultsForParticipant[]
  readonly nodes: ReportParticipantScenarioNode[]
  readonly selectedNodeId: Option<UUID>
  readonly t: LucaTFunction
  readonly updateSelectedNodeId: (id: UUID) => void
  readonly navigateToOverview: () => void
}

export const Toc: React.FC<Props> = props => {
  const {
    t,
    customStyles,
    navigateToOverview,
    scenarioSurveyResultsForParticipants,
    selectedNodeId,
    nodes,
    updateSelectedNodeId
  } = props

  const header = (
    <CardHeader customStyles={styles.header} hasGreyBackground hasShadow>
      <Text size={TextSize.Medium}> {t("coding_models__title")}</Text>
      <Text size={TextSize.Medium}> {t("rating__right_side_title_table_of_contents")}</Text>
    </CardHeader>
  )

  const firstResult = first(scenarioSurveyResultsForParticipants).orUndefined()
  const allItemsOfFirstResult = firstResult?.codingItemResults ?? []
  const averageScore = sumBy(allItemsOfFirstResult, result => result.averageScore)
  const maxScore = sumBy(allItemsOfFirstResult, result => result.maximumScore)

  const footer = (
    <div css={styles.footer}>
      <div>{t("rating__average_score_achieved")}:</div>
      <div>{t("rating__rating__scoring", {score: roundNumber(averageScore), maxScore})}</div>
    </div>
  )

  return (
    <>
      <TableOfContentsContainer
        customStyles={customStyles}
        customCardStyles={styles.card}
        customFooterStyles={styles.tocFooter}
        title=""
        customHeader={header}
        actionFooter={footer}>
        <Text
          onClick={navigateToOverview}
          customStyles={styles.overviewText(selectedNodeId.isEmpty())}
          size={TextSize.Medium}>
          {t("overview")}
        </Text>
        {nodes.map(codingNode => (
          <TableOfContentsEntry
            isCollapsible
            renderCustomNodeContent={node => (
              <TocNode t={t} node={node} onClick={node => updateSelectedNodeId(node.id)} />
            )}
            key={codingNode.id}
            selectedNode={selectedNodeId}
            node={codingNode}
            selectNode={nodeOption => nodeOption.map(node => updateSelectedNodeId(node.id))}
          />
        ))}
      </TableOfContentsContainer>
    </>
  )
}
const styles = {
  card: {
    boxShadow: mediumBoxShadow,

    "&:hover": {
      boxShadow: mediumBoxShadow
    }
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    flex: flex0
  },
  footer: {
    display: "flex",
    justifyContent: "space-between"
  },
  tocFooter: {
    flex: flex0,
    justifyContent: "center"
  },
  overviewText: (isSelected: boolean) =>
    css({
      marginBottom: spacingSmall,
      padding: spacingTiny,
      cursor: "pointer",
      ...(isSelected && {backgroundColor: fileExplorerSelectedColor, borderRadius})
    })
}
