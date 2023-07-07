import {shallow} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {FeatureDisabledMarker, Modal, Overlay, SelectableCard} from "shared/components"
import {projectModulesMock} from "shared/graphql/__mocks__"
import {Option} from "shared/utils"
import {CreateProjectModuleModal, CreateProjectModuleModalProps} from "../create-project-module-modal"
import * as useCreateProjectModuleModalHook from "../hooks/use-create-project-module-modal"
import {UseCreateProjectModuleModalHook} from "../hooks/use-create-project-module-modal"

const projectModule = projectModulesMock[0]

const hookValuesDefault: UseCreateProjectModuleModalHook = {
  selectedProjectModuleType: Option.none(),
  setProjectModuleType: jest.fn(),
  onConfirm: jest.fn()
}

const stateSpy = jest.spyOn(useCreateProjectModuleModalHook, "useCreateProjectModuleModal")

const defaultProps: CreateProjectModuleModalProps = {
  projectId: projectModule.projectId,
  onDismiss: jest.fn()
}

const getComponent = (props?: Partial<CreateProjectModuleModalProps>) => (
  <CreateProjectModuleModal {...{...defaultProps, ...props}} />
)

describe("create-project-module-modal", () => {
  it("renders correctly", async () => {
    stateSpy.mockReturnValue(hookValuesDefault)
    const component = create(getComponent())

    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("has correct structure", async () => {
    stateSpy.mockReturnValue(hookValuesDefault)

    const component = shallow(getComponent())

    const overlay = component.find(Overlay)
    expect(overlay).toHaveLength(1)

    const modal = overlay.dive().find(Modal)
    expect(modal).toHaveLength(1)

    const contentTypeCard = modal.dive().find(SelectableCard)
    expect(contentTypeCard).toHaveLength(2)

    const featureDisabledMarker = modal.dive().find(FeatureDisabledMarker)
    expect(featureDisabledMarker).toHaveLength(0)
  })

  it("triggers dismiss correctly", async () => {
    const onDismissMock = jest.fn()
    stateSpy.mockReturnValue(hookValuesDefault)

    const component = shallow(getComponent({onDismiss: onDismissMock}))

    const modal = component.find(Overlay).dive().find(Modal)
    expect(modal).toHaveLength(1)

    const onDismissHandler = modal.prop("onDismiss")
    onDismissHandler!()
    expect(onDismissMock).toHaveBeenCalledTimes(1)
  })
})
