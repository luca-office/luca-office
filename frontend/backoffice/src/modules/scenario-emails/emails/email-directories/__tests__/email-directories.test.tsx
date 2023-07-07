import {act} from "@testing-library/react"
import {shallow} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {interventionsMock} from "shared/__mocks__"
import {HeaderCarouselContainer} from "shared/components"
import {scenariosMock} from "shared/graphql/__mocks__"
import {EmailDirectory} from "shared/graphql/generated/globalTypes"
import {Option} from "shared/utils"
import wait from "waait"
import {EmailContent, EmailDirectoriesList} from "../../../../../components"
import {emailsMock} from "../../hooks/__mocks__/emails.mock"
import {EmailDirectories, EmailDirectoriesProps} from "../email-directories"
import {EmailDirectoriesFooter} from "../email-directories-footer/email-directories-footer"

const emails = emailsMock.slice(0, 3)
const selectedEmailId = emails[0].id

const defaultProps: EmailDirectoriesProps = {
  scenario: Option.of(scenariosMock[0]),
  emails,
  emailsLoading: false,
  selectedEmailId: Option.of(selectedEmailId),
  selectEmail: jest.fn(),
  selectedDirectory: EmailDirectory.Inbox,
  selectDirectory: jest.fn(),
  introductionEmail: Option.none(),
  interventions: interventionsMock,
  actionsDisabled: false
}

describe("email-directories", () => {
  it("renders correctly", async () => {
    const component = create(<EmailDirectories {...defaultProps} />)
    await act(() => wait(0))
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("has correct structure", async () => {
    const tree = shallow(<EmailDirectories {...defaultProps} />)

    await act(() => wait(0))

    const emailContent = tree.find(EmailContent)
    expect(emailContent).toHaveLength(1)
    expect(emailContent.dive().find(HeaderCarouselContainer)).toHaveLength(1)
    expect(emailContent.dive().find(EmailDirectoriesList)).toHaveLength(1)
    expect(emailContent.dive().find(EmailDirectoriesFooter)).toHaveLength(1)
  })
})
