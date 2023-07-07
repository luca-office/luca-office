// importing from direct file because of issues of babel loader and spyOn
import {shallow} from "enzyme"
import {create} from "react-test-renderer"
import {Column, Columns, Heading, InfoColumnContainer, Text, TextInput} from "shared/components"
import {mockedFormMethods} from "sharedTests/utils/form-methods-mock"
import {UseResetPasswordHook} from ".."
import * as useResetPasswordHook from "../hooks/useResetPassword"
import {ResetPassword} from "../reset-password"

const hookValuesDefault: UseResetPasswordHook = {
  resetPassword: jest.fn(),
  formMethods: mockedFormMethods
}

const stateSpy = jest.spyOn(useResetPasswordHook, "useResetPassword")

describe("Reset Password Screen", () => {
  it("renders correctly", async () => {
    stateSpy.mockReturnValue(hookValuesDefault)
    const component = create(<ResetPassword token="sdfdsf-sdfdsf" email="sefkj@sdf.de" />)

    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  it("has correct structure", async () => {
    stateSpy.mockReturnValue({...hookValuesDefault})

    const component = shallow(<ResetPassword token="sdfdsf-sdfdsf" email="sefkj@sdf.de" />)
    expect(component.find(Columns)).toHaveLength(1)
    expect(component.find(Column)).toHaveLength(1)
    expect(component.find(InfoColumnContainer)).toHaveLength(1)
    expect(component.find(Text)).toHaveLength(1)
    expect(component.find(TextInput)).toHaveLength(2)
    expect(component.find(Heading)).toHaveLength(2)
  })
})
