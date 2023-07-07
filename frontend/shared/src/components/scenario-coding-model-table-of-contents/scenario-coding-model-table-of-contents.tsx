import {css} from "@emotion/react"
import {CSSInterpolation} from "@emotion/serialize"
import * as React from "react"
import {BaseNode, ButtonConfig, CodingNode} from "../../models"
import {borderRadius, CustomStyle, fileExplorerSelectedColor, spacingSmall, spacingTiny, TextSize} from "../../styles"
import {LucaI18nLangKey, useLucaTranslation} from "../../translations"
import {Option} from "../../utils"
import {ContentLoadingIndicator} from "../content-loading-indicator/content-loading-indicator"
import {TableOfContentsContainer, TableOfContentsEntry} from "../table-of-content"
import {Text} from "../typography/typography"

export interface CodingModelTableOfContentsProps<T extends BaseNode> extends CustomStyle {
  readonly allCodingNodes: CodingNode[]
  readonly selectedNodeId: Option<UUID>
  readonly handleSelectNode: (node: Option<BaseNode>) => void
  readonly expandedNodeIds: UUID[]
  readonly isReadOnly?: boolean
  readonly renderCustomNodeContent?: (node: T, onClick: () => void) => JSX.Element | null
  readonly navigateToOverview?: () => void
  readonly buttonConfig?: ButtonConfig
  readonly isModalVisible?: boolean
  readonly renderModal?: () => JSX.Element
  readonly titleKey?: LucaI18nLangKey
  readonly titleRightSideKey?: LucaI18nLangKey
  readonly customOverviewElement?: JSX.Element
  readonly loading?: boolean
  readonly actionFooter?: React.ReactNode
  readonly customHeaderStyles?: CSSInterpolation
  readonly customFooterStyles?: CSSInterpolation
  readonly customTocBodyStyles?: CSSInterpolation
}

export const ScenarioCodingModelTableOfContents: React.FC<CodingModelTableOfContentsProps<BaseNode>> = ({
  customStyles,
  allCodingNodes,
  handleSelectNode,
  selectedNodeId,
  expandedNodeIds,
  isReadOnly,
  renderCustomNodeContent,
  navigateToOverview,
  buttonConfig,
  isModalVisible,
  renderModal,
  titleKey = "table_of_contents",
  titleRightSideKey,
  customOverviewElement,
  loading,
  actionFooter,
  customHeaderStyles,
  customFooterStyles,
  customTocBodyStyles
}) => {
  const {t} = useLucaTranslation()

  return (
    <>
      <TableOfContentsContainer
        readonly={isReadOnly}
        addButtonConfig={buttonConfig}
        customCardContentStyles={styles.overflowY}
        customTocBodyStyles={customTocBodyStyles}
        customCardStyles={[styles.overflowY, customStyles]}
        customCardHeaderStyles={customHeaderStyles}
        customFooterStyles={customFooterStyles}
        title={t(titleKey)}
        titleRightSide={titleRightSideKey && t(titleRightSideKey)}
        actionFooter={actionFooter}>
        {loading ? (
          <ContentLoadingIndicator />
        ) : (
          <>
            {customOverviewElement ? (
              customOverviewElement
            ) : (
              <Text
                onClick={navigateToOverview}
                customStyles={styles.overviewText(selectedNodeId.isEmpty())}
                size={TextSize.Medium}>
                {t("overview")}
              </Text>
            )}

            {allCodingNodes.map(codingNode => (
              <TableOfContentsEntry
                expandedNodeIds={expandedNodeIds}
                isCollapsible
                renderCustomNodeContent={renderCustomNodeContent}
                key={codingNode.id}
                selectedNode={selectedNodeId}
                node={codingNode}
                selectNode={handleSelectNode}
              />
            ))}
          </>
        )}
      </TableOfContentsContainer>
      {isModalVisible && renderModal && renderModal()}
    </>
  )
}

const styles = {
  overviewText: (isSelected: boolean) =>
    css({
      marginBottom: spacingSmall,
      padding: spacingTiny,
      cursor: "pointer",
      ...(isSelected && {backgroundColor: fileExplorerSelectedColor, borderRadius})
    }),
  overflowY: css({
    overflowY: "auto"
  })
}
