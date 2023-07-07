import {css} from "@emotion/react"
import * as React from "react"
import {TableContainer} from "shared/components"
import {IconName} from "shared/enums"
import {Survey} from "shared/models"
import {
  boxHeightMedium,
  CustomStyle,
  FontWeight,
  headerHeight,
  spacingLarge,
  spacingSmall,
  spacingTiny,
  TextSize
} from "shared/styles"
import {useLucaTranslation} from "shared/translations"
import {getIdKeyProjectTable, getSurveyColumns} from "../../config/detail-tables"
import {ListPlaceholder} from "../list-placeholder/list-placeholder"

export interface ProjectSurveysListProps extends CustomStyle {
  readonly deleteSurvey: (id: UUID) => void
  readonly isTestSurvey: boolean
  readonly navigateToSurvey: (id: UUID) => void
  readonly navigateToSurveyCreation: (isTestSurvey?: boolean) => void
  readonly navigateToProjectModules: () => void
  readonly surveyCreationDisabledMissingMeta: boolean
  readonly surveyCreationDisabledModuleCheckFailed: boolean
  readonly surveys: Survey[]
  readonly isLoading: boolean
}

export const ProjectSurveysList: React.FunctionComponent<ProjectSurveysListProps> = ({
  deleteSurvey,
  isTestSurvey,
  surveys,
  isLoading,
  surveyCreationDisabledMissingMeta,
  surveyCreationDisabledModuleCheckFailed,
  navigateToSurvey,
  navigateToSurveyCreation,
  navigateToProjectModules
}) => {
  const {t} = useLucaTranslation()
  const surveyCreationDisabled = surveyCreationDisabledMissingMeta || surveyCreationDisabledModuleCheckFailed
  const surveyPlaceholderText = t(
    surveyCreationDisabled ? "projects__surveys_placeholder_text" : "projects__surveys_placeholder_text_enabled"
  )
  const testSurveyPlaceholderText = t(
    surveyCreationDisabled
      ? "projects__test_surveys_placeholder_text"
      : "projects__test_surveys_placeholder_text_enabled"
  )

  return (
    <TableContainer
      entities={surveys}
      columns={getSurveyColumns({
        t,
        openCreation: () => navigateToSurveyCreation(isTestSurvey),
        deleteSurvey,
        surveyCreationDisabled,
        isTestSurvey
      })}
      entityKey={getIdKeyProjectTable}
      customStyles={projectSurveyStyles.tableContent}
      customHeaderRowStyles={projectSurveyStyles.tableHeaderRow}
      customRowStyles={() => projectSurveyStyles.tableRow}
      onClick={(survey: Survey) => navigateToSurvey(survey.id)}
      showFooter={true}
      customPlaceholderStyles={projectSurveyStyles.tablePlaceholder}
      showLoadingIndicator={isLoading}
      customPlaceholder={
        <ListPlaceholder
          title={
            isTestSurvey ? t("projects__test_surveys_placeholder_title") : t("projects__surveys_placeholder_title")
          }
          text={isTestSurvey ? testSurveyPlaceholderText : surveyPlaceholderText}
          actionText={t(
            surveyCreationDisabledModuleCheckFailed && !surveyCreationDisabledMissingMeta
              ? "projects__surveys_modules"
              : isTestSurvey
              ? "projects__surveys_add_test_survey"
              : "projects__surveys_add"
          )}
          disabled={surveyCreationDisabledMissingMeta}
          onClick={
            surveyCreationDisabledModuleCheckFailed
              ? navigateToProjectModules
              : () => navigateToSurveyCreation(isTestSurvey)
          }
          actionIcon={
            surveyCreationDisabledModuleCheckFailed && !surveyCreationDisabledMissingMeta
              ? IconName.ArrowRight
              : undefined
          }
        />
      }
    />
  )
}

const Dimension = {
  cardLabel: spacingLarge + spacingTiny // height and margin of card label
}

export const projectSurveyStyles = {
  tableContent: css({
    height: "100%",
    minHeight: 208,
    width: "100%"
  }),
  cardWrapper: css({
    flex: "1 1 auto",
    height: `calc(100% - ${Dimension.cardLabel}px)`,
    cursor: "initial",
    display: "grid",
    gridAutoColumns: "1fr",
    gridAutoRows: "minmax(0, 1fr) minmax(min-content, max-content)"
  }),
  addButton: css({
    width: "auto"
  }),
  footer: css({
    justifyContent: "flex-end"
  }),
  tableHeaderRow: css({
    padding: spacingSmall,
    fontSize: TextSize.Medium,
    fontWeight: FontWeight.Bold
  }),
  tableRow: css({
    height: boxHeightMedium
  }),
  tableRowHighlighted: css({
    backgroundColor: "rgb(255, 248, 235)"
  }),
  tablePlaceholder: css({
    minHeight: "initial",
    height: `calc(100% - ${headerHeight + 2 * spacingSmall}px)`
  })
}
