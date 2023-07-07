import * as React from "react"
import {useGetSurveyInvitationFromRedux} from "../../../hooks/use-get-survey-invitation"
import {ProjectEnd} from "./project-end"

export const ProjectEndContainer: React.FC = () => {
  const {tokenOption} = useGetSurveyInvitationFromRedux()
  return tokenOption.map(token => <ProjectEnd token={token} />).orNull()
}
