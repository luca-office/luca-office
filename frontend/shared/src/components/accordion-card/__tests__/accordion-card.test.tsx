import {shallow} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {IconName} from "../../../enums"
import {iconDisabledColor} from "../../../styles"
import {Card, CardContent, CardFooter, CardHeader} from "../../card"
import {Icon} from "../../icon/icon"
import {AccordionCard, AccordionCardProps} from "../accordion-card"
import * as useAccordionCardHook from "../hooks/use-accordion-card"
import {UseAccordionCardHook} from "../hooks/use-accordion-card"

const hookValuesDefault: UseAccordionCardHook = {
  contentVisible: false,
  showContent: jest.fn(),
  hideContent: jest.fn()
}

const stateSpy = jest.spyOn(useAccordionCardHook, "useAccordionCard")

const defaultProps: AccordionCardProps = {
  headerLabel: "Main-Label",
  additionalHeaderLabel: "Additional-Label",
  footer: <div>Footer</div>
}

const getComponent = (props?: Partial<AccordionCardProps>) => <AccordionCard {...{...defaultProps, ...props}} />

describe("accordion-card", () => {
  it("renders correctly (no content visible)", async () => {
    stateSpy.mockReturnValue(hookValuesDefault)
    const component = create(getComponent())

    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("renders correctly (content visible)", async () => {
    stateSpy.mockReturnValue({...hookValuesDefault, contentVisible: true})
    const component = create(getComponent({footer: undefined}))

    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("renders correctly (footer visible)", async () => {
    stateSpy.mockReturnValue({...hookValuesDefault, contentVisible: true})
    const component = create(getComponent())

    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("renders correctly (header has icon)", async () => {
    stateSpy.mockReturnValue({...hookValuesDefault, contentVisible: true})
    const component = create(
      getComponent({headerLabelIcon: IconName.KeyFilled, headerLabelIconColor: iconDisabledColor})
    )

    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("has correct structure (no content visible)", async () => {
    stateSpy.mockReturnValue(hookValuesDefault)

    const component = shallow(getComponent())

    const card = component.find(Card)
    expect(card).toHaveLength(1)

    const cardContent = card.dive()
    expect(cardContent.find(CardContent)).toHaveLength(0)
    expect(cardContent.find(CardFooter)).toHaveLength(0)

    const header = cardContent.find(CardHeader)
    expect(header).toHaveLength(1)
    expect(header.dive().find(Icon)).toHaveLength(1)
  })
  it("has correct structure (content visible)", async () => {
    stateSpy.mockReturnValue({...hookValuesDefault, contentVisible: true})

    const component = shallow(getComponent({footer: undefined}))

    const card = component.find(Card)
    expect(card).toHaveLength(1)

    const cardContent = card.dive()
    expect(cardContent.find(CardContent)).toHaveLength(1)
    expect(cardContent.find(CardFooter)).toHaveLength(0)

    const header = cardContent.find(CardHeader)
    expect(header).toHaveLength(1)
    expect(header.dive().find(Icon)).toHaveLength(1)
  })
  it("has correct structure (footer visible)", async () => {
    stateSpy.mockReturnValue({...hookValuesDefault, contentVisible: true})

    const component = shallow(getComponent())

    const card = component.find(Card)
    expect(card).toHaveLength(1)

    const cardContent = card.dive()
    expect(cardContent.find(CardContent)).toHaveLength(1)
    expect(cardContent.find(CardFooter)).toHaveLength(1)

    const header = cardContent.find(CardHeader)
    expect(header).toHaveLength(1)
    expect(header.dive().find(Icon)).toHaveLength(1)
  })
  it("has correct structure (header has icon)", async () => {
    stateSpy.mockReturnValue({...hookValuesDefault, contentVisible: true})

    const component = shallow(
      getComponent({headerLabelIcon: IconName.KeyFilled, headerLabelIconColor: iconDisabledColor})
    )

    const card = component.find(Card)
    expect(card).toHaveLength(1)

    const cardContent = card.dive()
    expect(cardContent.find(CardContent)).toHaveLength(1)
    expect(cardContent.find(CardFooter)).toHaveLength(1)

    const header = cardContent.find(CardHeader)
    expect(header).toHaveLength(1)
    expect(header.dive().find(Icon)).toHaveLength(2)
  })
})
