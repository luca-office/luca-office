import {shallow} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {Button, Modal, Overlay, Text, TextInput} from "shared/components"
import {CompanyDomainModal, CompanyDomainModalProps} from "../company-domain-modal"

const onConfirmSpy = jest.fn()
const onDismissSpy = jest.fn()

const defaultProps: CompanyDomainModalProps = {
  domain: "test@test.com",
  onConfirm: onConfirmSpy,
  onDismiss: onDismissSpy
}

describe("company-domain-modal", () => {
  it("renders correctly", () => {
    const component = create(<CompanyDomainModal {...defaultProps} />)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  it("has correct structure", () => {
    const tree = shallow(<CompanyDomainModal {...defaultProps} />)

    const overlay = tree.find(Overlay)
    expect(overlay).toHaveLength(1)

    const modal = overlay.dive().find(Modal)
    expect(modal).toHaveLength(1)

    const content = modal.dive()
    expect(content.find(Text)).toHaveLength(2)
    expect(content.find(TextInput)).toHaveLength(1)
  })
})
