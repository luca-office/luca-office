import {shallow} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {LoadingIndicator} from "../../../../components"
import {EmailDirectory} from "../../../../graphql/generated/globalTypes"
import {Option} from "../../../../utils"
import {emails} from "../../__tests__/__mocks__/emails"
import {EmailList} from "../email-list"
import {EmailListContainer} from "../email-list-container"
import {EmailListEntry} from "../email-list-entry"

const requiredProps = {
  isLoading: false,
  emails,
  onEmailSelected: jest.fn(),
  selectedEmailId: emails[0].id,
  introductionEmailId: Option.none<UUID>(),
  activeEmailDirectory: EmailDirectory.Inbox,
  onChangeEmailDirectory: jest.fn(),
  scenarioStartedAt: Option.of(new Date(2020, 12, 10)),
  scenarioFictiveDate: Option.none<Date>()
}

describe("email-list", () => {
  it("renders correctly with required props", () => {
    const list = <EmailListContainer {...requiredProps} />
    const tree = create(list).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it("renders correct number of entries per in Inbox", () => {
    const list = <EmailListContainer {...requiredProps} />
    const tree = shallow(list)

    expect(tree.find(EmailList).dive().find(EmailListEntry)).toHaveLength(
      requiredProps.emails.filter(email => email.directory === EmailDirectory.Inbox).length
    )
  })

  it("renders correct number of entries per in Sent", () => {
    const list = <EmailListContainer {...{...requiredProps, activeEmailDirectory: EmailDirectory.Sent}} />
    const tree = shallow(list)

    expect(tree.find(EmailList).dive().find(EmailListEntry)).toHaveLength(
      requiredProps.emails.filter(email => email.directory === EmailDirectory.Sent).length
    )
  })

  it("renders correct number of entries per in Draft", () => {
    const list = <EmailListContainer {...{...requiredProps, activeEmailDirectory: EmailDirectory.Draft}} />
    const tree = shallow(list)

    expect(tree.find(EmailList).dive().find(EmailListEntry)).toHaveLength(
      requiredProps.emails.filter(email => email.directory === EmailDirectory.Draft).length
    )
  })

  it("renders correct number of entries per in Trash", () => {
    const list = <EmailListContainer {...{...requiredProps, activeEmailDirectory: EmailDirectory.Trash}} />
    const tree = shallow(list)

    expect(tree.find(EmailList).dive().find(EmailListEntry)).toHaveLength(
      requiredProps.emails.filter(email => email.directory === EmailDirectory.Trash).length
    )
  })

  it("renders loading state correctly", () => {
    const list = <EmailListContainer {...requiredProps} isLoading={true} />
    const tree = shallow(list)

    expect(tree.find(EmailList).dive().find(LoadingIndicator)).toHaveLength(1)
  })
})
