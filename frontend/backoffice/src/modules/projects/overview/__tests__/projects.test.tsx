// importing from direct file because of issues of babel loader and spyOn
import {act, fireEvent, render, waitFor} from "@testing-library/react"
import {mount} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {OverviewCard} from "shared/components"
import {projectsMock} from "shared/graphql/__mocks__"
import wait from "waait"
import {CreationCard, SubHeaderFilter} from "../../../../components"
import {UseProjectsHook} from "../hooks"
import * as useProjects from "../hooks/use-projects"
import {Projects} from "../projects"

const hookValuesDefault: UseProjectsHook = {
  loading: false,
  projects: projectsMock,
  projectsLoading: false,
  navigateProjectDetail: jest.fn(),
  navigateCreateProject: jest.fn
}

const stateSpy = jest.spyOn(useProjects, "useProjects")

describe("projects", () => {
  it("renders correctly", async () => {
    stateSpy.mockReturnValue(hookValuesDefault)
    const component = create(<Projects />)
    await act(() => wait(0))
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("has correct structure", async () => {
    stateSpy.mockReturnValue(hookValuesDefault)

    const component = mount(<Projects />)
    await act(() => wait(0))

    expect(component.find(SubHeaderFilter)).toHaveLength(1)
    expect(component.find(CreationCard)).toHaveLength(1)
    expect(component.find(OverviewCard)).toHaveLength(2)
  })

  it("has correct structure (no projects)", async () => {
    stateSpy.mockReturnValue({...hookValuesDefault, projects: []})

    const component = mount(<Projects />)

    await act(() => wait(0))
    expect(component.find(SubHeaderFilter)).toHaveLength(1)
    expect(component.find(CreationCard)).toHaveLength(1)
  })
  it("triggers actions correctly", async () => {
    const navigateDetail = jest.fn()
    const navigateCreation = jest.fn()
    stateSpy.mockReturnValue({
      ...hookValuesDefault,
      navigateProjectDetail: navigateDetail,
      navigateCreateProject: navigateCreation
    })

    const {getByText} = render(<Projects />)

    await act(() => wait(0))

    // Trigger and check actions
    // component.find(CreationCard).simulate("click")

    console.log(getByText("projects__create_project"))

    fireEvent.click(getByText("projects__create_project"))

    await waitFor(() => {
      expect(navigateDetail).toBeCalledTimes(0)
      expect(navigateCreation).toBeCalledTimes(1)
    })

    fireEvent.click(getByText(projectsMock[0].name))

    await waitFor(() => {
      expect(navigateDetail).toBeCalledTimes(1)
      expect(navigateCreation).toBeCalledTimes(1)
    })
  })
})
