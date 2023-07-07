import {shallow} from "enzyme"
import * as React from "react"
import {PieChart} from "react-minimal-pie-chart"
import {Data} from "react-minimal-pie-chart/types/commonTypes"
import {create} from "react-test-renderer"
import {DonutChartWithLegend} from "../donut-chart-with-legend"

const data: Data = [
  {title: "test1", color: "#f00", value: 12, key: "2"},
  {title: "", color: "#ff0", value: 42, key: "1"},
  {title: "test1", color: "#f0f", value: 2, key: "3"}
]

describe("donut-chart-with-legend", () => {
  it("renders correctly", () => {
    const component = <DonutChartWithLegend data={data} legendLabel={"My awesome chart"} />
    const tree = create(component).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it("renders correct structure", () => {
    const component = <DonutChartWithLegend data={data} legendLabel={"My awesome chart"} />
    const tree = shallow(component)

    expect(tree.find(PieChart)).toHaveLength(1)
    expect(tree.find(".donut-chart")).toHaveLength(1)
    expect(tree.find(".legend-entry")).toHaveLength(data.length)
  })

  it("renders custom post element correctly", () => {
    const component = (
      <DonutChartWithLegend
        data={data}
        legendLabel={"My awesome chart"}
        renderCustomPostLegendElement={() => <div className="custom-post-legend-element">test</div>}
      />
    )
    const tree = shallow(component)

    expect(tree.find(".custom-post-legend-element")).toHaveLength(1)
  })
})
