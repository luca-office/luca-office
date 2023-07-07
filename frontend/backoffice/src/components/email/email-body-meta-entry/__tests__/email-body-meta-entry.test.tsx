import {shallow} from "enzyme"
import {create} from "react-test-renderer"
import {Button, ReadonlyActionField} from "shared/components"
import {IconName} from "shared/enums"
import {MetaEntry} from "../../../index"
import {EmailBodyMetaEntry, EmailBodyMetaEntryProps} from "../email-body-meta-entry"

const defaultProps: EmailBodyMetaEntryProps<unknown> = {
  headerLabelKey: "email__directory_sender",
  label: "email-body-meta-entry-label",
  icon: IconName.Email,
  isPlaceholder: false,
  buttonConfig: {
    labelKey: "edit",
    onClick: jest.fn()
  }
}

const getComponent = (props?: Partial<EmailBodyMetaEntryProps<unknown>>) => (
  <EmailBodyMetaEntry {...{...defaultProps, ...props}} />
)

describe("email-body-meta-entry", () => {
  it("renders correctly", () => {
    const component = getComponent()
    const tree = create(component).toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("handles click", () => {
    const mockOnClick = jest.fn()
    const component = getComponent({buttonConfig: {...defaultProps.buttonConfig!, onClick: mockOnClick}})
    const tree = shallow(component)

    const actionFieldContent = tree.find(MetaEntry).dive().find(ReadonlyActionField).dive()
    const button = actionFieldContent.find(Button)

    button.simulate("click")
    expect(mockOnClick).toHaveBeenCalledTimes(1)
  })
})
