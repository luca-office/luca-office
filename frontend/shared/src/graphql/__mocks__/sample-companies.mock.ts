import {SampleCompany} from "../../models"
import {SampleCompanyFragment_author} from "../generated/SampleCompanyFragment"
import {logoFileMock} from "./logo-file.mock"
import {profileFileMock} from "./profile-file.mock"
import {userAccountMock} from "./user-account.mock"

const author: SampleCompanyFragment_author = {
  ...userAccountMock,
  __typename: "UserAccount"
}

export const sampleCompaniesMock: SampleCompany[] = [
  {
    __typename: "SampleCompany",
    id: "a0a1da38-1abb-4757-aba9-d5c60e5bc05f",
    createdAt: "2020-08-13 10:25:24.584000 +00:00",
    modifiedAt: "2020-08-13 10:25:24.584000 +00:00",
    authorId: userAccountMock.id,
    name: "Company 1",
    description: "Company 1 Description",
    tags: ["Tag_1", "Tag_2"],
    emailSignature: "Company 1",
    domain: "company@domain.com",
    directoryId: "c18b2c97-a7b9-448d-95b5-33a78649b2a4",
    profileFileId: profileFileMock.id,
    logoFileId: logoFileMock.id,
    publishedAt: null,
    profileFile: profileFileMock,
    logoFile: logoFileMock,
    author,
    filesCount: 0,
    erpRowsCount: 0,
    archivedAt: null
  },
  {
    __typename: "SampleCompany",
    id: "a3111a96-f2ba-41ee-a2cb-01fec2c44a78",
    createdAt: "2020-08-13 10:25:24.584000 +00:00",
    modifiedAt: "2020-08-13 10:25:24.584000 +00:00",
    authorId: userAccountMock.id,
    name: "Company 2",
    description: "Company 2 Description",
    tags: ["Tag_1"],
    emailSignature: "Company 2",
    domain: "company@domain.com",
    directoryId: "e8cc09cd-facd-4233-acf1-29628a0c9722",
    profileFileId: profileFileMock.id,
    logoFileId: logoFileMock.id,
    profileFile: profileFileMock,
    logoFile: logoFileMock,
    author,
    publishedAt: null,
    filesCount: 0,
    erpRowsCount: 0,
    archivedAt: null
  },
  {
    __typename: "SampleCompany",
    id: "aa56fe71-b033-48d7-a088-d678c12df83c",
    createdAt: "2020-08-13 10:25:24.584000 +00:00",
    modifiedAt: "2020-08-13 10:25:24.584000 +00:00",
    publishedAt: null,
    authorId: userAccountMock.id,
    name: "Company 3",
    description: "Company 3 Description",
    tags: ["Tag_1", "Tag_2", "Tag_3"],
    emailSignature: "Company 3",
    domain: "company@domain.com",
    directoryId: "3cd1a7e5-3986-466b-9ac4-1d1090e4d8c7",
    profileFileId: profileFileMock.id,
    logoFileId: logoFileMock.id,
    profileFile: profileFileMock,
    logoFile: logoFileMock,
    author,
    filesCount: 0,
    erpRowsCount: 0,
    archivedAt: null
  }
]
