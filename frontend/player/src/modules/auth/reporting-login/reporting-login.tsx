import {css} from "@emotion/react"
import * as React from "react"
import {SurveyLight} from "shared/models"
import {spacingHuge} from "shared/styles"
import {LucaTFunction} from "shared/translations"
import {ReportingLoginCard} from "../../reporting"
import {AuthInfoWrapper} from "../auth-info-wrapper/auth-info-wrapper"
import {ProjectMetadata} from "../login/project-metadata/project-metadata"

export interface ReportingLoginProps {
  readonly t: LucaTFunction
  readonly survey: SurveyLight
  readonly token?: string
}

export const ReportingLogin: React.FC<ReportingLoginProps> = ({t, survey, token}) => {
  const {endsAt, startsAt, project} = survey

  const rightColumn = (
    <>
      <ProjectMetadata
        t={t}
        metadata={{
          endsAt: endsAt,
          startsAt: startsAt,
          maxDurationInSeconds: project.maxDurationInSeconds,
          projectName: project.name
        }}
      />
      <ReportingLoginCard customStyles={styles.reportingCard} surveyId={survey.id} token={token} />
    </>
  )
  return <AuthInfoWrapper rightColumn={rightColumn} />
}

const styles = {
  reportingCard: css({
    marginTop: spacingHuge
  })
}
