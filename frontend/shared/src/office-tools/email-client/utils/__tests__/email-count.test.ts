import {mockEmails} from "../__mocks__/email"
import {getEmailCountsForDirectory} from "../email-counts"

const emails = mockEmails

describe("search", () => {
  it("returns the correct counts for the directories", () => {
    const emailCountsForDirectory = getEmailCountsForDirectory(emails)
    expect(emailCountsForDirectory).toEqual({draft: 1, inbox: 1, sent: 1, trash: 1})
  })

  it("returns the correct counts for an empty email list", () => {
    const emailCountsForDirectory = getEmailCountsForDirectory([])
    expect(emailCountsForDirectory).toEqual({draft: 0, inbox: 0, sent: 0, trash: 0})
  })
})
