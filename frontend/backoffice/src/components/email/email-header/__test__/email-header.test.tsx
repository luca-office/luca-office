import {render, screen} from "@testing-library/react"
import {shallow} from "enzyme"
import * as React from "react"
import {act} from "react-dom/test-utils"
import {act as actRenderer, create} from "react-test-renderer"
import {DeleteOrArchiveEntityButton, Icon} from "shared/components"
import * as useDeleteEmailHook from "shared/graphql/hooks/mutations/email/delete-email"
import {DeleteEntityHook} from "shared/models"
import {Option} from "shared/utils"
import wait from "waait"
import {emailsMock} from "../../../../modules/scenario-emails/emails/hooks/__mocks__/emails.mock"
import {EmailHeader, EmailHeaderProps} from "../email-header"

const defaultProps: EmailHeaderProps = {
  isIntroductionEmail: false,
  isInterventionEmail: false,
  email: Option.of(emailsMock[0]),
  emailLoading: false,
  onDelete: jest.fn(),
  actionsDisabled: false,
  hasIntervention: false
}

const deleteEntityHookValuesDefault: DeleteEntityHook = {
  deleteEntity: jest.fn(() => Promise.resolve()),
  deleteEntityLoading: false
}

const deleteEmailStateSpy = jest.spyOn(useDeleteEmailHook, "useDeleteEmail")

describe("email-header", () => {
  it("renders correctly", async () => {
    deleteEmailStateSpy.mockReturnValue(deleteEntityHookValuesDefault)
    const component = create(<EmailHeader {...defaultProps} />)
    await actRenderer(() => wait(0))
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("renders correctly (intro)", async () => {
    deleteEmailStateSpy.mockReturnValue(deleteEntityHookValuesDefault)
    const component = create(<EmailHeader {...defaultProps} isIntroductionEmail={true} />)
    await act(() => wait(0))
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("has correct structure", async () => {
    const tree = shallow(<EmailHeader {...defaultProps} />)

    await act(() => wait(0))

    expect(tree.find(Icon)).toHaveLength(1)
    expect(tree.find(DeleteOrArchiveEntityButton)).toHaveLength(1)
  })
  it("has correct structure (loading)", async () => {
    const tree = shallow(<EmailHeader {...{...defaultProps, emailLoading: true, email: Option.none()}} />)
    render(<EmailHeader {...{...defaultProps, emailLoading: true, email: Option.none()}} />)

    await act(() => wait(0))

    expect(tree.find(Icon)).toHaveLength(1)
    expect(tree.find(DeleteOrArchiveEntityButton)).toHaveLength(0)
    expect(screen.queryAllByText("email__placeholder_loading")).toHaveLength(1)
  })
  it("disables delete for introduction mail", async () => {
    const tree = shallow(<EmailHeader {...{...defaultProps, isIntroductionEmail: true}} />)

    await act(() => wait(0))

    expect(tree.find(DeleteOrArchiveEntityButton).prop("disabled")).toBeTruthy()
  })
  it("disables delete for readonly", async () => {
    const tree = shallow(<EmailHeader {...{...defaultProps, actionsDisabled: true}} />)

    await act(() => wait(0))

    expect(tree.find(DeleteOrArchiveEntityButton).prop("disabled")).toBeTruthy()
  })
})
