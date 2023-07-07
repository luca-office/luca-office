// importing from direct file because of issues of babel loader and spyOn
import {fireEvent, getByText, render, waitFor} from "@testing-library/react"
import {shallow} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {checkLoginMock} from "shared/graphql/__mocks__"
import {Option} from "shared/utils"
import {AccountMenu} from "../account-menu"
import {UseAccountMenuHook} from "../hooks"
import * as accountMenuHook from "../hooks/use-account-menu"

const hookValuesDefault: UseAccountMenuHook = {
  toggleMenu: jest.fn(),
  isMenuVisible: false,
  logout: jest.fn(),
  openAccountSettings: jest.fn(),
  activeLanguage: "",
  setStoredSelectedLanguage: jest.fn(),
  userAccount: Option.of(checkLoginMock)
}

const stateSpy = jest.spyOn(accountMenuHook, "useAccountMenu")

describe("User Account Menu", () => {
  it("renders correctly", async () => {
    stateSpy.mockReturnValue(hookValuesDefault)
    const component = create(<AccountMenu />)

    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("has correct structure (collapsed)", async () => {
    stateSpy.mockReturnValue(hookValuesDefault)

    const component = shallow(<AccountMenu />)
    expect(component.find("a")).toHaveLength(0)
    expect(component.find("menu")).toHaveLength(0)
    expect(component.html()).toContain(checkLoginMock.email)
  })

  it("has correct structure (expanded)", async () => {
    stateSpy.mockReturnValue({...hookValuesDefault, isMenuVisible: true})

    const {queryAllByRole, queryAllByText} = render(<AccountMenu />)
    expect(queryAllByRole("menuitem")).toHaveLength(2)
    expect(queryAllByText(checkLoginMock.email)).toHaveLength(2)
  })

  it("has correct structure (no user)", async () => {
    stateSpy.mockReturnValue({...hookValuesDefault, isMenuVisible: true, userAccount: Option.none()})

    const {queryAllByRole, queryAllByText} = render(<AccountMenu />)
    expect(queryAllByRole("menutitem")).toHaveLength(0)
    expect(queryAllByText(checkLoginMock.email)).toHaveLength(0)
  })

  it("triggers actions correctly", async () => {
    const logout = jest.fn()
    const openAccountSettings = jest.fn()
    const setStoredSelectedLanguage = jest.fn()
    stateSpy.mockReturnValue({
      ...hookValuesDefault,
      isMenuVisible: true,
      logout,
      openAccountSettings,
      setStoredSelectedLanguage
    })

    const {getAllByRole, getByText} = render(<AccountMenu />)

    fireEvent.click(getAllByRole("menuitem")[0])

    await waitFor(() => {
      expect(openAccountSettings).toBeCalledTimes(1)
    })

    fireEvent.click(getAllByRole("menuitem")[1])

    await waitFor(() => {
      expect(logout).toBeCalledTimes(1)
    })

    fireEvent.click(getByText("lang_en"))

    await waitFor(() => {
      expect(setStoredSelectedLanguage).toBeCalledWith("en")
    })

    fireEvent.click(getByText("lang_de"))

    await waitFor(() => {
      expect(setStoredSelectedLanguage).toBeCalledWith("de")
    })
  })
})
