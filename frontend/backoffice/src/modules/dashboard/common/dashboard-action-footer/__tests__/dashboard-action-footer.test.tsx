// importing from direct file because of issues of babel loader and spyOn
import {render} from "@testing-library/react"
import {mount} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {Button, Icon, Text} from "shared/components"
import {projectsMock, surveyLightMock, surveysMock} from "shared/graphql/__mocks__"
import {Option} from "shared/utils"
import {DashboardActionFooter, DashboardActionFooterProps} from "../dashboard-action-footer"
import * as hook from "../hooks/use-dashboard-action-footer"
import {UseDashboardActionFooterHook} from "../hooks/use-dashboard-action-footer"

const hookValuesDefault: UseDashboardActionFooterHook = {
  survey: Option.of(surveyLightMock),
  project: Option.of(projectsMock[0]),
  onNavigate: jest.fn()
}

const getComponent = (props?: Partial<DashboardActionFooterProps>) => (
  <DashboardActionFooter projectId={projectsMock[0].id} surveyId={surveysMock[0].id} {...props} />
)

const stateSpy = jest.spyOn(hook, "useDashboardActionFooter")

describe("dashboard-action-footer", () => {
  it("renders correctly", async () => {
    stateSpy.mockReturnValue(hookValuesDefault)
    const component = create(getComponent())

    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("has correct structure (with data)", async () => {
    stateSpy.mockReturnValue(hookValuesDefault)

    const component = create(getComponent())
    const root = component.root
    expect(root.findAllByType("div")).toBeDefined()
    expect(root.findAllByType(Text)).toHaveLength(2)
    expect(root.findAllByType(Icon)).toHaveLength(2)
    expect(root.findAllByType(Button)).toHaveLength(1)
  })
  it("has correct structure (hide button)", async () => {
    stateSpy.mockReturnValue(hookValuesDefault)

    const component = create(getComponent({hideNavigationButton: true}))
    const root = component.root
    expect(root.findAllByType("div")).toBeDefined()
    expect(root.findAllByType(Text)).toHaveLength(2)
    expect(root.findAllByType(Icon)).toHaveLength(2)
    expect(root.findAllByType(Button)).toHaveLength(0)
  })
  it("has correct structure (missing data)", async () => {
    stateSpy.mockReturnValue({...hookValuesDefault, project: Option.none()})

    const {queryByTestId} = render(getComponent())
    expect(queryByTestId("dashboard-action-footer")).toBeNull()
  })
})
