import {Project} from "../../models"
import {UsageField} from "../generated/globalTypes"
import {userAccountMock} from "./user-account.mock"

export const projectsMock: Project[] = [
  {
    __typename: "Project",
    id: "bdf111ef-46a6-472d-9fe0-70f9ce2fe835",
    createdAt: new Date(2019, 10, 5).toISOString(),
    modifiedAt: new Date(2019, 10, 15).toISOString(),
    name: "Project 1",
    authorId: userAccountMock.id,
    description: "Description for Project 1",
    audience: "Audience 1",
    usageField: UsageField.Demonstration,
    welcomeText: "Welcome to Project 1",
    author: userAccountMock,
    maxDurationInSeconds: 3600,
    isFinalized: false,
    surveys: []
  },
  {
    __typename: "Project",
    id: "1399cfd2-f59c-4e77-a47a-605668649815",
    createdAt: new Date(2019, 10, 5).toISOString(),
    modifiedAt: new Date(2019, 10, 15).toISOString(),
    name: "Project 2",
    authorId: userAccountMock.id,
    description: "Description for Project 2",
    audience: "Audience 2",
    usageField: UsageField.Research,
    welcomeText: "Welcome to Project 2",
    author: userAccountMock,
    maxDurationInSeconds: 3600,
    isFinalized: false,
    surveys: []
  }
]
