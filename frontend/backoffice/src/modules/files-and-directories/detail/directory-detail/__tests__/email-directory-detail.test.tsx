import {mount} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {DeleteOrArchiveEntityButton, Heading, TableContainer} from "shared/components"
import {IconName, NodeType} from "shared/enums"
import {fileMock} from "shared/graphql/__mocks__"
import {DirectoryNode} from "shared/models"
import {Option} from "shared/utils"
import {HintText} from "../../../../../components/hint-text/hint-text"
import {directoriesForScenarioMock} from "../../../../../graphql/__mocks__"
import {DetailHeader} from "../../../../common/files-and-directories/file-detail/detail-header/detail-header"
import {EmailFilesDirectoryDetail} from "../email-directory-detail"
import * as useFileEmailsHook from "../hooks/use-file-emails"
import {UseFileEmailsHook} from "../hooks/use-file-emails"

const directoryNodeMock: DirectoryNode = {
  children: [],
  id: "wrherererberb",
  name: "erhrebrebreb",
  parentId: "erernertntrn",
  type: NodeType.Directory
}

const deleteEntityHookMock = {
  deleteEntity: jest.fn(() => Promise.resolve()),
  deleteEntityLoading: false
}

const hookValuesDefault: UseFileEmailsHook = {
  selectFile: jest.fn(),
  fileEntities: [fileMock].map(_ => ({
    fileIcon: IconName.Add,
    id: _.id,
    mailIcon: IconName.Add,
    receptionDelayInSeconds: 5,
    title: "",
    recipient: "sdds"
  }))
}

const stateSpy = jest.spyOn(useFileEmailsHook, "useFileEmails")

const getComponent = () => (
  <EmailFilesDirectoryDetail
    directory={directoriesForScenarioMock[0]}
    files={[fileMock]}
    parentDirectory={Option.of(directoryNodeMock)}
    scenarioId="123"
  />
)

describe("email-directory-detail", () => {
  it("renders correctly", () => {
    stateSpy.mockReturnValue(hookValuesDefault)

    const component = create(getComponent())
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  it("has correct structure", () => {
    stateSpy.mockReturnValue(hookValuesDefault)
    const tree = mount(getComponent())

    expect(tree.find(DetailHeader)).toHaveLength(1)
    expect(tree.find(HintText)).toHaveLength(1)
    expect(tree.find(Heading)).toHaveLength(6)
    expect(tree.find(TableContainer)).toHaveLength(1)
  })
})
