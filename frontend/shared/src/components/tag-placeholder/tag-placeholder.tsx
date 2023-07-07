import * as React from "react"
import {useLucaTranslation} from "../../translations"
import {Tag, TagBackgroundColor} from "../tag/tag"

export const TagPlaceholder: React.FC = () => {
  const {t} = useLucaTranslation()
  return <Tag text={t("placeholder__tags")} backgroundColor={TagBackgroundColor.GREY} />
}
