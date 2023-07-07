// importing from direct file because of issues of babel loader and spyOn
import {act} from "@testing-library/react"
import {mount} from "enzyme"
import * as React from "react"
import {Provider} from "react-redux"
import {create} from "react-test-renderer"
import {Card, Heading, ReadonlyActionField, Text} from "shared/components"
import {checkLoginMock} from "shared/graphql/__mocks__"
import {Option} from "shared/utils"
import {fakeStore} from "sharedTests/redux/fake-store"
import wait from "waait"
import {OverlayEditField, SubHeaderDetailContainer} from "../../../../components"
import {initialAppState} from "../../../../redux/state/app-state"
import {EditUser} from "../edit-user"
import {UseEditUserHook} from "../hooks"
import * as useEditUserHook from "../hooks/use-edit-user"

const hookValuesDefault: UseEditUserHook = {
  userAccount: Option.of(checkLoginMock),
  updateAccount: jest.fn(),
  updateLoading: false
}

const stateSpy = jest.spyOn(useEditUserHook, "useEditUser")

describe("edit-user", () => {
  it("renders correctly", async () => {
    stateSpy.mockReturnValue(hookValuesDefault)
    const component = create(
      <Provider store={fakeStore(initialAppState)}>
        <EditUser />
      </Provider>
    )
    await act(() => wait(0))
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("has correct structure", async () => {
    stateSpy.mockReturnValue(hookValuesDefault)

    const component = mount(
      <Provider store={fakeStore(initialAppState)}>
        <EditUser />
      </Provider>
    )
    await act(() => wait(0))

    expect(component.find(SubHeaderDetailContainer)).toHaveLength(1)
    expect(component.find(Card)).toHaveLength(1)
    expect(component.find(Heading)).toHaveLength(4)
    expect(component.find(Text)).toHaveLength(5)
    expect(component.find(ReadonlyActionField)).toHaveLength(4)
    expect(component.find(OverlayEditField)).toHaveLength(3)
    const html = component.html()
    expect(html).toContain(checkLoginMock.email)
    expect(html).toContain(checkLoginMock.firstName)
    expect(html).toContain(checkLoginMock.lastName)
    expect(html).toContain(checkLoginMock.organization)
  })

  it("has correct structure (no user)", async () => {
    stateSpy.mockReturnValue({...hookValuesDefault, userAccount: Option.none()})

    const component = mount(
      <Provider store={fakeStore(initialAppState)}>
        <EditUser />
      </Provider>
    )

    await act(() => wait(0))
    expect(component.find(SubHeaderDetailContainer)).toHaveLength(1)
    expect(component.find(Card)).toHaveLength(1)
    expect(component.find(Heading)).toHaveLength(3)
    expect(component.find(Text)).toHaveLength(1)
    expect(component.find(ReadonlyActionField)).toHaveLength(0)
    expect(component.find(OverlayEditField)).toHaveLength(0)
  })
})
