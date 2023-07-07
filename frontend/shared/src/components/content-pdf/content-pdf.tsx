import {css} from "@emotion/react"
import * as React from "react"
import {HeadingLevel, IconName} from "../../enums"
import {BinaryFile} from "../../models"
import {
  borderRadius,
  cardBottomColor,
  CustomStyle,
  Flex,
  FontWeight,
  primaryColor,
  spacing,
  spacingSmall,
  TextSize
} from "../../styles"
import {useLucaTranslation} from "../../translations"
import {Option} from "../../utils"
import {Card, CardHeader} from "../card"
import {Icon} from "../icon/icon"
import {Heading, Text} from "../typography/typography"

export interface ContentPdfContainerProps extends CustomStyle {
  readonly title: string
  readonly pdfFile: Option<BinaryFile>
}
export interface ContentPdfProps extends CustomStyle {
  readonly openPdf: (pdf: Option<BinaryFile>) => void
}

export const ContentPdf: React.FC<ContentPdfProps & ContentPdfContainerProps> = ({title, pdfFile, openPdf}) => {
  const {t} = useLucaTranslation()

  return (
    <React.Fragment>
      <Card onClick={() => openPdf(pdfFile)} customStyles={styles.wrapper} hasShadow>
        <CardHeader customStyles={styles.bar}>
          <div css={styles.title}>
            <Icon customStyles={styles.icon} name={IconName.PDF} />
            <Heading level={HeadingLevel.h3}>{title}</Heading>
          </div>
          <div css={Flex.row}>
            <Text customStyles={styles.openPdf}>{t("reference_books__article_content_view_pdf")}</Text>
          </div>
        </CardHeader>
      </Card>
    </React.Fragment>
  )
}

const styles = {
  wrapper: css({
    width: "100%",
    margin: spacing(0, spacingSmall, spacingSmall, 0),
    cursor: "pointer",
    "&:hover": {
      backgroundColor: cardBottomColor,
      borderRadius: borderRadius
    }
  }),
  title: css({
    display: "flex",
    alignItems: "center"
  }),
  bar: css({
    display: "flex",
    justifyContent: "space-between"
  }),
  icon: css({
    marginRight: spacingSmall
  }),
  openPdf: css({
    fontSize: TextSize.Medium,
    color: primaryColor,
    fontWeight: FontWeight.Bold,
    paddingRight: spacingSmall
  }),
  binaryViewer: css({
    height: "80vh",
    width: "80vh"
  })
}
