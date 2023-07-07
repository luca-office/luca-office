import {removeFileExtension} from "../file-name"

const easyFileName = "file-name.jpg"

const longFileNameWithDots = "Bildschirmfoto 2020-10-06 um 14.11.24.png"

const withoutExtension = "filename"

describe("remove file extension", () => {
  test("should remove correct extension if only one", () => {
    expect(removeFileExtension(easyFileName)).toBe("file-name")
  })
  test("should remove correct extension at long file name with dots", () => {
    expect(removeFileExtension(longFileNameWithDots)).toBe("Bildschirmfoto 2020-10-06 um 14.11.24")
  })
  test("should not remove extension if no existing", () => {
    expect(removeFileExtension(withoutExtension)).toEqual(withoutExtension)
  })
})
