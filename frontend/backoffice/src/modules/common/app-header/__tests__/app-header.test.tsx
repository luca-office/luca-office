import {MockedProvider} from "@apollo/client/testing"
import {render} from "@testing-library/react"
import {Provider} from "react-redux"
import {create} from "react-test-renderer"
import {fakeStore} from "sharedTests/redux/fake-store"
import {AppMode} from "../../../../enums"
import {initialAppState} from "../../../../redux/state/app-state"
import {Route} from "../../../../routes"
import {AppHeader} from "../app-header"
import {AppHeaderContainer} from "../app-header-container"

describe("app-header", () => {
  it("renders correctly (container)", () => {
    const component = create(
      <MockedProvider>
        <Provider store={fakeStore(initialAppState)}>
          <AppHeaderContainer />
        </Provider>
      </MockedProvider>
    )

    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("renders correctly", () => {
    const component = create(
      <MockedProvider>
        <Provider store={fakeStore(initialAppState)}>
          <AppHeader
            userMayAdministrateRScripts={false}
            activeRoute={Route.Scenarios}
            appMode={AppMode.EDITOR}
            navigate={jest.fn}
          />
        </Provider>
      </MockedProvider>
    )

    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("renders correct structure for manager", async () => {
    const component = render(
      <MockedProvider>
        <AppHeader
          userMayAdministrateRScripts={false}
          activeRoute={Route.Projects}
          appMode={AppMode.MANAGER}
          navigate={jest.fn}
        />
      </MockedProvider>
    )

    expect(await component.findAllByRole("menu")).toHaveLength(1)
    expect(component.queryAllByText("navigation__scenarios")).toHaveLength(0)
  })

  it("renders correct structure with rscript claim", async () => {
    const component = render(
      <MockedProvider>
        <AppHeader
          userMayAdministrateRScripts={true}
          activeRoute={Route.Projects}
          appMode={AppMode.EDITOR}
          navigate={jest.fn}
        />
      </MockedProvider>
    )

    expect(await component.findAllByRole("menu")).toHaveLength(1)
    expect(component.queryAllByText("navigation__scenarios")).toHaveLength(1)
    expect(component.queryAllByText("navigation__r_scripts")).toHaveLength(1)
  })
})
