import * as React from "react"
import {LoadingIndicator} from "shared/components"
import {useSurveyLight} from "shared/graphql/hooks/queries/survey/use-survey-light"
import {useLucaTranslation} from "shared/translations"
import {ReportingLogin} from "./reporting-login"

export interface ReportingLoginProps {
  readonly surveyId: UUID
  readonly token?: string
}

export const ReportingLoginContainer: React.FC<ReportingLoginProps> = ({surveyId, token}) => {
  const {t} = useLucaTranslation()

  const {survey} = useSurveyLight(surveyId, undefined)

  return survey.map(survey => <ReportingLogin token={token} survey={survey} t={t} />).getOrElse(<LoadingIndicator />)
}
