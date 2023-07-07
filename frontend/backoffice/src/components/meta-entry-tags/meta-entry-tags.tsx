import {css} from "@emotion/react"
import * as React from "react"
import {Tag, TagBackgroundColor, TagPlaceholder} from "shared/components"
import {CustomStyle, Flex, spacing, spacingSmall, spacingTiny} from "shared/styles"
import {removeDuplicates} from "shared/utils"
import {ScenarioUpdateKeys} from "../../enums"
import {OverlayEditFieldType} from ".."
import {OverlayEditField} from "../overlay-edit-field/overlay-edit-field"

type TagsUpdate = Record<string, string>

export interface MetaEntryTagsProps {
  readonly tags: string[]
  readonly updateLoading: boolean
  readonly handleUpdate: (tags: string[]) => void
  readonly disabled: boolean
}

export const MetaEntryTags: React.FC<MetaEntryTagsProps & CustomStyle> = ({
  tags,
  updateLoading,
  handleUpdate,
  customStyles,
  disabled
}) => {
  const handleTagsUpdate = ({tags}: TagsUpdate) => {
    const mappedTags = removeDuplicates(tags.split(";").map(el => el.trim())).reduce((accumulator, tag) => {
      const value = tag.trim()
      return !value ? accumulator : [...accumulator, value]
    }, [] as string[])
    handleUpdate(mappedTags)
  }

  return (
    <OverlayEditField<TagsUpdate>
      fieldLabelKey={"scenario_details__general_tags"}
      customModalStyles={styles.tagsModal}
      customWrapperStyles={customStyles}
      disabled={disabled}
      renderValue={() =>
        tags.length ? (
          <div css={[Flex.row, styles.tagsRow]}>
            {tags.map((tag, index) => (
              <div css={styles.tag} key={`${tag}-${index}`}>
                <Tag text={tag} backgroundColor={TagBackgroundColor.PRIMARY} />
              </div>
            ))}
          </div>
        ) : (
          <TagPlaceholder />
        )
      }
      dialogTitleKey="scenario_details__general_tags_edit"
      dialogDescriptionKey="scenario_details__general_tags_description"
      updateLoading={updateLoading}
      onUpdate={handleTagsUpdate}
      formFields={[
        {
          value: tags.join("; "),
          updateId: ScenarioUpdateKeys.Tags,
          type: OverlayEditFieldType.TEXTAREA,
          placeholderKey: "scenario_details__general_tags_placeholder_example",
          customStyleOnlyTextArea: styles.tagsModalTextArea
        }
      ]}
    />
  )
}

const Size = {
  textArea: 128
}

const styles = {
  tagsRow: css({
    flexWrap: "wrap",
    margin: spacing(-spacingTiny, 0, 0, 0)
  }),
  tag: css({
    marginTop: spacingTiny,
    "&:not(:last-of-type)": {
      marginRight: spacingSmall
    }
  }),
  tagsModal: css({
    width: "50vw"
  }),
  tagsModalTextArea: css({
    minHeight: Size.textArea,
    resize: "vertical"
  })
}
