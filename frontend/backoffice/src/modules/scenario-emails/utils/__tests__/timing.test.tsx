import {EmailDirectory} from "shared/graphql/generated/globalTypes"
import {cleanEmailDelay} from "../timing"

describe("timing", () => {
  it("can cleanEmailDelay", async () => {
    expect(cleanEmailDelay(20, EmailDirectory.Inbox)).toEqual(20)
    expect(cleanEmailDelay(0, EmailDirectory.Inbox)).toEqual(0)
    expect(cleanEmailDelay(-20, EmailDirectory.Inbox)).toEqual(-20)

    expect(cleanEmailDelay(20, EmailDirectory.Trash)).toEqual(-20)
    expect(cleanEmailDelay(0, EmailDirectory.Trash)).toEqual(-1)
    expect(cleanEmailDelay(-20, EmailDirectory.Trash)).toEqual(-20)

    expect(cleanEmailDelay(20, EmailDirectory.Sent)).toEqual(-20)
    expect(cleanEmailDelay(0, EmailDirectory.Sent)).toEqual(-1)
    expect(cleanEmailDelay(-20, EmailDirectory.Sent)).toEqual(-20)
  })
})
