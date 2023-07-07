import * as React from "react"
import {IconName} from "../../enums"
import {ButtonConfig, UseArchiveEntityHook, UseDeleteEntityHook} from "../../models"
import {CustomStyle, Flex} from "../../styles"
import {LucaI18nLangKey, useLucaTranslation} from "../../translations"
import {Button} from "../button/button"
import {DeleteOrArchiveEntityButton} from "../delete-or-archive-entity-button/delete-or-archive-entity-button"
import {Icon} from "../icon/icon"
import {OrlyButtonContainer, TooltipConfig} from "../orly-button/orly-button"
import {detailViewHeaderStyle as styles} from "./detail-view-header.style"

export interface DetailViewHeaderDeleteOrArchiveButtonConfig {
  readonly disabled?: boolean
  readonly entityId: UUID
  readonly deleteHook?: UseDeleteEntityHook
  readonly archiveHook?: UseArchiveEntityHook
  readonly invisible?: boolean
  readonly onSuccess?: (entityId?: UUID) => void
}

export interface DetailViewHeaderProps extends CustomStyle {
  readonly labelKey: LucaI18nLangKey
  readonly customContent?: React.ReactNode
  readonly deleteOrArchiveButtonConfig?: DetailViewHeaderDeleteOrArchiveButtonConfig
  readonly labelOptions?: Record<string, string> // translation key options
  readonly navigationButtonConfig?: ButtonConfig
  readonly operationButtonConfig?: DetailViewHeaderButtonConfig
  readonly secondOperationButtonConfig?: DetailViewHeaderButtonConfig
}

export interface DetailViewHeaderButtonConfig extends Omit<ButtonConfig, "tooltipKey"> {
  readonly tooltipConfig?: TooltipConfig
}

export const DetailViewHeader: React.FC<DetailViewHeaderProps> = ({
  customStyles,
  deleteOrArchiveButtonConfig,
  labelKey,
  labelOptions,
  navigationButtonConfig,
  operationButtonConfig,
  secondOperationButtonConfig,
  customContent
}) => {
  const {t} = useLucaTranslation()

  const handleClick = () => {
    operationButtonConfig?.onClick()
  }

  return (
    <div css={[styles.header, customStyles]}>
      {navigationButtonConfig && (
        <Button customStyles={[styles.button, styles.navigationButton]} onClick={navigationButtonConfig.onClick}>
          <Icon name={IconName.ArrowLeft} customStyles={styles.navigationButtonIcon} />
          <div css={styles.navigationButtonLabel}>{t(navigationButtonConfig.labelKey)}</div>
        </Button>
      )}
      <div css={styles.label}>{t(labelKey, labelOptions)}</div>
      {(!!operationButtonConfig || !!deleteOrArchiveButtonConfig) && (
        <div css={[Flex.row, styles.buttonWrapper]}>
          {operationButtonConfig &&
            operationButtonConfig.hide !== true &&
            (operationButtonConfig.orlyTextKey ? (
              <OrlyButtonContainer
                confirmButtonKey={operationButtonConfig.orlyConfirmKey}
                disabled={operationButtonConfig.disabled}
                customButtonStyles={[styles.button, styles.operationButton]}
                iconName={operationButtonConfig.icon}
                onConfirm={handleClick}
                tooltipConfig={operationButtonConfig.tooltipConfig}
                modalTitleKey={operationButtonConfig.orlyTitleKey}
                textKey={operationButtonConfig.labelKey}
                modalTextKey={operationButtonConfig.orlyTextKey}
                dismissOnConfirm={true}
              />
            ) : (
              <Button
                customStyles={[styles.button, styles.operationButton]}
                onClick={handleClick}
                disabled={operationButtonConfig.disabled}
                isLoading={operationButtonConfig.loading === true}
                icon={operationButtonConfig.icon}>
                {t(operationButtonConfig.labelKey)}
              </Button>
            ))}

          {secondOperationButtonConfig &&
            secondOperationButtonConfig.hide !== true &&
            (secondOperationButtonConfig.orlyTextKey ? (
              <OrlyButtonContainer
                confirmButtonKey={secondOperationButtonConfig.orlyConfirmKey}
                disabled={secondOperationButtonConfig.disabled}
                customButtonStyles={[styles.button, styles.operationButton, styles.secondOperationButton]}
                iconName={secondOperationButtonConfig.icon}
                onConfirm={secondOperationButtonConfig.onClick}
                tooltipConfig={secondOperationButtonConfig.tooltipConfig}
                modalTitleKey={secondOperationButtonConfig.orlyTitleKey}
                textKey={secondOperationButtonConfig.labelKey}
                modalTextKey={secondOperationButtonConfig.orlyTextKey}
                dismissOnConfirm={true}
              />
            ) : (
              <Button
                customStyles={[styles.button, styles.operationButton]}
                onClick={secondOperationButtonConfig?.onClick}
                disabled={secondOperationButtonConfig.disabled}
                icon={secondOperationButtonConfig.icon}>
                {t(secondOperationButtonConfig.labelKey)}
              </Button>
            ))}

          {deleteOrArchiveButtonConfig && !deleteOrArchiveButtonConfig.invisible && (
            <DeleteOrArchiveEntityButton
              entityId={deleteOrArchiveButtonConfig.entityId}
              useDeleteHook={deleteOrArchiveButtonConfig.deleteHook}
              useArchiveHook={deleteOrArchiveButtonConfig.archiveHook}
              customStyles={styles.deleteButton}
              onSuccess={deleteOrArchiveButtonConfig.onSuccess}
              disabled={deleteOrArchiveButtonConfig.disabled}
            />
          )}
        </div>
      )}
      {customContent}
    </div>
  )
}
