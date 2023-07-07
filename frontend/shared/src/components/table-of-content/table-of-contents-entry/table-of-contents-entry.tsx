import * as React from "react"
import {IconName} from "../../../enums"
import {BaseNode} from "../../../models"
import {Children, Flex, spacingSmall, TextSize} from "../../../styles"
import {exists, isDefined, isEmpty, Option, scrollToElement, sortByPosition} from "../../../utils"
import {Icon, Text, TocEntryPlaceholder} from "../.."
import {getContentListStyle, getListItemStyle, tocEntryStyles as styles} from "./table-of-contents-entry-style"

export interface TableOfContentsEntryProps<T extends BaseNode> {
  readonly selectNode: (id: Option<T>) => void
  readonly node: T
  readonly selectedNode: Option<UUID>
  readonly fadeParent?: boolean
  readonly expandedNodeIds?: UUID[]
  readonly hideParent?: boolean
  readonly isCollapsible?: boolean
  readonly renderCustomNodeContent?: (node: T, onClick: () => void) => JSX.Element | null
  readonly indentChildren?: boolean
  readonly onChangeCollapseState?: (node: T, isCollapsed: boolean) => void
  readonly children?: BaseNode[]
}

export const TableOfContentsEntry = <T extends BaseNode>({
  node,
  selectNode,
  selectedNode,
  hideParent,
  fadeParent,
  renderCustomNodeContent,
  expandedNodeIds,
  indentChildren,
  isCollapsible = false,
  onChangeCollapseState
}: TableOfContentsEntryProps<T>) => {
  const selected = selectedNode.map(selection => node.id === selection).getOrElse(false)

  React.useEffect(() => {
    if (expandedNodeIds && expandedNodeIds.length > 0) {
      const includedInExpandedIds = expandedNodeIds?.includes(node.id) ?? false

      if (includedInExpandedIds && !isExpanded) {
        setIsExpanded(true)
      }
    }
  }, [expandedNodeIds])

  const [isExpanded, setIsExpanded] = React.useState<boolean>(!isCollapsible || selected)

  const updateIsExpandedState = (expanded: boolean) => {
    setIsExpanded(!expanded)
    onChangeCollapseState?.(node, expanded)
  }

  const handleClick = () => {
    if (node.isScrollable) {
      scrollToElement(node.id)
    } else {
      selectNode(selected ? Option.none() : Option.of(node))
    }

    if (isCollapsible) {
      updateIsExpandedState(selected)
    }
  }

  React.useEffect(() => {
    const isItemSelected = selectedNode
      .map(selection => exists(item => item.id === selection, node.children || []))
      .getOrElse(false)

    if (!isExpanded && isItemSelected) {
      setIsExpanded(true)
    }
  }, [selectedNode, node, isExpanded])

  const handleChevronClick = () => updateIsExpandedState(isExpanded)

  const customNodeContent = renderCustomNodeContent?.(node, handleClick)

  return (
    <React.Fragment>
      {!hideParent && (
        <div css={[getListItemStyle(node.isScrollable ? false : selected)]} className="toc-entry">
          {(node.parentId || isCollapsible) && (
            <Icon
              onClick={handleChevronClick}
              customStyles={styles.triangle(isCollapsible)}
              width={spacingSmall}
              height={spacingSmall}
              name={
                isExpanded
                  ? !isEmpty(node.children || [])
                    ? IconName.TriangleDown
                    : IconName.TriangleDownLined
                  : !isEmpty(node.children || [])
                  ? IconName.TriangleRight
                  : IconName.TriangleRightLined
              }
            />
          )}
          {customNodeContent}
          {node.name && !isDefined(customNodeContent) ? (
            <div className="toc-entry-text" css={[Flex.row, styles.entryText]} onClick={handleClick}>
              {node.iconName && (
                <Icon customStyles={[styles.icon, fadeParent && styles.fadedItem]} name={node.iconName} />
              )}

              <Text customStyles={[styles.listItemText, fadeParent && styles.fadedItem]} size={TextSize.Medium}>
                {node.name}
              </Text>
            </div>
          ) : (
            !isDefined(customNodeContent) && <TocEntryPlaceholder nodeType={node.type} />
          )}
          {fadeParent && <Icon customStyles={[styles.icon, styles.hiddenIcon]} name={IconName.Hidden} />}
        </div>
      )}
      {isExpanded && (
        <div css={getContentListStyle(!!hideParent, indentChildren)}>
          {node.children &&
            sortByPosition(node.children).map(childItem => (
              <TableOfContentsEntry<T>
                key={childItem.id}
                node={childItem as T}
                selectNode={selectNode}
                renderCustomNodeContent={renderCustomNodeContent}
                isCollapsible={childItem.children && childItem.children.length > 0}
                selectedNode={selectedNode}
                expandedNodeIds={expandedNodeIds}
                hideParent={false}
                fadeParent={false}
                onChangeCollapseState={onChangeCollapseState}
              />
            ))}
        </div>
      )}
    </React.Fragment>
  )
}
