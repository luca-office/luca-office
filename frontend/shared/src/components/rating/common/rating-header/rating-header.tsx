import {css} from "@emotion/react"
import * as React from "react"
import {ButtonConfig, ProjectModule} from "../../../../models"
import {CustomStyle, zIndex3} from "../../../../styles"
import {find, getProjectModuleIcon, getProjectModuleTitle, Option, sortByPosition} from "../../../../utils"
import {DetailViewHeader} from "../../../detail-view-header/detail-view-header"
import {CustomSelect} from "../../../select/custom-select"

export interface RatingHeaderProps extends CustomStyle {
  readonly navigationButtonConfig: ButtonConfig
  readonly onSelectModule: (projectModule: ProjectModule) => void
  readonly projectModules: ProjectModule[]
  readonly projectTitle: string
  readonly selectedModuleId: Option<UUID>
}

export const RatingHeader: React.FC<RatingHeaderProps> = ({
  customStyles,
  projectModules,
  projectTitle,
  navigationButtonConfig,
  onSelectModule,
  selectedModuleId
}) => {
  const dropdown = projectModules.length ? (
    <CustomSelect
      onChange={moduleId => find(module => module.id === moduleId, projectModules).forEach(onSelectModule)}
      optionList={sortByPosition(projectModules).map((module, index) => ({
        iconName: getProjectModuleIcon(module.moduleType),
        label: `${index + 1}. ${getProjectModuleTitle(module)}`,
        value: module.id
      }))}
      zIndexOfExpandedMenu={zIndex3}
      value={selectedModuleId.getOrElse("")}
      customStyles={styles.dropdown}
    />
  ) : undefined

  return (
    <DetailViewHeader
      customStyles={customStyles}
      labelKey={"rating__rating__header_label"}
      labelOptions={{title: projectTitle}}
      navigationButtonConfig={navigationButtonConfig}
      customContent={dropdown}
    />
  )
}

const Sizes = {
  dropdown: 386
}
const styles = {
  dropdown: css({
    marginLeft: "auto",
    width: Sizes.dropdown
  })
}
