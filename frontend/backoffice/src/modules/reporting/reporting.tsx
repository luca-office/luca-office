import {css} from "@emotion/react"
import React from "react"
import {Content} from "shared/components"
import {Children, zIndex1} from "shared/styles"
import {useLucaTranslation} from "shared/translations"
import {SubHeaderDetailContainer, SubHeaderDetailContainerProps} from "../../components"
import {Route} from "../../routes"

interface ReportingProps extends Children {
  readonly projectId: UUID
  readonly surveyId: UUID
  readonly headerConfig?: Partial<Omit<SubHeaderDetailContainerProps, "customStyles" | "deleteButtonConfig">>
}

export const Reporting: React.FC<ReportingProps> = ({projectId, surveyId, headerConfig, children}) => {
  const {t} = useLucaTranslation()

  return (
    <Content
      subHeader={
        <SubHeaderDetailContainer
          customStyles={styles.zIndex}
          returnTo={{
            text: t("project_title_survey"),
            route: Route.SurveyDetail,
            params: {id: projectId, surveyId}
          }}
          title={t("reporting_overview_subheader_title")}
          {...headerConfig}
        />
      }>
      {children}
    </Content>
  )
}

export const styles = {
  zIndex: css({
    zIndex: zIndex1
  })
}
