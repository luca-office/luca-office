import {css} from "@emotion/react"
import {CSSInterpolation} from "@emotion/serialize"
import {sum} from "lodash-es"
import * as React from "react"
import {PieChart} from "react-minimal-pie-chart"
import {Data} from "react-minimal-pie-chart/types/commonTypes"
import {Icon, Text} from "shared/components"
import {IconName} from "shared/enums"
import {
  boxHeightMedium,
  chartColor,
  CustomStyle,
  Flex,
  FontWeight,
  spacingLarge,
  spacingMedium,
  spacingSmall,
  spacingTiny,
  TextSize
} from "shared/styles"

interface Props extends CustomStyle {
  readonly data: Data
  readonly legendLabel: string
  readonly chartIcon?: IconName
  readonly renderCustomPostLegendElement?: () => React.ReactNode
  readonly customLegendEntryStyles?: CSSInterpolation
  readonly customLegendMarkerStyles?: CSSInterpolation
}

export const DonutChartWithLegend: React.FunctionComponent<Props> = ({
  customStyles,
  data,
  legendLabel,
  chartIcon,
  renderCustomPostLegendElement,
  customLegendEntryStyles,
  customLegendMarkerStyles
}) => (
  <div className="donut-chart" css={[chartStyles.container, customStyles]}>
    <div css={chartStyles.chartWrapper}>
      <PieChart
        rounded={false}
        data={data}
        lineWidth={spacingMedium + spacingTiny}
        background={chartColor}
        startAngle={90}
      />
      {chartIcon && (
        <Icon customStyles={chartStyles.label} name={chartIcon} height={boxHeightMedium} width={boxHeightMedium} />
      )}
    </div>
    <div>
      <div css={chartStyles.legendWrapper}>
        <Text size={TextSize.Medium} customStyles={chartStyles.legend}>
          {legendLabel}
        </Text>
        <Text size={TextSize.Medium} customStyles={[chartStyles.legend, chartStyles.count]}>
          {sum(data.map(value => value.value))}
        </Text>
      </div>
      {data.map((value, index) => (
        <div key={index} css={[chartStyles.legendEntry, customLegendEntryStyles]} className="legend-entry">
          <div css={[chartStyles.marker(value.color), customLegendMarkerStyles]} />
          <Text size={TextSize.Medium}>{value.title}</Text>
          <Text size={TextSize.Medium} customStyles={chartStyles.count}>
            {value.value}
          </Text>
        </div>
      ))}
      {renderCustomPostLegendElement && (
        <div css={chartStyles.postLegendElementWrapper}>{renderCustomPostLegendElement()}</div>
      )}
    </div>
  </div>
)

const chartStyles = {
  container: css({
    display: "grid",
    gridTemplateColumns: "132px 1fr",
    gridTemplateRows: "132px",
    gridColumnGap: spacingLarge
  }),
  chartWrapper: css(Flex.row, {
    position: "relative",
    justifyContent: "center"
  }),
  label: css({
    position: "absolute",
    opacity: 0.35
  }),
  legend: css({
    fontWeight: FontWeight.Bold
  }),
  legendWrapper: css({
    display: "grid",
    gridTemplateColumns: "1fr 24px",
    gridColumnGap: spacingTiny,
    alignItems: "center",
    marginBottom: spacingMedium
  }),
  legendEntry: css({
    display: "grid",
    gridTemplateColumns: "12px 1fr 24px",
    gridColumnGap: spacingTiny,
    alignItems: "center",
    marginBottom: spacingSmall
  }),
  marker: (backgroundColor: string) =>
    css({
      width: 12,
      height: 12,
      borderRadius: "50%",
      backgroundColor
    }),
  count: css({
    textAlign: "right"
  }),
  postLegendElementWrapper: css({
    marginTop: spacingLarge
  })
}
