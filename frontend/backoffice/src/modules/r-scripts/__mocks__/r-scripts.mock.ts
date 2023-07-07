import {RScript} from "shared/models"

export const rScriptMock: RScript = {
  __typename: "RScript",
  id: "18de306c-a8f8-4311-9a2f-ca5418a245bd",
  createdAt: "2020-08-03 15:16:28.501000 +00:00",
  title: "title",
  description: "description",
  modifiedAt: "2020-08-03 15:16:28.501000 +00:00",
  archivedAt: null,
  gitCommitHash: "sd",
  version: "1.2",
  isEditable: true
}

export const rScriptsMock: RScript[] = [
  rScriptMock,
  {...rScriptMock, id: "18de306c-a8f8-4311-9a2f-ca5418a2452d"},
  {...rScriptMock, id: "18de306c-a8f8-4311-9a2f-ca5418a2453d"},
  {...rScriptMock, id: "18de306c-a8f8-4311-9a2f-ca5418a2454d"},
  {...rScriptMock, id: "18de306c-a8f8-4311-9a2f-ca5418a2455d"}
]
