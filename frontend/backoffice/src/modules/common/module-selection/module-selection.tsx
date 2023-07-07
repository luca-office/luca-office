import * as React from "react"
import {Button, CardFooter, Content, DetailViewHeader, Text} from "shared/components"
import {shadowedCard} from "shared/styles"
import {LucaTFunction} from "shared/translations"
import {first} from "shared/utils"
import {CardOverview} from "../../../components"
import {cardOverview as cardOverviewStyle} from "../../../styles/common"
import {ModuleSelectionContainerProps, SelectionBaseEntity} from "./module-selection-container"
import {styles} from "./module-selection-styles"
import {SelectionCardFooter} from "./selection-card-footer/selection-card-footer"

export interface ModuleSelectionComponentProps<T extends SelectionBaseEntity> extends ModuleSelectionContainerProps<T> {
  readonly deselectEntity: (entity: T) => void
  readonly selectEntity: (entity: T) => void
  readonly selectedEntities: T[]
  readonly t: LucaTFunction
}

export const ModuleSelection = <T extends SelectionBaseEntity>({
  alreadyAssignedEntities,
  deselectEntity,
  entities,
  footerConfig,
  multiSelection,
  onSelectionConfirmed,
  renderContent,
  selectedEntities,
  selectEntity,
  subheaderConfig,
  t,
  customCardOverviewStyles,
  renderCustomCardFooterItem,
  getEditingStatusConfig,
  userMayFinalizeWithoutPublishing
}: ModuleSelectionComponentProps<T>) => {
  const amountOfSelectedEntities = selectedEntities.length

  const firstSelectedEntity = first(selectedEntities)

  const isDisabledCauseOfSingleSelection = (entity: T) =>
    !multiSelection && firstSelectedEntity.exists(selectedEntity => selectedEntity.id !== entity.id)

  const cardOverview = (
    <CardOverview
      customStyles={[cardOverviewStyle, customCardOverviewStyles]}
      entityFilterType={subheaderConfig.entityFilterType}
      advancedFilters={false}
      customSubheaderStyles={[styles.subheader, subheaderConfig.customFilterHeaderStyles]}
      selectionCount={selectedEntities.length}
      userMayFinalizeWithoutPublishing={userMayFinalizeWithoutPublishing}>
      {entities.map(entity =>
        renderContent(
          entity,
          <SelectionCardFooter<T>
            onClick={() => onSelectionConfirmed(selectedEntities)}
            deselectEntity={deselectEntity}
            selectEntity={selectEntity}
            author={`${entity.author.firstName} ${entity.author.lastName}`}
            entity={entity}
            key={entity.id}
            createdAt={entity.createdAt}
            customFooterItem={renderCustomCardFooterItem ? renderCustomCardFooterItem(entity) : undefined}
            isDisabled={isDisabledCauseOfSingleSelection(entity)}
            isAssigned={alreadyAssignedEntities.map(item => item.id).includes(entity.id)}
            isSelected={selectedEntities.map(item => item.id).includes(entity.id)}
            editingStatusConfig={getEditingStatusConfig ? getEditingStatusConfig(entity) : undefined}
          />
        )
      )}
    </CardOverview>
  )

  const subHeader = (
    <DetailViewHeader
      labelKey={subheaderConfig.labelKey}
      navigationButtonConfig={subheaderConfig.navigationButton}
      customStyles={[subheaderConfig.customStyles, {position: "relative"}]}
    />
  )

  const getFooterText = () => {
    if (amountOfSelectedEntities === 0) {
      return t(footerConfig.emptySelectionKey)
    }

    if (multiSelection) {
      return `${amountOfSelectedEntities} ${t(footerConfig.entitySelectionKey)} ${t(
        "module_selection__multi_entity_selected"
      )}`
    } else {
      return t("module_selection__single_entity_selected", {
        name: first(selectedEntities)
          .map(entity => entity.name)
          .getOrElse("")
      })
    }
  }

  const contentFooter = (amountOfSelectedEntities: number) => (
    <CardFooter customStyles={[styles.fullWidth, styles.footerWithText, shadowedCard]}>
      <Text customStyles={[styles.footerText, styles.selectedText]}>{getFooterText()}</Text>
      <Button
        onClick={() => onSelectionConfirmed(selectedEntities)}
        disabled={amountOfSelectedEntities === 0}
        customStyles={styles.addButton}>
        {t("reference_books__scenario_add_selected_label", {
          count: amountOfSelectedEntities
        })}
      </Button>
    </CardFooter>
  )

  return (
    <Content
      customStyles={styles.contentOverwrite}
      customContentContainerStyles={styles.contentContainer}
      subHeader={subHeader}
      actionBar={contentFooter(amountOfSelectedEntities)}>
      {cardOverview}
    </Content>
  )
}
