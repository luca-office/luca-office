// importing from direct file because of issues of babel loader and spyOn
import {mount, shallow} from "enzyme"
import * as React from "react"
import {act} from "react-dom/test-utils"
import {create} from "react-test-renderer"
import {FormFieldLabel, Icon, ReadonlyActionField} from "shared/components"
import {emailMock} from "shared/graphql/__mocks__"
import {Option} from "shared/utils"
import {EmailFileDetailAction} from "../email-file-detail-action"
import {UseEmailFileDetailHook} from "../hooks/use-email-file-detail"
import * as useEmailFilesHook from "../hooks/use-email-file-detail"

const useEmailFileDetailHookValuesDefault: UseEmailFileDetailHook = {
  emailLoading: false,
  navigateToEmail: jest.fn(),
  email: Option.of(emailMock())
}

const emailFileDetailAction = <EmailFileDetailAction scenarioId="" emailId="" />
const emailFileDetailSpy = jest.spyOn(useEmailFilesHook, "useEmailFileDetail")

describe("email-file-detail-action", () => {
  it("renders correctly", async () => {
    emailFileDetailSpy.mockReturnValue(useEmailFileDetailHookValuesDefault)
    const component = create(emailFileDetailAction)

    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  it("has correct structure", async () => {
    emailFileDetailSpy.mockReturnValue(useEmailFileDetailHookValuesDefault)

    const component = mount(emailFileDetailAction)
    expect(component.find(FormFieldLabel)).toHaveLength(1)
    expect(component.find(ReadonlyActionField)).toHaveLength(1)
    expect(component.find(Icon)).toHaveLength(1)
  })

  it("has correct behavior", async () => {
    const mock = jest.fn()
    emailFileDetailSpy.mockReturnValue({
      ...useEmailFileDetailHookValuesDefault,
      navigateToEmail: mock
    })

    const component = shallow(emailFileDetailAction)
    act(() => {
      component.find(ReadonlyActionField).simulate("click")
      expect(mock).toHaveBeenCalledTimes(1)
    })
  })
})
