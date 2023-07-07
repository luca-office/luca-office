import {useQuery} from "@apollo/client"
import {Project} from "../../../../models"
import {Option} from "../../../../utils/option"
import {ProjectQuery, ProjectQueryVariables} from "../../../generated/ProjectQuery"
import {projectQuery} from "../../../queries"

export interface ProjectProps {
  readonly project: Option<Project>
  readonly projectLoading: boolean
}

export const useProject = (projectId: UUID, skip?: boolean): ProjectProps => {
  const {data, loading} = useQuery<ProjectQuery, ProjectQueryVariables>(projectQuery, {
    variables: {id: projectId},
    skip
  })

  return {
    project: Option.of(data?.project),
    projectLoading: loading
  }
}
