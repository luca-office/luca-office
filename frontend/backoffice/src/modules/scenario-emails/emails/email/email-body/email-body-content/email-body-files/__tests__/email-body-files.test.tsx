import {fireEvent, render, screen} from "@testing-library/react"
import {mount} from "enzyme"
import * as React from "react"
import {act, create} from "react-test-renderer"
import {Button, DeleteOrArchiveEntityButton, TableContainer, Tooltip} from "shared/components"
import {filesMock} from "shared/graphql/__mocks__"
import {deleteEntityHookMock} from "../../../../../../../../graphql/__mocks__"
import {emailsMock} from "../../../../../hooks/__mocks__/emails.mock"
import {EmailBodyFiles, EmailBodyFilesProps} from "../email-body-files"
import * as useEmailFilesHook from "../hooks/use-email-files"
import {UseEmailFilesHook} from "../hooks/use-email-files"

const email = emailsMock[0]

const defaultProps: EmailBodyFilesProps = {
  disabled: false,
  email
}

const emailBodyFilesHookValuesDefault: UseEmailFilesHook = {
  uploadVisible: false,
  files: [],
  hideUpload: jest.fn(),
  showUpload: jest.fn(),
  filesLoading: false,
  uploadBinaries: jest.fn(),
  createTextDocumentFile: jest.fn(),
  deleteFileHook: () => deleteEntityHookMock
}

const emailFilesSpy = jest.spyOn(useEmailFilesHook, "useEmailFiles")

const getComponent = (props?: Partial<EmailBodyFilesProps>) => <EmailBodyFiles {...{...defaultProps, ...props}} />

describe("email-body-files", () => {
  it("renders correctly", () => {
    emailFilesSpy.mockReturnValue(emailBodyFilesHookValuesDefault)
    const component = getComponent()
    const tree = create(component).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it("adds binaries", () => {
    const showModalMock = jest.fn()
    emailFilesSpy.mockReturnValue({
      ...emailBodyFilesHookValuesDefault,
      showUpload: showModalMock,
      files: filesMock
    })

    const component = getComponent()
    const tree = mount(component)

    render(component)

    const table = tree.find(TableContainer)
    const addBtn = table.find(Button).first()

    expect(addBtn.prop("disabled")).toBe(false)
    act(() => {
      fireEvent.click(screen.getByTitle("email__files_table_column_file"))
    })

    expect(showModalMock).toHaveBeenCalledTimes(1)
    expect(table).toHaveLength(1)
    const rows = table.find(".entity-row")
  })
})
