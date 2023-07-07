import {CompanyCreation} from "../../modules/sample-companies/hooks"
import {Option} from "shared/utils"

export const sampleCompanyCreationMock: CompanyCreation = {
  name: "Neues Modellunternehmen",
  description: "Modellunternehmen Beschreibung",
  tags: [],
  emailSignature: "",
  logoFile: Option.none(),
  logoBase64: Option.none()
}
