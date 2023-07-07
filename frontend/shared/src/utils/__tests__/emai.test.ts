import {sampleCompaniesMock} from "../../graphql/__mocks__"
import {Salutation} from "../../graphql/generated/globalTypes"
import {ParticipantData, SampleCompany} from "../../models"
import {createEmailDraft, getSenderAndRecipient, Option} from ".."

describe("container-utils", () => {
  it("creates an email draft", () => {
    const scenarioId = "TestId"
    const sender = "test@test.com"
    const id = "1234"
    const recipient = "contact@test.com"
    const localEmail = createEmailDraft(scenarioId, sender, id, recipient)

    expect(localEmail.scenarioId).toEqual(scenarioId)
    expect(localEmail.sender).toEqual(sender)
    expect(localEmail.id).toEqual(id)
    expect(localEmail.recipient).toEqual(recipient)
  })
})

describe("getSenderAndRecipient", () => {
  it("get the sender and recipient", () => {
    const scenarioId = "TestId"
    const sender = "test@test.com"
    const id = "1234"
    const recipient = "contact@test.com"
    const localEmail = createEmailDraft(scenarioId, sender, id, recipient)

    const email = localEmail
    const participantData: Option<ParticipantData> = Option.of({
      firstName: "Test",
      lastName: "Test",
      salutation: Salutation.Mr
    } as ParticipantData)

    const senderAndRecipient = getSenderAndRecipient(email, participantData, Option.none())
    const senderAndRecipientNone = getSenderAndRecipient(email, Option.none(), Option.none())
    const senderAndRecipientWitSampleCompany = getSenderAndRecipient(
      email,
      participantData,
      Option.of<SampleCompany>({...sampleCompaniesMock[0], domain: "company.org"})
    )

    expect(senderAndRecipient).toEqual({recipient: email.recipient, sender: "test.test@luca-office.de"})
    expect(senderAndRecipientNone).toEqual({recipient: email.recipient, sender: "no.name@luca-office.de"})
    expect(senderAndRecipientWitSampleCompany).toEqual({recipient: email.recipient, sender: "test.test@company.org"})
  })
})
