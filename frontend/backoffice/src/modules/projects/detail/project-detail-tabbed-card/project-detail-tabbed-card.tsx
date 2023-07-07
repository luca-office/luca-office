import {sortBy} from "lodash"
import * as React from "react"
import {WithLucaTranslation} from "shared/translations"
import {TabbedCard} from "../../../../components"
import {checkIsProjectModuleEditable} from "../../utils"
import {UseProjectDetailHook} from "../hooks/use-project-detail"
import {projectDetailStyles as styles} from "../project-detail.style"
import {ProjectModulesList} from "../project-modules-list/project-modules-list"
import {ProjectSurveysList} from "../project-surveys-list/project-surveys-list"

export type ProjectDetailTabbedCardProps = UseProjectDetailHook & WithLucaTranslation

export const ProjectDetailTabbedCard: React.FunctionComponent<ProjectDetailTabbedCardProps> = ({
  project: projectOption,
  ...props
}) =>
  projectOption
    .map(project => {
      const {
        defaultSelectedListTabIndex,
        selectListTabIndex,
        t,
        surveys: allSurveys,
        navigateToSurveyCreation,
        surveysLoading,
        navigateToSurvey,
        deleteSurvey,
        projectModules,
        deleteProjectModule,
        setCreateModuleModalVisible,
        setResortModalVisible
      } = props
      const sortedSurveys = sortBy(allSurveys, survey => survey.createdAt)
      const projectContainsEditableModules = projectModules.some(checkIsProjectModuleEditable)
      const testSurveys = sortedSurveys.filter(survey => survey.isTestSurvey)
      const surveys = sortedSurveys.filter(survey => !survey.isTestSurvey)
      const hasSurveys = surveys.length > 0

      return (
        <TabbedCard
          customStyles={styles.moduleCard}
          defaultActiveIndex={defaultSelectedListTabIndex}
          onSelectTab={selectListTabIndex}
          tabs={[
            {
              label: t("projects__surveys_card_title", {count: surveys.length}),
              content: (
                <ProjectSurveysList
                  surveys={surveys}
                  isLoading={surveysLoading}
                  isTestSurvey={false}
                  surveyCreationDisabledMissingMeta={!project.welcomeText}
                  surveyCreationDisabledModuleCheckFailed={projectContainsEditableModules || !projectModules.length}
                  navigateToProjectModules={() => selectListTabIndex(2)}
                  navigateToSurveyCreation={navigateToSurveyCreation}
                  navigateToSurvey={navigateToSurvey}
                  deleteSurvey={deleteSurvey}
                />
              )
            },
            {
              label: t("projects__test_surveys_card_title", {count: testSurveys.length}),
              content: (
                <ProjectSurveysList
                  isLoading={surveysLoading}
                  surveys={testSurveys}
                  isTestSurvey={true}
                  surveyCreationDisabledMissingMeta={false}
                  surveyCreationDisabledModuleCheckFailed={!projectModules.length}
                  navigateToProjectModules={() => selectListTabIndex(2)}
                  navigateToSurveyCreation={navigateToSurveyCreation}
                  navigateToSurvey={navigateToSurvey}
                  deleteSurvey={deleteSurvey}
                />
              )
            },
            {
              label: t("projects__scenarios_title", {count: projectModules.length}),
              content: (
                <ProjectModulesList
                  projectModules={projectModules}
                  showCreateProjectModuleModal={() => setCreateModuleModalVisible(true)}
                  moduleActionsDisabled={hasSurveys}
                  sortingDisabled={project.isFinalized || hasSurveys}
                  deleteModule={deleteProjectModule}
                  showSortProjectModuleModal={() => setResortModalVisible(true)}
                />
              )
            }
          ]}
        />
      )
    })
    .orNull()
