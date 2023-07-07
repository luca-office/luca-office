import {shallow} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {interventionsMock} from "shared/__mocks__"
import {LoadingIndicator} from "shared/components"
import {scenariosMock} from "shared/graphql/__mocks__"
import {Option} from "shared/utils"
import {emailsMock} from "../../../../modules/scenario-emails/emails/hooks/__mocks__/emails.mock"
import {EmailDirectoriesList, EmailDirectoriesListProps} from "../email-directories-list"
import {emailDirectoriesListStyle} from "../email-directories-list.style"

const emails = emailsMock.slice(0, 3)
const selectedEmailId = emails[0].id

const defaultProps: EmailDirectoriesListProps = {
  scenario: Option.of(scenariosMock[0]),
  emails,
  emailsLoading: false,
  selectedEmailId: Option.of(selectedEmailId),
  selectEmail: jest.fn(),
  isInbox: true,
  interventions: interventionsMock
}

const getComponent = (props?: Partial<EmailDirectoriesListProps>) => (
  <EmailDirectoriesList {...{...defaultProps, ...props}} />
)

describe("email-directories-list", () => {
  it("renders correctly", () => {
    const component = getComponent()
    const tree = create(component).toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("has correct structure", () => {
    const component = getComponent()
    const tree = shallow(component)

    expect(tree.find(".email-directories-list-email")).toHaveLength(3)
    expect(tree.find(".email-directories-list-email-sender")).toHaveLength(3)
    expect(tree.find(".email-directories-list-email-time")).toHaveLength(3)
    expect(tree.find(".email-directories-list-email-read-status")).toHaveLength(3)
    expect(tree.find(".email-directories-list-email-subject")).toHaveLength(3)
    expect(tree.find(".email-directories-list-placeholder")).toHaveLength(0)
    expect(tree.find(LoadingIndicator)).toHaveLength(0)
  })
  it("has correct structure (no inbox)", () => {
    const component = getComponent({isInbox: false})
    const tree = shallow(component)

    expect(tree.find(".email-directories-list-email")).toHaveLength(3)
    expect(tree.find(".email-directories-list-email-sender")).toHaveLength(3)
    expect(tree.find(".email-directories-list-email-time")).toHaveLength(3)
    expect(tree.find(".email-directories-list-email-read-status")).toHaveLength(0)
    expect(tree.find(".email-directories-list-email-subject")).toHaveLength(3)
    expect(tree.find(".email-directories-list-placeholder")).toHaveLength(0)
    expect(tree.find(LoadingIndicator)).toHaveLength(0)
  })
  it("shows loading indicator", () => {
    const component = getComponent({emailsLoading: true})
    const tree = shallow(component)

    expect(tree.find(".email-directories-list-email")).toHaveLength(0)
    expect(tree.find(".email-directories-list-email-sender")).toHaveLength(0)
    expect(tree.find(".email-directories-list-email-time")).toHaveLength(0)
    expect(tree.find(".email-directories-list-email-read-status")).toHaveLength(0)
    expect(tree.find(".email-directories-list-email-subject")).toHaveLength(0)
    expect(tree.find(".email-directories-list-placeholder")).toHaveLength(0)
    expect(tree.find(LoadingIndicator)).toHaveLength(1)
  })
  it("shows placeholder", () => {
    const component = getComponent({emails: []})
    const tree = shallow(component)

    expect(tree.find(".email-directories-list-email")).toHaveLength(0)
    expect(tree.find(".email-directories-list-email-sender")).toHaveLength(0)
    expect(tree.find(".email-directories-list-email-time")).toHaveLength(0)
    expect(tree.find(".email-directories-list-email-read-status")).toHaveLength(0)
    expect(tree.find(".email-directories-list-email-subject")).toHaveLength(0)
    expect(tree.find(LoadingIndicator)).toHaveLength(0)

    const placeholder = tree.find(".email-directories-list-placeholder")
    expect(placeholder).toHaveLength(1)
    expect(placeholder.text()).toEqual("email__placeholder")
  })
  it("highlights selected email", () => {
    const defaultStyle = emailDirectoriesListStyle.email(false)
    const style = [defaultStyle, false]
    const selectedStyle = [defaultStyle, emailDirectoriesListStyle.emailSelected]
    const component = getComponent()
    const tree = shallow(component)

    const emails = tree.find(".email-directories-list-email")
    expect(JSON.stringify(emails.at(0).prop("css"))).toEqual(JSON.stringify(selectedStyle))
    expect(JSON.stringify(emails.at(1).prop("css"))).toEqual(JSON.stringify(style))
    expect(JSON.stringify(emails.at(2).prop("css"))).toEqual(JSON.stringify(style))
  })
  it("handles email selection", () => {
    const mockSelectEmail = jest.fn()
    const component = getComponent({selectEmail: mockSelectEmail})
    const tree = shallow(component)

    const emails = tree.find(".email-directories-list-email")
    emails.at(1).simulate("click")
    expect(mockSelectEmail).toHaveBeenCalledWith(emailsMock[1])
  })
})
