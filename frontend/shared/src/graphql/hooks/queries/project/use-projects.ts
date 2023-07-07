import {useQuery} from "@apollo/client"
import {Project} from "../../../../models"
import {ProjectsQuery} from "../../../generated/ProjectsQuery"
import {projectsQuery} from "../../../queries"

export interface ProjectsProps {
  readonly projects: Project[]
  readonly projectsLoading: boolean
}

export const useProjects = (): ProjectsProps => {
  const {data, loading} = useQuery<ProjectsQuery>(projectsQuery)

  return {
    projects: data?.projects ?? [],
    projectsLoading: loading
  }
}
