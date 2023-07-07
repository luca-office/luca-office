import {shallow} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {AccordionCard, Card, CardContent, CardFooter, Icon, Paper, Text, Tooltip} from "../../../../../../components"
import * as useAccordionCardHook from "../../../../../../components/accordion-card/hooks/use-accordion-card"
import {ErpType} from "../../../../../../enums"
import {ErpDataSetAccordion, ErpDataSetAccordionProps} from "../erp-data-set-accordion"

const hookValuesDefault: useAccordionCardHook.UseAccordionCardHook = {
  contentVisible: false,
  showContent: jest.fn(),
  hideContent: jest.fn()
}

const stateSpy = jest.spyOn(useAccordionCardHook, "useAccordionCard")

const defaultProps: ErpDataSetAccordionProps = {
  type: ErpType.Order,
  data: {id: [1, 2, 3, 4, 5]},
  onClick: jest.fn(),
  onCopyAll: jest.fn()
}

const getComponent = (props?: Partial<ErpDataSetAccordionProps>) => (
  <ErpDataSetAccordion {...{...defaultProps, ...props}} />
)

describe("erp-data-set-accordion", () => {
  it("renders correctly", async () => {
    stateSpy.mockReturnValue(hookValuesDefault)
    const component = create(getComponent())

    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("has correct structure (content hidden)", async () => {
    stateSpy.mockReturnValue(hookValuesDefault)
    const component = shallow(getComponent())

    const accordionCard = component.find(AccordionCard)
    expect(accordionCard).toHaveLength(1)

    const card = accordionCard.dive().find(Card)
    expect(card).toHaveLength(1)

    const cardContent = card.dive()
    expect(cardContent.find(CardContent)).toHaveLength(0)
    expect(cardContent.find(CardFooter)).toHaveLength(0)
  })
  it("has correct structure (content visible)", async () => {
    stateSpy.mockReturnValue({...hookValuesDefault, contentVisible: true})
    const component = shallow(getComponent())

    const accordionCard = component.find(AccordionCard)
    expect(accordionCard).toHaveLength(1)

    const card = accordionCard.dive().find(Card)
    expect(card).toHaveLength(1)

    const cardContent = card.dive()

    const cardContentComponent = cardContent.find(CardContent)
    expect(cardContentComponent).toHaveLength(1)

    const cardContentComponentContent = cardContentComponent.dive()
    expect(cardContentComponentContent.find(".entry-wrapper")).toHaveLength(5)

    const paper = cardContentComponentContent.find(Paper)
    expect(paper).toHaveLength(5)

    const paperContent = paper.at(0).dive()
    expect(paperContent.find(".copy-wrapper")).toHaveLength(1)
    expect(paperContent.find(Text)).toHaveLength(1)

    const tooltip = paperContent.find(Tooltip)
    expect(tooltip).toHaveLength(1)
    expect(tooltip.dive().find(Icon)).toHaveLength(1)

    const cardFooter = cardContent.find(CardFooter)
    expect(cardFooter).toHaveLength(1)

    const cardFooterContent = cardFooter.dive()
    expect(cardFooterContent.find(".footer-content-wrapper")).toHaveLength(1)

    const footerTooltip = cardFooterContent.find(Tooltip)
    expect(footerTooltip).toHaveLength(1)
    expect(footerTooltip.dive().find(Text)).toHaveLength(1)
  })
  it("correctly calls onClick", async () => {
    stateSpy.mockReturnValue({...hookValuesDefault, contentVisible: true})
    const onClickMock = jest.fn()
    const component = shallow(getComponent({onClick: onClickMock}))

    const entityWrapper = component
      .find(AccordionCard)
      .dive()
      .find(Card)
      .dive()
      .find(CardContent)
      .dive()
      .find(".entry-wrapper")
      .at(0)
    entityWrapper.simulate("click")
    expect(onClickMock).toHaveBeenCalledTimes(1)
  })
  it("correctly calls onCopyAll", async () => {
    stateSpy.mockReturnValue({...hookValuesDefault, contentVisible: true})
    const onCopyAllMock = jest.fn()
    const component = shallow(getComponent({onCopyAll: onCopyAllMock}))

    const cardFooterContentWrapper = component
      .find(AccordionCard)
      .dive()
      .find(Card)
      .dive()
      .find(CardFooter)
      .dive()
      .find(".footer-content-wrapper")
    cardFooterContentWrapper.simulate("click")
    expect(onCopyAllMock).toHaveBeenCalledTimes(1)
  })
})
