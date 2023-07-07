import React from "react"
import {Icon, Text} from "../../../components"
import {QuestionScoringType} from "../../../graphql/generated/globalTypes"
import {ReportBaseNode} from "../../../models"
import {Flex, TextSize} from "../../../styles"
import {LucaTFunction} from "../../../translations"
import {toPercent} from "../../../utils"

interface Props<T extends ReportBaseNode> {
  readonly t: LucaTFunction
  readonly node: T
  readonly onClick: (node: T) => void
}

export const TocNode = <T extends ReportBaseNode>({t, node, onClick}: Props<T>) => (
  <div css={styles.node} onClick={() => onClick(node)}>
    <div css={Flex.row}>
      {node.iconName && <Icon hasSpacing name={node.iconName} />}
      <Text size={TextSize.Medium}>{node.name}</Text>
    </div>
    <Text>
      {node.scoringType === QuestionScoringType.None ? (
        t("rater_rating_details__project_module_no_rating")
      ) : (
        <>
          {toPercent(node.score, node.maxScore)}
          {t("rating__rating__trailing_percent")}
        </>
      )}
    </Text>
  </div>
)

const styles = {
  node: {
    display: "flex",
    justifyContent: "space-between",
    flexGrow: 1
  }
}
