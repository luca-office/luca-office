import {shallow} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {Button, Card} from "../../../../../components"
import {IconName} from "../../../../../enums"
import {fileMock} from "../../../../../graphql/__mocks__"
import {Option} from "../../../../../utils"
import {EmailFiles, EmailFilesProps} from "../email-files"

const emailFilesProps: EmailFilesProps = {
  files: [{...fileMock, iconName: IconName.Add, id: "", relevance: Option.none(), title: ""}],
  addEmailFileToDownloads: jest.fn(),
  availableEmailDownloadIds: [],
  isPreview: false
}

describe("email-files", () => {
  it("render correctly with required props", () => {
    const emailFiles = <EmailFiles {...emailFilesProps} />
    const tree = create(emailFiles).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it("should have the correct structure", () => {
    const emailFiles = <EmailFiles {...emailFilesProps} />
    const tree = shallow(emailFiles)

    expect(tree.find(Card)).toHaveLength(1)
    expect(tree.find(Button)).toHaveLength(1)
    expect(tree.find(Button).prop("disabled")).toBeFalsy()
  })

  it("should have the correct structure when preview", () => {
    const emailFiles = <EmailFiles {...{...emailFilesProps, ...{isPreview: true}}} />
    const tree = shallow(emailFiles)

    expect(tree.find(Button).prop("disabled")).toBeTruthy()
  })

  it("should trigger the right action", () => {
    const addDownloadActionSpy = jest.fn()
    const emailFiles = <EmailFiles {...{...emailFilesProps, ...{addEmailFileToDownloads: addDownloadActionSpy}}} />
    const tree = shallow(emailFiles)
    const button = tree.find(Button)
    button.simulate("click")

    expect(addDownloadActionSpy).toHaveBeenCalledTimes(1)
  })
})
