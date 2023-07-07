import {act} from "@testing-library/react"
import {shallow} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {Button, OverviewCard} from "shared/components"
import {Option} from "shared/utils"
import wait from "waait"
import {emailsMock} from "../../../hooks/__mocks__/emails.mock"
import {EmailDirectoriesFooter, EmailDirectoriesFooterProps} from "../email-directories-footer"
import * as useEmailDirectoriesFooterHook from "../hooks/use-email-directories-footer"
import {UseEmailDirectoriesFooterHook} from "../hooks/use-email-directories-footer"

const defaultProps: EmailDirectoriesFooterProps = {
  introductionEmail: Option.of(emailsMock[0]),
  selectedEmailId: Option.none(),
  actionsDisabled: false
}

const hookValuesDefault: UseEmailDirectoriesFooterHook = {
  showCreateEmailModal: jest.fn(),
  handleCreateClick: jest.fn()
}

const stateSpy = jest.spyOn(useEmailDirectoriesFooterHook, "useEmailDirectoriesFooter")

describe("email-directories-footer", () => {
  it("renders correctly", async () => {
    stateSpy.mockReturnValue(hookValuesDefault)
    const component = create(<EmailDirectoriesFooter {...defaultProps} />)
    await act(() => wait(0))
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("has correct structure", async () => {
    stateSpy.mockReturnValue(hookValuesDefault)
    const tree = shallow(<EmailDirectoriesFooter {...defaultProps} />)

    await act(() => wait(0))

    expect(tree.find(Button)).toHaveLength(1)
    expect(tree.find(OverviewCard)).toHaveLength(1)
  })
  it("handles button click", async () => {
    stateSpy.mockReturnValue(hookValuesDefault)
    const tree = shallow(<EmailDirectoriesFooter {...defaultProps} />)

    await act(() => wait(0))

    const mockOnClick = jest.fn()
    const button = tree.find(Button).shallow()
    button.setProps({
      onClick: mockOnClick
    })

    button.simulate("click")
    expect(mockOnClick).toHaveBeenCalledTimes(1)
  })
  it("handles card click", async () => {
    stateSpy.mockReturnValue(hookValuesDefault)
    const tree = shallow(<EmailDirectoriesFooter {...defaultProps} />)

    await act(() => wait(0))

    const mockOnClick = jest.fn()
    const card = tree.find(OverviewCard).shallow()
    card.setProps({
      onClick: mockOnClick
    })

    card.simulate("click")
    expect(mockOnClick).toHaveBeenCalledTimes(1)
  })
  it("disabled actions correctly", async () => {
    stateSpy.mockReturnValue({...hookValuesDefault})
    const tree = shallow(<EmailDirectoriesFooter {...defaultProps} actionsDisabled={true} />)

    await act(() => wait(0))

    const mockOnClick = jest.fn()
    const mockOnButtonClick = jest.fn()
    const card = tree.find(OverviewCard).shallow()
    card.setProps({
      onClick: mockOnClick
    })

    card.simulate("click")
    expect(mockOnClick).toHaveBeenCalledTimes(1)

    const button = tree.find(Button).shallow()
    button.setProps({
      onClick: mockOnButtonClick
    })

    button.simulate("click")
    expect(mockOnButtonClick).toHaveBeenCalledTimes(1)
  })
})
