// importing from direct file because of issues of babel loader and spyOn
import * as React from "react"
import {create} from "react-test-renderer"
import {fakeTranslate} from "../../../../tests/utils/translate-mock"
import {FilesAndDirectoriesDetailEmpty} from "../files-and-directories-detail-empty"

describe("Empty Detail View", () => {
  it("renders correctly", async () => {
    const component = create(<FilesAndDirectoriesDetailEmpty t={fakeTranslate} />)
    const tree = component.toJSON()

    expect(tree).toMatchSnapshot()
  })
})
