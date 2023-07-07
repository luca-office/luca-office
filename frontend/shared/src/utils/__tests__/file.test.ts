import {UploadFileType} from "../../enums"
import {getAcceptedFileExtensionsFromFileTypes} from "../file"

describe("file-extensions", () => {
  it("should get correct extensions", () => {
    const acceptedFileTypes = getAcceptedFileExtensionsFromFileTypes([UploadFileType.Graphic, UploadFileType.PDF])
    expect(acceptedFileTypes).toEqual({
      "application/pdf": [".pdf"],
      "image/*": [".jpg", ".svg", ".png", ".jpeg", ".gif"]
    })
  })
})
