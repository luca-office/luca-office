import {css} from "@emotion/react"
import * as React from "react"
import {
  backgroundColorBright,
  boxHeightMedium,
  Flex,
  spacing,
  spacingSmall,
  spacingTiny,
  textEllipsis
} from "../../styles"
import {useLucaTranslation} from "../../translations"
import {Tag, TagBackgroundColor} from "../tag/tag"
import {TagPlaceholder} from "../tag-placeholder/tag-placeholder"

export interface MetaEntryTagsProps {
  readonly tags: string[]
  readonly maxTags?: number
}

export const TagsOnCards: React.FC<MetaEntryTagsProps> = ({tags, maxTags = 3}) => {
  const {t} = useLucaTranslation()
  const tagsToRender = tags.length > maxTags ? [...tags.slice(0, maxTags), t("placeholder__indicate_more_tags")] : tags

  return (
    <div css={styles.contentWrapper}>
      {tagsToRender.length ? (
        <div css={styles.tagsRow}>
          {tagsToRender.map((tag, index) => (
            <Tag
              key={tag + index}
              text={tag}
              backgroundColor={index === maxTags ? TagBackgroundColor.GREY : TagBackgroundColor.PRIMARY}
              customWrapperStyle={styles.tag(tags.length > maxTags)}
              customTagStyle={tags.length > maxTags ? [textEllipsis, styles.tagText] : textEllipsis}
            />
          ))}
        </div>
      ) : (
        <TagPlaceholder />
      )}
    </div>
  )
}
const Size = {
  contentWrapper: boxHeightMedium,
  textArea: 120
}
const styles = {
  tagsRow: css(Flex.row, {
    margin: spacing(-spacingTiny, 0, 0, 0)
  }),
  tag: (manyTags: boolean) =>
    css({
      flexGrow: manyTags ? 1 : undefined,
      flexShrink: manyTags ? 1 : undefined,
      maxWidth: manyTags ? "30%" : undefined,
      wrap: "nowrap",
      marginTop: spacingTiny,
      "&:not(:last-of-type)": {
        marginRight: spacingSmall
      },
      "&:last-child": {
        maxWidth: manyTags ? "10%" : undefined,
        overflow: "hidden"
      }
    }),
  contentWrapper: css(Flex.column, {
    minHeight: Size.contentWrapper,
    padding: spacing(spacingTiny, spacingSmall),
    boxSizing: "border-box",
    backgroundColor: backgroundColorBright
  }),
  tagText: css({
    textAlign: "center"
  })
}
