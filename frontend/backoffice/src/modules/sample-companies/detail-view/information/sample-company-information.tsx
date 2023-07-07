import * as React from "react"
import {DetailViewCard} from "shared/components"
import {SampleCompany} from "shared/models"
import {Option} from "shared/utils"
import {CompanyCreation} from "../../hooks"
import {InformationBinaryContent} from "../information-binary-content/information-binary-content"
import {InformationMainContent} from "../information-main-content/information-main-content"
import {SelectedForScenarioConfig} from "../sample-company-detail-view"
import {sampleCompanyInformationStyles as styles} from "./sample-company-information.styles"

export interface SampleCompanyInformationProps {
  readonly sampleCompany: Option<SampleCompany>
  readonly isFinalized: boolean
  readonly updateSampleCompany: (update: Partial<CompanyCreation>) => Promise<Option<SampleCompany>>
  readonly updateLoading: boolean
  readonly selectedForScenarioConfig?: SelectedForScenarioConfig
  readonly disabled?: boolean
}

export const SampleCompanyInformation: React.FC<SampleCompanyInformationProps> = ({
  isFinalized,
  selectedForScenarioConfig,
  sampleCompany,
  updateLoading,
  updateSampleCompany,
  disabled
}) => {
  const isSelectedForScenario = selectedForScenarioConfig !== undefined

  const content = (
    <div css={[styles.container]}>
      <div css={styles.main}>
        <InformationMainContent
          updateLoading={updateLoading}
          sampleCompanyOption={sampleCompany}
          isFinalized={isFinalized}
          updateSampleCompany={updateSampleCompany}
          isSelectedForScenario={isSelectedForScenario}
          disabled={disabled}
        />
      </div>
      <div css={styles.binary}>
        <InformationBinaryContent
          sampleCompany={sampleCompany}
          isFinalized={isFinalized}
          updateSampleCompany={updateSampleCompany}
          disabled={disabled}
        />
      </div>
    </div>
  )

  return <DetailViewCard customStyles={styles.cardContent(isSelectedForScenario)} content={content} />
}
