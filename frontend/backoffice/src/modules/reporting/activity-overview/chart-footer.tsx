import React from "react"
import {CardFooter, Checkbox} from "shared/components"
import {OfficeWindowType} from "shared/enums"
import {useLucaTranslation} from "shared/translations"
import {convertSecondsToTimeString} from "shared/utils"
import {DocumentActivityTotalTime} from "./participant-activity-overview"
import {styles} from "./participant-activity-overview.style"
import {allDisplayWindows, allDocumentActivity, DocumentActivity} from "./utils/acitvity-overview-config"
import {getFooterCheckBoxLabel} from "./utils/get-footer-check-box-label"
import {AllToolUsage} from "./utils/get-tool-usage-for-all-participants"
import {ToolUsage} from "./utils/get-tool-usage-from-survey-events"

export interface ChartFooterProps {
  readonly showToolUsage: boolean
  readonly displayWindows: OfficeWindowType[]
  readonly displayDocuments: DocumentActivity[]
  readonly setDisplayWindows: (windows: OfficeWindowType[]) => void
  readonly setDisplayDocuments: (documents: DocumentActivity[]) => void
  readonly toolUsages: (ToolUsage | AllToolUsage)[]
  readonly documentActivityTotalTime: DocumentActivityTotalTime[]
}

export const ChartFooter: React.FC<ChartFooterProps> = ({
  showToolUsage,
  displayWindows,
  setDisplayWindows,
  displayDocuments,
  setDisplayDocuments,
  toolUsages,
  documentActivityTotalTime
}) => {
  const {t} = useLucaTranslation()

  return showToolUsage ? (
    <CardFooter customStyles={styles.footer}>
      {allDisplayWindows.map(window => (
        <Checkbox
          customButtonStyle={styles.checkBox(window)}
          key={window}
          label={`${getFooterCheckBoxLabel(window, t)} (${convertSecondsToTimeString(
            toolUsages.find(tool => tool.tool === window)?.totalUsage ?? 0
          )})`}
          checked={displayWindows.includes(window)}
          onChange={() =>
            displayWindows.includes(window)
              ? setDisplayWindows(displayWindows.filter(displayWindow => displayWindow !== window))
              : setDisplayWindows(
                  allDisplayWindows.filter(
                    displayWindow => displayWindows.includes(displayWindow) || displayWindow === window
                  )
                )
          }
        />
      ))}
    </CardFooter>
  ) : (
    <CardFooter customStyles={styles.footer}>
      {allDocumentActivity.map(document => (
        <Checkbox
          customButtonStyle={styles.checkBox(document)}
          key={document}
          label={`${getFooterCheckBoxLabel(document, t)} (${convertSecondsToTimeString(
            documentActivityTotalTime.find(documentActivity => documentActivity.relevance === document)?.totalTime ?? 0
          )})`}
          checked={displayDocuments.includes(document)}
          onChange={() =>
            displayDocuments.includes(document)
              ? setDisplayDocuments(displayDocuments.filter(displayDocument => displayDocument !== document))
              : setDisplayDocuments(
                  allDocumentActivity.filter(
                    displayDocument => displayDocuments.includes(displayDocument) || displayDocument === document
                  )
                )
          }
        />
      ))}
    </CardFooter>
  )
}
