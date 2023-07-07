import {css} from "@emotion/react"
import * as React from "react"
import {CardFooter, CardFooterItem, ContentLoadingIndicator, Icon, OverviewCard} from "shared/components"
import {IconName} from "shared/enums"
import {useLucaTranslation} from "shared/translations"
import {formatDate} from "shared/utils"
import {CardOverview} from "../../../components"
import {cardOverview} from "../../../styles/common"
import {useSampleCompanies} from "./hooks"

export const SampleCompanies: React.FC = () => {
  const {t} = useLucaTranslation()
  const {
    sampleCompanies,
    navigateCreateSampleCompany,
    navigateSampleCompanyDetail,
    sampleCompaniesLoading
  } = useSampleCompanies()

  return (
    <CardOverview
      customStyles={cardOverview}
      create={navigateCreateSampleCompany}
      entityFilterType={"sampleCompanies"}
      creationText={t("sample_companies__create_sample_company")}>
      {sampleCompaniesLoading ? (
        <ContentLoadingIndicator />
      ) : (
        sampleCompanies.map(sampleCompany => (
          <OverviewCard
            onClick={() => navigateSampleCompanyDetail(sampleCompany.id)}
            key={sampleCompany.id}
            headerText={sampleCompany.name}
            text={sampleCompany.description}
            tags={sampleCompany.tags}
            footer={
              <CardFooter customStyles={styles.cardFooter}>
                <CardFooterItem
                  title={t("create_date_title")}
                  icon={IconName.Calendar}
                  text={formatDate(new Date(sampleCompany.createdAt))}
                />
                <CardFooterItem
                  title={t("author_title")}
                  icon={IconName.Profile}
                  text={`${sampleCompany.author.firstName} ${sampleCompany.author.lastName}`}
                />
                <CardFooterItem
                  icon={IconName.File}
                  text={` ${sampleCompany.filesCount} ${sampleCompany.filesCount === 1 ? t("file") : t("files")}`}
                />
                <Icon name={sampleCompany.publishedAt !== null ? IconName.Publish : IconName.EditBordered} />
              </CardFooter>
            }
          />
        ))
      )}
    </CardOverview>
  )
}

const Sizes = {
  footerStatus: 16
}

const styles = {
  cardFooter: css({
    display: "grid",
    gridTemplateColumns: `1fr 1fr 1fr ${Sizes.footerStatus}px`
  })
}
