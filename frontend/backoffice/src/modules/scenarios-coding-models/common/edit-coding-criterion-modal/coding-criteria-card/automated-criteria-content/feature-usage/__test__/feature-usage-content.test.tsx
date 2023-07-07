import {shallow} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {Column, Columns, CustomSelect, Heading, Label, Text} from "shared/components"
import {automatedFeatureUsageCodingCriterionMock} from "shared/graphql/__mocks__"
import {FeatureType, OfficeTool} from "shared/graphql/generated/globalTypes"
import {FeatureUsageContent} from "../feature-usage-content"

describe("feature-usage-content", () => {
  it("renders correctly", async () => {
    const component = create(
      <FeatureUsageContent
        onChangeTool={jest.fn()}
        criterion={automatedFeatureUsageCodingCriterionMock}
        onChangeFeatureType={jest.fn()}
      />
    )
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("has correct structure", async () => {
    const component = shallow(
      <FeatureUsageContent
        onChangeTool={jest.fn()}
        criterion={automatedFeatureUsageCodingCriterionMock}
        onChangeFeatureType={jest.fn()}
      />
    )

    expect(component.find(Label)).toHaveLength(1)
    expect(component.find(Heading)).toHaveLength(1)
    expect(component.find(Text)).toHaveLength(1)
    expect(component.find(CustomSelect)).toHaveLength(2)
    expect(component.find(Column)).toHaveLength(2)
    expect(component.find(Columns)).toHaveLength(1)
  })
  it("shows correct options for email", async () => {
    const component = shallow(
      <FeatureUsageContent
        onChangeTool={jest.fn()}
        criterion={automatedFeatureUsageCodingCriterionMock}
        onChangeFeatureType={jest.fn()}
      />
    )

    expect(component.find(CustomSelect).last().prop("optionList")).toEqual([
      {value: FeatureType.AnswerEmail, label: "coding_models__automated_item_feature_usage_feature_type_answer_mail"},
      {value: FeatureType.Search, label: "coding_models__automated_item_feature_usage_feature_type_search_mails"}
    ])
  })
  it("shows correct options for erp", async () => {
    const component = shallow(
      <FeatureUsageContent
        onChangeTool={jest.fn()}
        criterion={{...automatedFeatureUsageCodingCriterionMock, officeTool: OfficeTool.Erp}}
        onChangeFeatureType={jest.fn()}
      />
    )

    expect(component.find(CustomSelect).last().prop("optionList")).toEqual([
      {value: FeatureType.Search, label: "coding_models__automated_item_feature_usage_feature_type_search_erp"},
      {value: FeatureType.CopyToClipboard, label: "coding_models__automated_item_feature_usage_feature_type_copy"},
      {value: FeatureType.PasteFromClipboard, label: "coding_models__automated_item_feature_usage_feature_type_paste"}
    ])
  })
})
