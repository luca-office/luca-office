import {create} from "react-test-renderer"
import {ContentImage} from "../content-image"

const url = "https://myimage.de/img.jpeg"

describe("content-image", () => {
  it("renders correctly", () => {
    const component = <ContentImage imageUrl={url} />
    const tree = create(component).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
