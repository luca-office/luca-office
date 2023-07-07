import {ProjectModule} from "./project-module"

export type OfficeModule = Pick<
  ProjectModule,
  "moduleType" | "scenarioId" | "position" | "questionnaireId" | "projectId" | "id"
>
