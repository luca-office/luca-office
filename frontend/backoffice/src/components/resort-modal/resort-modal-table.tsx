import * as React from "react"
import {Button, Column, Columns, Heading, Icon, TableContainerProps, Text} from "shared/components"
import {BinaryType, ButtonVariant, HeadingLevel, IconName} from "shared/enums"
import {Flex, FontWeight, iconDefaultColor, spacingTiny, TextSize} from "shared/styles"
import {LucaTFunction} from "shared/translations"
import {convertSecondsToMinutes, getProjectModuleIcon, getProjectModuleTranslationKey, isDefined} from "shared/utils"
import {ResortableEntity} from "../../models"
import {CardDurationInfo} from "../card"
import {resortModalStyle as styles} from "./resort-modal.style"

const isMoveUpwardsDisabled = <T extends ResortableEntity>(entities: T[], entity: T) => entities.indexOf(entity) === 0
const isMoveDownwardsDisabled = <T extends ResortableEntity>(entities: T[], entity: T) =>
  entities.indexOf(entity) === entities.length - 1

export const getResortTableProps = <T extends ResortableEntity>({
  entities,
  onDownMove,
  onUpMove,
  openBinaryPreview,
  isProject,
  t
}: {
  readonly entities: T[]
  readonly onDownMove: (entity: T) => void
  readonly onUpMove: (entity: T) => void
  readonly openBinaryPreview: (entityId: UUID, binaryType: BinaryType) => void
  readonly isProject?: boolean
  readonly t: LucaTFunction
}): TableContainerProps<T> => {
  const projectDuration = !isProject
    ? undefined
    : convertSecondsToMinutes(
        entities
          .map(e => (e.scenario?.maxDurationInSeconds ? e.scenario.maxDurationInSeconds : 0))
          .reduce((a, b) => a + b, 0)
      )
  return {
    entities,
    entityKey: entity => entity.id,
    columns: [
      ...(!isProject
        ? [
            {
              header: (
                <div css={Flex.row}>
                  {!isProject && <Icon customStyles={{marginRight: spacingTiny}} name={IconName.Book} />}
                  <Heading level={HeadingLevel.h3} fontWeight={FontWeight.Bold}>
                    {t("reorder__table_column_title")}
                  </Heading>
                </div>
              ),
              key: "title",
              content: (entity: T) => (
                <Columns>
                  {!!entity.icon && (
                    <Column flexGrow={0} flexShrink={0}>
                      <Icon name={entity.icon} color={entity.color ?? iconDefaultColor} />
                    </Column>
                  )}
                  <Column customStyles={styles.tableTitleColumn(entity.color)}>{entity.title}</Column>
                  {!!entity.binarySrc && !!entity.binaryType && (
                    <Column flexGrow={0} flexShrink={0}>
                      <Button
                        customStyles={styles.previewButton}
                        onClick={() => openBinaryPreview(entity.id, entity.binaryType!)}>
                        {t("reorder__table_show_preview")}
                      </Button>
                    </Column>
                  )}
                </Columns>
              )
            }
          ]
        : [
            {
              header: (
                <Heading level={HeadingLevel.h3} fontWeight={FontWeight.Bold}>
                  {t("reorder__table_column_title")}
                </Heading>
              ),
              content: (entity: T, index: number | undefined) => (
                <Column customStyles={styles.tableTitleColumn(entity.color)} flexShrink={0} flexGrow={0}>
                  <span>{index !== undefined && `${index + 1}. ${entity.title}`}</span>
                </Column>
              ),
              key: "name"
            }
          ]),
      ...(isProject
        ? [
            {
              header: (
                <Heading level={HeadingLevel.h3} fontWeight={FontWeight.Bold}>
                  {t("type")}
                </Heading>
              ),
              content: (entity: T) => (
                <div css={Flex.row}>
                  {entity.moduleType && (
                    <>
                      <Icon name={getProjectModuleIcon(entity.moduleType)} hasSpacing={true} />
                      <Text size={TextSize.Medium}>{t(getProjectModuleTranslationKey(entity.moduleType))}</Text>
                    </>
                  )}
                </div>
              ),
              key: "type"
            },
            {
              header: (
                <Heading level={HeadingLevel.h3} fontWeight={FontWeight.Bold}>
                  {`${t("projects__detail_time_label")} (${projectDuration} min)`}
                </Heading>
              ),
              content: (entity: T) => {
                const maxDuration = entity.scenario?.maxDurationInSeconds ?? entity.questionnaire?.maxDurationInSeconds
                return isDefined(maxDuration) ? (
                  <CardDurationInfo maxDurationInSeconds={maxDuration} showIconBeforeText={true} t={t} />
                ) : (
                  <CardDurationInfo showIconBeforeText={true} placeholder={"-"} t={t} />
                )
              },

              key: "maxDurationInSeconds"
            }
          ]
        : []),
      {
        header: isProject ? <div /> : null,
        key: "controls",
        content: entity => (
          <Columns>
            <Column flexGrow={0} flexShrink={0}>
              <Button
                variant={ButtonVariant.IconOnly}
                onClick={() => onUpMove(entity)}
                icon={IconName.ArrowUp}
                disabled={isMoveUpwardsDisabled(entities, entity)}
              />
            </Column>
            <Column flexGrow={0} flexShrink={0}>
              <Button
                variant={ButtonVariant.IconOnly}
                onClick={() => onDownMove(entity)}
                icon={IconName.ArrowDown}
                disabled={isMoveDownwardsDisabled(entities, entity)}
              />
            </Column>
          </Columns>
        )
      }
    ]
  }
}
