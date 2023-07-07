import * as React from "react"
import {UseFormMethods} from "react-hook-form"
import {useClipboard} from "use-clipboard-copy"
import {
  Breadcrumb,
  Button,
  ContentLoadingIndicator,
  Icon,
  Modal,
  Orly,
  Overlay,
  Text,
  Tooltip
} from "../../../../components"
import {ButtonVariant, ErpType, IconName} from "../../../../enums"
import {dispatchCopyNotification} from "../../../../hooks"
import {ErpEntity, ErpEntityByType, ErpStackEntity} from "../../../../models"
import {CustomStyle, iconDefaultColor, iconDisabledColor, primaryColor} from "../../../../styles"
import {useLucaTranslation} from "../../../../translations"
import {ErpScenarioSettingsConfig} from "../.."
import {
  getErpClipboardString,
  getErpEntityKeys,
  getErpInput,
  getErpLabel,
  getErpReferencingKeyAccordions,
  getForeignKeys,
  isForeignKey,
  isRequired as checkIsRequired
} from "../../utils"
import {erpDataSetOverlayStyles as styles} from "./erp-data-set-overlay.styles"
import {ErpDataSetMode, useErpDataSetOverlay} from "./hooks/use-erp-data-set-overlay"

interface ErpDataSetEventHandlers {
  readonly onOpenAttachment: (entityId: number, dataIndex: number, binaryFileId: UUID) => void
  readonly onCopyCoreDataToClipboard: (value: string, entityId: number, dataIndex: number) => void
  readonly onCopyCoreDataAndReferencesToClipboard: (value: string, entityId: number, dataIndex: number) => void
  readonly onCopyReferenceToClipboard: (
    value: string,
    propertyName: string,
    entityId: number,
    dataIndex: number
  ) => void
  readonly onNavigateToReference: (dataIndex: number, targetType: ErpType, targetId: number) => void
  readonly onNavigateBack: (type: ErpType, rowId: number, targetType: ErpType, targetId: number) => void
}

export interface ErpDataSetOverlayProps extends Partial<ErpDataSetEventHandlers>, CustomStyle {
  readonly data: ErpEntity
  readonly dataIndex: number
  readonly disabled?: boolean
  readonly getEntity: (erpType: ErpType, ids: number[], sourceErpEntity: ErpEntity) => Promise<ErpStackEntity>
  readonly mode?: ErpDataSetMode
  readonly onDismiss: (entityId: number, dataIndex: number) => void
  readonly renderDataSetOverlayFooter?: (config: ErpScenarioSettingsConfig) => JSX.Element
  readonly sampleCompanyId: UUID
  readonly scenarioId?: UUID
  readonly currentErpType: ErpType
}

export const ErpDataSetOverlay = ({
  customStyles,
  currentErpType,
  scenarioId,
  mode = ErpDataSetMode.Default,
  sampleCompanyId,
  data,
  dataIndex,
  getEntity,
  disabled = false,
  onDismiss,
  onCopyCoreDataToClipboard,
  onCopyCoreDataAndReferencesToClipboard,
  onNavigateToReference,
  onNavigateBack,
  onOpenAttachment,
  onCopyReferenceToClipboard,
  renderDataSetOverlayFooter
}: ErpDataSetOverlayProps) => {
  const {t} = useLucaTranslation()

  const {copy: copyToClipboard} = useClipboard()

  const {
    currentStackEntity,
    dispatch,
    modalTitleStack,
    formMethods,
    goBack,
    navigateToEntity,
    dataLoading,
    actionLoading,
    updateErpEntity,
    formValuesChanged,
    deleteErpEntity,
    autoCompleteLists,
    referencingPrimaryKeys,
    currentBinaryFile,
    shouldCreateCurrentEntity,
    sectionRef,
    sectionScrollSubject,
    scenarioErpSelector,
    deleteOrlyVisible,
    setDeleteOrlyVisible
  } = useErpDataSetOverlay({
    mode,
    sampleCompanyId,
    data,
    dataIndex,
    getEntity,
    onDismiss,
    onNavigateToReference,
    onNavigateBack
  })
  const {handleSubmit} = formMethods
  const foreignKeysList = getForeignKeys(currentStackEntity.foreignKeys)

  const copyDataToClipboard = () => {
    const dataString = getErpClipboardString(t, currentStackEntity.data)
    copyToClipboard(dataString)
    onCopyCoreDataToClipboard?.(dataString, currentStackEntity.data.id, currentStackEntity.index)
  }

  const onCopyDataWithReferences = (referencesDataString: string) => {
    const dataString = `${getErpClipboardString(t, currentStackEntity.data)};${referencesDataString}`
    copyToClipboard(dataString)
    onCopyCoreDataAndReferencesToClipboard?.(dataString, currentStackEntity.data.id, currentStackEntity.index)
  }

  const showCopyNotification = () => {
    dispatchCopyNotification(dispatch)
  }

  const onDelete = () => {
    deleteErpEntity()
    setDeleteOrlyVisible(false)
  }

  const renderHeader = () => {
    const shouldShortenTitles = modalTitleStack.length > 3
    const titles = shouldShortenTitles
      ? [...modalTitleStack.slice(0, 1), ...modalTitleStack.slice(modalTitleStack.length - 2)]
      : modalTitleStack
    const lastTitleIndex = titles.length ? titles.length - 1 : 0

    return (
      <div css={styles.modalHeader}>
        {modalTitleStack.length > 1 && (
          <Button
            customStyles={styles.modalHeaderBackButton}
            iconColor={iconDefaultColor}
            variant={ButtonVariant.IconOnly}
            icon={IconName.ArrowLeft}
            onClick={goBack}
          />
        )}
        {shouldCreateCurrentEntity ? (
          <div>{t("erp_dataset__create")}</div>
        ) : (
          titles.map((modalTitle, index) =>
            index === lastTitleIndex ? (
              <div key={`title_${modalTitle}_${index}`} css={styles.modalHeaderTitle(index !== 0)}>
                {modalTitle}
              </div>
            ) : (
              <React.Fragment key={`title_${modalTitle}_${index}`}>
                <div css={styles.modalHeaderTitle(false)}>{modalTitle}</div>
                <Icon customStyles={styles.modalHeaderIcon} name={IconName.ArrowBreadcrumb} />
                {shouldShortenTitles && index === 0 && (
                  <React.Fragment>
                    <Breadcrumb />
                    <Icon customStyles={styles.modalHeaderIcon} name={IconName.ArrowBreadcrumb} />
                  </React.Fragment>
                )}
              </React.Fragment>
            )
          )
        )}
      </div>
    )
  }

  const renderDataEntity = (key: keyof typeof currentStackEntity.data) => {
    const hasKeyIcon = key === "id" || isForeignKey(foreignKeysList, key)
    const isRequired = checkIsRequired({type: currentStackEntity.data.type, key})
    return (
      <div css={styles.entity}>
        <div css={styles.entityLabelWrapper(hasKeyIcon, !disabled && isRequired)}>
          <div css={styles.entityLabel}>
            {getErpLabel({
              t,
              type: currentStackEntity.data.type,
              key,
              foreignKeys: foreignKeysList,
              showType: !disabled
            })}
            {!disabled && isRequired && <sup>*</sup>}
            {key === "id" && <Icon customStyles={styles.entityIcon} name={IconName.KeyFilled} color={primaryColor} />}
            {isForeignKey(foreignKeysList, key) && (
              <Icon customStyles={styles.entityIcon} name={IconName.KeyFilled} color={iconDisabledColor} />
            )}
          </div>
        </div>
        <div css={styles.entityInput}>
          {getErpInput({
            dispatch,
            t,
            type: currentStackEntity.data.type,
            key,
            formMethods: formMethods as UseFormMethods<ErpEntityByType<typeof currentStackEntity.data.type>>,
            disabled,
            foreignKeys: currentStackEntity.foreignKeys,
            navigateToEntity,
            autoCompleteLists,
            binaryFile: currentBinaryFile,
            isCreating: shouldCreateCurrentEntity,
            onCopyReferenceToClipboard: (value: string, propertyName: string) =>
              onCopyReferenceToClipboard?.(value, propertyName, currentStackEntity.data.id, currentStackEntity.index),
            onOpenAttachment: (binaryFileId: UUID) =>
              onOpenAttachment?.(currentStackEntity.data.id, currentStackEntity.index, binaryFileId),
            sectionScrollSubject
          })}
        </div>
      </div>
    )
  }

  return (
    <Overlay>
      <Modal
        customStyles={[styles.modal, customStyles]}
        customHeaderStyles={styles.modalHeaderWrapper}
        customFooterStyles={styles.modalFooter}
        customContentStyles={styles.contentWrapper}
        confirmButtonDisabled={
          dataLoading || actionLoading || !formValuesChanged || Object.keys(formMethods.formState.errors).length > 0
        }
        deleteButtonDisabled={dataLoading || actionLoading || shouldCreateCurrentEntity}
        onConfirm={handleSubmit(updateErpEntity)}
        onDismiss={() => onDismiss(data.id, dataIndex)}
        onDelete={!disabled ? () => setDeleteOrlyVisible(true) : undefined}
        deleteButtonKey={"erp_dataset__delete"}
        confirmButtonKey={shouldCreateCurrentEntity ? "add_button" : undefined}
        title={undefined}
        hideFooter={disabled && !scenarioId && renderDataSetOverlayFooter === undefined}
        showEmptyFooter={false}
        renderHeader={renderHeader}
        renderFooter={
          typeof renderDataSetOverlayFooter === "function"
            ? () =>
                renderDataSetOverlayFooter({
                  erpType: currentErpType,
                  rowId: data.id,
                  scenarioErpSelector
                })
            : undefined
        }
        sectionRef={sectionRef}>
        {dataLoading ? (
          <ContentLoadingIndicator customStyles={styles.loadingIndicator} />
        ) : (
          <React.Fragment>
            <div className={"erp-dataset-content"} css={styles.content}>
              {currentStackEntity.data.type !== ErpType.ComponentProduct && (
                <div className={"erp-dataset-primary-key"} css={styles.primaryKeyWrapper}>
                  {renderDataEntity("id")}
                </div>
              )}
              <div className={"erp-dataset-entities"} css={styles.entitiesWrapper}>
                {getErpEntityKeys(currentStackEntity.data)
                  .filter(key => !["id", "binaryFileId", "binaryFile", "type", "sampleCompanyId"].includes(key))
                  .map((key, index) => (
                    <React.Fragment key={`data_${key}_${index}`}>
                      {renderDataEntity(key as keyof typeof currentStackEntity.data)}
                    </React.Fragment>
                  ))}
              </div>

              {currentStackEntity.data.type !== ErpType.ComponentProduct && (
                <div className={"erp-dataset-binary-file"} css={styles.binaryFileWrapper}>
                  {/*             //TODO LUCA-2757 */}
                  {renderDataEntity("binaryFileId" as any)}
                </div>
              )}
              {disabled ? (
                <div className={"copy-dataset-to-clipboard"} css={styles.copyIconWrapper}>
                  <div css={styles.copyIconContent} onClick={() => copyDataToClipboard()}>
                    <Tooltip customStyles={styles.copyIconTooltip} title={t("clipboard__copy")}>
                      <div css={styles.copyIconLabel}>{t("erp_dataset__copy_all")}</div>
                      <Icon name={IconName.Duplicate} color={iconDefaultColor} />
                    </Tooltip>
                  </div>
                </div>
              ) : (
                <div css={styles.requiredInfo}>
                  <sup>*</sup>
                  <Text customStyles={styles.requiredInfoText}>{t("erp_dataset__required_info")}</Text>
                </div>
              )}
            </div>
            {disabled && (
              <div css={styles.referencingPrimaryKeys}>
                {getErpReferencingKeyAccordions({
                  t,
                  navigateToEntity,
                  referencingPrimaryKeys,
                  onCopyAll: onCopyDataWithReferences,
                  onCopySingleToClipboard: showCopyNotification
                })}
              </div>
            )}
          </React.Fragment>
        )}
      </Modal>
      {deleteOrlyVisible && (
        <Orly
          customOverlayStyles={styles.deleteOrly}
          onConfirm={onDelete}
          onDismiss={() => setDeleteOrlyVisible(false)}
          titleKey={"erp__dialog_delete_dataset_title"}
          textKey={"erp__dialog_delete_dataset_description"}
        />
      )}
    </Overlay>
  )
}
