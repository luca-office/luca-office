import {shallow} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {Option} from "../../../../utils"
import {FeatureDisabledMarker} from "../../../feature-disabled-marker/feature-disabled-marker"
import {SelectableCard} from "../../../selectable-card/selectable-card"
import {UploadSection} from "../../upload-section/upload-section"
import {SelectFileType, SelectFileTypeProps} from "../select-file-type"

const defaultProps: SelectFileTypeProps = {
  onTypeSelected: jest.fn(),
  selectedFileType: Option.none()
}

const useComponent = (props?: Partial<SelectFileTypeProps>) => <SelectFileType {...defaultProps} {...props} />

describe("SelectFileType", () => {
  it("renders correctly", () => {
    const component = useComponent()
    const tree = create(component).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it("has correct structure", () => {
    const component = shallow(useComponent())

    expect(component.find(UploadSection)).toHaveLength(1)
    expect(component.find(FeatureDisabledMarker)).toHaveLength(1)
    expect(component.find(SelectableCard)).toHaveLength(5)
  })
})
