import {Option} from "shared/utils"

export interface ProjectsState {
  readonly selectedListTab: Option<Map<UUID, number>>
}

export const initialProjectState: ProjectsState = {
  selectedListTab: Option.none()
}
