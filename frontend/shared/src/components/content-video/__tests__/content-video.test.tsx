import {fireEvent, render, screen, waitFor} from "@testing-library/react"
import {shallow} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {videoBinariesMock} from "../../binary-viewer/__mocks__/binaries.mock"
import {ContentVideo, ContentVideoProps} from "../content-video"

const defaultProps: ContentVideoProps = {
  onClick: jest.fn(),
  scrollId: "b158bef6-d868-46c9-9b1f-c4f87c7edbc0",
  videoUrl: videoBinariesMock[0].path
}

const getComponent = (props?: Partial<ContentVideoProps>) => <ContentVideo {...{...defaultProps, ...props}} />

describe("content-video", () => {
  it("renders correctly", () => {
    const component = getComponent()
    const tree = create(component).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it("handles click correctly", async () => {
    const onClickMock = jest.fn()
    const component = getComponent({onClick: onClickMock})
    render(component)

    fireEvent.click(screen.getByRole("button"))

    await waitFor(() => {
      expect(onClickMock).toHaveBeenCalled()
    })
  })
})
