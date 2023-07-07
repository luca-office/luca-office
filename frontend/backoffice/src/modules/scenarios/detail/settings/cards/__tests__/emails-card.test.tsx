import {shallow} from "enzyme"
import * as React from "react"
import {act} from "react-dom/test-utils"
import {create} from "react-test-renderer"
import {CardFooter, CardFooterItem, OverviewCard} from "shared/components"
import wait from "waait"
import {CardFooterIcon} from "../card-footer/card-footer-icon"
import {EmailsCard, EmailsCardProps} from "../emails-card"

const count = 12
const defaultProps: EmailsCardProps = {
  emailsCount: count,
  navigateToEmails: jest.fn,
  isFinalized: false
}

describe("emails-card", () => {
  it("renders correctly", async () => {
    const component = create(<EmailsCard {...defaultProps} />)
    await act(() => wait(0))
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("has correct structure", async () => {
    const tree = shallow(<EmailsCard {...defaultProps} />)

    await act(() => wait(0))

    const overviewCard = tree.find(OverviewCard)
    expect(overviewCard).toHaveLength(1)

    const cardFooter = overviewCard.dive().find(CardFooter)
    expect(cardFooter).toHaveLength(1)

    const cardFooterContent = cardFooter.dive()
    const cardFooterItem = cardFooterContent.find(CardFooterItem)
    expect(cardFooterItem).toHaveLength(1)

    const cardFooterIcon = cardFooterContent.find(CardFooterIcon)
    expect(cardFooterIcon).toHaveLength(1)
    expect(cardFooter.html()).toContain(`${count}`)
  })
})
