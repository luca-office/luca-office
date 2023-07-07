import * as React from "react"
import {ButtonVariant, IconName} from "../../../enums"
import {Binary} from "../../../models"
import {CustomStyle} from "../../../styles"
import {Option, scrollToElement} from "../../../utils"
import {Button, Tooltip} from "../.."
import {SubheaderTab} from "./subheader-tab/subheader-tab"
import {viewerToolsSubheaderStyle as styles} from "./viewer-tools-subheader.style"

export interface ViewerToolsSubHeaderProps extends CustomStyle {
  readonly elements: Option<Binary[]>
  readonly hideNavigationButtons?: boolean
  readonly selectedElement: Option<Binary>
  readonly closeElement?: (binaryId: UUID) => void
  readonly navigateToNext?: () => void
  readonly navigateToPrevious?: () => void
  readonly selectElement?: (binaryId: UUID) => void
}

export const ViewerToolsSubHeader: React.FC<ViewerToolsSubHeaderProps> = ({
  elements: binariesOption,
  closeElement,
  selectElement,
  selectedElement: selectedElementOption,
  navigateToPrevious,
  navigateToNext,
  hideNavigationButtons = false,
  customStyles
}) => {
  const selectedElement = selectedElementOption.orNull()
  React.useEffect(() => {
    if (selectedElement) {
      scrollToElement(`subheader-tab_${selectedElement.id}`)
    }
  }, [selectedElement])

  return binariesOption
    .map(binaries => {
      const singleBinary = binaries.length === 1

      const renderItem = (item: Binary) => {
        const isSelected = selectedElementOption.map(binary => binary.id === item.id).getOrElse(false)
        return (
          <Tooltip key={item.id} title={item.title || item.path}>
            <SubheaderTab
              binary={item}
              onClose={closeElement}
              onSelect={selectElement}
              selected={isSelected}
              customStyles={styles.tab}
            />
          </Tooltip>
        )
      }

      return (
        <div css={[styles.subHeaderBar, customStyles]}>
          <div css={styles.tabs}>
            {singleBinary ? (
              <Tooltip title={binaries[0].title || binaries[0].path}>
                <SubheaderTab
                  key={binaries[0].id}
                  binary={binaries[0]}
                  onSelect={selectElement}
                  selected={true}
                  customStyles={styles.tab}
                />
              </Tooltip>
            ) : (
              <div css={styles.tabContainer}>{binaries.map(renderItem)}</div>
            )}
          </div>
          {!hideNavigationButtons && (
            <div css={styles.navigationButtons}>
              <Button
                onClick={navigateToPrevious}
                variant={ButtonVariant.IconOnly}
                icon={IconName.TriangleLeftLined}
                customStyles={styles.navigationButton}
                disabled={!navigateToPrevious || singleBinary}
              />
              <Button
                onClick={navigateToNext}
                variant={ButtonVariant.IconOnly}
                icon={IconName.TriangleRightLined}
                customStyles={styles.navigationButton}
                disabled={!navigateToNext || singleBinary}
              />
            </div>
          )}
        </div>
      )
    })
    .orNull()
}
