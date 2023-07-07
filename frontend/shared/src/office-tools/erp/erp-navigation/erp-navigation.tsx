import {css} from "@emotion/react"
import * as React from "react"
import {Checkbox, Icon, TableOfContentsContainer, TableOfContentsEntry, Text} from "../../../components"
import {IconName, NodeType} from "../../../enums"
import {BaseNode, ErpEntry} from "../../../models"
import {CustomStyle, Flex, flex1, fontColorLight, spacingSmall, TextSize} from "../../../styles"
import {useLucaTranslation} from "../../../translations"
import {Option} from "../../../utils"
import {useErpNavigation} from "./hooks/use-erp-navigation"
import {NavFooterButton} from "./nav-footer-button"

export interface ErpNavigationProps extends CustomStyle {
  readonly navigationEntries: ErpEntry[]
  readonly onEntrySelected: (node: BaseNode) => void
  readonly isReadonly?: boolean
  readonly onImportClicked?: () => void
  readonly onExportClicked?: () => void
  readonly onChangeCollapseState?: (node: BaseNode, isCollapsed: boolean) => void
  readonly onSelectTable?: (node: BaseNode) => void
  readonly selectedNode: Option<string>
}

export const ErpNavigation: React.FC<ErpNavigationProps> = ({
  navigationEntries,
  isReadonly = false,
  customStyles,
  onEntrySelected,
  onImportClicked,
  onExportClicked,
  onChangeCollapseState,
  selectedNode: selectedNodeId
}) => {
  const {t} = useLucaTranslation()

  const {
    selectedNode,
    setSelectedNode,
    hideLockedEntries,
    toggleHideLockedEntries,
    baseNodes,
    expandedNodeIds
  } = useErpNavigation(navigationEntries, selectedNodeId)

  const handleSelectNode = (nodeOption: Option<BaseNode>) => {
    nodeOption.forEach(node => node.type === NodeType.Table && onEntrySelected(node))

    setSelectedNode(nodeOption.map(node => node.id))
  }

  const hideLockedEntriesCheckbox = (
    <div key={"erp-navigation-checkbox"} className="erp-navigation-checkbox" css={Flex.row}>
      <Text size={TextSize.Medium}>{t("erp__navigation_hide_placeholders")}</Text>
      <Checkbox onChange={toggleHideLockedEntries} checked={hideLockedEntries} customStyles={styles.checkbox} />
    </div>
  )

  const footerButtons = (
    <div css={styles.footerButtons}>
      <NavFooterButton
        customStyles={styles.importButton}
        onClick={() => onImportClicked?.()}
        iconName={IconName.Upload}
        label={t("erp__navigation_import_excel_file")}
      />
      <NavFooterButton
        onClick={() => onExportClicked?.()}
        iconName={IconName.Download}
        label={t("erp__navigation_export_excel_file")}
      />
    </div>
  )

  const renderErpEntry = (node: BaseNode, onClick: () => void) => {
    return (
      <div key={node.id} onClick={onClick} css={styles.entry}>
        <div css={Flex.row}>
          <Icon
            customStyles={styles.entryIcon}
            name={node.type === NodeType.Directory ? IconName.Folder : IconName.Table}
          />
          <Text size={TextSize.Small}>{node.name}</Text>
        </div>
        {node.isLocked && <Icon color={fontColorLight} name={IconName.LockClosed} />}
      </div>
    )
  }

  return (
    <TableOfContentsContainer
      customCardStyles={customStyles}
      customFooterStyles={styles.footer}
      title={t("erp__title")}
      headerButtons={isReadonly ? [] : [hideLockedEntriesCheckbox]}
      actionFooter={isReadonly ? undefined : footerButtons}>
      {baseNodes.map(node => (
        <TableOfContentsEntry
          key={node.id}
          node={node}
          selectNode={handleSelectNode}
          selectedNode={selectedNode}
          renderCustomNodeContent={renderErpEntry}
          isCollapsible={true}
          onChangeCollapseState={onChangeCollapseState}
          expandedNodeIds={expandedNodeIds}
        />
      ))}
    </TableOfContentsContainer>
  )
}

const styles = {
  entry: css(Flex.row, {
    flex: flex1,
    justifyContent: "space-between"
  }),
  checkbox: css({
    marginLeft: spacingSmall
  }),
  entryIcon: css({
    marginRight: spacingSmall
  }),
  footer: css({
    height: "auto"
  }),
  footerButtons: css(Flex.column),
  importButton: css({
    marginBottom: spacingSmall
  })
}
