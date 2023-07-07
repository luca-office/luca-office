import {css} from "@emotion/react"
import * as React from "react"
import {ColumnProps, Heading, Icon, Text} from "shared/components"
import {HeadingLevel, IconName} from "shared/enums"
import {ProjectModuleType} from "shared/graphql/generated/globalTypes"
import {CodingDimension} from "shared/models"
import {FontWeight, spacingSmall, textEllipsis, TextSize} from "shared/styles"
import {LucaTFunction} from "shared/translations"
import {getIconNameFromMimeType} from "shared/utils"
import {RaterRatingParticipantRatingMaxScoreLabel, RaterRatingParticipantRatingProgressBar} from "../common"
import {RatingProjectModule} from "../models"

export const getRaterRatingProjectModuleColumns = (
  t: LucaTFunction,
  codingDimensions: CodingDimension[],
  fullyRatedParticipantCount: number
): ColumnProps<RatingProjectModule>[] => [
  {
    key: "name",
    header: (
      <Heading level={HeadingLevel.h3} fontWeight={FontWeight.Bold}>
        {t("rater_rating_details__project_module")}
      </Heading>
    ),
    content: ratingProjectModule => (
      <div css={styles.nameWrapper}>
        <Icon
          name={
            ratingProjectModule.moduleType === ProjectModuleType.Questionnaire &&
            ratingProjectModule.questionnaire?.binaryFile
              ? getIconNameFromMimeType(ratingProjectModule.questionnaire.binaryFile.mimeType)
              : IconName.Monitor
          }
        />
        <Text customStyles={textEllipsis} size={TextSize.Medium}>
          {ratingProjectModule.moduleType === ProjectModuleType.Scenario
            ? ratingProjectModule.scenario?.name
            : ratingProjectModule.questionnaire?.title}
        </Text>
      </div>
    ),
    customStyles: styles.mediumColumn
  },
  {
    key: "max-points",
    header: (
      <Heading level={HeadingLevel.h3} fontWeight={FontWeight.Bold}>
        {t("rater_rating_details__project_module_max_points")}
      </Heading>
    ),
    content: ratingProjectModule => (
      <RaterRatingParticipantRatingMaxScoreLabel
        ratingProjectModule={ratingProjectModule}
        codingDimensions={codingDimensions}
      />
    ),
    customStyles: styles.smallColumn
  },
  {
    key: "rated-participants",
    header: (
      <Heading level={HeadingLevel.h3} fontWeight={FontWeight.Bold}>
        {t("rater_rating_details__project_module_rated_participants", {count: fullyRatedParticipantCount})}
      </Heading>
    ),
    content: ratingProjectModule => (
      <RaterRatingParticipantRatingProgressBar ratingProjectModule={ratingProjectModule} />
    ),
    customStyles: styles.largeColumn
  }
]

const styles = {
  nameWrapper: css({
    display: "grid",
    gridTemplateColumns: "minmax(min-content, max-content) 1fr",
    gridColumnGap: spacingSmall,
    alignItems: "center"
  }),
  smallColumn: css({
    flex: "1 1 0"
  }),
  mediumColumn: css({
    flex: "2 2 0"
  }),
  largeColumn: css({
    flex: "3 3 0"
  })
}
