import {shallow} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {fakeTranslate} from "../../../../../tests/utils/translate-mock"
import {TableOfContentsContainer, TableOfContentsEntry} from "../../../../components"
import {Option} from "../../../../utils"
import {ErpNavigation, ErpNavigationProps} from "../erp-navigation"
import {NavFooterButton} from "../nav-footer-button"
import {getStaticErpStructure} from "../static-erp-structure"

const navigationEntries = getStaticErpStructure("Test Company", fakeTranslate)

const defaultProps: ErpNavigationProps = {
  navigationEntries,
  onEntrySelected: jest.fn(),
  selectedNode: Option.none()
}

const getComponent = (props?: Partial<ErpNavigationProps>) => <ErpNavigation {...{...defaultProps, ...props}} />

describe("erp-navigation", () => {
  it("renders correctly with default props", () => {
    const component = getComponent()
    const tree = create(component).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it("renders correctly in readonly mode", () => {
    const component = getComponent({isReadonly: true})
    const tree = create(component).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it("has correct structure with default props", () => {
    const component = shallow(getComponent())

    expect(component.find(TableOfContentsContainer)).toHaveLength(1)
    expect(component.find(TableOfContentsEntry)).toHaveLength(navigationEntries.length) // shallow

    const tocContainer = component.find(TableOfContentsContainer).first()
    expect(tocContainer.dive().find(".erp-navigation-checkbox")).toHaveLength(1)
    expect(tocContainer.dive().find(NavFooterButton)).toHaveLength(2)
  })

  it("has correct structure in readonly mode", () => {
    const component = shallow(getComponent({isReadonly: true}))

    expect(component.find(TableOfContentsContainer)).toHaveLength(1)
    expect(component.find(TableOfContentsEntry)).toHaveLength(navigationEntries.length) // shallow

    const tocContainer = component.find(TableOfContentsContainer).first()
    expect(tocContainer.dive().find(".erp-navigation-checkbox")).toHaveLength(0)
    expect(tocContainer.dive().find(".erp-navigation-import-button")).toHaveLength(0)
  })
})
