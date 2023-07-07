import {MockedProvider} from "@apollo/client/testing"
import {mount} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {CardHeader, DeleteOrArchiveEntityButton, Heading, Icon} from "shared/components"
import {IconName} from "shared/enums"
import {useDeleteFileFromScenario} from "shared/graphql/hooks"
import {DetailHeader, FileDetailHeaderProps} from "../detail-header"

const defaultProps: FileDetailHeaderProps = {
  deleteHook: useDeleteFileFromScenario,
  entityId: "pofjsdf-afpaojfs",
  icon: IconName.Image,
  title: "file.png",
  disabled: false
}

const useComponent = (props?: Partial<FileDetailHeaderProps>) => (
  <MockedProvider>
    <DetailHeader {...defaultProps} {...props} />
  </MockedProvider>
)

describe("fileDetailHeader", () => {
  it("renders correctly", () => {
    const component = useComponent()
    const tree = create(component).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it("has correct structure", () => {
    const component = mount(useComponent())

    expect(component.find(CardHeader)).toHaveLength(1)
    expect(component.find(Icon)).toHaveLength(2)
    expect(component.find(Heading)).toHaveLength(1)
    expect(component.find(DeleteOrArchiveEntityButton)).toHaveLength(1)
  })
})
