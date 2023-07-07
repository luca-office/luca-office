import * as React from "react"
import {TableContainer} from "shared/components"
import {ProjectModuleType} from "shared/graphql/generated/globalTypes"
import {ProjectModule} from "shared/models"
import {CustomStyle} from "shared/styles"
import {useLucaTranslation} from "shared/translations"
import {getIdKeyProjectTable, getProjectModuleColumns} from "../../config/detail-tables"
import {checkIsProjectModuleEditable} from "../../utils"
import {ListPlaceholder} from "../list-placeholder/list-placeholder"
import {projectSurveyStyles} from "../project-surveys-list/project-surveys-list"

export interface ProjectModulesListProps extends CustomStyle {
  readonly deleteModule: (id: UUID) => void
  readonly projectModules: ProjectModule[]
  readonly moduleActionsDisabled: boolean
  readonly showCreateProjectModuleModal: () => void
  readonly showSortProjectModuleModal: () => void
  readonly sortingDisabled: boolean
}

export const ProjectModulesList: React.FunctionComponent<ProjectModulesListProps> = ({
  showCreateProjectModuleModal,
  showSortProjectModuleModal,
  projectModules,
  deleteModule,
  moduleActionsDisabled,
  sortingDisabled
}) => {
  const {t} = useLucaTranslation()

  return (
    <TableContainer<ProjectModule>
      entities={projectModules}
      columns={getProjectModuleColumns({
        moduleActionsDisabled,
        deleteModule,
        openSorting: showSortProjectModuleModal,
        openCreation: showCreateProjectModuleModal,
        t,
        sortingDisabled
      })}
      entityKey={getIdKeyProjectTable}
      customHeaderRowStyles={projectSurveyStyles.tableHeaderRow}
      customRowStyles={entity => ({
        ...projectSurveyStyles.tableRow,
        ...(checkIsProjectModuleEditable(entity) ? projectSurveyStyles.tableRowHighlighted : {})
      })}
      customStyles={projectSurveyStyles.tableContent}
      showFooter={true}
      customPlaceholderStyles={projectSurveyStyles.tablePlaceholder}
      customPlaceholder={
        <ListPlaceholder
          title={t("projects__scenarios_placeholder_title")}
          text={t("projects__scenarios_placeholder_text")}
          actionText={t("projects__scenarios_module_placeholder_button")}
          onClick={showCreateProjectModuleModal}
          disabled={moduleActionsDisabled}
        />
      }
    />
  )
}
