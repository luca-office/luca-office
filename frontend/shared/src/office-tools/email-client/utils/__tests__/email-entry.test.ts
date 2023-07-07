import {fakeTranslate} from "../../../../../tests/utils/translate-mock"
import {Option} from "../../../../utils/option"
import {mockEmails} from "../__mocks__/email"
import {getEntryPropsForEmail} from "../email-entry"

const email = mockEmails[0]
describe("search", () => {
  it("returns the entry props in the right format", () => {
    const arrivalTimeLabel = getEntryPropsForEmail(
      email,
      Option.none(),
      Option.of(new Date("01.01.2020 12:00")),
      fakeTranslate
    )
    expect(arrivalTimeLabel).toEqual({
      eMailAddress: "test@cap3.de",
      isRead: false,
      subLabel: "12:00",
      subject: "Testing"
    })
  })

  it("returns the entry props in the right format for empty date", () => {
    const arrivalTimeLabel = getEntryPropsForEmail(email, Option.none(), Option.none(), fakeTranslate)
    expect(arrivalTimeLabel).toEqual({
      eMailAddress: "test@cap3.de",
      isRead: false,
      subLabel: "",
      subject: "Testing"
    })
  })
})
