import {css} from "@emotion/react"
import * as React from "react"
import {CardFooter, CardFooterItem, ContentLoadingIndicator, OverviewCard} from "shared/components"
import {IconName} from "shared/enums"
import {useLucaTranslation} from "shared/translations"
import {formatDateFromString} from "shared/utils"
import {CardDurationInfo, CardOverview, EditingStatusIndicator} from "../../../components"
import {cardOverview} from "../../../styles/common"
import {useProjects} from "./hooks"

export const Projects: React.FC = () => {
  const {t} = useLucaTranslation()
  const {loading, projects, navigateCreateProject, navigateProjectDetail} = useProjects()

  return (
    <CardOverview
      customStyles={cardOverview}
      entityFilterType={"projects"}
      create={navigateCreateProject}
      creationText={t("projects__create_project")}>
      {loading ? (
        <ContentLoadingIndicator />
      ) : (
        projects.map(project => {
          const surveyCount = project.surveys.filter(survey => !survey.isTestSurvey).length
          const testSurveyCount = project.surveys.filter(survey => survey.isTestSurvey).length
          const hasSurvey = surveyCount > 0
          const surveyTitle = t(
            hasSurvey
              ? surveyCount === 1
                ? "project_title_survey"
                : "project_title_surveys"
              : testSurveyCount === 1
              ? "project_title_test_survey"
              : "project_title_test_surveys"
          )
          return (
            <OverviewCard
              onClick={() => navigateProjectDetail(project.id)}
              key={project.id}
              text={project.description}
              headerText={project.name}
              headerInfo={<CardDurationInfo maxDurationInSeconds={project.maxDurationInSeconds} t={t} />}
              footer={
                <CardFooter customStyles={styles.cardFooter}>
                  <CardFooterItem
                    title={t("create_date_title")}
                    icon={IconName.Calendar}
                    text={formatDateFromString(project.createdAt)}
                  />
                  <CardFooterItem
                    title={t("author_title")}
                    icon={IconName.Profile}
                    text={`${project.author.firstName} ${project.author.lastName}`}
                  />
                  <CardFooterItem
                    title={surveyTitle}
                    icon={IconName.PaperCorrection}
                    text={`${hasSurvey ? surveyCount : testSurveyCount} ${surveyTitle}`}
                  />
                  <EditingStatusIndicator t={t} isFinalized={project.isFinalized} />
                </CardFooter>
              }
            />
          )
        })
      )}
    </CardOverview>
  )
}

const Sizes = {
  footerStatus: 16
}

const styles = {
  cardFooter: css({
    display: "grid",
    gridTemplateColumns: `1fr 1fr 1fr ${Sizes.footerStatus}px`
  })
}
