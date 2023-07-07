import {fireEvent, render, screen, waitFor} from "@testing-library/react"
import {shallow} from "enzyme"
import {create} from "react-test-renderer"
import {Heading, Icon} from "shared/components"
import {checkLoginMayAdministrateUserAccountsMock, checkLoginMock} from "shared/graphql/__mocks__"
import {Option} from "shared/utils"
import {AppMode} from "../../../../../enums"
import {AppModeSelect} from "../app-mode-select"
import {UseAppModeSelectHook} from "../hooks"
import * as appModeSelectHook from "../hooks/use-app-mode-select"

const hookValuesDefault: UseAppModeSelectHook = {
  toggleMenu: jest.fn(),
  isMenuVisible: false,
  appMode: AppMode.EDITOR,
  changeAppMode: jest.fn(),
  account: Option.of(checkLoginMock)
}

const stateSpy = jest.spyOn(appModeSelectHook, "useAppModeSelect")

describe("app-mode-select", () => {
  beforeEach(() => {
    let portalRoot = document.getElementById("portal-root")
    if (!portalRoot) {
      portalRoot = document.createElement("div")
      portalRoot.setAttribute("id", "portal-root")
      document.body.appendChild(portalRoot)
    }
  })

  it("renders correctly", async () => {
    stateSpy.mockReturnValue(hookValuesDefault)
    const component = create(<AppModeSelect />)

    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("has correct structure (collapsed)", async () => {
    stateSpy.mockReturnValue(hookValuesDefault)

    const component = shallow(<AppModeSelect />)
    expect(component.find("a")).toHaveLength(0)
    expect(component.find("menu")).toHaveLength(0)
    expect(component.find(Icon)).toHaveLength(2)
    expect(component.find(Heading)).toHaveLength(1)
  })

  it("has correct structure (expanded)", async () => {
    stateSpy.mockReturnValue({...hookValuesDefault, isMenuVisible: true})

    render(<AppModeSelect />)

    expect(screen.getAllByRole("menuitem").length).toBeGreaterThanOrEqual(1)
  })

  it("has correct structure (expanded) with admin user", async () => {
    stateSpy.mockReturnValue({
      ...hookValuesDefault,
      isMenuVisible: true,
      account: Option.of(checkLoginMayAdministrateUserAccountsMock)
    })

    render(<AppModeSelect />)

    const menuItems = screen.getAllByRole("menuitem")

    expect(menuItems.length).toBeGreaterThanOrEqual(1)
    expect(menuItems[0].textContent).toEqual("header__label_manager")
    expect(menuItems[2].textContent).toEqual("header__label_user_management")
  })

  it("triggers change correctly", async () => {
    const changeAppMode = jest.fn()
    const toggleMenu = jest.fn()
    stateSpy.mockReturnValue({...hookValuesDefault, isMenuVisible: true, changeAppMode, toggleMenu})

    render(<AppModeSelect />)

    const menuItems = screen.getAllByRole("menuitem")

    fireEvent.click(menuItems[0])

    await waitFor(() => expect(changeAppMode).toBeCalledTimes(1))
  })

  it("triggers close correctly", async () => {
    const changeAppMode = jest.fn()
    const toggleMenu = jest.fn()
    stateSpy.mockReturnValue({...hookValuesDefault, isMenuVisible: true, changeAppMode, toggleMenu})

    const component = shallow(<AppModeSelect />)
    component.find(".backdrop").first().simulate("click")
    expect(toggleMenu).toHaveBeenCalledTimes(1)
  })
})
