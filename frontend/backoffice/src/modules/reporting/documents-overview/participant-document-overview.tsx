import * as React from "react"
import {
  Card,
  CardContent,
  CardHeader,
  CustomSelect,
  Heading,
  Icon,
  LabelledCard,
  LoadingIndicator,
  TableContainer,
  Text
} from "shared/components"
import {HeadingLevel, IconName} from "shared/enums"
import {Relevance} from "shared/graphql/generated/globalTypes"
import {Flex, TextSize} from "shared/styles"
import {LucaTFunction, useLucaTranslation} from "shared/translations"
import {convertSecondsToMinutes, isDefined, sort} from "shared/utils"
import {translationKeyForRelevance} from "../../../utils"
import {styles} from "./participant-document-overview.styles"
import {Document} from "./participant-document-overview-container"

export const getDropdownList = (t: LucaTFunction) => [
  {value: "no_filter", label: t("relevance__all_documents")},
  {
    value: Relevance.PotentiallyHelpful,
    label: t("relevance__potentially_helpful")
  },
  {
    value: Relevance.Required,
    label: t("relevance__required")
  },
  {
    value: Relevance.Irrelevant,
    label: t("relevance__irrelevant")
  }
]

export const getDocumentFilterLabel = (filterBy: Relevance | null, t: LucaTFunction) => {
  if (filterBy === null) {
    return t("relevance__all_documents")
  }
  return t(translationKeyForRelevance(filterBy))
}

export interface ParticipantDocumentOverviewProps {
  readonly documents: Document[]
  readonly participantName: string
  readonly filterBy: Relevance | null
  readonly setFilterBy: (filter: Relevance | null) => void
  readonly onDismiss: () => void
  readonly scenarioProgressTime: number
  readonly loading: boolean
}

export const ParticipantDocumentOverview: React.FC<ParticipantDocumentOverviewProps> = ({
  onDismiss,
  participantName,
  documents,
  filterBy,
  setFilterBy,
  scenarioProgressTime,
  loading
}) => {
  const {t} = useLucaTranslation()

  const openedDocuments = sort(
    document => document.openedAfterSeconds ?? 0,
    documents.filter(
      document => isDefined(document.openedAfterSeconds) && (filterBy === null || document.relevance === filterBy)
    )
  )
  const unopenedRequiredDocuments = sort(
    document => (document.name ?? "").toLowerCase(),
    documents.filter(document => !isDefined(document.openedAfterSeconds) && document.relevance === Relevance.Required)
  )

  return loading ? (
    <LoadingIndicator />
  ) : (
    <Card customStyles={styles.card}>
      <CardHeader hasShadow={true} hasGreyBackground={true} customStyles={styles.heading}>
        {<Heading level={HeadingLevel.h3}>{t("document_overview__title", {participantName})}</Heading>}
        {<Icon onClick={onDismiss} customStyles={styles.closeIcon} name={IconName.Close} />}
      </CardHeader>
      <CardContent>
        <div css={Flex.row}>
          <LabelledCard label={t("document_overview__opened_table_title")} customStyles={styles.leftTableWrapper}>
            <TableContainer
              customStyles={styles.table}
              entities={openedDocuments}
              entityKey={file => file.id}
              customHeaderRowStyles={styles.tableHeader}
              customTableFooterStyles={styles.emptyFooter}
              showFooter={true}
              columns={[
                {
                  key: "documentName",
                  header: t("reporting_participant_document_overview_table_filter", {
                    filterBy: getDocumentFilterLabel(filterBy, t),
                    count: openedDocuments.length
                  }),
                  content: document => (
                    <div css={Flex.row}>
                      <Icon name={document.icon} hasSpacing />
                      <Text size={TextSize.Medium}>{document.name}</Text>
                    </div>
                  )
                },
                {
                  key: "openedAfter",
                  header: t("document_overview__opened_at"),
                  content: document => (
                    <div css={Flex.row}>
                      <Text size={TextSize.Medium}>{`+ ${
                        document.openedAfterSeconds !== undefined
                          ? convertSecondsToMinutes(document.openedAfterSeconds)
                          : 0
                      }min`}</Text>
                    </div>
                  )
                },
                {
                  key: "relevance",
                  header: (
                    <CustomSelect
                      onChange={value => setFilterBy(value === "no_filter" ? null : (value as Relevance))}
                      placeholderKey={"relevance__dropdown_placeholder"}
                      value={filterBy !== null ? filterBy : "no_filter"}
                      optionList={getDropdownList(t)}
                    />
                  ),
                  content: document => (
                    <div css={styles.lastTableColumn()}>
                      <Text size={TextSize.Medium}>{t(translationKeyForRelevance(document.relevance))}</Text>
                    </div>
                  )
                }
              ]}
            />
          </LabelledCard>
          <LabelledCard label={t("document_overview__not_opened_table_title")} customStyles={styles.rightTableWrapper}>
            <TableContainer
              customStyles={styles.table}
              customHeaderRowStyles={styles.tableHeader}
              entities={unopenedRequiredDocuments}
              entityKey={file => file.id}
              customTableFooterStyles={styles.emptyFooter}
              showFooter={true}
              columns={[
                {
                  key: "documentName",
                  header: t("reporting_participant_document_overview_table_filter", {
                    filterBy: t("relevance__required"),
                    count: unopenedRequiredDocuments.length
                  }),
                  content: document => (
                    <div css={Flex.row}>
                      <Icon name={document.icon} hasSpacing />
                      <Text size={TextSize.Medium}>{document.name}</Text>
                    </div>
                  )
                },
                {
                  key: "relevance",
                  header: " ",
                  content: document => (
                    <div
                      css={styles.lastTableColumn(
                        isDefined(document.delayInSeconds) && document.delayInSeconds > scenarioProgressTime
                      )}>
                      <Text size={TextSize.Medium}>{t(translationKeyForRelevance(document.relevance))}</Text>
                    </div>
                  )
                }
              ]}
            />
          </LabelledCard>
        </div>
      </CardContent>
    </Card>
  )
}
