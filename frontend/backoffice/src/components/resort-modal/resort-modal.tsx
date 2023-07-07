import isEqual from "lodash-es/isEqual"
import * as React from "react"
import {Heading, Modal, Overlay, TableContainer, Text} from "shared/components"
import {BinaryType, HeadingLevel} from "shared/enums"
import {Binary} from "shared/models"
import {FontWeight} from "shared/styles"
import {LucaI18nLangKey, useLucaTranslation} from "shared/translations"
import {Option, sortByPosition} from "shared/utils"
import {ResortableEntity, ResortedEntity} from "../../models"
import {resortModalStyle as styles} from "./resort-modal.style"
import {ResortModalBinaryViewer} from "./resort-modal-binary-viewer"
import {getResortTableProps} from "./resort-modal-table"

export interface ReorderModalProps<T extends ResortableEntity> {
  readonly entities: T[]
  readonly onConfirm: (orderedEntities: ResortedEntity[]) => void
  readonly onDismiss: () => void
  readonly tableLabel: string
  readonly titleKey: LucaI18nLangKey
  readonly disabled?: boolean
  readonly descriptionTextKey?: LucaI18nLangKey
  readonly isProject?: boolean
}

export const ResortModal = <T extends ResortableEntity>({
  disabled = false,
  entities: reorderEntities,
  onConfirm,
  onDismiss,
  tableLabel,
  descriptionTextKey,
  isProject,
  titleKey
}: ReorderModalProps<T>) => {
  const {t} = useLucaTranslation()

  const [binaries, setBinaries] = React.useState<Binary[]>([])
  const [selectedBinaryId, setSelectedBinaryId] = React.useState<Option<UUID>>(Option.none())
  const [visibleBinaryPreview, setBinaryPreviewVisible] = React.useState<Option<BinaryType.Image | BinaryType.Video>>(
    Option.none()
  )

  const prevReorderEntities = React.useRef<T[]>(reorderEntities)
  const [orderedEntities, setOrderedEntities] = React.useState<T[]>(sortByPosition(reorderEntities))
  const highestEntityIndex = orderedEntities.length - 1

  const updateSelectedBinaryId = (id: UUID) => setSelectedBinaryId(Option.of(id))

  const closeBinaryPreview = () => {
    setBinaryPreviewVisible(Option.none())
    setSelectedBinaryId(Option.none())
    setBinaries([])
  }

  const openBinaryPreview = (entityId: UUID, binaryType: BinaryType) => {
    if (binaryType !== BinaryType.Image && binaryType !== BinaryType.Video) {
      return
    }

    const previewBinaries = orderedEntities.reduce(
      (accumulator, entity) =>
        entity.binaryType === binaryType && !!entity.binarySrc
          ? [...accumulator, {id: entity.id, path: entity.binarySrc, title: entity.title}]
          : accumulator,
      [] as Binary[]
    )

    setBinaries(previewBinaries)
    setSelectedBinaryId(Option.of(entityId))
    setBinaryPreviewVisible(Option.of(binaryType))
  }

  const getFilteredEntities = (entityId: UUID) => orderedEntities.filter(({id}) => id !== entityId)

  const moveEntityToIndex = (index: number, entity: T) => {
    const list = getFilteredEntities(entity.id)
    list.splice(index, 0, entity)
    return list
  }

  const handleUpMove = (entity: T) => {
    const currentIndex = orderedEntities.indexOf(entity)
    const index = currentIndex > 0 ? currentIndex - 1 : 0
    setOrderedEntities(moveEntityToIndex(index, entity))
  }
  const handleDownMove = (entity: T) => {
    const currentIndex = orderedEntities.indexOf(entity)
    const index = currentIndex < highestEntityIndex ? currentIndex + 1 : highestEntityIndex
    setOrderedEntities(moveEntityToIndex(index, entity))
  }

  const {entities, entityKey, columns} = getResortTableProps({
    t,
    entities: orderedEntities,
    onUpMove: handleUpMove,
    onDownMove: handleDownMove,
    openBinaryPreview,
    isProject
  })

  const handleConfirm = () =>
    onConfirm(
      orderedEntities.map((entity, index) => {
        const predecessor = orderedEntities[index - 1]
        return {
          id: entity.id,
          ...(predecessor && {
            predecessorId: predecessor.id
          })
        }
      })
    )

  React.useEffect(() => {
    if (!isEqual(prevReorderEntities.current, reorderEntities)) {
      setOrderedEntities(sortByPosition(reorderEntities))
    }
  }, [reorderEntities, prevReorderEntities])

  return (
    <React.Fragment>
      <Overlay>
        <Modal
          customStyles={styles.modal}
          title={t(titleKey)}
          onConfirm={handleConfirm}
          onDismiss={onDismiss}
          confirmButtonDisabled={disabled}>
          <div css={styles.content}>
            {descriptionTextKey && <Text customStyles={styles.tableDescription}>{t(descriptionTextKey)}</Text>}
            <Heading customStyles={styles.tableHeader} level={HeadingLevel.h3} fontWeight={FontWeight.Bold}>
              {tableLabel}
            </Heading>
            <TableContainer
              customStyles={styles.table}
              customRowStyles={() => styles.tableRow(isProject)}
              customHeaderRowStyles={styles.headerRowStyle(isProject)}
              entities={entities}
              entityKey={entityKey}
              columns={columns}
            />
          </div>
        </Modal>
      </Overlay>
      {visibleBinaryPreview
        .map(type => (
          <ResortModalBinaryViewer
            type={type}
            binaries={binaries}
            onClose={closeBinaryPreview}
            activeBinaryId={selectedBinaryId}
            setActiveBinaryId={updateSelectedBinaryId}
          />
        ))
        .orNull()}
    </React.Fragment>
  )
}
